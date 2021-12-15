//import Item from "./item";

/**
 * Clase que representa la lista de objetos
*/
export default class ItemList extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de la lista de objetos
     * @param {Phaser.Scene} scene Escena a la que pertenece la barra
     * @param {number} hiddenX Coordenada x escondida
     * @param {number} shownX Coordenada x mostrada
     * @param {number} y Coordenada y
     * @param {number} _width Ancho de la lista
     * @param {number} _height Alto de la lista
     * @param {object} items Items recogidos y por recoger
     */
    constructor(scene, listConfig) {

        super(scene, listConfig.hiddenX, listConfig.y, 'itemlist');

        this.scene.add.existing(this);

        this.text = new Phaser.GameObjects.Text(scene, 0, 0, 'pito');

        this.displayWidth = listConfig.width;
        this.displayHeight = listConfig.height;

        this.hiddenX = listConfig.hiddenX;
        this.shownX = listConfig.shownX;

        this.setDepth(10);

        this.opened = false;
        
        this.playingTween = false;

        this.items = { tablas: 0, cruz: false, pala: false, sierra: false, clavos: false, martillo: false, bisagras: false };

        this.input = this.scene.input.keyboard.addKey('L');

        this.input.on('down', this.toggleList, this);
    }

    toggleList(){

        if(!this.playingTween){

            if(this.opened) this.hideItemList();
            else this.showItemList();
        }
    };

    /**
     * Método que muestra la lista en pantalla y reproduce el tween de esta
     */
    showItemList() {

        this.playingTween = true;

        let show = this.scene.tweens.add({
            targets: [this, this.text],
            x: this.shownX,
            duration: 800,
            ease: 'Back.easeOut',
            paused: false
        });

        show.on('complete', this.hasStoppedPlaying, this);

        this.opened = true;

        if (this.scene.DEBUG) console.log("opening list");
    }

    /**
     * Método que oculta la lista y reproduce el tween de esta
     */
    hideItemList() {

        this.playingTween = true;

        let hide = this.scene.tweens.add({
            targets: [this],
            x: this.hiddenX,
            duration: 600,
            ease: 'Back.easeOut',
            paused: false
        });

        hide.on('complete', this.hasStoppedPlaying, this);

        this.opened = false;

        if (this.scene.DEBUG) console.log("closing list");
    }

    hasStoppedPlaying(){

        this.playingTween = false;
    }
}   