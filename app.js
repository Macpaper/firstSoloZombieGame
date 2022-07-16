import Game from "/src/game.js";

let canvas = document.querySelector("#gameScreen");
const GAME_WIDTH = 1800;
const GAME_HEIGHT = 1200;
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
let context = canvas.getContext("2d");

let game = new Game(GAME_WIDTH, GAME_HEIGHT);
// game.start();

context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  // console.log(timestamp);
  game.update(deltaTime);
  game.draw(context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
