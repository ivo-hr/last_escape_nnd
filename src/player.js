import GameCharacter from './gamecharacter.js';
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
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'playertemp');
    this.setScale(0.5);

    this.score = 0;

    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    
    //this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.pointer = this.scene.input.activePointer;

    this.updateScore();
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

  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    //si el click esta pulsado el jugador se mueve hacia el cursor
    if(this.pointer.isDown){

      let x = this.pointer.worldX - this.x;
      let y = this.pointer.worldY - this.y;

      //llamamos al método de movimiento del padre
      super.moveTo(x, y);
    }

  }

}
