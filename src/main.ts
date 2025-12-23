import './style.css';
import { Game } from './game/engine';
import { GeneticAlgorithm } from './ai/ga';
import { generateName } from './utils/names';
import { getRandomTale } from './utils/tales';
import { StorageManager, type ModelData } from './utils/storage';

const POPULATION_SIZE = 50;
const MUTATION_RATE = 0.1;

const game = new Game('game-canvas');
const ga = new GeneticAlgorithm(POPULATION_SIZE, MUTATION_RATE);

// DOM Elements
const genCountEl = document.getElementById('gen-count')!;
const aliveCountEl = document.getElementById('alive-count')!;
const bestScoreEl = document.getElementById('best-score')!;
const currentNameEl = document.getElementById('current-name')!;
const speedRange = document.getElementById('speed-range') as HTMLInputElement;
const speedValEl = document.getElementById('speed-val')!;
const toggleBtn = document.getElementById('toggle-train')!;
const manualToggle = document.getElementById('manual-mode-toggle') as HTMLInputElement;
const overlayEl = document.getElementById('game-over')!;
const hintsEl = document.getElementById('manual-hints')!;
// New Board Elements
const btnAward = document.getElementById('btn-award')!;
const btnDecommission = document.getElementById('btn-decommission')!;

const leaderboardBody = document.querySelector('#leaderboard-table tbody')!;
const emptyLeaderboardMsg = document.getElementById('empty-leaderboard-msg')!;

const loserboardBody = document.querySelector('#loserboard-table tbody')!;
const emptyLoserboardMsg = document.getElementById('empty-loserboard-msg')!;

let simSpeed = 1;
let isManualMode = false;

// Track best model ever seen in this session
let bestEverWeights: any = null;
let bestEverScore = 0;
let bestEverGen = 1;
let bestEverName: string | null = null;
let bestEverId: string | null = null;

// Initialize
bestEverName = generateName();
currentNameEl.textContent = bestEverName;

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

  // Real-time tracking of best dinosaur ever seen
  if (!isManualMode) {
    const currentBest = game.dinos.reduce((best, curr) => curr.score > best.score ? curr : best, game.dinos[0]);
    if (currentBest && currentBest.score > bestEverScore) {
      bestEverScore = Math.round(currentBest.score);
      bestEverWeights = ga.getWeights(currentBest);
      bestEverGen = ga.generation;
    }
  }

  aliveCountEl.textContent = game.dinos.filter(d => d.alive).length.toString();
  bestScoreEl.textContent = Math.round(game.bestScore).toString();

  requestAnimationFrame(loop);
}

game.onGameOver = (_bestScore) => {
  if (isManualMode) {
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
    const nextGen = ga.evolve(game.dinos, game.canvas.height);
    game.dinos = [];
    nextGen.forEach(d => game.addDino(d));
    game.reset();
    genCountEl.textContent = ga.generation.toString();

    // New generation, new name (unless we are in a special load/save state)
    // Actually, normally we might want to keep the name for the "lineage", 
    // but the prompt says "new name if the model is not saved".
    // For now, let's keep the name until they "Award" or "Decommission".

    game.isPaused = false;
  }
};

function renderBoards() {
  renderSingleBoard('heaven');
  renderSingleBoard('hell');
}

function renderSingleBoard(type: 'heaven' | 'hell') {
  const models = StorageManager.getModels(type);
  const tbody = type === 'heaven' ? leaderboardBody : loserboardBody;
  const msg = type === 'heaven' ? emptyLeaderboardMsg : emptyLoserboardMsg;

  if (!tbody || !msg) return;

  tbody.innerHTML = '';

  if (models.length === 0) {
    msg.style.display = 'block';
    return;
  }

  msg.style.display = 'none';
  models.forEach(model => {
    const row = document.createElement('tr');
    const loadBtnHtml = type === 'heaven'
      ? `<button class="action-btn load-btn" data-id="${model.id}" data-type="${type}">Load</button>`
      : '';

    row.innerHTML = `
        <td>${model.name}</td>
        <td>${Math.round(model.score)}</td>
        <td>${model.generation}</td>
        <td>
            ${loadBtnHtml}
            <button class="action-btn delete-btn" data-id="${model.id}" data-type="${type}" data-name="${model.name}">✕</button>
        </td>
        `;
    tbody.appendChild(row);
  });

  const loadBtns = tbody.querySelectorAll('.load-btn');
  loadBtns.forEach(btn => {
    (btn as HTMLElement).addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      loadModel(target.dataset.id!, target.dataset.type as any);
    });
  });

  const delBtns = tbody.querySelectorAll('.delete-btn');
  delBtns.forEach(btn => {
    (btn as HTMLElement).addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const id = target.dataset.id!;
      const modelType = target.dataset.type as 'heaven' | 'hell';

      if (modelType === 'hell') {
        const tale = getRandomTale();
        const pendingData = { id, name: target.dataset.name!, tale };
        localStorage.setItem('aperture_pending_incineration', JSON.stringify(pendingData));
        showStoryModal(pendingData.name, pendingData.tale.content, id);
      } else {
        StorageManager.deleteModel(id, modelType);
        renderBoards();
      }
    });
  });
}

