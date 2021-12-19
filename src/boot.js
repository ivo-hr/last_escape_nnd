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
   * Método que carga la fuente especificada
   * @param {string} name Nombre de la fuente 
   * @param {string} url Dirección de la fuente
   */
  loadFont(name, url) {
    let newFont = new FontFace(name, `url(${url})`);
    newFont.load().then(function (loaded) {
        document.fonts.add(loaded);
    }).catch(function (error) {
        return error;
    });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    

    this.load.image('carceltile','assets/tilesets/jawbreaker_tiles.png');
    this.load.tilemapTiledJSON('carcelmapa','assets/tilemaps/carcelmapa.json');

    //Fuentes del juego
    this.loadFont('Pixels', 'assets/fonts/Pixels.ttf');
    this.loadFont('HelpMe', 'assets/fonts/HelpMe-owODB.ttf');
    
    //Sonidos del juego
    this.load.audio('leftInShop', 'assets/sfx/leftInWrkShp.mp3');
    this.load.audio('pickup', 'assets/sfx/pickup.mp3');
    this.load.audio('susIncrSound', 'assets/sfx/susIncrease.mp3');
    this.load.audio('susDecrSound', 'assets/sfx/susDecrease.mp3');
    this.load.audio('MainTh', 'assets/sfx/main_theme.mp3');

    //Sprites del juego
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setPath('assets/sprites/');
    
    this.load.image('mainMenu', 'menu.png');
    this.load.image('playbutton', 'playbutton.png');
    this.load.spritesheet('guard', 'guardia.png', { frameWidth: 4, frameHeight: 4 });
    this.load.spritesheet('player', 'enterrador.png', { frameWidth: 4, frameHeight: 4 });
    this.load.image('itemtemp', 'itemtemp.png');
    this.load.image('susbar', 'susbar.png');
    this.load.image('guardrange', 'guardrangetemp.png');
    this.load.image('itemlist', 'itemlist.png');
    this.load.image('interrogacion', 'interrogacion.png');
    this.load.image('exclamacion', 'exclamacion.png');
    this.load.image('mask', 'visionmask.png');
    this.load.image('susOverlay', 'susbarOverlay.png');
    this.load.image('clock', 'clock.png');
    this.load.image('sierra', 'sierra2.png');
    this.load.image('bisagra', 'bisagra1.png');
    this.load.image('clavos', 'cajaclavos.png');
    this.load.image('cruz', 'cruz.png');
    this.load.image('martillo', 'martillo.png');
    this.load.image('pala', 'pala.png');
    this.load.image('tabla', 'tabla.png');
    this.load.spritesheet('pulse', 'pulso.png', { frameWidth: 16, frameHeight: 16 });  
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    
    this.scene.start('menuscene');
  }
}