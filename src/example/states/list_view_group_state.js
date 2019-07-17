import GameState from './game_state';
import { scaleBetween } from '../utils/math_utils';
import ListView from '../../list_view';

class ListViewGroupState extends GameState {
  preload() {
    this.game.load.crossOrigin = 'anonymous';
  }

  shutdown() {
    this.listView.destroy();
  }

  create() {

    let text = this.add.text(50, 100, 'Click Result', {"font":"bold 40px Arial"});

    var maskW = 600;
    var maskH = 200;
    var boxW = maskW;
    var boxH = 50;

    this.listView = new ListView(
      this.game,
      this.world,
      new Phaser.Rectangle(this.world.centerX - maskW / 2, 120, maskW, 400),
      {
        direction: 'y',
        searchForClicks: true
      },
    );

    for (var i = 0; i < 5; i++) {
      let color = Phaser.Color.getRandomColor();
      let group = this.game.make.group(null);
      let g = this.game.add.graphics(0, 0, group);
      let h = boxH + Math.floor(Math.random() * 100);
      g.beginFill(color).drawRect(0, 0, boxW, h);

      let txt = this.game.add.text(
        boxW / 2,
        h / 2,
        i + ' Groups',
        { font: '40px Arial', fill: '#000' },
        group
      );
      txt.anchor.set(0.5);
    
      let sprite = this.game.add.sprite(0, 0, group.generateTexture());
      sprite.inputEnabled = true;
      sprite.events.onInputDown.add(function() {
        console.log('Click', this.index);
        text.text = 'Click ' + this.index;
      }, {index:i});

      var parentObj = sprite;
      var childObj = sprite;

      for (var n = 0; n < i; n++) {
        var nestedGroup = this.game.add.group();
        nestedGroup.add(childObj);

        nestedGroup.inputEnableChildren = true;
        nestedGroup.onChildInputDown.add(function() {
            console.log('Click Group', this.index, 'groupIndex:', this.groupIndex);
        }, {index: i, groupIndex: n});

        parentObj = nestedGroup; 
        childObj = nestedGroup;
      }

      this.listView.add(parentObj);
    }

    super.create();
  }
}

export default ListViewGroupState;
