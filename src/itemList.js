//import Item from "./item";

/**
 * Clase que representa la barra de sospecha, en forma de sprite
*/
export default class ItemList extends Phaser.GameObjects.Container {
  
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
        super(scene, hx, y);

        this.sprite = new Phaser.GameObjects.Sprite(scene, 0, 0, 'itemlist');
        this.text = new Phaser.GameObjects.Text(scene, 0, 0, ' ');
        
        this.displayWidth = _width;
        this.displayHeight = _height;

        this.setDepth(10);
        //this.setOrigin(0, 0.5);


        this.add(this.sprite);
        this.add(this.text);
        this.scene.add.existing(this);

        

        this.tab = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.opened = false;

        this.items = {tablas: 0, cruz: false, pala: false, sierra: false, clavos: false, martillo: false, bisagras: false};
        
        let show = this.tweens.add({
            targets: this,
            x: sx,
            ease: 'Back',
            easeParams: [1.5],
            delay: 500
            })
        let hide = this.tweens.add({
            targets: this,
            x: hx,
            ease: 'Back',
            easeParams: [1.5],
            delay: 500
        })

        if (Phaser.Input.Keyboard.JustDown(this.tab))
        {
            console.log("Tab pressed!");
            this.opened = !this.opened;
            if (this.opened){
                
                show.on;
            }
            else{
                hide;
            }
        }
    }

    ShowItemList()
    {
        console.log("opening menu");
        this.opened = !this.opened;
        this.opened = !this.opened;
            if (this.opened){
                
                this.show();
            }
            else{
                this.hide
            }
    }
}   