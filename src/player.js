import Projectile from "/src/projectile.js";

export default class Player {
  constructor(game) {
    this.image = document.querySelector("#img_player");
    this.game = game;
    this.width = 45;
    this.height = 75;
    this.dead = false;
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;
    this.maxSpeed = 7;
    this.vel = { x: 0, y: 0 };
    this.accel = { x: 0, y: 0 };
    this.position = {
      x: this.gameWidth / 2 - this.width / 2,
      y: this.gameHeight / 2 - this.height / 2,
    };
    console.log(this.image.style);
  }

  shoot() {
    let mX = this.game.mouseX;
    let pX = this.position.x;
    let mY = this.game.mouseY;
    let pY = this.position.y;
    let pMX = pX + this.width / 2;
    let pMY = pY + this.height / 2;

    let pelletSpeed = 35;
    let theta = Math.atan2(mY - pMY, mX - pMX);
    let knockback = 10;
    this.accel.x += knockback * Math.cos(theta) * -1;
    this.accel.y += knockback * Math.sin(theta) * -1;
    for (let i = 0; i < 25; i++) {
      let randomTheta = theta + ((Math.random() * 2) / 5 - 1 / 5);
      let velocityPelletX = pelletSpeed * Math.cos(randomTheta);
      let velocityPelletY = pelletSpeed * Math.sin(randomTheta);
      let vXR = velocityPelletX + ((Math.random() * 12) / 5 - 6 / 5);
      let vYR = velocityPelletY + ((Math.random() * 12) / 5 - 6 / 5);
      let bullet = new Projectile(this.game, pMX, pMY, vXR, vYR);
      this.game.gameObjects.push(bullet);
    }
  }

  moveUp() {
    this.vel.y = -this.maxSpeed;
  }
  moveLeft() {
    this.vel.x = -this.maxSpeed;
  }
  moveDown() {
    this.vel.y = this.maxSpeed;
  }
  moveStop() {
    this.vel.x = 0;
    this.vel.y = 0;
  }
  moveRight() {
    this.vel.x = this.maxSpeed;
  }

  draw(context) {
    let mX = this.game.mouseX;
    let pX = this.position.x;
    let oOverA =
      (this.game.mouseY - (this.position.y + this.height / 2)) /
      (this.game.mouseX - (this.position.x + this.width / 2));

    let rads = Math.atan2(oOverA);
    // console.log(rads);
    let angleValue = (rads * 180) / Math.PI;


    // console.log(angleValue)
    // console.log(angleValue);
    drawImageRot(
      context,
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height,
      angleValue + 90
    );
  }

  update(deltaTime) {
    this.accel.x = Math.round(this.accel.x);
    this.accel.y = Math.round(this.accel.y);
    if (this.accel.x > 0) {
      this.accel.x--;
    }
    if (this.accel.y > 0) {
      this.accel.y--;
    }
    if (this.accel.x < 0) {
      this.accel.x++;
    }
    if (this.accel.y < 0) {
      this.accel.y++;
    }

    //collision with borders
    if (this.position.x < 0) {
      this.position.x = 0;
    }
    if (this.position.x > this.gameWidth - this.width) {
      this.position.x = this.gameWidth - this.width;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
    }
    if (this.position.y > this.gameHeight - this.height) {
      this.position.y = this.gameHeight - this.height;
    }

    this.position.x += this.vel.x + this.accel.x;
    this.position.y += this.vel.y + this.accel.y;
  }
}
function drawImageRot(context, img, x, y, width, height, deg) {
  context.save();
  let rad = (deg * Math.PI) / 180;
  context.translate(x + width / 2, y + height / 2);
  // console.log(rad);
  context.rotate(rad);
  context.drawImage(img, (width / 2) * -1, (height / 2) * -1, width, height);
  context.restore();
}
