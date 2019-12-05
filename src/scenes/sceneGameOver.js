class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({key: 'SceneGameOver'})
  }

 create(){

  //sound
  this.gameover = this.sound.add("gameOver");
  
  setTimeout(() => {
    this.gameover.play();
  }, 2500);

  //Game Over
  setTimeout(() => {
  this.gameOverText = this.add.text(40, 150, `Game Over`, { fontSize: '100px', fill: 'white',  });
  }, 2000);

 }



}

export default SceneGameOver;