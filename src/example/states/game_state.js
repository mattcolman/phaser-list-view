class GameState extends Phaser.State {
  create() {
    this.game.time.advancedTiming = true;
    this.stage.backgroundColor = '#4488AA';
    this.fpsTxt = this.game.add.text(50, 20, this.game.time.fps || '--', {
      font: '24px Arial',
      fill: '#00ff00'
    });
    let txt = this.add.text(
      this.world.centerX,
      50,
      this.name || this.game.state.current,
      { font: `30px Arial`, fill: '#fff' }
    );
    txt.anchor.set(0.5);
  }

  update() {
    this.fpsTxt.text = this.game.time.fps; // debug text doesn't work with the canvas renderer??
    this.fpsTxt.bringToTop();
  }
}

export default GameState;
