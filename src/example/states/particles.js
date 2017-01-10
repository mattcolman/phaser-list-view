import GameState from './game_state';
import _ from 'lodash';
import SpriteSheetBuilder from '../spritesheet_builder'

const numParticlesInExplosion = 200
const emitParticlesInterval = 500
const particlePoolSize = 5000

class Particles extends GameState {

  create() {
    super.create()

    this.buildTextureAtlas()

    this.addEmitter()

    this.game.time.events.loop(emitParticlesInterval, ()=> {
      this.emitter.emitX = this.game.rnd.integerInRange(0, this.game.world.width)
      this.emitter.emitY = this.game.rnd.integerInRange(0, this.game.world.height)
      this.emitter.start(true, 5000, null, numParticlesInExplosion)
    })
  }

  buildTextureAtlas() {
    let ssb = new SpriteSheetBuilder(this.game)
    ssb.addFrame('square', this.addSquare())
    ssb.addFrame('triangle', this.addTriangle())
    ssb.addFrame('arc', this.addArc())

    ssb.buildToCache('new-atlas')
  }

  addEmitter() {
    this.emitter = this.game.add.emitter(this.game.world.centerX, 200, particlePoolSize)

    this.emitter.makeParticles('new-atlas', ['square', 'triangle', 'arc'])

    this.emitter.minParticleAlpha = 0
    this.emitter.maxParticleAlpha = 1
  }

  addSquare() {
    let g = this.game.make.graphics()
    g.beginFill(0x4ebc96)
     .drawRect(0, 0, 100, 100)
    return g.generateTexture()
  }

  addTriangle() {
    let g = this.game.make.graphics()
    g.beginFill(0xee9a2d)
     .moveTo(0, 0)
     .lineTo(100, 0)
     .lineTo(0, 100)
     .lineTo(0, 0)
     return g.generateTexture()
  }

  addArc() {
    let r = 50
    let thickness = 20
    let w = r*2 + thickness
    let bmd = this.game.add.bitmapData(w, w)
    let c = bmd.ctx
    let offset = 0
    c.setLineDash([2, 4])
    c.lineWidth = thickness
    c.beginPath()
    c.arc(w/2, w/2, r, offset, offset + (Phaser.Math.PI2-offset*2) * 1)
    c.strokeStyle = "#c1513a"
    c.stroke()
    c.closePath()
    return bmd.texture
  }

}

export default Particles;
