import { detectCollision, detectCollisionBorder } from "./collisionDetection.js";
import { detectCollisionBall } from "./collisionDetection.js";
export default class Enemy {
  constructor(game) {
    this.image = document.querySelector("#img_player");
    this.game = game;
    this.width = 45;
    this.height = 75;
    this.hp = 100;
    this.dead = false;
    this.gameHeight = game.gameHeight;
    this.gameWidth = game.gameWidth;
    this.maxSpeed = 0;
    this.vel = { x: 1, y: 1 };
    this.accel = { x: 0, y: 0 };
    this.position = {
      x: 100,
      y: 100,
    };
  }
  draw(context) {
    // context.drawImage(
    //   this.image,
    //   this.position.x,
    //   this.position.y,
    //   this.width,
    //   this.height
    // );
    let pX = this.game.player.position.x + this.game.player.width / 2;
    let pY = this.game.player.position.y + this.game.player.height / 2;
    let eX = this.position.x + this.width / 2;
    let eY = this.position.y + this.height / 2;

    let rads = Math.atan2(pY - eY, pX - eX);
    let angleValue = (rads * 180) / Math.PI;

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
    if (this.hp <= 0) {
      this.dead = true;
    }
    follow(this, this.game.player);
    this.accel.x = Math.round(this.accel.x);
    this.accel.y = Math.round(this.accel.y);
    if(this.accel.x > 0) {
      this.accel.x--;
    }
    if(this.accel.y > 0) {
      this.accel.y--;
    }
    if(this.accel.x < 0) {
      this.accel.x++;
    }
    if(this.accel.y < 0) {
      this.accel.y++;
    }
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

    if (detectCollision(this.game.player, this)) {
      console.log("INDY DINY LOL HI MINDY");
      
      this.game.lives -= 1;
    }
    detectCollisionBorder(this, this.game.player);
    // let hitSfx = new Audio("assets/images/bullet_hit_z_2.mp3");
    // hitSfx.volume = 0.2;
    
    let bullets = this.game.gameObjects.filter(b => b.isBullet);
    for (let i = 0; i < bullets.length; i++) {
      if (detectCollisionBall(bullets[i], this)) {
        bullets[i].markedForDeletion = true;
        
        this.accel.x += bullets[i].speed.x*(1/50);
        this.accel.y += bullets[i].speed.y*(1/50);
        // hitSfx.play();
        this.hp--;
      }
    }
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

function follow(obj1, obj2, doesFace) {
  let x1 = obj1.position.x;
  let x2 = obj2.position.x;
  let y1 = obj1.position.y;
  let y2 = obj2.position.y;
  let x1Mid = x1 + obj1.width / 2;
  let x2Mid = x2 + obj2.width / 2;
  let y1Mid = y1 + obj1.height / 2;
  let y2Mid = y2 + obj2.height / 2;

  let rads = Math.atan2(y2Mid - y1Mid, x2Mid - x1Mid);

  let angleValue = (rads * 180) / Math.PI;
  obj1.vel.x = obj1.maxSpeed * Math.cos(rads);
  obj1.vel.y = obj1.maxSpeed * Math.sin(rads);
}

export function spawnInCircle(game, r) {
  let cX = game.player.position.x;
  let cY = game.player.position.y;

  let randX = (Math.random() * 361);
  let randY = (Math.random() * 361);
  let spawnX = cX + (r * Math.cos(randX * Math.PI / 180));
  let spawnY = cY + (r * Math.sin(randY * Math.PI / 180));
  let zombo = new Enemy(game);
  zombo.position.x = spawnX;
  zombo.position.y = spawnY;
  return zombo;
}
