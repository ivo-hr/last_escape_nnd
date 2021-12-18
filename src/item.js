import Player from "./player.js";

/**
 * Clase que representa los objetos del juego. Pueden ser grandes o pequeños, siendo los grandes transportables
 */
export default class Item extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del item
   * @param {Phaser.Scene} scene Escena a la que pertenece el item
   * @param {Player} _player el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {boolean} bigItem booleano para saber si es item grande o no
   * @param {string} sprite Sprite que usa el item
   */
    constructor(scene, _player, x, y, bigItem, sprite) {
        super(scene, x, y, sprite);

        //está por encima de la máscara de visión
        this.setDepth(3);

        this.saveInitialPosition();

        this.isBig = bigItem;
        this.player = _player;
        this.picked = false;
        this.scene.add.existing(this);
        this.setInteractive();//esto hace que pueda recibir eventos del raton
        this.scene.physics.add.existing(this);
        this.safeSound = this.scene.sound.add("leftInShop");
        this.pointer = this.scene.input.activepointer;

        //esto es lo que hace cuando se pulsa un boton del raton
        this.on('pointerdown', pointer => {

            //hacemos este vector para saber la distancia entre el jugador y el item
            let vector = new Phaser.Math.Vector2(this.player.x - this.x, this.player.y - this.y);

            //comprueba que el boton que se ha pulsado es el click izquierdo del raton
            if (vector.length() <= 50 && pointer.leftButtonDown()) {

                //si el objeto no es grande de momento se suma puntos al score y se elimina el item
                //cuando este creada la lista de objetos en el juego se marcara el objeto pequeño recogido
                if (!this.isBig) {
                    this.itemObtained();
                    this.destroy();
                }

                //si el objeto es grande se modificara el booleano picked para que lo lleve el jugador
                else if (this.isBig) {
                    if (!this.picked && !this.player.isCarrying()) {
                        this.picked = true;
                        this.player.toggleCarrying();
                        //con esto se añade al container del jugador para que lo lleve
                        this.player.add(this);
                        this.setPosition(0, 0);
                    }
                }
            }
        });

        //evento para soltar el objeto
        this.scene.input.on('pointerdown', pointer => {
            if (this.picked && this.player.isCarrying() && pointer.middleButtonDown()) {
                this.picked = false;
                this.player.toggleCarrying();
                //con esto se quita del container del jugador y se pone en la posicion del jugador
                this.player.remove(this);
                this.setPosition(this.player.x, this.player.y);
                console.log("DROPPED");
                //si esta dentro del workshop suma puntos de momento y se elimina 
                this.scene.physics.add.overlap(this, this.scene.workshop, () => {
                    if (!this.picked) {
                        console.log("item dropped in base");
                        this.itemObtained();
                        this.safeSound.play();
                        this.destroy();
                    }
                });
            }
        });
    }

    /**
     * Método que guarda la posición inicial del objeto en 2 variables
     */
    saveInitialPosition() {
        this.iniX = this.x;
        this.iniY = this.y;
    }

    /**
     * Método que devuelve si el item está siendo llevado por el jugador
     * @returns {boolean} Si el jugador lleva el item
     */
    isPicked() {

        return this.picked;
    }

    /**
     * Método que devuelve el item a su posición incial
     */
    returnItemToIni() {

        this.x = this.iniX;
        this.y = this.iniY;
    }

    isBigItem(){

        return this.isBig;
    }
}