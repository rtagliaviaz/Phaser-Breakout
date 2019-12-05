import Bootloader from './bootloader.js';
import ScenePlay from './scenes/scenePlay.js';
import ScenePause from './scenes/scenePause.js';
import SceneGameOver from './scenes/sceneGameOver.js';

const config = {
  width: 640,
  height: 400,
  parent: 'container',
  physics: {
    default: 'arcade'
  },
  scene: [
    Bootloader,
    ScenePlay,
    ScenePause,
    SceneGameOver
  ]
}

new Phaser.Game(config);