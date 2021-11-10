import Star from './star.js';
import GameCharacter from './gamecharacter.js';

//export default class Guard extends Phaser.GameObjects.Sprite {
  export default class Guard extends GameCharacter {
  /*
    Constructor del jugador
    @param {Phaser.Scene} scene Escena a la que pertenece el jugador
    @param {number} x Coordenada X
    @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    /*
    super(scene, x, y, 'playertemp');
    this.setScale(0.5);
    this.score = 0;
    this.scene.add.existing(this);
    this.speed = 5;*/
    
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    this.pointer = this.scene.input.activePointer;




    //this.updateScore();
    let path = new Path2D(10,10);
    path.lineTo(50, 20);
    path.lineTo(20, 30);
    path.lineTo(40, 50);
    
  }
  

  
  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

   // if(this.pointer.isDown){

      let x = 10;
      let y = 0;

      //vector desde el jugador al ratón
      let vectorMov = new Phaser.Math.Vector2(x, y);
      if(this.x>=300||this.x<=0){
        x=-x;
      }
      //si está a menos de 5 de distancia se queda quieto
      if(vectorMov.length() >= 0){
      vectorMov.normalize();

      this.x += this.speed * vectorMov.x;
      this.y += this.speed * vectorMov.y;
     
      

      //rotación del sprite
      this.setRotation(vectorMov.angle() + Phaser.Math.PI2/4);
      //path.getPoint(this.t,this.dt);
      

      }
    //}

  }
  
}
