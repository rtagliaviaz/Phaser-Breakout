import Paddle from '../gameObjects/paddle.js';
;

class ScenePlay extends Phaser.Scene {
  constructor() {
    super({key: 'ScenePlay'}); 
  }


  create() {
    //sounds
    this.die = this.sound.add("die");
    this.pause = this.sound.add("pause");
    this.hit = this.sound.add("hit");
    this.paddleHit = this.sound.add("paddleHit");

    //lives
    this.lives = 3;
    this.livesText;
    this.livesText = this.add.text(470, 16, `Lives: ${this.lives}`, { fontSize: '32px', fill: 'white' });

    //score
    this.score = 0;
    this.scoreText;
    this.scoreText = this.add.text(16, 16, `Score: ${this.score}` , { fontSize: '32px', fill: 'white' });

    //height & width
    this.width = this.sys.game.config.width;
    this.height = this.sys.game.config.height;

    //bricks
    this.bricks = this.physics.add.group({
      key: 'brick',
      frameQuantity: 22,
      setScale: { x: 1.8, y: 2},
      collideWorldBounds: true,
      immovable: true,
      gridAlign: {
        width: 11,
        height: 10,
        cellWidth: 58,
        cellHeight: 28,
        x: 45,
        y: 70
      }
    });

  //paddle
  //(scene = this, x, y, type -> nombre)
  this.paddle = new Paddle(this, this.width/2, this.height-20, "paddle");
  //this.paddle = this.add.image(this.width/2, this.height-20, "paddle");


  //ball
  this.physics.world.setBoundsCollision(true, true, true, false);
  this.ball = this.physics.add.image(30, this.height/2, "ball");
  this.ball.setCollideWorldBounds(true);
  this.ball.setBounce(1);
  this.ball.setVelocityX(300);
  this.ballVelocityY = this.ball.setVelocityY(-200);

  //physics
  //(elemento que va a hacer la accion, el con que, funcion para que haga algo, null, this)
  this.physics.add.collider(this.ball, this.paddle, this.paddleCollition, null, this);
  this.physics.add.collider(this.ball, this.bricks, this.hitBrick, null, this);

  //Controls ---> Paddle
  this.controls = this.input.keyboard.createCursorKeys();

  //Control----> Pause
  this.cursor_ESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

  }

  update() {
    //repite la posicion de ball despues de que sale del juego
    // if (this.ball.y > this.height ) {
    //   this.ball.setPosition(10, this.height/2);
    //   this.ball.setVelocityX(300);
    // }

    if (this.ball.y > this.height ) {
      this.lives--;
      this.livesText.setText('Lives: ' + this.lives);
      this.resetBall();
    }

    //Paddle Control
    if (this.controls.left.isDown) {
      this.paddle.body.setVelocityX(-300);
    } else if (this.controls.right.isDown) {
      this.paddle.body.setVelocityX(300);
    } else {
      this.paddle.body.setVelocityX(0);
    }

    //Pause button
    this.input.keyboard.on('keydown-ESC', () => {
      if (this.scene.isSleeping('ScenePause')) {
        this.pause.play();
        this.scene.wake('ScenePause'); 
        this.scene.sleep();  
      } else {
        this.pause.play();
        this.scene.launch('ScenePause'); 
        this.scene.sleep();  
      }
    });  
  
    //gameover
    if (this.lives === 0) {
      this.die.play();
      this.gameOver();
    }
  }

  gameOver(){
      this.scene.stop();
      this.scene.launch('SceneGameOver');
  }

  //reset ball position
  resetBall(){
    this.ball.setPosition(10, this.height/2);
    this.ball.setVelocityX(300);
  }

  resetBricks () {
    this.bricks.children.each(function (brick) {
        brick.enableBody(false, 0, 0, true, true);
    });    
  }

  paddleCollition() {
    //esto hara que rebote hacia arriba despues de chocar con Paddle
    this.ballVelocityY = - this.ballVelocityY;
    this.paddleHit.play();
  }

  hitBrick(ball, brick) {
    // remove: remove one member from the group (and the scene, if specified)
    // clear: remove all members from the group (and the scene, if specified)
    // destroy: clear, then disconnect the group from the scene
    //the remove has too bool params one to re﻿move from scene, one to destroy
    //this.bricks.remove(brick, true, false);
    
    //elimina los bricks hitteados
    brick.disableBody(true, true);
    this.hit.play();

    //aumenta el score en 10 por cada hit
    this.score += 10;
    this.scoreText.setText('Score: ' + this.score);

    //contador para bricks cuando llegue a 0 reiniciarlos
     if (this.bricks.countActive() === 0)
      {
        
        this.resetBall();
        this.resetBricks();
        //scene restart
        //this.scene.restart();
        
      }
  }
    
  
}

export default ScenePlay;