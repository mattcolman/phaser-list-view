'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _math_utils = require('./utils/math_utils');

var _math_utils2 = _interopRequireDefault(_math_utils);

var _scroller = require('./scroller');

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Phaser$Math = Phaser.Math;
var radToDeg = _Phaser$Math.radToDeg;
var degToRad = _Phaser$Math.degToRad;

var _ptHelper = new Phaser.Point();

var WheelScroller = function WheelScroller(game, clickObject) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var defaultOptions = {
    direction: 'angle',
    infinite: false,
    speedLimit: 1.5
  };
  this.maskLimits = { angle: clickObject.width / 2 };
  _scroller2.default.call(this, game, clickObject, _lodash2.default.extend(defaultOptions, options));
};

WheelScroller.prototype = Object.assign(Object.create(_scroller2.default.prototype), {
  handleDown: function handleDown(target, pointer) {
    this.centerPoint = this.clickObject.toGlobal(new Phaser.Point(0, 0));
    _ptHelper.set(pointer.x, pointer.y);
    this.old = this.down = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));
    this.fullDiff = 0;

    _scroller2.default.prototype.handleDown.call(this, target, pointer);
  },
  handleMove: function handleMove(pointer, x, y) {
    _ptHelper.set(x, y);
    var currentRotation = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));
    var rotations = 0;

    var diffRotation = this.old - currentRotation;
    this.diff = radToDeg(diffRotation);

    if (this.diff > 180) {
      rotations = 1;
    } else if (this.diff < -180) {
      rotations = -1;
    }

    if (rotations != 0) {
      var fullCircle = rotations * degToRad(360);
      diffRotation -= fullCircle;
      this.diff = radToDeg(diffRotation);
    }

    this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow);

    this.fullDiff -= this.diff;

    this.target -= this.diff;

    if (this.o.infinite) {
      this.target = this._wrapTarget(this.target, this.min, this.max);
    }

    this.old = currentRotation;

    //store timestamp for event
    this.o.time.move = this.game.time.time;

    var diameter = this.clickObject.width;
    var circumference = Math.PI * diameter;
    var sectorLength = circumference * (this.diff / 360);
    this.acc = Math.min(Math.abs(sectorLength / 30), this.o.maxAcceleration);

    //go ahead and move the block
    this.scrollObject[this.o.direction] = this.target;
    this.handleUpdate();

    if (this.o.emitMoving) this.events.onInputMove.dispatch({ pointer: pointer, x: x, y: y });
  },
  handleUp: function handleUp(target, pointer) {
    _ptHelper.set(pointer.x, pointer.y);
    this.current = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(_ptHelper, this.centerPoint));

    _scroller2.default.prototype.handleUp.call(this, target, pointer);
  },
  _wrapTarget: function _wrapTarget(target, min, max) {
    var diff = 0;
    if (target > max) {
      diff = target - max;
      target = min + diff;
    } else if (target < min) {
      diff = min - target;
      target = max - diff;
    }
    return target;
  }
});

WheelScroller.prototype.constructor = WheelScroller;

exports.default = WheelScroller;