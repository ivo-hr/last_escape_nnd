//import Item from "./item";

/**
 * Clase que representa la lista de objetos
*/
export default class ItemList extends Phaser.GameObjects.Sprite {

    /**
     * Constructor de la barra
     * @param {Phaser.Scene} scene Escena a la que pertenece la barra
     * @param {number} hx Coordenada x escondida (hiddenX)
     * @param {number} sx Coordenada x mostrada (shownX)
     * @param {number} y Coordenada y
     * @param {number} _width Ancho de la lista
     * @param {number} _height Alto de la lista
     * @param {object} items Items recogidos y por recoger
     */
    constructor(scene, hx, sx, y, _height, _width) {
        super(scene, hx, y, 'itemlist');

        //this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, 'itemlist');
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, ' ');

        this.displayWidth = _width;
        this.displayHeight = _height;

        this.hiddenX = hx;
        this.shownX = sx

        this.setDepth(10);

        this.opened = false;

        this.items = { tablas: 0, cruz: false, pala: false, sierra: false, clavos: false, martillo: false, bisagras: false };

        this.input = this.scene.input.keyboard.addKey('L');

        this.input.on('down', this.ShowItemList, this);
        this.input.on('up', this.ShowItemList, this);
    }

    ShowItemList() {

        let show = this.scene.tweens.add({
            targets: [this],
            x: this.shownX,
            duration: 100,
            ease: 'Back.easeOut',
            paused: false
        });

        this.opened = true;

        if (this.scene.DEBUG) console.log("opening menu");
    }

    HideItemList() {

        let hide = this.scene.tweens.add({
            targets: [this],
            x: this.hiddenX,
            duration: 100,
            ease: 'Back.easeOut',
            paused: false
        });

        this.opened = false;

        if (this.scene.DEBUG) console.log("closing menu");
    }
}   