import Player from '../objects/player.js';
import Guard from '../objects/guard.js';
import SuspicionBar from '../objects/suspicionbar.js';
import Workshop from '../objects/workshop.js';
import ItemList from '../objects/itemList.js';
import Clock from '../objects/clock.js';

import Hammer from '../items/hammer.js';
import Saw from '../items/saw.js';
import Plank from '../items/plank.js';
import Cross from '../items/cross.js';
import Nails from '../items/nails.js';
import Hinge from '../items/hinge.js';
import Shovel from '../items/shovel.js';
import Item from '../objects/item.js';
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
    if (datos.itemData) {
      this.itemData = datos.itemData;
    } 
  }

  /**
   * Creación de los elementos de la escena principal de juego
   */
  create() {

    this.canvas = document.getElementById("mainCanvas");

    this.nightDuration = 120000; //2 min de duracion

    let listConfig = {
      shownX: this.canvas.width/2,
      hiddenX: this.canvas.width * 1.5,
      y: this.canvas.height/2,
      height: 700,
      width: 500
    };
    this.itemList = new ItemList(this, listConfig);

    if (this.itemData) {
      
      this.itemList.changeItemData(this.itemData);
      this.itemList.updateListText();
    }

    this.createTilemap();

    this.items = this.physics.add.group();

    this.createNonTilemapObjects();
    this.createObjectsFromTilemap();

    //bool que indica si el juego esta en debug
    this.DEBUG = false;
    
    this.physics.add.collider(this.player, this.groundLayer);
    
    //esto es lo que hace que no haya context menu en el juego al pulsar click derecho
    this.input.mouse.disableContextMenu();

    this.createRenderTexture();

    //Banda sonora
    this.music = this.sound.add("MainTh");
    this.music.setLoop(true);
    this.music.setVolume(0.2);
    this.music.play();
    //timer de la noche
    this.timer = this.time.addEvent({
      delay: this.nightDuration,
      
      callback: this.nightEnd,
      callbackScope: this 
    });
  }

  /**
   * Método que crea los objetos que no están incluidos en el tilemap
   */
  createNonTilemapObjects() {
    
    this.player = new Player(this, 200, 200);
    
    let barConfig = {
      x: 10,
      y: 50,
      height: 35,
      width: 250,
      susVar: 0.6
    };
    this.susBar = new SuspicionBar(this, barConfig);

    let workshopConfig = {
      x: 175,
      y: 190,
      height: 140,
      width: 300
    };
    this.workshop = new Workshop(this, workshopConfig);

    let clockConfig = {
      x: 260,
      y: 35,
      height: 70,
      width: 70,
      nightDuration: this.nightDuration
    };
    this.clock = new Clock(this, clockConfig);
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

    let width = this.canvas.width;
	  let height = this.canvas.height;

    let renderTexture = this.make.renderTexture({
      width,
      height
    }, true);

    //lo creamos un nivel encima del resto de objetos
    renderTexture.setDepth(4);

    //dibujamos el mapa vacío en el redertexture
    renderTexture.draw(this.backgroundLayer);
    renderTexture.draw(this.groundLayer);

    //cambiamos el tinte a uno mas oscuro
    renderTexture.setTint(0x5050b0);

    //máscara
    renderTexture.mask = new Phaser.Display.Masks.BitmapMask(this, this.player.spotlight);
    renderTexture.mask.invertAlpha = true;
  }

  /**
   * Método que cambia de noche a la siguiente
   */
  nightEnd() {
        
    if (this.DEBUG) console.log("acaba la noche");
    this.music.stop();
    this.noche++;
    if(this.noche<=5&&!this.itemList.completo)
    this.scene.start('nightchange', { noche: this.noche, itemData: this.itemList.getItemData() });
    else if(this.noche>5){
      this.music.stop();
      this.scene.start('badending', { noche: this.noche, itemData: this.itemList.getItemData() });
    }
  }

  /**
   * Método que crea todos los objetos del tilemap
   */
  createObjectsFromTilemap(){

    this.scale = 4;

    if (!this.itemList.itemIsObtained('tabla')) this.loadObjectTilemap(this.map, 'Objetos', 81, ({ x, y, props }) => {

      let plank = new Plank(this, this.player, x, y);
      this.configureItem(plank);
    });
    if (!this.itemList.itemIsObtained('cruz')) this.loadObjectTilemap(this.map, 'Objetos', 76, ({ x, y, props }) => {

      let cross = new Cross(this, this.player, x, y);
      this.configureItem(cross);
    });
    if (!this.itemList.itemIsObtained('martillo')) this.loadObjectTilemap(this.map, 'Objetos', 77, ({ x, y, props }) => {

      let hammer = new Hammer(this, this.player, x, y);
      this.configureItem(hammer);
    });
    if (!this.itemList.itemIsObtained('bisagras')) this.loadObjectTilemap(this.map, 'Objetos', 73, ({ x, y, props }) => {

      let hinge = new Hinge(this, this.player, x, y);
      this.configureItem(hinge);
    });
    if (!this.itemList.itemIsObtained('clavos')) this.loadObjectTilemap(this.map, 'Objetos', 75, ({ x, y, props }) => {

      let nails = new Nails(this, this.player, x, y);
      this.configureItem(nails);
    });
    if (!this.itemList.itemIsObtained('pala')) this.loadObjectTilemap(this.map, 'Objetos', 78, ({ x, y, props }) => {

      let shovel = new Shovel(this, this.player, x, y);
      this.configureItem(shovel);
    });
    if (!this.itemList.itemIsObtained('sierra')) this.loadObjectTilemap(this.map, 'Objetos', 80, ({ x, y, props }) => {

      let saw = new Saw(this, this.player, x, y);
      this.configureItem(saw);
    });

    this.patrullas = this.map.createFromObjects('Patrulla', {gid: 67});
    this.patrullas.map(p => this.repositionObject(p));

    this.loadObjectTilemap(this.map, 'Guardias', 82, ({ x, y, props }) => {

      let guard = new Guard(this, x, y, props.isHighSecurity);
      this.repositionObject(guard);

      for (let i = 0; i < this.patrullas.length; i++){

        if (this.patrullas[i].getData('guardia') === props.nGuardia) {
          
          guard.insertPatrolPoint(this.patrullas[i].getData('punto'), this.patrullas[i].x, this.patrullas[i].y);
        }
      }

      guard.startPatrol();
    });
  }

  /**
   * Método que configura los parámetros del item creado
   * @param {Item} item Objeto a ser configurado
   */
  configureItem(item) {

    this.repositionObject(item);
    this.correctItemPosition(item);
    this.items.add(item);
  }

  /**
   * Método que reposiciona un objeto dado según el escalado del tilemap
   * @param {Phaser.GameObject} object Objeto a ser reposicionado
   */
  repositionObject(object) {
    object.x *= this.scale;
    object.y *= this.scale;
  }

  /**
   * Método que corrige la posición del objeto dado para que cuadre con el tilemap
   * @param {item} item Objeto a corregir su posición 
   */
  correctItemPosition(item) {
    item.x += item.displayWidth/2;
    item.y -= item.displayHeight/2;
    item.saveInitialPosition();
  }

  /**
   * Método que carga los objetos del tilemap de una capa determinada dado su Gid
   * @param {*} mapa Mapa del cual cargar objetos
   * @param {*} capa Capa a la que pertenece el objeto
   * @param {*} gid Gid del objeto a cargar
   * @param {*} callback Callback a ejecutar tras cargarlo
   */
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

  changeToEnd(){
    this.music.stop();
    if(this.noche < 4){
      this.scene.start('goodending', { noche: this.noche, itemData: this.itemList.getItemData() });
    }
    else if(this.noche >= 4){
      this.scene.start('neutralending', { noche: this.noche, itemData: this.itemList.getItemData() });
    }
  }
}