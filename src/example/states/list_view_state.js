import GameState from './game_state';
import { scaleBetween } from '../utils/math_utils';
import ListView from '../../list_view';

class ListViewState extends GameState {
  preload() {
    this.game.load.crossOrigin = 'anonymous';
  }

  shutdown() {
    this.listView.destroy();
  }

  create() {
    var maskW = 600;
    var maskH = 200;
    var boxW = maskW;
    var boxH = 50;

    this.listView = new ListView(
      this.game,
      this.world,
      new Phaser.Rectangle(this.world.centerX - maskW / 2, 120, maskW, 400),
      {
        direction: 'y'
      }
    );

    for (var i = 0; i < 500; i++) {
      let color = Phaser.Color.getRandomColor();
      let group = this.game.make.group(null);
      let g = this.game.add.graphics(0, 0, group);
      let h = boxH + Math.floor(Math.random() * 100);
      g.beginFill(color).drawRect(0, 0, boxW, h);

      let txt = this.game.add.text(
        boxW / 2,
        h / 2,
        i,
        { font: '40px Arial', fill: '#000' },
        group
      );
      txt.anchor.set(0.5);
      let img = this.game.add.image(0, 0, group.generateTexture());
      this.listView.add(img);
    }

    super.create();
  }
}

export default ListViewState;
