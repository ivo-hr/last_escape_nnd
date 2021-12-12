
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
        this._initialWidth = _width; //ancho completo de la barra

        //El sprite que se dibuja por encima para mejor UI
        this.overlay = this.scene.add.image(this.x, this.y, 'susOverlay', 0);
        this.overlay.setOrigin(0, 0.5);
        this.overlay.displayHeight = _height + 10;
        this.overlay.displayWidth = this._initialWidth + 5;
        this.overlay.setVisible(true);
        this.overlay.setDepth(11);
        this.setDepth(10);
        this.setOrigin(0, 0.5);

        this.scene.add.existing(this);

        
        this.suspicion = 0; //sospecha (valor de 0 a 100)
        this.displayWidth = this.suspicion * this._initialWidth / 100; //ajusta el ancho para que sea relativo a la sospecha
    }
    /**
     * Incrementa la sospecha según un incremento dado
     * @param {number} incr Incremento de la sospecha
     */
    SusIncrease(incr){

        if ((incr > 0 && this.suspicion < 100) || (incr < 0 && this.suspicion > 0)) {
            this.suspicion += incr * 10/(this.suspicion + 1);
        }
        else if (this.suspicion >= 100) {
            //this.scene.lostNight();
            this.scene.nightEnd();
        }
        this.displayWidth = this.suspicion * this._initialWidth / 100;  //ajusta el ancho para que sea relativo a la sospecha

        //cambio de tinte de la barra
        this.tintBottomLeft = 0x00ff00;
        this.tintBottomRight = 0xff0000;
        this.tintTopLeft = 0x00ff00;
        this.tintTopRight = 0xff0000;

        //debug
        if (this.scene.DEBUG) console.log("Sus level:" + this.suspicion);
    }
}   