
/**
 * Clase que representa la barra de sospecha, en forma de sprite
*/
export default class ItemList extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor de la barra
     * @param {Phaser.Scene} scene Escena a la que pertenece la barra
     * @param {number} hx Coordenada x escondida (hiddenX)
     * @param {number} y Coordenada y
     * @param {number} _width Ancho de la barra
     * @param {number} _height Alto de la barra
     */
    constructor(scene, hx, sx, y, _height, _width) {
        super(scene, x, y, 'itemlist');

        this.displayWidth = _width;
        this.displayHeight = _height;

        this.setDepth(10);
        this.setOrigin(0, 0.5);

        this.scene.add.existing(this);
        this.tab = this.scene.input.keyboard;
        this.opened = false;


        this.on('keydown', tab =>{
            
            if (tab.on('keydown-tab', ))
            this.opened = !this.opened

            if (this.opened){
                this.tweens.add({
                    targets: this,
                    x: sx,
                    ease: 'Back',
                    easeParams: [1.5],
                    delay: 500
                })
            }
            else{
                this.tweens.add({
                    targets: this,
                    x: hx,
                    ease: 'Back',
                    easeParams: [1.5],
                    delay: 500
                })
            }
        })
    }
}   