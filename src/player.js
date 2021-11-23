import GameCharacter from './gamecharacter.js';
import VisionCircle from './visioncircle.js';
/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends GameCharacter {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {bool} carry Booleano para saber si esta llevando un item encima o no para evitar llevar varios objetos grandes a la vez
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'playertemp');
    this.setScale(0.5);

    //z-index, el jugador se renderiza en el "nivel" 2
    this.setDepth(2);
    this.score = 0;

    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    
    //this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.pointer = this.scene.input.activePointer;

    this.visionRadius = 400;

    let visionCircle = new VisionCircle(this.scene, this.visionRadius);
    this.add(visionCircle);

    this.updateScore();

    this.carry = false;//empieza con el booleano de llevar objetos en falso

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

  point() {
    this.score++;
    this.updateScore();
  }

  /**
   * Actualiza la UI con la puntuación actual
   */
  updateScore() {
    this.label.text = 'Score: ' + this.score;
  }

  //Cambia el booleano carrying cuando coge o deja un objeto
  carrying() {
    if(this.carry == false){
      this.carry = true;
    }
    else if(this.carry == true) {
      this.carry = false;
    }
    console.log("Cambiando el carry")
  }

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    //si el click derecho esta pulsado el jugador se mueve hacia el cursor
    if(this.pointer.rightButtonDown()){

      let x = this.pointer.worldX;
      let y = this.pointer.worldY;

      let vector = new Phaser.Math.Vector2(x - this.x, y - this.y);

      this.setRotation(vector.angle() + Phaser.Math.PI2/4);
      let distance = vector.length();

      if (distance > 5) this.scene.physics.moveTo(this, x, y, 60*this.speed);
      else {
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
      }
    }
  }

}
