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

// Imports for utilities
import { generateName } from './utils/names';
import { StorageManager, type ModelData } from './utils/storage';

// Existing DOM Elements
// ...

const saveBtn = document.getElementById('save-best')!;
const leaderboardBody = document.querySelector('#leaderboard-table tbody')!;
const emptyMsg = document.getElementById('empty-leaderboard-msg')!;

// ...

function renderLeaderboard() {
  const models = StorageManager.getModels();
  leaderboardBody.innerHTML = '';

  if (models.length === 0) {
    emptyMsg.classList.remove('hidden');
    return;
  }

  emptyMsg.classList.add('hidden');
  models.forEach(model => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${model.name}</td>
      <td>${Math.round(model.score)}</td>
      <td>${model.generation}</td>
      <td>
        <button class="action-btn load-btn" data-id="${model.id}">Load</button>
        <button class="action-btn delete-btn" data-id="${model.id}">✕</button>
      </td>
    `;
    leaderboardBody.appendChild(row);
  });

  // Attach event listeners to new buttons
  document.querySelectorAll('.load-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).dataset.id!;
      loadModel(id);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).dataset.id!;
      StorageManager.deleteModel(id);
      renderLeaderboard();
    });
  });
}

function loadModel(id: string) {
  const models = StorageManager.getModels();
  const model = models.find(m => m.id === id);
  if (!model) return;

  const weights = model.weights;
  const newPop = ga.loadGenome(weights, game.canvas.height);

  game.isPaused = true;
  game.reset();
  game.dinos = [];
  newPop.forEach(d => game.addDino(d));

  // Set generation count to the saved model's generation or continue incrementing?
  // Let's set it to the saved generation so user knows context
  ga.generation = model.generation;
  genCountEl.textContent = ga.generation.toString();

  // Reset manual mode if active
  if (isManualMode) {
    isManualMode = false;
    manualToggle.checked = false;
    hintsEl.classList.add('hidden');
    toggleBtn.textContent = 'Start Training';
    genCountEl.parentElement!.style.visibility = 'visible';
  }

  game.isPaused = false;
  toggleBtn.textContent = 'Pause';
}

saveBtn.addEventListener('click', () => {
  // Find best dino
  const bestDino = game.dinos.reduce((best, current) =>
    (current.score > best.score) ? current : best
    , game.dinos[0]);

  if (!bestDino) return;

  const weights = ga.getWeights(bestDino);
  if (!weights) {
    alert("Cannot save manual player or invalid dino.");
    return;
  }

  const model: ModelData = {
    id: Date.now().toString(),
    name: generateName(),
    score: bestDino.score, // Use current score as best score
    generation: ga.generation,
    timestamp: Date.now(),
    weights: weights
  };

  StorageManager.saveModel(model);
  renderLeaderboard();
});

// Initial Render
renderLeaderboard();

// Start the loop
loop();
