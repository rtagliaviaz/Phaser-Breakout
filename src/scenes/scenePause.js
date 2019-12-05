

class ScenePause extends Phaser.Scene {
  constructor() {
    super({key: 'ScenePause'})
  }

 create(){

  //sounds
  this.pause = this.sound.add("pause");

  //Pause
  this.PauseText = this.add.text(140, 150, `PAUSE`, { fontSize: '120px', fill: 'white' });
  

  //Control----> Pause
  //this.cursor_P= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

 }

 update(){
  this.input.keyboard.on('keydown-ESC', () => {
    this.pause.play();
    this.scene.sleep();
    this.scene.wake('ScenePlay');
    
  })  
  
 }
}

 
 

export default ScenePause;