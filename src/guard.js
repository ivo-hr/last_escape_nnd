import GameCharacter from './gamecharacter.js';
import VisionCircle from './visioncircle.js';

/**
 * Clase del guardia. Realiza una patrulla determinada y aumenta la sospecha si ve al jugador llevando un objeto grande.
 */
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

    //array de puntos de la patrulla del guardia
    this.puntos=[
      75,50,
      650,50,
      650,720,
      75,720,
      75,50
    ]
    this.i=0; //índice que recorre los puntos de la patrulla

    //movimiento hacia el primer punto
    this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1]);

    //rotacion del guardia
    let vector = new Phaser.Math.Vector2( this.puntos[this.i] - this.x, this.puntos[this.i+1] - this.y);
    this.setRotation(vector.angle());

    //radio de visión del guardia
    this.visionRadius = 200;

    //círculo de visión del guardia
    this.visionCircle = new VisionCircle(this.scene, this.visionRadius);
    this.add(this.visionCircle);

    //creamos el sprite del cono de visión
    this.createVisionConeSprite(this);

    this.scene.physics.add.collider(this, this.scene.player);
    this.body.setImmovable();

    //bool que indica si el guardia ha detectado al jugador
    this.playerIsDetected = false;

    this.playerIsInRange = false;

    this.susIncreaseEnabled = false;
    this.susIncrement = susVar;

    //angulo de vision del guardia
    this.visionAngle = 60;
    this.scene.physics.add.overlap(this.visionCircle, this.scene.player, (o1, o2) => { this.checkPlayerInRange(o1, o2) });

    this.interrogation = this.scene.add.image(this.x, this.y, 'interrogacion', 0);
    this.interrogation.setOrigin(0.5, 1);
    this.interrogation.setScale(4);
    this.interrogation.setDepth(4);

    this.interrogationIsPlaying = false;

    this.interrogation.setVisible(false);
  }
  
  /**
   * Método preUpdate de Phaser. En este caso se encarga de controlar que el guardia llegue a su punto destino 
   * para cambiar al siguiente de la guardia.
   * Además controla la rotación del sprite del guardia
   * @param {*} t 
   * @param {*} dt 
   */
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

    if(this.playerIsDetected && (!this.playerIsInRange || !this.scene.physics.overlap(this.visionAngle, this.scene.player))) {
      
      let timer = this.scene.time.addEvent({
        delay: 2000, //2s
        callback: this.continuePatrol,
        callbackScope: this 
      });

      this.playerIsInRange = false;
      this.playerIsDetected = false;
    }

    //this.drawVisionArc();

    if (this.scene.DEBUG) this.scene.graphics.clear();
  }

  /**
   * Dibuja el arco de la visión (para ajustar sprites)
   */
  drawVisionArc(){

    this.scene.graphics.clear();
    this.scene.graphics.beginPath();
    this.scene.graphics.lineStyle(4, 0xff00ff, 1);

    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    this.scene.graphics.arc(this.x, this.y, this.visionRadius, Phaser.Math.DegToRad(this.angle + 30), Phaser.Math.DegToRad(this.angle - 30), true);
    this.scene.graphics.strokePath();
  }

  /**
   * Método que crea un raycast dado un ángulo y el rango de detección de este
   * @param {number} _angle Ángulo que tendrá el raycast, en radianes
   * @param {number} _detectionRange Radio del cículo de detección del raycast
   * @returns {Raycaster.Ray} Raycast creado
   */
  createRaycast(_angle, _detectionRange){

    //creamos un rayo con origen en el guardia y que apunte al jugador
    let ray = this.scene.raycaster.createRay({
      origin: {
        x: this.x,
        y: this.y
      },
      angle: _angle,
      detectionRange: _detectionRange
    });

    return ray
  }
  
  /**
   * Dibuja el raycast dado este y su intersección
   * @param {Raycaster.Ray} ray Rayo a dibujar
   * @param {Phaser.Geom.Point} intersection Punto de intersección del rayo
   */
  drawRaycast(ray, intersection){

    this.scene.graphics.clear();
    this.scene.graphics.lineStyle(1, 0x00ff00, 1);
    let line = new Phaser.Geom.Line(ray.origin.x, ray.origin.y, intersection.x, intersection.y);
    this.scene.graphics.fillPoint(ray.origin.x, ray.origin.y, 3)
    this.scene.graphics.strokeLineShape(line);
  }

  /**
   * Método que calcula el ángulo de un vector de forma relativa a la dirección de un objeto dado, en grados
   * @param {Phaser.Math.Vector2} vector Vector del que se quiere calcular el ángulo
   * @param {Phaser.GameObjects} origin Objeto origen respecto al que calcular el ángulo
   * @returns {number} Ángulo calculado
   */
  overlapAngle(vector, origin){

    let vectorAngle = Phaser.Math.RadToDeg(vector.angle());
      if (vectorAngle > 180) vectorAngle -= 360;

      let guardAngle = origin.angle;
      //corrección de ángulo cuando se acerca a 180 o -180
      if (guardAngle > 0) {
        if ((guardAngle - 180 > -5) && (guardAngle - 180 < 5) && vectorAngle > 0) guardAngle = 180;
        if ((guardAngle - 180 > -5) && (guardAngle - 180 < 5) && vectorAngle < 0) guardAngle = -180;
      }
      if (guardAngle < 0) {
        
        if ((guardAngle + 180 > -5) && (guardAngle + 180 < 5) && vectorAngle > 0) guardAngle = 180;
        if ((guardAngle + 180 > -5) && (guardAngle + 180 < 5) && vectorAngle < 0) guardAngle = -180;
      }
      let angle = vectorAngle - guardAngle; //angulo del vector respecto a la direccion del objeto de origen

      return angle;
  }

  /**
   * Método que crea el sprite del cono de visión del guardia, realiza sus ajustes y lo añade a su contenedor
   * @param {Phaser.GameObjects.Container} guard Guardia al que añadir el sprite
   */
  createVisionConeSprite(guard){

    let visionConeSprite = this.scene.add.sprite(0, 0, 'guardrange');

    //ajustes de escala
    visionConeSprite.displayWidth *= 3.5;
    visionConeSprite.displayHeight *= 3.1;
    
    visionConeSprite.setOrigin(0, 0.5); //origen en el centro-izquierda
    visionConeSprite.setAlpha(0.5);
    visionConeSprite.setDepth(0); //se dibuja bajo el guardia
    
    guard.add(visionConeSprite);
  }

  /**
   * Comprueba si el jugador esta en el rango de vision
   * @param {Phaser.GameObjects} o1 
   * @param {Phaser.GameObjects} o2 
   */
  checkPlayerInRange(o1, o2) {

    let vector = new Phaser.Math.Vector2(o2.x - this.x, o2.y - this.y); //vector desde el guardia al jugador

    //ángulo del jugador respecto al guardia
    let playerAngle = this.overlapAngle(vector, this);

    //comprueba si está dentro de su angulo de vision
    if(Math.abs(playerAngle) < this.visionAngle/2) {
    
      this.playerIsInRange = true;

      let ray = this.createRaycast(vector.angle(), vector.lenght);
      
      //interseccion con el raycast
      let intersection = ray.cast();

      //si el rayo colisiona con el jugador lo esta viendo
      if (intersection.object === this.scene.player) {
        //debug
        if (this.scene.DEBUG) {

          console.log("veo al jugador");
        }

        if (this.scene.player.isCarrying()) {

          this.playerDetected();
        } 
      }

      //debug: dibujamos el rayo en pantalla
      if (this.scene.DEBUG) {

        this.drawRaycast(ray, intersection);
      }
    }
    
    else this.playerIsInRange = false;
  }

  /**
   * Método que sube la sospecha cuando el jugador es detectado y activa el tween de la interrogacion
   */
  playerDetected(){

    if (!this.playerIsDetected) {
      
      this.playerIsDetected = true;
    }
    
    this.stop();

    if (!this.interrogationIsPlaying) {
      
      this.activateInterrogationTween();
      this.interrogationIsPlaying = true;
    }

    if (this.susIncreaseEnabled) {
      
      this.scene.susBar.SusIncrease(this.susIncrement);
    }
  }

  /**
   * Método que para al guardia
   */
  stop(){

    this.body.setVelocityX(0);
    this.body.setVelocityY(0);
  }

  /**
   * Método que reanuda la patrulla del guardia
   */
  continuePatrol(){

    if (!this.scene.DEBUG) console.log("reanudada la patrulla");

    this.interrogation.setVisible(false);
    this.interrogationIsPlaying = false;
    this.susIncreaseEnabled = false;

    this.scene.physics.moveTo(this,this.puntos[this.i],this.puntos[this.i+1]);
  }

  /**
   * 
   */
  activateInterrogationTween(){

    this.interrogation.x = this.x;
    this.interrogation.y = this.y + 30;

    this.interrogation.setVisible(true);
    
    //tween que se reproduce al aparecer la interrogacion cuando el guardia ve al jugador
    let interrogationTween = this.scene.tweens.add({
      targets: [ this.interrogation ],
      y: this.interrogation.y - 50,
      duration: 100,
      ease: 'Back.easeOut',
      paused: false
    });

    interrogationTween.on('stop', this.activateSusIncrease);
  }

  /**
   * Método que permite que el guardia suba la barra de sospecha
   */
  activateSusIncrease(){

    this.susIncreaseEnabled = true;
  }
}
