import Player from './player.js';
import Wall from './wall.js';
import Guard from './guard.js';
import SuspicionBar from './suspicionbar.js';
import Workshop from './workshop.js';
import Item from './item.js';
/**
 * Escena principal del juego.
 * @extends Phaser.Scene
 */
export default class Night1 extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'night1' });
  }

  init(datos) {
    this.noche = datos.noche;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {

    //bool que indica si el juego esta en debug
    this.DEBUG = true;

    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00}, fillStyle: { color: 0xff00ff } });

    this.walls = this.add.group();
    this.items = this.add.group();

    this.player = new Player(this, 100, 300);
    this.guard = new Guard(this, 75, 200, +0.5);

    this.items.add(new Item(this, this.player, 700, 100, 0.2, false));
    this.items.add(new Item(this, this.player, 700, 400, 0.3, true));
    this.items.add(new Item(this, this.player, 300, 400, 0.5, true));

    //esto es lo que hace que no haya context menu en el juego al pulsar click derecho
    this.input.mouse.disableContextMenu();

    //walls
    this.walls.add(new Wall(this, this.player, 300, 200, 100, 300));
    this.walls.add(new Wall(this, this.player, 500, 400, 500, 100));
    this.walls.add(new Wall(this, this.player, 300, 600, 100, 300));

    this.walls.add(new Wall(this, this.player, 1100, 200, 100, 300));
    this.walls.add(new Wall(this, this.player, 900, 400, 500, 100));
    this.walls.add(new Wall(this, this.player, 1100, 600, 100, 300));

    //creación del raycaster
    this.raycaster = this.raycasterPlugin.createRaycaster();
    
    //mapeo del raycaster: los muros del juego y el jugador
    let array = this.walls.getChildren();
    array[array.length] = this.player;
    this.raycaster.mapGameObjects(array, true);

    this.susBar = new SuspicionBar(this, 10, 50, 30, 250);
    this.Workshop = new Workshop(this, this.player, 1100, 400, 300, 300, -0.1);

    let timer = this.time.addEvent({
      delay: 180000, //3 min
      callback: this.nightEnd,
      callbackScope: this 
});
  }

  //cambia la noche
  nightEnd() {
        
    console.log("acaba la noche");
    
    this.noche++;
    this.scene.start('nightchange', { noche: this.noche });
  }
}