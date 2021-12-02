import Boot from './boot.js';
import End from './end.js';
import Night1 from './night1scene.js';
import NightChange from './nightchangescene.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("mainCanvas"),
    width:  1420,
    height: 800,
    backgroundColor: '#708090',
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    //pixelArt: true,
    scene: [Boot, Night1, NightChange],

    //configuracion de fisicas arcade
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },

    //plugin que permite usar el raycast
    plugins: {
        scene: [
            {
                key: 'PhaserRaycaster',
                plugin: PhaserRaycaster,
                mapping: 'raycasterPlugin'
            }
        ]
    }
};

new Phaser.Game(config);