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

        this.setDepth(10);
        //this.setOrigin(0, 0.5);


        //this.scene.add(this.sprite);
        //this.scene.add(this.text);
        //this.scene.add.existing(this);

        

        
        this.opened = false;

        this.items = {tablas: 0, cruz: false, pala: false, sierra: false, clavos: false, martillo: false, bisagras: false};
        
        let show = this.scene.tweens.add({
            targets: this,
            x: sx,
            ease: 'Back',
            easeParams: [1.5],
            delay: 500
            })
        let hide = this.scene.tweens.add({
            targets: this,
            x: hx,
            ease: 'Back',
            easeParams: [1.5],
            delay: 500
        })

        let input = this.scene.input.keyboard.addKey('L');

        if (input.isDown)
        {
            console.log("Tab pressed!");
            this.opened = !this.opened;
            if (this.opened){
                
                show.restart();
            }
            else{
                hide.on;
            }
        }
    }

    ShowItemList()
    {
        this.opened = !this.opened;
            if (this.opened){
                console.log("opening menu");
                show.restart();
            }
            else{
                console.log("closing menu");
                hide.on;
            }
    }
}   