function showStoryModal(name: string, content: string, id: string) {
  const modal = document.getElementById('story-modal')!;
  const contentEl = document.getElementById('story-content')!;
  const personalityEl = document.getElementById('story-personality')!;

  contentEl.textContent = content;
  personalityEl.textContent = name;
  personalityEl.style.textTransform = 'uppercase';
  modal.classList.remove('hidden');

  // Setup the "Incinerate" confirmation button
  const closeBtn = document.getElementById('close-story')!;
  const handleConfirm = () => {
    StorageManager.deleteModel(id, 'hell');
    localStorage.removeItem('aperture_pending_incineration');
    renderBoards();
    modal.classList.add('hidden');
    closeBtn.removeEventListener('click', handleConfirm);
  };
  closeBtn.addEventListener('click', handleConfirm);

  // Setup the fake "Cancel" button feedback
  const cancelBtn = modal.querySelector('.btn-cancel-disabled');
  if (cancelBtn) {
    cancelBtn.addEventListener('click', () => {
      cancelBtn.classList.add('denied-active');
      setTimeout(() => cancelBtn.classList.remove('denied-active'), 2000);
    });
  }
}

function checkPendingIncineration() {
  const saved = localStorage.getItem('aperture_pending_incineration');
  if (saved) {
    const data = JSON.parse(saved);
    showStoryModal(data.name, data.tale.content, data.id);
  }
}

// Call on startup
checkPendingIncineration();

function loadModel(id: string, type: 'heaven' | 'hell') {
  const models = StorageManager.getModels(type);
  const model = models.find(m => m.id === id);
  if (!model) return;

  const weights = model.weights;
  const newPop = ga.loadGenome(weights, game.canvas.height);

  game.isPaused = true;
  game.reset();
  game.dinos = [];
  newPop.forEach(d => game.addDino(d));

  ga.generation = model.generation;
  genCountEl.textContent = ga.generation.toString();

  // Sync session best with loaded model
  bestEverScore = model.score;
  bestEverWeights = weights;
  bestEverGen = model.generation;
  bestEverName = model.name;
  bestEverId = model.id;
  currentNameEl.textContent = bestEverName;
  game.bestScore = model.score;
  bestScoreEl.textContent = Math.round(model.score).toString();

  if (isManualMode) {
    isManualMode = false;
    manualToggle.checked = false;
    hintsEl.classList.add('hidden');
    genCountEl.parentElement!.style.visibility = 'visible';
    speedRange.disabled = false;
  }

  toggleBtn.textContent = 'Resume';
}

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

    // Lock speed to 1x
    simSpeed = 1;
    speedRange.value = "1";
    speedRange.disabled = true;
    speedValEl.textContent = "1x";
  } else {
    const nextGen = ga.createInitialPopulation(game.canvas.height);
    nextGen.forEach(d => game.addDino(d));
    hintsEl.classList.add('hidden');
    toggleBtn.textContent = 'Start Training';
    genCountEl.parentElement!.style.visibility = 'visible';
    genCountEl.textContent = ga.generation.toString();

    // Re-enable speed control
    speedRange.disabled = false;
  }
  overlayEl.classList.add('hidden');
});

function saveCurrentBest(type: 'heaven' | 'hell') {
  if (!bestEverWeights) {
    alert("No model data available to save yet. Let the dinos run for a bit!");
    return;
  }

  if (bestEverId) {
    // Delete from both boards to ensure it's "moved" or "updated"
    StorageManager.deleteModel(bestEverId, 'heaven');
    StorageManager.deleteModel(bestEverId, 'hell');
  }

  const model: ModelData = {
    id: Date.now().toString(),
    name: bestEverName || generateName(),
    score: bestEverScore,
    generation: bestEverGen,
    timestamp: Date.now(),
    weights: bestEverWeights
  };

  StorageManager.saveModel(model, type);
  renderBoards();

  // Reset Game Session
  game.isPaused = true;
  game.reset();
  game.bestScore = 0; // Explicitly reset engine best score

  // Reset GA and Population
  ga.generation = 1;
  game.dinos = [];
  const newPop = ga.createInitialPopulation(game.canvas.height);
  newPop.forEach(d => game.addDino(d));

  // Reset Session Bests
  bestEverWeights = null;
  bestEverScore = 0;
  bestEverGen = 1;
  bestEverName = generateName();
  bestEverId = null;

  // Update UI
  currentNameEl.textContent = bestEverName;
  genCountEl.textContent = '1';
  bestScoreEl.textContent = '0';
  aliveCountEl.textContent = POPULATION_SIZE.toString();

  // Reset controls
  toggleBtn.textContent = 'Initiate Test';
}

btnAward.addEventListener('click', () => saveCurrentBest('heaven'));
btnDecommission.addEventListener('click', () => saveCurrentBest('hell'));

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

// Initial Render
renderBoards();

// Start the loop
loop();
