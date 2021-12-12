import Player from './player.js';
import Wall from './wall.js';
import Guard from './guard.js';
import SuspicionBar from './suspicionbar.js';
import Workshop from './workshop.js';
import Item from './item.js';
import ItemList from './itemList.js';
import Clock from './clock.js';
import BlurPostFX from '../assets/pipelines/BlurPostFX.js';
/**
 * Escena principal del juego.
 * @extends Phaser.Scene
 */
export default class NightScene extends Phaser.Scene {
  /**
   * Constructor de la escena
   * @param {string} scenceKey Key de la escena a construir
   */
  constructor(scenceKey) {
    super({ key: scenceKey });
  }

  init(datos) {
    this.noche = datos.noche;
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {

    this.createTilemap();

    //bool que indica si el juego esta en debug
    this.DEBUG = false;

    //graphics usados para el debug del raycast
    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00}, fillStyle: { color: 0xff00ff } });

    this.walls = this.add.group();
    this.items = this.add.group();

    this.player = new Player(this, 100, 300);
    this.guard = new Guard(this, 75, 200, +0.3);

    this.items.add(new Item(this, this.player, 700, 100, 0.2, false));
    this.items.add(new Item(this, this.player, 700, 400, 0.3, true));
    this.items.add(new Item(this, this.player, 300, 400, 0.5, true));

    this.itemList = new ItemList(this, 2000, 1000, 400, 700, 400);
    //esto es lo que hace que no haya context menu en el juego al pulsar click derecho
    this.input.mouse.disableContextMenu();

    //creación del raycaster
    this.raycaster = this.raycasterPlugin.createRaycaster();
    
    //mapeo del raycaster: los muros del juego y el jugador
    let array = this.walls.getChildren();
    array[array.length] = this.player;
    this.raycaster.mapGameObjects(array, true);

    this.susBar = new SuspicionBar(this, 10, 50, 30, 250);
    this.Workshop = new Workshop(this, this.player, 1100, 400, 300, 300, -0.1);
    this.clock = new Clock(this, 1000, 800, 150, 150);
    this.createRenderTexture();

    //timer de la noche
    this.timer = this.time.addEvent({
      delay: 180000, //3 min
      
      callback: this.nightEnd,
      callbackScope: this 
    });

    
  }



  /**
   * Método que crea el tilemap y las capas de este
   */
  createTilemap(){

    this.map=this.make.tilemap({ 
      key: 'carcelmapa', 
      tileWidth: 8, 
      tileHeight: 8
    });
    const tileset1 = this.map.addTilesetImage('carceltile', 'carceltile');

    this.backgroundLayer = this.map.createLayer('Suelo', [tileset1]);
    this.groundLayer = this.map.createLayer('Paredes', [tileset1]);
    this.backgroundLayer.scale=4
    this.groundLayer.scale=4;

    //groundLayer.setCollisionByProperty({ Colision: true });
  }

  /**
   * Método que crea el Render Texture usado para el efecto de la visión
   */
  createRenderTexture(){

    let width = this.scale.width;
	  let height = this.scale.height;

    let renderTexture = this.make.renderTexture({
      width,
      height
    }, true);

    //lo creamos un nivel encima del resto de objetos
    renderTexture.setDepth(2);

    //dibujamos el mapa vacío en el redertexture
    renderTexture.draw(this.backgroundLayer);
    renderTexture.draw(this.groundLayer);

    //cambiamos el tinte a uno mas oscuro
    renderTexture.setTint(0xa0a0dd);
  
    //filtro
    //this.cameras.main.setPostPipeline(BlurPostFX);

    //máscara
    renderTexture.mask = new Phaser.Display.Masks.BitmapMask(this, this.player.spotlight);
    renderTexture.mask.invertAlpha = true;
  }

  /**
   * Método que cambia de noche a la siguiente
   */
  nightEnd() {
        
    console.log("acaba la noche");
    
    this.noche++;
    this.scene.start('nightchange', { noche: this.noche });
  }
}