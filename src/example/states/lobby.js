import GameState from './game_state';
import _ from 'lodash';
import {scaleBetween} from '../utils/math_utils'

class Lobby extends GameState {

  create() {
    let txt = this.game.add.text(this.world.centerX, this.world.centerY, `Oh hi.\nSelect a Phaser experiment.\n¯\\_(ツ)_/¯`, {font: '40px Arial', fill: '#000', align: 'center'})
    txt.anchor.set(.5)
    super.create()
  }

}

export default Lobby;
