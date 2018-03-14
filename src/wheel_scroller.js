import MathUtils from './utils/math_utils';
import Scroller from './scroller';

const { radToDeg, degToRad } = Phaser.Math;
const _ptHelper = new Phaser.Point();

const defaultOptions = {
  direction: 'angle',
  infinite: false,
  speedLimit: 1.5
};

export default class WheelScroller extends Scroller {
  constructor(game, clickObject, options = {}) {
    super(
      game,
      clickObject,
      { angle: clickObject.width / 2 },
      Object.assign({}, defaultOptions, options)
    );
  }

  // extends Scroller.handleDown
  handleDown(target, pointer) {
    if (!this.enabled) return;
    this.centerPoint = this.clickObject.toGlobal(new Phaser.Point(0, 0));
    _ptHelper.set(pointer.x, pointer.y);
    this.old = this.down = Phaser.Math.normalizeAngle(
      Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint)
    );
    this.fullDiff = 0;

    super.handleDown(target, pointer);
  }

  // overrides Scroller.handleMove
  handleMove(pointer, x, y) {
    if (!this.enabled) return;
    this.isScrolling = true;
    _ptHelper.set(x, y);
    let currentRotation = Phaser.Math.normalizeAngle(
      Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint)
    );
    let rotations = 0;

    let diffRotation = this.old - currentRotation;
    this.diff = radToDeg(diffRotation);

    if (this.diff > 180) {
      rotations = 1;
    } else if (this.diff < -180) {
      rotations = -1;
    }

    if (rotations != 0) {
      let fullCircle = rotations * degToRad(360);
      diffRotation -= fullCircle;
      this.diff = radToDeg(diffRotation);
    }

    this.diff = this._requestDiff(
      this.diff,
      this.target,
      this.min,
      this.max,
      this.o.overflow
    );

    this.fullDiff -= this.diff;

    this.target -= this.diff;

    if (this.o.infinite) {
      this.target = this._wrapTarget(this.target, this.min, this.max);
    }

    this.old = currentRotation;

    //store timestamp for event
    this.o.time.move = this.game.time.time;

    let diameter = this.clickObject.width;
    let circumference = Math.PI * diameter;
    let sectorLength = circumference * (this.diff / 360);
    this.acc = Math.min(Math.abs(sectorLength / 30), this.o.maxAcceleration);

    //go ahead and move the block
    this.scrollObject[this.o.direction] = this.target;
    this.handleUpdate();

    if (this.o.emitMoving) this.events.onInputMove.dispatch({ pointer, x, y });
  }

  // extends Scroller.handleDown
  handleUp(target, pointer) {
    _ptHelper.set(pointer.x, pointer.y);
    this.current = Phaser.Math.normalizeAngle(
      Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint)
    );

    super.handleUp(target, pointer);
  }

  _wrapTarget(target, min, max) {
    let diff = 0;
    if (target > max) {
      diff = target - max;
      target = min + diff;
    } else if (target < min) {
      diff = min - target;
      target = max - diff;
    }
    return target;
  }
}
