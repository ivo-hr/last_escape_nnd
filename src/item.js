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
   * @param {number} scale Para saber la escala del item para que se puedan diferenciar los grandes y pequeños de momento
   * @param {boolean} bigItem booleano para saber si es item grande o no
   * @param {boolean} picked booleano para saber si el objeto ha sido recogido por el jugador
   */
    constructor(scene, _player, x, y, scale, bigItem){
        super(scene, x, y, 'itemtemp');

        this.player = _player;
        this.picked = false;
        this.setScale(scale);
        this.scene.add.existing(this);
        this.setInteractive();//esto hace que pueda recibir eventos del raton
        this.scene.items.add(this);//lo añade al grupo de items de la escena

        this.pointer = this.scene.input.activepointer;

        //esto es lo que hace cuando se pulsa un boton del raton
        this.on('pointerdown', pointer => {
            
            //hacemos este vector para saber la distancia entre el jugador y el item
            let vector = new Phaser.Math.Vector2(this.player.x - this.x, this.player.y - this.y);
            
            //comprueba que el boton que se ha pulsado es el click izquierdo del raton
            if(vector.length() <= 50 && pointer.leftButtonDown()){
                
                //si el objeto no es grande de momento se suma puntos al score y se elimina el item
                //cuando este creada la lista de objetos en el juego se marcara el objeto pequeño recogido
                if(bigItem == false){
                    this.player.point();
                    this.destroy();
                }

                //si el objeto es grande se modificara el booleano picked para que lo lleve el jugador o lo suelte 
                //nota: proponer una mejor manera para dropear el item ya que es complicado coger los pequeños sin soltar el grande
                //en el proceso, ¿Usar barra espaciadora, pulsar la rueda del raton o hacer un boton en la escena para soltarlo?
                //tambien proponer que cuando se recoja el objeto que en vez de estar moviendose con el jugador que en el HUD se
                //muestre el objeto que lleva o cambiar el sprite del jugador a uno que lleva algo que represente un objeto generico
                else if(bigItem == true){
                    if(this.picked == false && !this.player.isCarrying()){
                        this.picked = true;
                        this.player.toggleCarrying();
                    }
                }
            }
        });

        //evento para soltar el objeto
        this.scene.input.on('pointerdown', pointer =>{
            if(this.picked == true && this.player.isCarrying() && pointer.middleButtonDown()){
                this.picked = false;
                this.player.toggleCarrying();
                console.log("DROPPED");
            }
        });

    }
    
    /**
     * Método preUpdate de Phaser. En este caso controla el movimiento del objeto para que vaya con el jugador
     * @param {*} t 
     * @param {*} dt 
     */
    preUpdate(t, dt){
        super.preUpdate(t, dt);

        //si el objeto ha sido cogido entonces se ira moviendo con el jugador hasta que lo suelte el jugador
        if(this.picked == true){
            this.setPosition(this.player.x, this.player.y);
        }
    }
    
}