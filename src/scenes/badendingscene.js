/**
 * Escena que se usa para cambiar de noche en el juego.
 * @extends Phaser.Scene
 */
export default class NightChange extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'badending' });
  }

  init(datos) {
    this.noche = datos.noche;
    if (datos.itemData) {
      this.itemData = datos.itemData;
    }
  }
  /**
     * Creación de la escena. Tan solo contiene el texto que indica la noche que toca a continuación
     * @override
     */
  create() {

    //Si es la primera noche, esto es el menú ppal

    //Imagen del menú ppal
    var mainmenu = this.add.image(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 2, 'badEnd', 0);
    mainmenu.displayHeight = document.getElementById("mainCanvas").height;
    mainmenu.displayWidth = document.getElementById("mainCanvas").width;

    let text = this.add.text(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 4 * 2.5, 'Final Malo', { fontFamily: 'HelpMe', fontSize: 32, color: '#f00' });
    text.setOrigin(0.5, 0.5);  // Colocamos el pivote en el centro de cuadro de texto 
    text.setAlign('center');

    text = this.add.text(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 4 * 3, 'El sepulturero ha muerto de viejo, ahora nadie puede ayudarte a escapar de la carcel', { fontFamily: 'HelpMe' });
    text.setOrigin(0.5, 0.5);  // Colocamos el pivote en el centro de cuadro de texto 
    text.setAlign('center');

    text = this.add.text(document.getElementById("mainCanvas").width / 2, document.getElementById("mainCanvas").height / 2, 'LAST ESCAPE', { font: "70px HelpMe" });
    text.setOrigin(0.5, 0.5);  // Colocamos el pivote en el centro de cuadro de texto 
    text.setAlign('center');  // Centramos el texto dentro del cuadro de texto



    let timer = this.time.addEvent({
       delay: 500, //0.5s
       callback: this.activateListener,
       callbackScope: this 
     });
  }

  /**
   * Método llamado desde el evento del timer que activa el listener pasado medio segundo
   */
  activateListener() {

    this.input.keyboard.on('keydown', function (event) {
      this.scene.start('menuscene');
    }, this);
    this.input.on('pointerdown', function (event) {
      this.scene.start('menuscene');
    }, this);
  }
}