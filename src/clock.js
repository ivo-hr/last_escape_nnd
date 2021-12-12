
/**
 * Clase que representa el reloj, en forma de sprite
*/
export default class Clock extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la barra
     * @param {Phaser.Scene} scene Escena a la que pertenece el reloj
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} _width Ancho del reloj
     * @param {number} _height Alto del reloj
     */
    constructor(scene, x, y, _height, _width) {
        super(scene, x, y, 'clock');

        this.displayWidth = _width;
        this.displayHeight = _height;

        this.setDepth(10);
        this.angle = 90;
        this.scene.add.existing(this);
    }
    /**
     * Rotará el reloj en función del tiempo
     * @param {number} currTime Tiempo actual
     * @param {number} nightDur Duración de la noche
     */
    ClockTime(currTime, nightDur)
    {
        let movPercent = (currTime/nightDur) * 100;

        this.angle = movPercent * 100/180;

        if (this.scene.DEBUG) console.log ("clockrotation: " + this.angle);
    }
}   