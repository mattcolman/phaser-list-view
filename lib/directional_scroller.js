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

// Pure logic scroller
// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
//
var DirectionalScroller = function DirectionalScroller(game, clickObject) {
  var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  this.maskLimits = { x: clickObject.width, y: clickObject.height };
  _scroller2.default.call(this, game, clickObject, options);
};

DirectionalScroller.prototype = Object.assign(Object.create(_scroller2.default.prototype), {
  handleDown: function handleDown(target, pointer) {
    this.old = this.down = pointer[this.o.direction];
    _scroller2.default.prototype.handleDown.call(this, target, pointer);
  },
  handleUp: function handleUp(target, pointer) {
    this.current = pointer[this.o.direction];
    _scroller2.default.prototype.handleUp.call(this, target, pointer);
  }
});

DirectionalScroller.prototype.constructor = DirectionalScroller;

exports.default = DirectionalScroller;