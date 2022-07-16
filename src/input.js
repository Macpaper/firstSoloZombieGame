export default class InputHandler {
  constructor(player, game) {
    this.game = game;
    document.addEventListener("mousemove", (e) => {
      // console.log(e.clientY);
      this.game.mouseY = e.clientY;
      this.game.mouseX = e.clientX;
    });
    document.addEventListener("click", (e) => {
      // let shoot = new Audio("assets/images/shotgun_blast.mp3");
      // shoot.volume = 0.2;
      // shoot.play();
      player.shoot();
    });
    document.addEventListener("keydown", (e) => {
      // console.log(e.key);
      switch (e.key) {
        case "w":
          player.moveUp();
          break;
        case "a":
          player.moveLeft();
          break;
        case "s":
          player.moveDown();
          break;
        case "d":
          player.moveRight();
          break;
        case "Escape":
          game.togglePause();
          break;
        case " ":
          game.start();
          break;
      }
    });
    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "w":
          if (player.vel.y < 0) player.moveStop();
          break;
        case "a":
          if (player.vel.x < 0) player.moveStop();
          break;
        case "s":
          if (player.vel.y > 0) player.moveStop();
          break;
        case "d":
          if (player.vel.x > 0) player.moveStop();
          break;
      }
    });
  }
}
