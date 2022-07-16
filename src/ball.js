import {detectCollision} from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    this.image = document.querySelector("#img_ball");
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight,
    
    this.width = 16;
    this.game = game;
    this.reset();
  }

  reset() {
    this.position = { x: 10, y: 400};
    this.speed = {x: 4, y: -4};
  }
  draw(context) {
    context.drawImage(this.image, this.position.x, this.position.y, this.width, this.width);
  }
  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    // wall ond left or right
    if(this.position.x > this.gameWidth - this.width || this.position.x < 0) {
      this.speed.x =  -this.speed.x;
    }
    // well on top
    if(this.position.y < 0) {
      this.speed.y =  -this.speed.y;
    }
    
    if(this.position.y > this.gameHeight - this.width) {
      this.game.lives--;
      this.reset();
    }

    if(detectCollision(this, this.game.player)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.player.position.y - this.width;
    }
    
  }
}









