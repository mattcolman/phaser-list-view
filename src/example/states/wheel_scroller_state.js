import GameState from './game_state';
import _ from 'lodash';
import {scaleBetween} from '../utils/math_utils'
import {WheelScroller} from 'phaser-list-view'
import $ from 'jquery'

class WheelScrollerState extends GameState {

  create() {
    super.create()

    $("#capture").on("change", (event)=> {
      let input = event.target
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = (e)=> {
          let dataURI = e.target.result
          let img = new Image()
          img.src = dataURI
          this.game.cache.addImage('image-data', dataURI, img)
          this.goImage()
        }

        reader.readAsDataURL(input.files[0]);
      }
    })

    window.State = this
  }

  goImage() {
    this.game.add.image(0, 0, 'image-data')
  }

}


export default WheelScrollerState;
