

export default class GameCharacter extends Phaser.GameObjects.Container {
  
    /**
     * Constructor del jugador y enemigos
     * @param {Phaser.Scene} scene Escena a la que pertenecen los personajes
     * @param {Phaser.GameObjects.Group} wallGroup Grupo de las paredes
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, wallGroup, x, y, sprite) {
      
      let grafic = scene.add.sprite(0, 0, sprite);
      super(scene, x, y, grafic);

      this.scene.add.existing(this);
      this.speed = 5;

      this.scene.physics.add.existing(this);
      //offset del collider para centrarlo en el sprite
      this.body.offset = new Phaser.Math.Vector2(-this.body.halfWidth, -this.body.halfHeight);
      
      this.scene.physics.add.collider(this, wallGroup);
      this.body.setCollideWorldBounds();
    }
    
    /**
     * Método que mueve al personaje en un vector determinado
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
      //super.preUpdate(t,dt);
    }

}