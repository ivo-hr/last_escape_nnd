

export default class Item extends Phaser.GameObjects.Sprite {
    /** 
   * Constructor del item
   * @param {Phaser.Scene} scene Escena a la que pertenece el item
   * @param {Player} player el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
    constructor(scene, x, y){
        super(scene, x, y, 'itemtemp');

        this.setScale(0.2);
        this.scene.add.existing(this);
        this.setInteractive();

        this.pointer = this.scene.input.activepointer;

        this.on('pointerdown', pointer => {
            let vector = new Phaser.Math.Vector2(player.x - this.x, player.y - this.y);
            if(vector.length() <= 10){
                player.point();
                this.destroy();
            }
        });

    }
    
    
    
}