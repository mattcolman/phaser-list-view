import GameState from './game_state';
import _ from 'lodash';
import {scaleBetween} from '../utils/math_utils'
import {SwipeCarousel} from 'phaser-list-view'

class SwipeCarouselState extends GameState {

  preload() {
    this.game.load.crossOrigin = 'anonymous'
  }

  create() {

    var maskW = 600
    var maskH = 200
    var boxW = maskW
    var boxH = 200

    var carousel = new SwipeCarousel(this.game, this.world, new Phaser.Rectangle(this.world.centerX - maskW/2, 120, maskW, 400))

    for (var i = 0; i < 10; i++) {
      let color = Phaser.Color.getRandomColor()
      let group = this.game.make.group(null)
      let g = this.game.add.graphics(0, 0, group)
      g.beginFill(color)
       .drawRect(0, 0, boxW, boxH)

      let txt = this.game.add.text(boxW/2, boxH/2, i, {font: "40px Arial", fill: "#000"}, group)
      txt.anchor.set(.5)
      let img = this.game.add.image(0, 0, group.generateTexture())
      carousel.add(img)
    }

    super.create()

  }


}


export default SwipeCarouselState;
