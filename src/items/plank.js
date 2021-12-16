import Item from "../item.js";

export default class Plank extends Item {
    /** 
   * Constructor del item
   * @param {Phaser.Scene} scene Escena a la que pertenece el item
   * @param {Player} _player el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
    constructor(scene, _player, x, y) {
        
        super(scene, _player, x, y, true, 'tabla');
        this.setScale(2);
    }

    itemObtained() {

        this.scene.itemList.itemObtained('tabla');
    }
}