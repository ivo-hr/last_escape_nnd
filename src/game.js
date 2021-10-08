new Phaser.Game({
    type: Phaser.AUTO,
    width: 800,
    height: 400,
    scene: [ {
      create: create
    }]
});

function create() {
  this.add.text(400,200, "It works!");
}