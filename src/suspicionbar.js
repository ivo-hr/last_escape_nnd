
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
    constructor(scene, x, y, _height, _width) {
        super(scene, x, y, 'susbar');

        this.displayWidth = _width;
        this.displayHeight = _height;

        this.overlay = new Phaser.GameObjects.Sprite(scene, 0, 0, 'susOverlay');
        this.overlay.displayHeight = _height;
        this.overlay.displayWidth = this._initialWidth;
        
        this.setDepth(100);
        this.setOrigin(0, 0.5);

        this.scene.add.existing(this);

        this._initialWidth = _width; //ancho completo de la barra
        this.suspicion = 0; //sospecha (valor de 0 a 100)
        this.displayWidth = this.suspicion * this._initialWidth / 100; //ajusta el ancho para que sea relativo a la sospecha
    } 
    overlay
    /**
     * Incrementa la sospecha según un incremento dado
     * @param {number} incr Incremento de la sospecha
     */
    SusIncrease(incr){

        if ((incr > 0 && this.suspicion < 100) || (incr < 0 && this.suspicion > 0)) {
            this.suspicion += incr;
        }
        else if (this.suspicion >= 100) {
            //this.scene.lostNight();
            this.scene.nightEnd();
        }
        this.displayWidth = this.suspicion * this._initialWidth / 100;  //ajusta el ancho para que sea relativo a la sospecha

        //cambio de tinte de la barra (WIP)
        //this.tint = this.tint + this.suspicion * 0.01 * 0x00ff00;

        //debug
        if (this.scene.DEBUG) console.log("Sus level:" + this.suspicion);
    }
}   