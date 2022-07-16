import Player from "/src/player.js";
import Enemy from "/src/enemy.js";
import { spawnInCircle } from "/src/enemy.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";
import Brick from "/src/brick.js";

import { buildLevel, level1, level2 } from "/src/level.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.player = new Player(this);
    this.gameObjects = [];
    this.lives = 1000;
    this.bricks = [];
    this.enemies = [];
    
    this.mouseY = 0;
    this.mouseX = 0;

    this.levels = [level1, level2];
    this.currentLevel = 0;
    new InputHandler(this.player, this);
  }
  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    for(let i = 0; i < 20; i++) {
      let zomb = spawnInCircle(this, 200);
      this.enemies.push(zomb);
    }
    this.ball.reset();
    
    

    this.gameObjects = [this.ball, this.player];
    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;
    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks, ...this.enemies].forEach((o) => o.update(deltaTime));
    this.bricks = this.bricks.filter((bricks) => !bricks.markedForDeletion);
    this.gameObjects = this.gameObjects.filter(o => !o.markedForDeletion);
    this.enemies = this.enemies.filter((e) => !e.dead);
  }

  draw(context) {
    [...this.gameObjects, ...this.bricks, ...this.enemies].forEach((o) => o.draw(context));
    if (this.gamestate === GAMESTATE.PAUSED) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0,0,0,0.5)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
    if (this.gamestate === GAMESTATE.MENU) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0,0,0,1)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText(
        "Press SPACEBAR To Start",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      context.rect(0, 0, this.gameWidth, this.gameHeight);
      context.fillStyle = "rgba(0,0,0,1)";
      context.fill();

      context.font = "30px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
