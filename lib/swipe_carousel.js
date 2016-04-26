'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _list_view_core = require('./list_view_core');

var _list_view_core2 = _interopRequireDefault(_list_view_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Swiper = function Swiper(game, parent, bounds) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];


  this.defaultOptions = {
    direction: 'x',
    autocull: true,
    momentum: false,
    bouncing: true,
    snapping: true,
    overflow: 100,
    padding: 10,
    swipeEnabled: true
  };

  _list_view_core2.default.call(this, game, parent, bounds, options);

  this.scroller.options.snapStep = bounds.width + this.o.padding;
};

Swiper.prototype = Object.assign(Object.create(_list_view_core2.default.prototype));
Swiper.prototype.constructor = Swiper;

exports.default = Swiper;