
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
        
        this.scene.add.existing(this);

        this._initialWidth = _width;
        this.suspicion = 0;
        this.displayWidth = this.suspicion * this._initialWidth / 100;

        //this.anchor.set(0, 0);

        //const image = super.add.image(_height, _width, 'susbar');
    } 

    SusIncrease(incr){

        if (this.suspicion < 100)
        this.suspicion += incr;

        this.displayWidth = this.suspicion * this._initialWidth / 100;

        this.tint = this.suspicion * 3 * 0xffffff;

        console.log("Sus level:" + this.suspicion);
        
        
    }
}   