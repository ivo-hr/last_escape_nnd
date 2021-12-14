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

    super(scene, x, y, 'guard');

    //z-index, el guardia se renderiza en el "nivel" 1
    this.setDepth(1);

    //array de puntos de la patrulla del guardia
    this.puntos = [
      75, 50,
      650, 50,
      650, 720,
      75, 720,
      75, 50
    ]
    this.i = 0; //índice que recorre los puntos de la patrulla

    //movimiento hacia el primer punto
    this.scene.physics.moveTo(this, this.puntos[this.i], this.puntos[this.i + 1]);

    //rotación del guardia
    this.ajustGuardRotation();

    //radio de visión del guardia
    this.visionRadius = 100;

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
    this.scene.physics.add.overlap(this.visionCircle, this.scene.player, (o1, o2) => { this.checkInRange(o1, o2) });
    this.scene.physics.add.overlap(this.visionCircle, this.scene.items, (o1, o2) => { this.checkInRange(o1, o2) });

    this.interrogation = this.scene.add.image(this.x, this.y, 'interrogacion');
    this.interrogation.setOrigin(0.5, 1);
    this.interrogation.setScale(4);
    this.interrogation.setDepth(4);

    this.exclamation = this.scene.add.image(this.x, this.y, 'exclamacion');
    this.exclamation.setOrigin(0.5, 1);
    this.exclamation.setScale(4);
    this.exclamation.setDepth(4);

    this.interrogationIsPlaying = false;
    this.exclamationIsPlaying = false;

    this.interrogation.setVisible(false);
    this.exclamation.setVisible(false);
  }

  /**
   * Método preUpdate de Phaser. En este caso se encarga de controlar que el guardia llegue a su punto destino 
   * para cambiar al siguiente de la guardia.
   * Además controla la rotación del sprite del guardia
   * @param {*} t 
   * @param {*} dt 
   */
  preUpdate(t, dt) {
    super.preUpdate(t, dt);

    let vector = new Phaser.Math.Vector2(this.puntos[this.i] - this.x, this.puntos[this.i + 1] - this.y);
    let distance = vector.length();

    if (distance <= 1) {
      if (this.i < this.puntos.length - 2) {
        this.i += 2;
        this.scene.physics.moveTo(this, this.puntos[this.i], this.puntos[this.i + 1]);

        this.ajustGuardRotation();
      }
      else {
        this.i = 0;
        this.scene.physics.moveTo(this, this.puntos[this.i], this.puntos[this.i + 1]);

        this.ajustGuardRotation();
      }
    }

    if (this.playerIsDetected && (!this.playerIsInRange || !this.scene.physics.overlap(this.visionCircle, this.scene.player))) {

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
   * Corrige la rotación del guardia para que mire a la dirección de su destino
   */
  ajustGuardRotation() {

    let vector = new Phaser.Math.Vector2(this.puntos[this.i] - this.x, this.puntos[this.i + 1] - this.y);
    this.setRotation(vector.angle());
  }

  /**
   * Dibuja el arco de la visión (para ajustar sprites)
   */
  drawVisionArc() {

    this.scene.graphics.clear();
    this.scene.graphics.beginPath();
    this.scene.graphics.lineStyle(4, 0xff00ff, 1);

    // arc (x, y, radius, startAngle, endAngle, anticlockwise)
    this.scene.graphics.arc(this.x, this.y, this.visionRadius, Phaser.Math.DegToRad(this.angle + 30), Phaser.Math.DegToRad(this.angle - 30), true);
    this.scene.graphics.strokePath();
  }

  /**
   * Método que calcula el ángulo de un vector de forma relativa a la dirección de un objeto dado, en grados
   * @param {Phaser.Math.Vector2} vector Vector del que se quiere calcular el ángulo
   * @param {Phaser.GameObjects} origin Objeto origen respecto al que calcular el ángulo
   * @returns {number} Ángulo calculado
   */
  overlapAngle(vector, origin) {

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
    let angle = vectorAngle - guardAngle; //angulo del vector respecto a la dirección del objeto de origen

    return angle;
  }

  /**
   * Método que crea el sprite del cono de visión del guardia, realiza sus ajustes y lo añade a su contenedor
   * @param {Phaser.GameObjects.Container} guard Guardia al que añadir el sprite
   */
  createVisionConeSprite(guard) {

    let visionConeSprite = this.scene.add.sprite(0, 0, 'guardrange');

    //ajustes de escala
    visionConeSprite.displayWidth *= 1.6;
    visionConeSprite.displayHeight *= 1.5;

    visionConeSprite.setOrigin(0, 0.5); //origen en el centro-izquierda
    visionConeSprite.setAlpha(0.5);
    visionConeSprite.setDepth(0); //se dibuja bajo el guardia

    guard.add(visionConeSprite);
  }

  /**
   * Comprueba si el objeto o2 esta en el rango de vision
   * @param {Phaser.GameObjects} o1 
   * @param {Phaser.GameObjects} o2 
   */
  checkInRange(o1, o2) {

    let vector = new Phaser.Math.Vector2(o2.x - this.x, o2.y - this.y); //vector desde el guardia al objeto

    //ángulo del objeto respecto al guardia
    let playerAngle = this.overlapAngle(vector, this);

    //comprueba si está dentro de su angulo de vision
    if (Math.abs(playerAngle) < this.visionAngle / 2) {

      if (o2 === this.scene.player) {
        
        this.playerIsInRange = true;
        
        //debug
        if (this.scene.DEBUG) {

          console.log("veo al jugador");
        }

        if (this.scene.player.isCarrying()) {

          this.playerDetected();
        }
      }

      else if (!o2.isPicked()) {
        //debug
        if (this.scene.DEBUG) {

          console.log("veo un item");
        }

        if (!this.playerIsDetected){
          
          this.itemDetected(o2);
        }

        else this.playerDetected();
      }
    }

    else if (o2 === this.scene.player) this.playerIsInRange = false;
  }

  /**
   * Método que sube la sospecha cuando el jugador es detectado y activa el tween de la interrogación
   */
  playerDetected() {

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
   * Método que devuelve el item a su lugar al ser detectado y activa el tween de la exclamación
   * @param {Item} item Objeto que será devuelto a su lugar inicial
   */
  itemDetected(item) {

    this.stop();

    if (!this.exclamationIsPlaying) {

      this.activateExclamationTween(item);
      this.exclamationIsPlaying = true;
    }
  }

  /**
   * Método que para al guardia
   */
  stop() {

    this.body.setVelocityX(0);
    this.body.setVelocityY(0);
  }

  /**
   * Método que reanuda la patrulla del guardia
   */
  continuePatrol() {

    this.interrogation.setVisible(false);
    this.interrogationIsPlaying = false;
    this.susIncreaseEnabled = false;

    this.exclamation.setVisible(false);
    this.exclamationIsPlaying = false;

    this.scene.physics.moveTo(this, this.puntos[this.i], this.puntos[this.i + 1]);
  }

  /**
   * Método que crea el tween de la interrogación y hace que la interrogación aparezca sobre el guardia
   */
  activateInterrogationTween() {

    this.interrogation.x = this.x;
    this.interrogation.y = this.y + 30;

    this.interrogation.setVisible(true);

    //tween que se reproduce al aparecer la interrogación cuando el guardia ve al jugador
    let interrogationTween = this.scene.tweens.add({
      targets: [this.interrogation],
      y: this.interrogation.y - 50,
      duration: 100,
      ease: 'Back.easeOut',
      paused: false
    });

    interrogationTween.on('complete', this.activateSusIncrease, this);
  }

  /**
   * Método que crea el tween de la exclamación y devuelve el item especificado a su posición inicial cuando acaba el tween
   * @param {Item} item Objeto que será devuelto a su lugar inicial
   */
  activateExclamationTween(item) {

    this.exclamation.x = this.x;
    this.exclamation.y = this.y + 30;

    this.exclamation.setVisible(true);

    //tween que se reproduce al aparecer la exclamación cuando el guardia ve un objeto
    let exclamationTween = this.scene.tweens.add({
      targets: [this.exclamation],
      y: this.exclamation.y - 50,
      duration: 100,
      ease: 'Back.easeOut',
      paused: false
    });

    exclamationTween.on('complete', item.returnItemToIni, item);

    let timer = this.scene.time.addEvent({

      delay: 1000, //1s
      callback: this.continuePatrol,
      callbackScope: this 
    });
  }

  /**
   * Método que permite que el guardia suba la barra de sospecha
   */
  activateSusIncrease() {

    this.susIncreaseEnabled = true;
  }
}
