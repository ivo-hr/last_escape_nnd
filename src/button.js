/**
 * Clase que representa al botón del menú de inicio del juego
 */
export default class Button extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del botón
     * @param {*} scene Escena a la que pertenece el menú
     * @param {*} config Configuración del botón (x, y)
     */
    constructor(scene, config) {

        super(scene, config.x, config.y, 'playbutton');

        this.scene.add.existing(this);

        this.setInteractive();
        this.on('pointerdown', this.onDown, this);
        this.on('pointerover', this.onOver, this);
        this.on('pointerout', this.onExitOver, this);
    }

    /**
     * Método que se ejecuta al poner el puntero sobre el botón
     */
    onOver(){

        this.setTint(0x999999);
    }

    /**
     * Método que se ejecuta al sacar el puntero del botón
     */
    onExitOver(){

        this.setTint(0xffffff);
    }

    /**
     * Método que se ejecuta cuando el botón ha sido pulsado
     */
    onDown(){

        this.scene.events.emit('buttonPressed');
    }

}