'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _math_utils = require('./utils/math_utils');

var _math_utils2 = _interopRequireDefault(_math_utils);

require('gsap');

var _scroller = require('./scroller');

var _scroller2 = _interopRequireDefault(_scroller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _Phaser$Math = Phaser.Math;
var radToDeg = _Phaser$Math.radToDeg;
var degToRad = _Phaser$Math.degToRad;

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//

var WheelScroller = function WheelScroller(game, clickObject) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  options.direction = 'angle';
  this.maskLimits = { angle: clickObject.width / 2 };
  _scroller2.default.call(this, game, clickObject, options);
};

WheelScroller.prototype = Object.assign(Object.create(_scroller2.default.prototype), {
  handleDown: function handleDown(target, pointer) {
    var pt = new Phaser.Point(pointer.x, pointer.y);
    this.centerPoint = this.clickObject.toGlobal(new Phaser.Point(0, 0));
    console.log('centerPoint', this.centerPoint);
    this.old = this.down = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(pt, this.centerPoint));
    this.fullDiffAngle = 0;

    _scroller2.default.prototype.handleDown.call(this, target, pointer);
  },
  handleMove: function handleMove(pointer, x, y) {
    var pt = new Phaser.Point(x, y);
    var currentRotation = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(pt, this.centerPoint));
    // console.log('currentRotation is', radToDeg(currentRotation))
    var rotations = 0;

    this.diffRotation = this.old - currentRotation;
    this.diffAngle = radToDeg(this.diffRotation);

    // console.log('currentAngle', Phaser.Math.radToDeg(currentAngle))
    if (this.diffAngle > 180) {
      rotations = 1;
    } else if (this.diffAngle < -180) {
      rotations = -1;
    }

    if (rotations != 0) {
      var fullCircle = rotations * degToRad(360);
      // console.log('rotations', radToDeg(currentRotation), radToDeg(this.diffRotation), rotations)
      // currentRotation += fullCircle
      this.diffRotation -= fullCircle;
      this.diffAngle = radToDeg(this.diffRotation);
    }

    // this.diff = this.old - currentRotation
    this.diff = this.requestDiff(this.diffAngle, this.target, this.min, this.max, this.o.overflow);
    // console.log('currentRotation', radToDeg(currentRotation))

    this.target -= this.diff;

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
    var pt = new Phaser.Point(pointer.x, pointer.y);
    this.current = Phaser.Math.normalizeAngle(Phaser.Math.angleBetweenPoints(pt, this.centerPoint));
    _scroller2.default.prototype.handleUp.call(this, target, pointer);
  }
});

WheelScroller.prototype.constructor = WheelScroller;

exports.default = WheelScroller;