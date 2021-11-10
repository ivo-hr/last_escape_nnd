/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {
  
  /**
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    super(scene, x, y, 'playertemp');
    this.setScale(0.5);
    this.scene.matter.add.gameObject(this);
    
    this.setBody({
      type: 'rectangle',
      width: this.width/2,
      height: this.height/2,
    });

    this.score = 0;
    this.scene.add.existing(this);
    this.speed = 5;
    // Esta label es la UI en la que pondremos la puntuación del jugador
    this.label = this.scene.add.text(10, 10, "");
    //this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.pointer = this.scene.input.activePointer;

    this.updateScore();
  }

  /**
   * El jugador ha recogido una estrella por lo que este método añade un punto y
   * actualiza la UI con la puntuación actual.
   */
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
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    if(this.pointer.isDown){

      let x = this.pointer.worldX - this.x;
      let y = this.pointer.worldY - this.y;

      //vector desde el jugador al ratón
      let vectorMov = new Phaser.Math.Vector2(x, y);
      
      //si está a menos de 5 de distancia se queda quieto
      if(vectorMov.length() >= 5){
      vectorMov.normalize();

      this.x += this.speed * vectorMov.x;
      this.y += this.speed * vectorMov.y;

      //rotación del sprite
      this.setRotation(vectorMov.angle() + Phaser.Math.PI2/4);
      }
    }

  }

}
