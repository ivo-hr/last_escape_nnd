import Boot from './boot.js';
import End from './end.js';
import Platform from './platform.js';
import Level from './scene.js';

/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.CANVAS,
    canvas: document.getElementById("mainCanvas"),
    width:  1000,
    height: 500,
    scale: {
        // mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    //pixelArt: true,
    scene: [Boot, Level, End],

    physics: {
        default: 'matter',
        matter: {
            gravity: false,
            setBounds: false,
            positionsIterations: 4,
            velocityIterations: 4,
            timing.timeScale: 1,
            debug: true,
        }
    },
};

new Phaser.Game(config);