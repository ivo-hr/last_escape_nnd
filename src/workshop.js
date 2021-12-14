/**
 * Clase que representa el workshop del juego.
 * El jugador activa  el workshop.
*/
export default class Workshop extends Phaser.GameObjects.Rectangle {
  
    /**
     * Constructor del workshop
     * @param {Phaser.Scene} scene Escena a la que pertenece el workshop
     * @param {Player} player Jugador del juego
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} _width Ancho del workshop
     * @param {number} _height Alto del workshop
     * @param {number} susVar Variación de sospecha
     */
    constructor(scene, player, x, y, _height, _width, susVar) {
        super(scene, x, y);
        this.displayWidth = _width;
        this.displayHeight = _height;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true); //lo añadimos a la física

        this.scene.physics.add.overlap(this, player, () => { 
            if (this.scene.DEBUG) console.log("in Base"); 
            this.scene.susBar.SusIncrease(susVar);
            this.scene.itemList.ShowItemList();
        }); //overlap (actua como el trigger en unity)
    } 
}