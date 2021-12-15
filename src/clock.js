
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
        this.angle = 45;
        this.scene.add.existing(this);
    }

    /**
     * Actualiza la rotación del reloj en función del tiempo transcurrido en escena
     * @param {*} t 
     * @param {*} dt 
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        //Porcentaje del tiempo transcurrido de la noche
        let nightPercent = (this.scene.timer.getElapsed() / 180000) * 100;
        //Cambio del ángulo en función del porcentaje de tiempo transcurrido
        this.angle = nightPercent * 180 / 100;

        //if (this.scene.DEBUG) console.log ("clockrotation: " + this.angle);
    }
}   