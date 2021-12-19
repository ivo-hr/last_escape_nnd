/**
 * Escena que se usa para cambiar de noche en el juego.
 * @extends Phaser.Scene
 */
export default class NeutralEnding extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'neutralending' });
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
      var mainmenu = this.add.image(document.getElementById("mainCanvas").width/2, document.getElementById("mainCanvas").height/2, 'mainMenu', 0);
      mainmenu.displayHeight = document.getElementById("mainCanvas").height;
      mainmenu.displayWidth = document.getElementById("mainCanvas").width;
      this.add.text(document.getElementById("mainCanvas").width/2, document.getElementById("mainCanvas").height/4 * 3, 'Final Neutro'+'\nLograste escapar dentro del ataud, siendo enterrada junto a otra persona\n esperando a que el sepulturaro te desentierre,pero...\n es el sepulturero el ', {fontFamily:'HelpMe'})
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center')
      //Título del juego
      this.add.text(document.getElementById("mainCanvas").width/2, document.getElementById("mainCanvas").height/2, 'LAST ESCAPE', {font: "70px HelpMe"})
        .setOrigin(0.5, 0.5)  // Colocamos el pivote en el centro de cuadro de texto 
        .setAlign('center')
        ;  // Centramos el texto dentro del cuadro de texto

    
    
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
      this.scene.start('night1', { noche: this.noche, itemList: this.itemList });
    }, this);
    this.input.on('pointerdown', function (event) { 
      this.scene.start('night1', { noche: this.noche, itemData: this.itemData });
    }, this);
  }
}