class Paddle extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, type) {
    super(scene, x, y, type);
    scene.add.existing(this);
    //physics
    scene.physics.world.enable(this);
    this.body.setCollideWorldBounds(true);
    this.body.immovable = true;
  }

}

export default Paddle;