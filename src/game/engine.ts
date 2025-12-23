export type ObstacleType = 'cactus' | 'bird';

// Asset loader
const assets: Record<string, HTMLImageElement> = {};
const loadAsset = (name: string, path: string) => {
  const img = new Image();
  img.src = path;
  assets[name] = img;
};

loadAsset('dino', '/assets/dino.png');
loadAsset('cactus', '/assets/cactus.png');
loadAsset('bird', '/assets/bird.png');

export class Dino {
  x: number = 50;
  y: number;
  width: number = 80;
  height: number = 80;
  originalHeight: number = 80;
  duckHeight: number = 50;
  gravity: number = 0.8;
  jumpStrength: number = -16;
  velocity: number = 0;
  groundY: number;
  isJumping: boolean = false;
  isDucking: boolean = false;
  color: string = '#58a6ff';
  score: number = 0;
  fitness: number = 0;
  alive: boolean = true;
  frameCount: number = 0;

  constructor(canvasHeight: number) {
    this.groundY = canvasHeight - this.originalHeight - 20;
    this.y = this.groundY;
  }

  jump() {
    if (!this.isJumping && !this.isDucking) {
      this.velocity = this.jumpStrength;
      this.isJumping = true;
    }
  }

  duck(shouldDuck: boolean) {
    if (this.isJumping) return;

    this.isDucking = shouldDuck;
    if (this.isDucking) {
      this.height = this.duckHeight;
      this.y = this.groundY + (this.originalHeight - this.duckHeight);
    } else {
      this.height = this.originalHeight;
      this.y = this.groundY;
    }
  }

  update() {
    if (!this.alive) return;
    this.frameCount++;
    if (!this.isDucking) {
      this.velocity += this.gravity;
      this.y += this.velocity;
      if (this.y > this.groundY) {
        this.y = this.groundY;
        this.velocity = 0;
        this.isJumping = false;
      }
    }
    this.score++;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.alive) return;
    const img = assets['dino'];
    if (img && img.complete) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }
}

export class Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  type: ObstacleType;

  constructor(canvasWidth: number, canvasHeight: number, speed: number) {
    this.x = canvasWidth;
    this.speed = speed;
    if (Math.random() < 0.2) {
      this.type = 'bird';
      this.width = 80;
      this.height = 60;
      const isHigh = Math.random() < 0.5;
      this.y = isHigh ? canvasHeight - 200 : canvasHeight - 120;
    } else {
      this.type = 'cactus';
      this.width = 50 + Math.random() * 30;
      this.height = 60 + Math.random() * 60;
      this.y = canvasHeight - this.height - 20;
    }
  }

  update() {
    this.x -= this.speed;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const img = assets[this.type];
    if (img && img.complete) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    } else {
      ctx.fillStyle = this.type === 'cactus' ? '#f85149' : '#ffda44';
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  isOffScreen(): boolean {
    return this.x + this.width < 0;
  }
}

export class Game {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  dinos: Dino[] = [];
  obstacles: Obstacle[] = [];
  speed: number = 4;
  nextObstacleFrame: number = 0;
  frameCount: number = 0;
  score: number = 0;
  bestScore: number = 0;
  isPaused: boolean = true;
  onGameOver?: (bestScore: number) => void;
  stars: { x: number, y: number, size: number }[] = [];

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.resize();
    this.initStars();
  }

  initStars() {
    for (let i = 0; i < 50; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * (this.canvas.height - 50),
        size: Math.random() * 2
      });
    }
  }

  resize() {
    this.canvas.width = this.canvas.parentElement?.clientWidth || 800;
    this.canvas.height = 400; // Increased canvas height slightly to accommodate larger sprites if needed, but 300 might be enough. Let's try 400.
  }

  addDino(dino: Dino) {
    this.dinos.push(dino);
  }

  reset() {
    this.obstacles = [];
    this.score = 0;
    this.frameCount = 0;
    this.nextObstacleFrame = 0;
    this.speed = 4;
  }

  update() {
    if (this.isPaused) return;
    this.frameCount++;
    this.score++;
    if (this.frameCount >= this.nextObstacleFrame) {
      this.obstacles.push(new Obstacle(this.canvas.width, this.canvas.height, this.speed));
      const minInterval = Math.max(40, 70 - (this.score / 1000));
      this.nextObstacleFrame = this.frameCount + minInterval + Math.random() * 60;
    }
    if (this.frameCount % 500 === 0) {
      this.speed += 0.2;
    }
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      this.obstacles[i].update();
      if (this.obstacles[i].isOffScreen()) {
        this.obstacles.splice(i, 1);
      }
    }
    let anyAlive = false;
    for (const dino of this.dinos) {
      if (!dino.alive) continue;
      dino.update();
      anyAlive = true;
      for (const obstacle of this.obstacles) {
        if (this.checkCollision(dino, obstacle)) {
          dino.alive = false;
          dino.fitness = dino.score;
          break;
        }
      }
    }
    if (!anyAlive && this.dinos.length > 0) {
      if (this.score > this.bestScore) this.bestScore = this.score;
      this.isPaused = true;
      if (this.onGameOver) this.onGameOver(this.bestScore);
    }
  }

  checkCollision(dino: Dino, obstacle: Obstacle): boolean {
    const padding = 15; // Increased padding for larger sprites
    return (
      dino.x + padding < obstacle.x + obstacle.width - padding &&
      dino.x + dino.width - padding > obstacle.x + padding &&
      dino.y + padding < obstacle.y + obstacle.height - padding &&
      dino.y + dino.height - padding > obstacle.y + padding
    );
  }

  draw() {
    this.ctx.fillStyle = '#202124';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#f1f3f4';
    for (const star of this.stars) {
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.strokeStyle = '#5f6368';
    this.ctx.lineWidth = 1;
    this.ctx.beginPath();
    this.ctx.moveTo(0, this.canvas.height - 20);
    this.ctx.lineTo(this.canvas.width, this.canvas.height - 20);
    this.ctx.stroke();
    for (const obstacle of this.obstacles) {
      obstacle.draw(this.ctx);
    }
    for (const dino of this.dinos) {
      dino.draw(this.ctx);
    }
  }
}
