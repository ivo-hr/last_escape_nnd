/**
 * Clase que representa la lista de objetos
*/
export default class ItemList extends Phaser.GameObjects.Container {

    /**
     * Constructor de la lista de objetos
     * @param {Phaser.Scene} scene Escena a la que pertenece la barra
     * @param {number} hiddenX Coordenada x escondida
     * @param {number} shownX Coordenada x mostrada
     * @param {number} y Coordenada y
     * @param {number} _width Ancho de la lista
     * @param {number} _height Alto de la lista
     * @param {object} items Items recogidos y por recoger
     */
    constructor(scene, listConfig) {

        let grafic = scene.add.sprite(0, 0, 'itemlist', 0);
        grafic.displayHeight = listConfig.height;
        grafic.displayWidth = listConfig.width;

        super(scene, listConfig.hiddenX, listConfig.y, grafic);

        this.add(grafic);
        this.grafic = grafic;

        this.scene.add.existing(this);

        this.textY = -listConfig.height / 3.5;
        this.lineSpacing = 40;

        this.hiddenX = listConfig.hiddenX;
        this.shownX = listConfig.shownX;

        this.setDepth(10);

        this.opened = false;

        this.playingTween = false;

        this.items = { tablas: 0, cruz: false, pala: false, sierra: false, clavos: false, martillo: false, bisagras: false };

        this.createListText();

        this.createInputEvent();

        this.completo = false;
    }

    /**
     * Método que crea el evento de input para abrir y cerrar la lista
     */
    createInputEvent() {

        this.input = this.scene.input.keyboard.addKey('TAB');

        this.input.on('down', this.toggleList, this);
    }

    /**
     * Método que activa o desactiva la lista dependiendo de su estado anterior
     */
    toggleList() {

        if (!this.playingTween) {

            if (this.opened) this.hideItemList();
            else this.showItemList();
        }
    };

    /**
     * Método que muestra la lista en pantalla y reproduce el tween de esta
     */
    showItemList() {

        this.playingTween = true;

        let show = this.scene.tweens.add({
            targets: [this],
            x: this.shownX,
            duration: 800,
            ease: 'Back.easeOut',
            paused: false
        });

        show.on('complete', this.hasStoppedPlaying, this);

        this.opened = true;

        if (this.scene.DEBUG) console.log("opening list");
    }

    /**
     * Método que oculta la lista y reproduce el tween de esta
     */
    hideItemList() {

        this.playingTween = true;

        let hide = this.scene.tweens.add({
            targets: [this],
            x: this.hiddenX,
            duration: 600,
            ease: 'Back.easeOut',
            paused: false
        });

        hide.on('complete', this.hasStoppedPlaying, this);

        this.opened = false;

        if (this.scene.DEBUG) console.log("closing list");
    }

    /**
     * Método que se llama al completarse la reproducción del tween
     */
    hasStoppedPlaying() {

        this.playingTween = false;
    }

    /**
     * Método que crea el texto de la lista
     */
    createListText() {

        let text = this.scene.add.text(0, this.textY, 'Lista', { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });

        text.setOrigin(0.5);

        this.add(text);

        let textX = text.x;
        let textY = text.y;

        textY += 2 * this.lineSpacing;
        this.plankText = this.scene.add.text(textX, textY, 'Tablas: ' + this.items.tablas, { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });
        this.plankText.setOrigin(0.5);
        this.add(this.plankText);

        textY += this.lineSpacing;
        this.sawText = this.scene.add.text(textX, textY, 'Sierra: ' + this.items.sierra, { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });
        this.sawText.setOrigin(0.5);
        this.add(this.sawText);

        textY += this.lineSpacing;
        this.shovelText = this.scene.add.text(textX, textY, 'Pala: ' + this.items.pala, { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });
        this.shovelText.setOrigin(0.5);
        this.add(this.shovelText);

        textY += this.lineSpacing;
        this.hammerText = this.scene.add.text(textX, textY, 'Martillo: ' + this.items.martillo, { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });
        this.hammerText.setOrigin(0.5);
        this.add(this.hammerText);

        textY += this.lineSpacing;
        this.nailsText = this.scene.add.text(textX, textY, 'Clavos: ' + this.items.clavos, { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });
        this.nailsText.setOrigin(0.5);
        this.add(this.nailsText);

        textY += this.lineSpacing;
        this.crossText = this.scene.add.text(textX, textY, 'Cruz: ' + this.items.cruz, { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });
        this.crossText.setOrigin(0.5);
        this.add(this.crossText);

        textY += this.lineSpacing;
        this.hingesText = this.scene.add.text(textX, textY, 'Bisagras: ' + this.items.bisagras, { fontFamily: 'Pixels', fontSize: 64, color: '0x000000', align: 'center' });
        this.hingesText.setOrigin(0.5);
        this.add(this.hingesText);
    }

