export class NeuralNetwork {
    inputNodes: number;
    hiddenNodes: number;
    outputNodes: number;
    weightsIH: number[][];
    weightsHO: number[][];
    biasH: number[];
    biasO: number[];

    constructor(input: number, hidden: number, output: number) {
        this.inputNodes = input;
        this.hiddenNodes = hidden;
        this.outputNodes = output;

        // Initialize random weights
        this.weightsIH = Array.from({ length: this.hiddenNodes }, () =>
            Array.from({ length: this.inputNodes }, () => Math.random() * 2 - 1)
        );
        this.weightsHO = Array.from({ length: this.outputNodes }, () =>
            Array.from({ length: this.hiddenNodes }, () => Math.random() * 2 - 1)
        );

        this.biasH = Array.from({ length: this.hiddenNodes }, () => Math.random() * 2 - 1);
        this.biasO = Array.from({ length: this.outputNodes }, () => Math.random() * 2 - 1);
    }

    predict(inputs: number[]): number[] {
        // Hidden layer
        let hidden = this.biasH.map((b, i) => {
            let sum = b;
            for (let j = 0; j < inputs.length; j++) {
                sum += inputs[j] * this.weightsIH[i][j];
            }
            return this.sigmoid(sum);
        });

        // Output layer
        let outputs = this.biasO.map((b, i) => {
            let sum = b;
            for (let j = 0; j < hidden.length; j++) {
                sum += hidden[j] * this.weightsHO[i][j];
            }
            return this.sigmoid(sum);
        });

        return outputs;
    }

    sigmoid(x: number): number {
        return 1 / (1 + Math.exp(-x));
    }

    copy(): NeuralNetwork {
        const copy = new NeuralNetwork(this.inputNodes, this.hiddenNodes, this.outputNodes);
        copy.weightsIH = this.weightsIH.map((row) => [...row]);
        copy.weightsHO = this.weightsHO.map((row) => [...row]);
        copy.biasH = [...this.biasH];
        copy.biasO = [...this.biasO];
        return copy;
    }

    mutate(rate: number) {
        const mutateVal = (val: number) => {
            if (Math.random() < rate) {
                return val + this.randomGaussian() * 0.1;
            }
            return val;
        };

        this.weightsIH = this.weightsIH.map((row) => row.map(mutateVal));
        this.weightsHO = this.weightsHO.map((row) => row.map(mutateVal));
        this.biasH = this.biasH.map(mutateVal);
        this.biasO = this.biasO.map(mutateVal);
    }

    randomGaussian(): number {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    }
}
