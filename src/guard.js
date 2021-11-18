import GameCharacter from './gamecharacter.js';
import VisionCircle from './visioncircle.js';

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
      300,50,
      300,250,
      300,50,
      100,50
    ]
    this.i=0;
    this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1]);

    this.visionRadius = 200;

    this.visionCircle = new VisionCircle(this.scene, this.visionRadius)
    this.add(this.visionCircle);

    //angulo de vision del guardia
    this.visionAngle = 60;
    this.scene.physics.add.overlap(this.visionCircle, this.scene.player, (o1, o2) => {

      //callback que se ejecuta cuando el jugador entra dentro del circulo de vision del guardia

      let vector = new Phaser.Math.Vector2(o2.x - this.x, o2.y - this.y); //vector desde el guardia al jugador

      let angle = Phaser.Math.RadToDeg(vector.angle()) - this.angle; //angulo del vector respecto a la direccion en la que mira el guardia

      //comprueba si está dentro de su angulo de vision
      if(Math.abs(angle) < this.visionAngle/2 || Math.abs(angle) > 360 - this.visionAngle/2) {
        console.log("veo al jugador");
      }
    });
  }
  
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
