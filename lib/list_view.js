'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _list_view_core = require('./list_view_core');

var _list_view_core2 = _interopRequireDefault(_list_view_core);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ListView = function ListView(game, parent, bounds) {
  var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];


  this.defaultOptions = {
    direction: 'y',
    autocull: true,
    momentum: true,
    bouncing: true,
    snapping: false,
    overflow: 100,
    padding: 10
  };

  _list_view_core2.default.call(this, game, parent, bounds, options);
};

ListView.prototype = Object.assign(Object.create(_list_view_core2.default.prototype));
ListView.prototype.constructor = ListView;

exports.default = ListView;