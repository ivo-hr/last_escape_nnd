import GameCharacter from './gamecharacter.js';
import VisionCircle from './visioncircle.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo con el click derecho del ratón.
 * También almacena el número de objetos conseguidos.
 */
export default class Player extends GameCharacter {

  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    //z-index, el jugador se renderiza en el "nivel" 2
    this.setDepth(2);

    //this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.pointer = this.scene.input.activePointer;

    this.visionRadius = 200;

    //círculo de visión del jugador
    this.visionCircle = new VisionCircle(this.scene, this.visionRadius);
    this.add(this.visionCircle);

    this.spotlight = this.scene.make.image({
      x: this.x,
      y: this.y,
      key: 'mask',
      add: false
    });

    this.spotlight.setOrigin(0.5);

    let spotlightScale = [1, 0.8, 0.6, 0.4, 0.2];
    this.visionCircle.setScale(spotlightScale[this.scene.noche - 1]);
    this.spotlight.scale = spotlightScale[this.scene.noche - 1];

    this.pickupSfx = this.scene.sound.add("pickup");

    this.carrying = false;//empieza con el booleano de llevar objetos en falso

    //creamos las animaciones del jugador
    scene.anims.create({
      key: 'idle',
      frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 0 }),
      repeat: 0
    });
    scene.anims.create({
      key: 'moving',
      frames: scene.anims.generateFrameNumbers('player', { start: 1, end: 4 }),
      frameRate: 7,
      repeat: -1
    });

    //eventos para parar al jugador
    this.scene.input.on('pointerup', () => {
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
    });
    this.scene.input.on('pointerupoutside', () => {
      this.body.setVelocityX(0);
      this.body.setVelocityY(0);
    });
  }

  /**
   * Cambia el booleano carrying cuando coge o deja un objeto
   */
  toggleCarrying() {

    this.carrying = !this.carrying;
    this.pickupSfx.play();
    if (this.scene.DEBUG) console.log("Cambiando el carrying")
  }

  /**
   * Método que devuelve si el jugador esta cargando un objeto
   * @returns {boolean} Si lleva (true) o no (false) un objeto grande
   */
  isCarrying() {

    return this.carrying;
  }

  /**
   * Método que controla si la animación es parada o en movimiento
   */
  animsManager() {

    if (this.body.newVelocity.x == 0 && this.body.newVelocity.y == 0) {
      this.grafics.play('idle', true);
    }
    else {
      this.grafics.play('moving', true);
    }
  }

  /**
   * Métodos preUpdate de Phaser. Se encarga del movimiento del jugador y rotar su sprite en la direccion del movimiento.
   * @param {*} t 
   * @param {*} dt 
   */
  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    //si el click derecho esta pulsado el jugador se mueve hacia el cursor
    if (this.pointer.rightButtonDown()) {

      //coordenadas del puntero
      let x = this.pointer.worldX;
      let y = this.pointer.worldY;

      //vector de movimiento
      let vector = new Phaser.Math.Vector2(x - this.x, y - this.y);

      //rotación del sprite
      this.setRotation(vector.angle() + Phaser.Math.PI2 / 4);

      //distancia hasta el cursor
      let distance = vector.length();

      //si la distancia es mayor a 5 se mueve, si no para
      if (distance > 5) {
        if (!this.carrying)
          this.scene.physics.moveTo(this, x, y, 60 * this.speed);
        else
          this.scene.physics.moveTo(this, x, y, 60 / 2 * this.speed);
        //this.play('moving', true);
        //this.spritePlayer.play('moving', true);
      }
      else {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
      }
    }

    //movimiento del círculo de visión
    this.spotlight.x = this.x;
    this.spotlight.y = this.y;

    //comprobacion de las animaciones
    this.animsManager();
  }

}
