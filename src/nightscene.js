import Player from './player.js';
import Guard from './guard.js';
import SuspicionBar from './suspicionbar.js';
import Workshop from './workshop.js';
import ItemList from './itemList.js';
import Clock from './clock.js';
import BlurPostFX from '../assets/pipelines/BlurPostFX.js';

import Hammer from './items/hammer.js';
import Saw from './items/saw.js';
import Plank from './items/plank.js';
import Cross from './items/cross.js';
import Nails from './items/nails.js';
import Hinge from './items/hinge.js';
import Shovel from './items/shovel.js';
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

  init(datos, itemList) {
    this.noche = datos.noche;
    this.itemList = itemList 
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {

    this.canvas = document.getElementById("mainCanvas");

    if(!this.itemList){

      let listConfig = {
        shownX: this.canvas.width/2,
        hiddenX: this.canvas.width * 1.5,
        y: this.canvas.height/2,
        height: 700,
        width: 500
      };
      this.itemList = new ItemList(this, listConfig);
    }

    this.createTilemap();
    this.createObjectsFromTilemap();

    //bool que indica si el juego esta en debug
    this.DEBUG = true;

    //graphics usados para el debug del raycast
    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00}, fillStyle: { color: 0xff00ff } });

    this.player = new Player(this, 100, 300);
    this.guard = new Guard(this, 75, 200, +0.3, true);

    this.physics.add.collider(this.player, this.groundLayer);

    new Hammer(this, this.player, 700, 100);
    new Saw(this, this.player, 700, 400);
    new Hammer(this, this.player, 300, 400);

    
    //esto es lo que hace que no haya context menu en el juego al pulsar click derecho
    this.input.mouse.disableContextMenu();

    let barConfig = {
      x: 10,
      y: 50,
      height: 35,
      width: 250,
      susVar: 0.3
    };
    this.susBar = new SuspicionBar(this, barConfig);

    let workshopConfig = {
      x: 170,
      y: 160,
      height: 180,
      width: 310,
      susVar: -0.1
    };
    this.workshop = new Workshop(this, workshopConfig);

    let clockConfig = {
      x: 260,
      y: 35,
      height: 70,
      width: 70
    };
    this.clock = new Clock(this, clockConfig);

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

    this.tilemapIniWidth = this.backgroundLayer.displayWidth;
    this.tilemapIniHeight = this.backgroundLayer.displayHeight;

    this.backgroundLayer.displayWidth = this.canvas.width;
    this.backgroundLayer.displayHeight = this.canvas.height;
    this.groundLayer.displayWidth = this.canvas.width;
    this.groundLayer.displayHeight = this.canvas.height;

    this.groundLayer.setCollisionByProperty({ colisiona: true });
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
    renderTexture.setTint(0x5050b0);
  
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
    this.scene.start('nightchange', { noche: this.noche, itemList: this.itemList });
  }

  createObjectsFromTilemap(){

    let offsetX = this.canvas.width / this.tilemapIniWidth;
    let offsetY = this.canvas.height / this.tilemapIniHeight;

    this.guards = this.map.createFromObjects('Guardias', {
      gid: 82
    });
    this.guards.map(g => g.x *= offsetX);
    this.guards.map(g => g.y *= offsetY);

    this.patrols = this.map.createFromObjects('Patrullas', {gid: 67});
    this.patrols.map(p => p.x *= offsetX);
    this.patrols.map(p => p.y *= offsetY);
  }
}