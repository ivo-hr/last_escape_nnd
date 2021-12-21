import Item from "../objects/item.js";

export default class Shovel extends Item {
    /** 
   * Constructor del item
   * @param {Phaser.Scene} scene Escena a la que pertenece el item
   * @param {Player} _player el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
    constructor(scene, _player, x, y) {
        
        super(scene, _player, x, y, true, 'pala');
        this.setScale(2);
    }

    /**
     * Método que devuelve si el item ha sido recogido
     * @returns {boolean} Si el item ha sido recogido o no
     */
    itemObtained() {

        this.scene.itemList.itemObtained('pala');
    }
}