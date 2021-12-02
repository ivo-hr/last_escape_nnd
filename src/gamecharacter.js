/**
 * Clase que hace de base para los personajes del juego: los guardias y el jugador. Es un contenedor para poder añadir objetos.
 */
export default class GameCharacter extends Phaser.GameObjects.Container {
  
    /**
     * Constructor del jugador y enemigos
     * @param {Phaser.Scene} scene Escena a la que pertenecen los personajes
     * @param {Phaser.GameObjects.Group} wallGroup Grupo de las paredes
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, sprite) {
      
      let grafic = scene.add.sprite(0, 0, sprite);
      super(scene, x, y, grafic);

      this.scene.add.existing(this);
      this.speed = 5;

      this.scene.physics.add.existing(this);

      //offset del collider para centrarlo en el sprite
      this.body.offset = new Phaser.Math.Vector2(-this.body.halfWidth, -this.body.halfHeight);
      
      this.body.setCollideWorldBounds();
    }

    preUpdate(t,dt) {
      //posiblemente innecesario
    }

}