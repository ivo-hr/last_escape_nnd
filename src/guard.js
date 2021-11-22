import GameCharacter from './gamecharacter.js';
import VisionCircle from './visioncircle.js';

export default class Guard extends GameCharacter {
  /** 
   * Constructor del jugador
   * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
   * @param {number} x Coordenada X
   * @param {number} y Coordenada Y
   * @param {number} susVar Variación de sospecha
   */
  constructor(scene, x, y, susVar) {
    
    super(scene, x, y,'guardtemp');
    
    //z-index, el guardia se renderiza en el "nivel" 1
    this.setDepth(1);

    this.puntos=[
      100,50,
      300,50,
      300,250,
      300,50,
      100,50
    ]
    this.i=0;
    this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1]);

    //rotacion del guardia
    let vector = new Phaser.Math.Vector2( this.puntos[this.i] - this.x, this.puntos[this.i+1] - this.y);
    this.setRotation(vector.angle());

    this.visionRadius = 200;

    this.visionCircle = new VisionCircle(this.scene, this.visionRadius)
    this.add(this.visionCircle);

    let rangeSprite = this.scene.add.sprite(0, 0, 'guardrange');
    rangeSprite.displayWidth *= 3.5;
    rangeSprite.displayHeight *= 3.1;
    rangeSprite.setOrigin(0, 0.5);
    rangeSprite.setAlpha(0.5);
    rangeSprite.setDepth(0);
    this.add(rangeSprite);

    this.scene.physics.add.collider(this, this.scene.player);
    this.body.setImmovable();

    //angulo de vision del guardia
    this.visionAngle = 60;
    this.scene.physics.add.overlap(this.visionCircle, this.scene.player, (o1, o2) => {

      //callback que se ejecuta cuando el jugador entra dentro del circulo de vision del guardia

      let vector = new Phaser.Math.Vector2(o2.x - this.x, o2.y - this.y); //vector desde el guardia al jugador

      let vectorAngle = Phaser.Math.RadToDeg(vector.angle());
      if (vectorAngle > 180) vectorAngle -= 360;

      let guardAngle = this.angle;
      //corrección de ángulo cuando se acerca a 180 o -180
      if ((guardAngle + 180 < 5) && vectorAngle > 0) guardAngle = 180;
      if ((guardAngle + 180 < 5) && vectorAngle < 0) guardAngle = -180;
      let angle = vectorAngle - guardAngle; //angulo del vector respecto a la direccion en la que mira el guardia

      //comprueba si está dentro de su angulo de vision
      if(Math.abs(angle) < this.visionAngle/2) {
      
        console.log(this.angle);
        console.log(Phaser.Math.RadToDeg(vector.angle()));
        //creamos un rayo con origen en el guardia y que apunte al jugador
        let ray = this.scene.raycaster.createRay({
          origin: {
            x: this.x,
            y: this.y
          },
          angle: vector.angle(),
          detectionRange: vector.length 
        });
        //interseccion con el raycast
        let intersection = ray.cast();

        //si no choca ve al jugador
        if (!intersection.object || !ray.boundsInRange(intersection.object)) {
          console.log("veo al jugador");
          this.scene.susBar.SusIncrease(susVar);
        }
        //debug: dibujamos el rayo en pantalla
        if (this.scene.DEBUG){

          //this.scene.graphics.clear();
          this.scene.graphics.lineStyle(1, 0x00ff00, 1);
          let line = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, intersection.x, intersection.y);
          this.scene.graphics.fillPoint(ray.origin.x, ray.origin.y, 3)
          this.scene.graphics.strokeLineShape(line);
        }

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
        
        //rotacion del guardia
        vector = new Phaser.Math.Vector2( this.puntos[this.i] - this.x, this.puntos[this.i+1] - this.y);
        this.setRotation(vector.angle());
      }
      else{
        this.i=0;
        this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1]);

        //rotacion del guardia
        vector = new Phaser.Math.Vector2( this.puntos[this.i] - this.x, this.puntos[this.i+1] - this.y);
        this.setRotation(vector.angle());
      }
    }

    //this.drawVisionArc();

    if (this.scene.DEBUG) this.scene.graphics.clear();
  }

  /** 
   * Dibuja el arco de la visión
   * @param 
   */
  drawVisionArc(){

    this.scene.graphics.clear();
    this.scene.graphics.beginPath();
    this.scene.graphics.lineStyle(4, 0xff00ff, 1);

    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    this.scene.graphics.arc(this.x, this.y, this.visionRadius, Phaser.Math.DegToRad(this.angle + 30), Phaser.Math.DegToRad(this.angle - 30), true);
    this.scene.graphics.strokePath();
  }
  
}
