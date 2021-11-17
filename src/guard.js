import GameCharacter from './gamecharacter.js';

export default class Guard extends GameCharacter {
  /** 
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   */
  constructor(scene, x, y) {
    
    super(scene, x, y,'guardtemp');
    
     this.puntos=[
      100,50,
      150,50,
      150,70,
      150,50,
      100,50
    ]
    this.i=0;
    this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1])

  }
  

  
  /**
   * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
   * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
   * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
   * @override
   */
  preUpdate(t,dt) {
    super.preUpdate(t,dt);

    let vector = new Phaser.Math.Vector2( this.puntos[this.i] - this.x, this.puntos[this.i+1] - this.y);
    let distance = vector.length();

    if(distance<=1){
      if(this.i<this.puntos.length-2){
        this.i+=2;
        this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1]);
      }
      else{
      this.i=0;
      this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1]);
      }
    }

    
      
  }
  
}
