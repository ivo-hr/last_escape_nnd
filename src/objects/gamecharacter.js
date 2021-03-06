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

    let grafic = scene.add.sprite(0, 0, sprite, 0);
    grafic.displayWidth = 20;
    grafic.displayHeight = 20;
    super(scene, x, y, grafic);

    this.grafics = grafic;
    this.scene.add.existing(this);
    this.speed = 2;

    this.scene.physics.add.existing(this);

    this.body.width = 20;
    this.body.height = 20;
    //offset del collider para centrarlo en el sprite
    this.body.offset = new Phaser.Math.Vector2(-this.body.width / 2, -this.body.height / 2);

    this.body.setCollideWorldBounds();
  }

  preUpdate(t, dt) {


  }
}