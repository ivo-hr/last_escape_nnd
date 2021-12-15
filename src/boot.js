/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación

    this.load.image('carceltile','assets/tilesets/jawbreaker_tiles.png');
    this.load.tilemapTiledJSON('carcelmapa','assets/tilemaps/carcelmapa.json');

    this.load.setPath('assets/sprites/');
    
    this.load.image('wall', 'platform.png');
    this.load.spritesheet('guard', 'guardia.png', { frameWidth: 4, frameHeight: 4 });
    this.load.spritesheet('player', 'enterrador.png', { frameWidth: 4, frameHeight: 4 });
    this.load.image('itemtemp', 'itemtemp.png');
    this.load.image('susbar', 'susbar.png');
    this.load.image('guardrange', 'guardrangetemp.png');
    this.load.image('itemlist', 'itemlist.png');
    this.load.image('interrogacion', 'interrogacion.png');
    this.load.image('exclamacion', 'exclamacion.png');
    this.load.image('mask', 'mask1.png');
    this.load.image('susOverlay', 'susbarOverlay.png');
    this.load.image('clock', 'clock.png');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    
    this.scene.start('nightchange', { noche: 1 });
  }
}