    /**
     * Método que actualiza el texto de la lista
     */
    updateListText() {

        this.plankText.setText('Tablas: ' + this.items.tablas);
        this.sawText.setText('Sierra: ' + this.items.sierra);
        this.shovelText.setText('Pala: ' + this.items.pala);
        this.hammerText.setText('Martillo: ' + this.items.martillo);
        this.nailsText.setText('Clavos: ' + this.items.clavos);
        this.crossText.setText('Cruz: ' + this.items.cruz);
        this.hingesText.setText('Bisagras: ' + this.items.bisagras);
    }

    checkVictory() {
        let cont = 0;
        if (this.items.sierra) {
            cont++;
        }
        if (this.items.pala) {
            cont++;
        }
        if (this.items.cruz) {
            cont++;
        }
        if (this.items.clavos) {
            cont++;
        }
        if (this.items.martillo) {
            cont++;
        }
        if (this.items.bisagras) {
            cont++;
        }
        if (this.items.tablas === 3) {
            cont++;
        }

        if (cont === 7) {
            this.completo = true;
        }

    }

    /**
     * Método que marca el objeto como recogido y actualiza la lista
     * @param {string} item Objeto recogido
     */
    itemObtained(item) {

        switch (item) {

            case 'sierra': this.items.sierra = true; break;
            case 'pala': this.items.pala = true; break;
            case 'cruz': this.items.cruz = true; break;
            case 'clavos': this.items.clavos = true; break;
            case 'martillo': this.items.martillo = true; break;
            case 'bisagras': this.items.bisagras = true; break;
            case 'tabla': this.items.tablas++; break;
        }

        this.updateListText();
        this.checkVictory();
        if (this.completo) {
            this.scene.changeToEnd();
        }
    }

    /**
     * Método que devuelve si el item especificado ha sido obtenido en otra noche
     * @param {string} item Nombre del objeto a comprobar
     * @returns {boolean} Si el item ha sido o no recogido (se encuentra marcado en la lista)
     */
     itemIsObtained(item) {

        switch(item){

            case 'sierra': return this.items.sierra;
            case 'pala': return this.items.pala;
            case 'cruz': return this.items.cruz;
            case 'clavos': return this.items.clavos;
            case 'martillo': return this.items.martillo;
            case 'bisagras': return this.items.bisagras;

            case 'tabla': return this.items.tablas === 3;
        }
    }
    
    /**
     * Método que devuelve el objeto que contiene los objetos de la lista
     * @returns {object} Los objetos de la lista
     */
    getItemData() {

        return this.items;
    }

    /**
     * Método que sustituye los datos de los objetos de la lista por otros dados
     * @param {object} data Datos de los objetos para sustituir los inciales
     */
    changeItemData(data) {

        this.items.sierra = data.sierra;
        this.items.tablas = data.tablas;
        this.items.clavos = data.clavos;
        this.items.martillo = data.martillo;
        this.items.bisagras = data.bisagras;
        this.items.cruz = data.cruz;
        this.items.pala = data.pala;
    }
}   