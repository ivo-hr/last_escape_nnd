import Boot from './scenes/boot.js';
import MenuScene from './scenes/menuscene.js';
import Night1 from './scenes/night1.js';
import NightChange from './scenes/nightchangescene.js';
import BadEnding from './scenes/badendingscene.js';
import GoodEnding from './scenes/goodendingscene.js'
import NeutralEnding from './scenes/neutralendingscene.js'

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.WEBGL,
    canvas: document.getElementById("mainCanvas"),
    width: 360 * 4,
    height: 224 * 4,
    backgroundColor: '#708090',
    scale: {
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot, MenuScene, Night1, NightChange, BadEnding, GoodEnding, NeutralEnding],

    //configuracion de fisicas arcade
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
};

new Phaser.Game(config);