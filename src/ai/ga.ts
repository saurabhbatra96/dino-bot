import { NeuralNetwork } from './nn';
import { Dino } from '../game/engine';

export class GeneticAlgorithm {
    populationSize: number;
    mutationRate: number;
    population: Dino[] = [];
    generation: number = 1;

    constructor(sizeSize: number, mutationRate: number) {
        this.populationSize = sizeSize;
        this.mutationRate = mutationRate;
    }

    createInitialPopulation(canvasHeight: number): Dino[] {
        const newPopulation: Dino[] = [];
        for (let i = 0; i < this.populationSize; i++) {
            const dino = new Dino(canvasHeight);
            // inputs: distToObs, obsWidth, obsSpeed, obsY, dinoY
            // outputs: jump, duck
            (dino as any).brain = new NeuralNetwork(5, 10, 2);
            newPopulation.push(dino);
        }
        this.population = newPopulation;
        return newPopulation;
    }

    createManualDino(canvasHeight: number): Dino {
        const dino = new Dino(canvasHeight);
        (dino as any).isManual = true;
        return dino;
    }

    evolve(oldPopulation: Dino[], canvasHeight: number): Dino[] {
        this.generation++;

        // Sort by fitness (score)
        const sorted = [...oldPopulation].sort((a, b) => b.fitness - a.fitness);
        const bestDino = sorted[0];

        const newPopulation: Dino[] = [];

        // Elitism: Keep the best one
        const elite = new Dino(canvasHeight);
        if ((bestDino as any).brain) {
            (elite as any).brain = (bestDino as any).brain.copy();
        } else {
            (elite as any).brain = new NeuralNetwork(5, 10, 2);
        }
        newPopulation.push(elite);

        // Create the rest by selection and mutation
        for (let i = 1; i < this.populationSize; i++) {
            const parent = this.selectParent(sorted);
            const child = new Dino(canvasHeight);
            if ((parent as any).brain) {
                (child as any).brain = (parent as any).brain.copy();
                (child as any).brain.mutate(this.mutationRate);
            } else {
                (child as any).brain = new NeuralNetwork(5, 10, 2);
            }
            newPopulation.push(child);
        }

        this.population = newPopulation;
        return newPopulation;
    }

    selectParent(population: Dino[]): Dino {
        // Filter out manual dinos or ensure they don't break evolution if they existed
        const aiPop = population.filter(d => !(d as any).isManual);
        if (aiPop.length === 0) return population[0];

        let totalFitness = aiPop.reduce((sum, d) => sum + d.fitness, 0);
        if (totalFitness === 0) return aiPop[Math.floor(Math.random() * aiPop.length)];

        let r = Math.random() * totalFitness;
        let count = 0;
        for (const dino of aiPop) {
            count += dino.fitness;
            if (count >= r) return dino;
        }
        return aiPop[0];
    }

    getBestGenome(): any {
        if (!this.population.length) return null;
        // Assuming population is updated or we sort internal population
        // If population is not sorted, we should find max fitness
        // But main loop keeps them updated. Let's find best alive or just best in gen.
        // Actually main loop has game.dinos. GA.population is just storage for next gen creation usually.
        // But let's assume we pass in the current dinos to get best.
        // Or better, we just return the weights of the best performing dino from the last evolve call if we tracked it.
        // But simpler: main.ts will pass the current dinos list to a method here to extract best.
        return null; // Will implement helper in main.ts or here taking dinos
    }

    // Helper to extract weights from a specific dino
    getWeights(dino: Dino) {
        if ((dino as any).brain) {
            const nn = (dino as any).brain;
            return {
                weightsIH: nn.weightsIH,
                weightsHO: nn.weightsHO,
                biasH: nn.biasH,
                biasO: nn.biasO
            };
        }
        return null;
    }

    loadGenome(weights: any, canvasHeight: number): Dino[] {
        const newPopulation: Dino[] = [];
        for (let i = 0; i < this.populationSize; i++) {
            const dino = new Dino(canvasHeight);
            const brain = new NeuralNetwork(5, 10, 2);
            brain.weightsIH = weights.weightsIH;
            brain.weightsHO = weights.weightsHO;
            brain.biasH = weights.biasH;
            brain.biasO = weights.biasO;

            // Mutate slightly so they aren't all identical clones immediately dying same way?
            // Or keep one exact clone?
            if (i > 0) {
                brain.mutate(this.mutationRate);
            }

            (dino as any).brain = brain;
            newPopulation.push(dino);
        }
        this.population = newPopulation;
        return newPopulation;
    }
}
