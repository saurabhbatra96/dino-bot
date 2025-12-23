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

const HEAVEN_KEY = 'dino_bot_heaven';
const HELL_KEY = 'dino_bot_hell';

export type BoardType = 'heaven' | 'hell';

export class StorageManager {
    static saveModel(model: ModelData, type: BoardType) {
        const models = this.getModels(type);
        models.push(model);

        if (type === 'heaven') {
            // Heaven: Sort descending (Best -> Worst)
            models.sort((a, b) => b.score - a.score);
        } else {
            // Hell: Sort ascending (Worst -> Best)
            models.sort((a, b) => a.score - b.score);
        }

        if (models.length > 10) {
            models.length = 10;
        }

        const key = type === 'heaven' ? HEAVEN_KEY : HELL_KEY;
        localStorage.setItem(key, JSON.stringify(models));
    }

    static getModels(type: BoardType): ModelData[] {
        const key = type === 'heaven' ? HEAVEN_KEY : HELL_KEY;
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : [];
    }

    static deleteModel(id: string, type: BoardType) {
        const models = this.getModels(type).filter(m => m.id !== id);
        const key = type === 'heaven' ? HEAVEN_KEY : HELL_KEY;
        localStorage.setItem(key, JSON.stringify(models));
    }
}
