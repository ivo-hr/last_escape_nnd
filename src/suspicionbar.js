
/**
 * Clase que representa la barra de sospecha, en forma de sprite
*/
export default class SuspicionBar extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la barra
     * @param {Phaser.Scene} scene Escena a la que pertenece la barra
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} height Alto de la barra
     * @param {number} width Ancho de la barra
     * @param {number} susVar Variación de la sospecha cuando el jugador es detectado por un guardiaa
     */
    constructor(scene, barConfig) {
        super(scene, barConfig.x, barConfig.y, 'susbar');

        this.displayWidth = barConfig.width;
        this.displayHeight = barConfig.height;
        this._initialWidth = barConfig.width; //ancho completo de la barra

        this.susVariation = barConfig.susVar;

        //El sprite que se dibuja por encima para mejor UI
        this.overlay = this.scene.add.image(this.x, this.y, 'susOverlay', 0);
        this.overlay.setOrigin(0, 0.5);
        this.overlay.displayHeight = barConfig.height + 20;
        this.overlay.displayWidth = this._initialWidth + 10;
        this.overlay.setVisible(true);
        this.overlay.setDepth(11);
        this.setDepth(10);
        this.setOrigin(0, 0.5);
        
        //cambio de tinte de la barra
        this.tint = 0xff5050;

        this.scene.add.existing(this);

        this.upSusSfx = this.scene.sound.add("susIncrSound");
        this.upSusSfx.setVolume(0.05);
        this.downSusSfx = this.scene.sound.add("susDecrSound");
        this.downSusSfx.setVolume(0.05);

        this.suspicion = 0; //sospecha (valor de 0 a 100)
        this.displayWidth = this.suspicion * this._initialWidth / 100; //ajusta el ancho para que sea relativo a la sospecha
    }
    /**
     * Método que incrementa la sospecha según el incremento
     */
    susIncrease(){

        if ((this.susVariation > 0 && this.suspicion < 100) || (this.susVariation < 0 && this.suspicion > 0)) {
            this.suspicion += this.susVariation * 10/(this.suspicion + 1);
        }
        else if (this.suspicion >= 100) {
            //this.scene.lostNight();
            this.scene.nightEnd();
        }
        this.displayWidth = this.suspicion * this._initialWidth / 100;  //ajusta el ancho para que sea relativo a la sospecha

        //cambio de tinte de la barra
        this.tint = 0xff5050;
        
        this.upSusSfx.play();

        //debug
        if (this.scene.DEBUG) console.log("Sus level:" + this.suspicion);
    }

    /**
     * Método que decrementa la sospecha una décima parte de la variación de sospecha
     */
    susDecrease(){

        if ((this.susVariation > 0 && this.suspicion > 0) || (this.susVariation < 0 && this.suspicion < 100)) {
            this.suspicion -= this.susVariation/10;
            this.downSusSfx.play();
        }
        else if (this.suspicion >= 100) {
            this.scene.nightEnd();
        }
        this.displayWidth = this.suspicion * this._initialWidth / 100;  //ajusta el ancho para que sea relativo a la sospecha
        
        //debug
        if (this.scene.DEBUG) console.log("Sus level:" + this.suspicion);
    }
}   