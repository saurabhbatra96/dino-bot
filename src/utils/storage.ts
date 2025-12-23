export interface ModelWeights {
    weightsIH: number[][];
    weightsHO: number[][];
    biasH: number[];
    biasO: number[];
}

export interface ModelData {
    id: string;
    name: string;
    score: number;
    generation: number;
    timestamp: number;
    weights: ModelWeights;
}

const STORAGE_KEY = 'dino_bot_leaderboard';

export class StorageManager {
    static saveModel(model: ModelData) {
        const models = this.getModels();
        models.push(model);
        // Sort by score descending and keep top 10
        models.sort((a, b) => b.score - a.score);
        if (models.length > 10) {
            models.length = 10;
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
    }

    static getModels(): ModelData[] {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }

    static deleteModel(id: string) {
        const models = this.getModels().filter(m => m.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(models));
    }
}
