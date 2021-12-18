/**
 * Escena que se usa para cambiar de noche en el juego.
 * @extends Phaser.Scene
 */
export default class NightChange extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'nightchange' });
  }

  init(datos) {
    this.noche = datos.noche;
  }
/**
   * Creación de la escena. Tan solo contiene el texto que indica la noche que toca a continuación
   * @override
   */
  create() {
    
    //Si es la primera noche, esto es el menú ppal
    if (this.noche === 1){
      //Imagen del menú ppal
      var mainmenu = this.add.image(document.getElementById("mainCanvas").width/2, document.getElementById("mainCanvas").height/2, 'mainMenu', 0);
      mainmenu.displayHeight = document.getElementById("mainCanvas").height;
      mainmenu.displayWidth = document.getElementById("mainCanvas").width;
      this.add.text(document.getElementById("mainCanvas").width/2, document.getElementById("mainCanvas").height/4 * 3, 'Pulsa cualquier tecla para empezar', {fontFamily:'HelpMe'})
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center')
      //Título del juego
      this.add.text(document.getElementById("mainCanvas").width/2, document.getElementById("mainCanvas").height/2, 'LAST ESCAPE', {font: "70px HelpMe"})
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center')
        ;  // Centramos el texto dentro del cuadro de texto

    }
    //Si no, es cambio de noches
    else {
      this.add.text(document.getElementById("mainCanvas").width/2, document.getElementById("mainCanvas").height/4 * 3, 'Noche ' + this.noche + '\n\nPulsa cualquier tecla para continuar', {fontFamily:'HelpMe'})
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center')
        ;  // Centramos el texto dentro del cuadro de texto
    }

    let timer = this.time.addEvent({
      delay: 500, //0.5s
      callback: this.activateListener,
      callbackScope: this 
    });
  }

  /**
   * Método llamado desde el evento del timer que activa el listener pasado medio segundo
   */
  activateListener(){

    this.input.keyboard.on('keydown', function (event) { 
      this.scene.start('night1', { noche: this.noche });
    }, this);
  }
}