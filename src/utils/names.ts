export const adjectives = [
    'swift', 'dancing', 'flying', 'roaring', 'silent',
    'smart', 'jolly', 'brave', 'calm', 'wild',
    'eager', 'gentle', 'happy', 'proud', 'wise',
    'fast', 'sneaky', 'bold', 'lucky', 'clever'
];

export const nouns = [
    'raptor', 'dino', 'eagle', 'macaw', 'tiger',
    'panda', 'wolf', 'fox', 'hawk', 'owl',
    'bear', 'lion', 'crane', 'shark', 'whale',
    'runner', 'jumper', 'hunter', 'scout', 'pilot'
];

export function generateName(): string {
    const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
    const noun = nouns[Math.floor(Math.random() * nouns.length)];
    return `${adj}_${noun}`;
}
