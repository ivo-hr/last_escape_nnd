

export default class GameCharacter extends Phaser.GameObjects.Sprite {
  
    /**
     * Constructor del jugador y enemigos
     * @param {Phaser.Scene} scene Escena a la que pertenecen los personajes
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y, sprite) {
      super(scene, x, y, sprite);

      //this.score = 0;
      this.scene.add.existing(this);
      this.speed = 5; //Modificar desde las clases hijas?

    }
    

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