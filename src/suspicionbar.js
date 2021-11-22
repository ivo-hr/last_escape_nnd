
/**
 * Clase que representa la barra de sospecha, en forma de sprite
*/
export default class SuspicionBar extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la barra
     * @param {Phaser.Scene} scene Escena a la que pertenece la barra
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} _width Ancho de la barra
     * @param {number} _height Alto de la barra
     */
    constructor(scene, x, y, _height, _width) {
        super(scene, x, y, 'susbar');
        this.displayWidth = _width;
        this.displayHeight = _height;
        this.setDepth(10);
        this.setOrigin(0, 0.5);
        this.scene.add.existing(this);

        this._initialWidth = _width;
        this.suspicion = 0;
        this.displayWidth = this.suspicion * this._initialWidth / 100;
    } 

    /**
     * Incrementa la sospecha según un incremento dado
     * @param {number} incr Incremento de la barra
     */
    SusIncrease(incr){

        if ((incr > 0 && this.suspicion < 100) || (incr < 0 && this.suspicion > 0))
        this.suspicion += incr;

        this.displayWidth = this.suspicion * this._initialWidth / 100;

        //this.tint = this.tint + this.suspicion * 0.01 * 0x00ff00;

        console.log("Sus level:" + this.suspicion);
    }
}   