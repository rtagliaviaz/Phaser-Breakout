class Bootloader extends Phaser.Scene {
  constructor() {
    super({key: 'Bootloader'});
  }

  preload() {
    this.load.on("complete", () => {
      this.scene.start("ScenePlay");
    });
    
    //images
    this.load.image("ball", "./assets/ball.png");
    this.load.image("brick", "./assets/brick.png");
    this.load.image("paddle", "./assets/paddle.png"); 

    //sounds
    this.load.audio("die", "./assets/sounds/die.wav");
    this.load.audio("gameOver", "./assets/sounds/gameover.wav");
    this.load.audio("pause", "./assets/sounds/pause.wav");
    this.load.audio("hit", "./assets/sounds/hit.wav");
    this.load.audio("paddleHit", "./assets/sounds/paddle.wav" );
  }

}

export default Bootloader;