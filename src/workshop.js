/**
 * Clase que representa el workshop del juego.
 * El jugador activa  el workshop.
*/
export default class Workshop extends Phaser.GameObjects.Rectangle {
  
    /**
     * Constructor del workshop
     * @param {Phaser.Scene} scene Escena a la que pertenece el workshop
     * @param {number} x Coordenada x
     * @param {number} y Coordenada y
     * @param {number} height Alto del workshop
     * @param {number} width Ancho del workshop
     * @param {number} susVar Variación de sospecha
     */
    constructor(scene, workshopConfig) {
        super(scene, workshopConfig.x, workshopConfig.y);
        
        this.displayWidth = workshopConfig.width;
        this.displayHeight = workshopConfig.height;

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this, true); //lo añadimos a la física

        this.scene.physics.add.overlap(this, this.scene.player, () => { 
            if (this.scene.DEBUG) console.log("in Base"); 
            this.scene.susBar.SusIncrease(workshopConfig.susVar);
        }); //overlap (actua como el trigger en unity)
    } 
}