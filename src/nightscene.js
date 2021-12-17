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

    this.player = new Player(this, 100, 300);

    this.createTilemap();
    this.createObjectsFromTilemap();

    //bool que indica si el juego esta en debug
    this.DEBUG = true;

    //graphics usados para el debug del raycast
    this.graphics = this.add.graphics({ lineStyle: { width: 1, color: 0x00ff00}, fillStyle: { color: 0xff00ff } });

    //this.guard = new Guard(this, 75, 200, +0.3, true);

    this.physics.add.collider(this.player, this.groundLayer);
    
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

    this.backgroundLayer.displayHeight *= 4;
    this.backgroundLayer.displayWidth *= 4;
    this.groundLayer.displayHeight *= 4;
    this.groundLayer.displayWidth *= 4;

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

    let offsetX = 4;
    let offsetY = 4;

    this.loadObjectTilemap(this.map, 'Objetos', 81, ({ x, y, props }) => {

      let plank = new Plank(this, this.player, x, y);
      plank.x *= offsetX;
      plank.y *= offsetY;
    });
    this.loadObjectTilemap(this.map, 'Objetos', 76, ({ x, y, props }) => {

      let cross = new Cross(this, this.player, x, y);
      cross.x *= offsetX;
      cross.y *= offsetY;
    });
    this.loadObjectTilemap(this.map, 'Objetos', 77, ({ x, y, props }) => {

      let hammer = new Hammer(this, this.player, x, y);
      hammer.x *= offsetX;
      hammer.y *= offsetY;
    });
    this.loadObjectTilemap(this.map, 'Objetos', 73, ({ x, y, props }) => {

      let hinge = new Hinge(this, this.player, x, y);
      hinge.x *= offsetX;
      hinge.y *= offsetY;
    });
    this.loadObjectTilemap(this.map, 'Objetos', 75, ({ x, y, props }) => {

      let nails = new Nails(this, this.player, x, y);
      nails.x *= offsetX;
      nails.y *= offsetY;
    });
    this.loadObjectTilemap(this.map, 'Objetos', 78, ({ x, y, props }) => {

      let shovel = new Shovel(this, this.player, x, y);
      shovel.x *= offsetX;
      shovel.y *= offsetY;
    });
    this.loadObjectTilemap(this.map, 'Objetos', 80, ({ x, y, props }) => {

      let saw = new Saw(this, this.player, x, y);
      saw.x *= offsetX;
      saw.y *= offsetY;
    });

    this.patrullas = this.map.createFromObjects('Patrulla', {gid: 67});
    this.patrullas.map(p => p.x *= offsetX);
    this.patrullas.map(p => p.y *= offsetY)

    this.loadObjectTilemap(this.map, 'Guardias', 82, ({ x, y, props }) => {

      let guard = new Guard(this, x, y, props.isHighSecurity);
      guard.x *= offsetX;
      guard.y *= offsetY;

      for (let i = 0; i < this.patrullas.length; i++){

        if (this.patrullas[i].getData('guardia') === props.nGuardia) {
          
          guard.insertPatrolPoint(this.patrullas[i].getData('punto'), this.patrullas[i].x, this.patrullas[i].y);
        }
      }

      guard.startPatrol();
    });
  }

  loadObjectTilemap (mapa, capa, gid, callback) {
    const objetos = mapa.getObjectLayer(capa).objects.filter(x => x.gid === gid)
    for (const objeto of objetos) {
      const props = {}
      if (objeto.properties) {
        for (const { name, value } of objeto.properties) {
          props[name] = value
        }
      }
      callback({ x: objeto.x, y: objeto.y, props })
    }
  }
}