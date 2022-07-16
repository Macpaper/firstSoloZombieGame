import { detectCollisionBall } from "./collisionDetection.js";

export default class Projectile {
  constructor(game, x, y, velX, velY) {
    this.image = document.querySelector("#img_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.isBullet = true;
    this.markedForDeletion = false;
    this.position = {
      x: x,
      y: y,
    };
    this.speed = {
      x: velX,
      y: velY,
    };

    this.size = 5;
    this.game = game;
  }

  draw(context) {
    context.fillStyle = "rgb(0,0,255)";
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.size / 2,
      degToRad(0),
      degToRad(360),
      false
    );
    context.fill();
    // context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}
/*import { detectCollisionBall } from "./collisionDetection.js";

export default class Projectile {
  constructor(game, x, y, velX, velY) {
    this.image = document.querySelector("#img_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.isBullet = true;
    this.position = {
      x: x,
      y: y,
    };
    this.speed = {
      x: velX,
      y: velY,
    };

    this.size = 5;
    this.game = game;
  }

  draw(context) {
    context.fillStyle = "rgb(0,0,255)";
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.size / 2,
      degToRad(0),
      degToRad(360),
      false
    );
    context.fill();
    // context.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}

function degToRad(degrees) {
  return (degrees * Math.PI) / 180;
}
*/