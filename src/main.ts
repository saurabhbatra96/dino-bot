import './style.css';
import { Game } from './game/engine';
import { GeneticAlgorithm } from './ai/ga';

const POPULATION_SIZE = 50;
const MUTATION_RATE = 0.1;

const game = new Game('game-canvas');
const ga = new GeneticAlgorithm(POPULATION_SIZE, MUTATION_RATE);

// DOM Elements
const genCountEl = document.getElementById('gen-count')!;
const aliveCountEl = document.getElementById('alive-count')!;
const bestScoreEl = document.getElementById('best-score')!;
const speedRange = document.getElementById('speed-range') as HTMLInputElement;
const speedValEl = document.getElementById('speed-val')!;
const toggleBtn = document.getElementById('toggle-train')!;
const manualToggle = document.getElementById('manual-mode-toggle') as HTMLInputElement;
const overlayEl = document.getElementById('game-over')!;
const hintsEl = document.getElementById('manual-hints')!;

let simSpeed = 1;
let isManualMode = false;

// Initialize
const initialDinos = ga.createInitialPopulation(game.canvas.height);
initialDinos.forEach(d => game.addDino(d));

function updateAI() {
  const obstacles = game.obstacles;
  if (obstacles.length === 0) {
    for (const dino of game.dinos) {
      if (dino.alive) dino.duck(false);
    }
    return;
  }

  const nearest = obstacles.find(o => o.x + o.width > 50) || obstacles[0];

  for (const dino of game.dinos) {
    if (!dino.alive || (dino as any).isManual) continue;

    const brain = (dino as any).brain;
    const inputs = [
      (nearest.x - dino.x) / game.canvas.width,
      nearest.width / 100,
      game.speed / 20,
      nearest.y / game.canvas.height,
      dino.y / game.canvas.height
    ];

    const output = brain.predict(inputs);

    if (output[0] > 0.5) dino.jump();
    if (output[1] > 0.5) {
      dino.duck(true);
    } else {
      dino.duck(false);
    }
  }
}

function loop() {
  for (let n = 0; n < simSpeed; n++) {
    if (!isManualMode) {
      updateAI();
    }
    game.update();
  }

  game.draw();

  aliveCountEl.textContent = game.dinos.filter(d => d.alive).length.toString();
  bestScoreEl.textContent = Math.round(game.bestScore).toString();

  requestAnimationFrame(loop);
}

game.onGameOver = (_bestScore) => {
  if (isManualMode) {
    // Show game over overlay for human player
    overlayEl.querySelector('h2')!.textContent = 'GAME OVER';
    overlayEl.querySelector('p')!.textContent = 'Wait for reset...';
    overlayEl.classList.remove('hidden');

    setTimeout(() => {
      game.reset();
      const manualDino = ga.createManualDino(game.canvas.height);
      game.dinos = [manualDino];
      game.isPaused = false;
      overlayEl.classList.add('hidden');
    }, 1000);
  } else {
    // Seamless transition for AI
    const nextGen = ga.evolve(game.dinos, game.canvas.height);
    game.dinos = [];
    nextGen.forEach(d => game.addDino(d));
    game.reset();
    genCountEl.textContent = ga.generation.toString();
    game.isPaused = false;
  }
};

// Event Listeners
toggleBtn.addEventListener('click', () => {
  game.isPaused = !game.isPaused;
  toggleBtn.textContent = game.isPaused ? (game.score > 0 ? 'Resume' : 'Start') : 'Pause';
});

manualToggle.addEventListener('change', () => {
  isManualMode = manualToggle.checked;
  game.isPaused = true;
  game.reset();
  game.dinos = [];

  if (isManualMode) {
    const player = ga.createManualDino(game.canvas.height);
    game.addDino(player);
    hintsEl.classList.remove('hidden');
    toggleBtn.textContent = 'Start Play';
    genCountEl.parentElement!.style.visibility = 'hidden';
  } else {
    const nextGen = ga.createInitialPopulation(game.canvas.height);
    nextGen.forEach(d => game.addDino(d));
    hintsEl.classList.add('hidden');
    toggleBtn.textContent = 'Start Training';
    genCountEl.parentElement!.style.visibility = 'visible';
    genCountEl.textContent = ga.generation.toString();
  }
  overlayEl.classList.add('hidden');
});

// Keyboard controls
window.addEventListener('keydown', (e) => {
  if (!isManualMode || game.isPaused) return;

  const player = game.dinos.find(d => (d as any).isManual);
  if (!player || !player.alive) return;

  if (e.code === 'Space' || e.code === 'ArrowUp' || e.code === 'KeyW') {
    player.jump();
    e.preventDefault();
  } else if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    player.duck(true);
    e.preventDefault();
  }
});

window.addEventListener('keyup', (e) => {
  if (!isManualMode || game.isPaused) return;

  const player = game.dinos.find(d => (d as any).isManual);
  if (!player || !player.alive) return;

  if (e.code === 'ArrowDown' || e.code === 'KeyS') {
    player.duck(false);
    e.preventDefault();
  }
});

speedRange.addEventListener('input', () => {
  simSpeed = parseInt(speedRange.value);
  speedValEl.textContent = `${simSpeed}x`;
});

window.addEventListener('resize', () => game.resize());

// Start the loop
loop();
