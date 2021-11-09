/**
 * Clase que representa los muros o paredes del juego. Los muros tienen tamaño variable.
 * El jugador colisiona con los muros.
*/
export default class Wall extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del Muro
     * @param {Phaser.Scene} scene Escena a la que pertenece el muro
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} _width Ancho del muro
     * @param {number} _height Alto del muro
     */
    constructor(scene, x, y, _height, _width) {
      super(scene, x, y, 'wall');
      this.displayWidth = _width;
      this.displayHeight = _height;
      this.scene.add.existing(this);
      this.scene.matter.add.existing(this, true);
      
      this.setBody({
          type: 'rectangle',
          width: _width,
          height: _height,
      });
    }
  
  }