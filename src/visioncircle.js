/**
 * Clase que contiene el círculo usado para implementar la visión del jugador
*/
export default class VisionCircle extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del Círculo
     * @param {Phaser.Scene} scene Escena del juego
     * @param {number} circleRadius Radio del círculo
     */
    constructor(scene, circleRadius) {
        super(scene, 0, 0);
        this.scene.add.existing(this);

        this.scene.physics.add.existing(this); //lo añadimos a la física
        this.body.setCircle(circleRadius);
        let offset = 15-circleRadius; //corrección de 15px para el offset
        this.body.offset = new Phaser.Math.Vector2(offset, offset);
        
        this.body.onOverlap = true;
    } 
}