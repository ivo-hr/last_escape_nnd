import Player from './player.js';
import Wall from './wall.js';
import Guard from './guard.js';

/**
 * Escena principal del juego.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'level' });
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {
    this.walls = this.add.group();
    this.player = new Player(this, 100, 300);
    this.guard = new Guard(this, 100, 200);
    //esto es lo que hace que no haya context menu en el juego al pulsar click derecho
    this.input.mouse.disableContextMenu();

    new Wall(this, this.player, 300, 300, 100, 200);
    new Wall(this, this.player, 500, 300, 300, 100);
  }
}