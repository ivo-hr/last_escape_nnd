

export default class GameCharacter extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador y enemigos
     * @param {Phaser.Scene} scene Escena a la que pertenecen los personajes
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, sprite) {
      super(scene, x, y, sprite);

      this.scene.add.existing(this);
      this.speed = 5;

      this.scene.matter.add.gameObject(this);
    
      //collider del character
      this.setBody({
        type: 'rectangle',
        width: this.width,
        height: this.height,
      });

    }
    
    /**
     * Método que mueve al personaje a un punto determinado
     * @param {number} x Coordenada X del punto destino
     * @param {number} y Coordenada Y del punto destino
     */
    moveTo(x, y) {

      let vectorMov = new Phaser.Math.Vector2(x, y);
          
      //si está a menos de 5 de distancia se queda quieto
      if(vectorMov.length() >= 5) {

      vectorMov.normalize();

      this.x += this.speed * vectorMov.x;
      this.y += this.speed * vectorMov.y;

      //rotación del sprite
      this.setRotation(vectorMov.angle() + Phaser.Math.PI2/4);
      }
    }

    preUpdate(t,dt) {
      super.preUpdate(t,dt);  
    }

}