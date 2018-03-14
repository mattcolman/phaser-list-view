/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _game = __webpack_require__(2);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var init = function init() {
	  var config = {
	    "width": 1366,
	    "height": 768,
	    "renderer": Phaser.AUTO,
	    "parent": 'content',
	    "resolution": 1, //window.devicePixelRatio,
	    "state": _game2.default.prototype.states[0][1]
	  };
	  var game = new _game2.default(config);
	};

	init();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _game_state = __webpack_require__(3);

	var _game_state2 = _interopRequireDefault(_game_state);

	var _boot = __webpack_require__(4);

	var _boot2 = _interopRequireDefault(_boot);

	var _list_view_state = __webpack_require__(5);

	var _list_view_state2 = _interopRequireDefault(_list_view_state);

	var _swipe_carousel_state = __webpack_require__(7);

	var _swipe_carousel_state2 = _interopRequireDefault(_swipe_carousel_state);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Game = function (_Phaser$Game) {
	  _inherits(Game, _Phaser$Game);

	  function Game() {
	    _classCallCheck(this, Game);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Game).apply(this, arguments));
	  }

	  _createClass(Game, [{
	    key: 'setupStage',
	    value: function setupStage() {

	      this.input.maxPointers = 1;
	      this.scale.scaleMode = Phaser.ScaleManager.USER_SCALE;
	      this.scale.setMinMax(this.width / 2, this.height / 2, this.width, this.height);
	      // this.scale.forceOrientation(true) // landscape
	      this.scale.pageAlignHorizontally = true;

	      // if (this.device.desktop) {
	      //   this.scale.setResizeCallback(this.fitToWindow, this)
	      // } else {
	      //   // Mobile
	      //   this.scale.setResizeCallback(this.fitToWindowMobile, this)
	      // }
	    }
	  }, {
	    key: 'fitToWindowMobile',
	    value: function fitToWindowMobile() {
	      var gameHeight = this.height;
	      var windowAspectRatio = window.innerWidth / window.innerHeight;
	      var gameWidth = Math.ceil(this.height * windowAspectRatio);
	      this.scale.setGameSize(gameWidth, gameHeight);
	      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	    }
	  }, {
	    key: 'fitToWindow',
	    value: function fitToWindow() {
	      var w = window.innerWidth / this.width;
	      var h = window.innerHeight / this.height;
	      var scale = Math.min(w, h);
	      this.scale.setUserScale(scale, scale);
	    }
	  }, {
	    key: 'addStates',
	    value: function addStates() {
	      var _this2 = this;

	      this.states.forEach(function (_ref) {
	        var _ref2 = _slicedToArray(_ref, 2);

	        var name = _ref2[0];
	        var stateClass = _ref2[1];

	        _this2.state.add(name, stateClass);
	      });
	    }
	  }, {
	    key: 'startGame',
	    value: function startGame() {
	      console.log('start game');
	      this.stateIndex = 0;
	      this.nextState();
	    }
	  }, {
	    key: 'nextState',
	    value: function nextState() {
	      this.gotoStateByIndex(this.stateIndex + 1);
	    }
	  }, {
	    key: 'prevState',
	    value: function prevState() {
	      this.gotoStateByIndex(this.stateIndex - 1);
	    }
	  }, {
	    key: 'gotoStateByIndex',
	    value: function gotoStateByIndex(index) {
	      index = Math.min(index, this.states.length - 1);
	      index = Math.max(index, 1);
	      this.stateIndex = index;
	      this.state.start(this.states[index][0]);
	    }
	  }, {
	    key: 'addDropDownMenu',
	    value: function addDropDownMenu() {
	      var _this3 = this;

	      this.experiments.forEach(function (a) {
	        var _a = _slicedToArray(a, 2);

	        var name = _a[0];
	        var klass = _a[1];


	        var option = document.createElement("option");
	        option.text = name;
	        document.getElementById('selector').add(option);
	      });

	      document.getElementById('selector').addEventListener('change', function (e) {
	        _this3.state.start(e.target.value);
	      });
	    }
	  }]);

	  return Game;
	}(Phaser.Game);

	Game.prototype.experiments = [['ListView Example', _list_view_state2.default], ['SwipeCarousel Example', _swipe_carousel_state2.default]];

	Game.prototype.states = [['boot', _boot2.default]].concat(Game.prototype.experiments);

	exports.default = Game;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GameState = function (_Phaser$State) {
	  _inherits(GameState, _Phaser$State);

	  function GameState() {
	    _classCallCheck(this, GameState);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(GameState).apply(this, arguments));
	  }

	  _createClass(GameState, [{
	    key: "create",
	    value: function create() {
	      this.game.time.advancedTiming = true;
	      this.stage.backgroundColor = "#4488AA";
	      this.fpsTxt = this.game.add.text(50, 20, this.game.time.fps || "--", {
	        font: "24px Arial",
	        fill: "#00ff00"
	      });
	      var txt = this.add.text(this.world.centerX, 50, this.name || this.game.state.current, { font: "30px Arial", fill: "#fff" });
	      txt.anchor.set(0.5);
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      this.fpsTxt.text = this.game.time.fps; // debug text doesn't work with the canvas renderer??
	      this.fpsTxt.bringToTop();
	    }
	  }]);

	  return GameState;
	}(Phaser.State);

	exports.default = GameState;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Boot = function (_Phaser$State) {
	  _inherits(Boot, _Phaser$State);

	  function Boot() {
	    _classCallCheck(this, Boot);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Boot).apply(this, arguments));
	  }

	  _createClass(Boot, [{
	    key: "preload",
	    value: function preload() {
	      this.game.load.crossOrigin = "anonymous";
	    }
	  }, {
	    key: "create",
	    value: function create() {
	      console.log("boot me up");
	      this.game.addDropDownMenu();
	      this.game.setupStage();
	      this.game.addStates();
	      this.game.startGame();
	    }
	  }]);

	  return Boot;
	}(Phaser.State);

	exports.default = Boot;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _game_state = __webpack_require__(3);

	var _game_state2 = _interopRequireDefault(_game_state);

	var _math_utils = __webpack_require__(6);

	var _list_view = __webpack_require__(8);

	var _list_view2 = _interopRequireDefault(_list_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListViewState = function (_GameState) {
	  _inherits(ListViewState, _GameState);

	  function ListViewState() {
	    _classCallCheck(this, ListViewState);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ListViewState).apply(this, arguments));
	  }

	  _createClass(ListViewState, [{
	    key: "preload",
	    value: function preload() {
	      this.game.load.crossOrigin = "anonymous";
	    }
	  }, {
	    key: "shutdown",
	    value: function shutdown() {
	      this.listView.destroy();
	    }
	  }, {
	    key: "create",
	    value: function create() {
	      var maskW = 600;
	      var maskH = 200;
	      var boxW = maskW;
	      var boxH = 50;

	      this.listView = new _list_view2.default(this.game, this.world, new Phaser.Rectangle(this.world.centerX - maskW / 2, 120, maskW, 400), {
	        direction: "y"
	      });

	      for (var i = 0; i < 500; i++) {
	        var color = Phaser.Color.getRandomColor();
	        var group = this.game.make.group(null);
	        var g = this.game.add.graphics(0, 0, group);
	        var h = boxH + Math.floor(Math.random() * 100);
	        g.beginFill(color).drawRect(0, 0, boxW, h);

	        var txt = this.game.add.text(boxW / 2, h / 2, i, { font: "40px Arial", fill: "#000" }, group);
	        txt.anchor.set(0.5);
	        var img = this.game.add.image(0, 0, group.generateTexture());
	        this.listView.add(img);
	      }

	      _get(Object.getPrototypeOf(ListViewState.prototype), "create", this).call(this);
	    }
	  }]);

	  return ListViewState;
	}(_game_state2.default);

	exports.default = ListViewState;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MathUtils = {

	    nearestMultiple: function nearestMultiple(n, multiple) {
	        return Math.round(n / multiple) * multiple;
	    },

	    scaleBetween: function scaleBetween(lo, hi, scale) {
	        return lo + (hi - lo) * scale;
	    },

	    // returns a percentage between hi and lo from a given input
	    // e.g percentageBetween2(7, 4, 10) -> .5
	    percentageBetween2: function percentageBetween2(input, lo, hi) {
	        return (input - lo) / (hi - lo);
	    }
	};

	window.MathUtils = MathUtils;

	exports.default = MathUtils;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _game_state = __webpack_require__(3);

	var _game_state2 = _interopRequireDefault(_game_state);

	var _math_utils = __webpack_require__(6);

	var _swipe_carousel = __webpack_require__(15);

	var _swipe_carousel2 = _interopRequireDefault(_swipe_carousel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SwipeCarouselState = function (_GameState) {
	  _inherits(SwipeCarouselState, _GameState);

	  function SwipeCarouselState() {
	    _classCallCheck(this, SwipeCarouselState);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeCarouselState).apply(this, arguments));
	  }

	  _createClass(SwipeCarouselState, [{
	    key: "preload",
	    value: function preload() {
	      this.game.load.crossOrigin = "anonymous";
	    }
	  }, {
	    key: "shutdown",
	    value: function shutdown() {
	      this.carousel.destroy();
	    }
	  }, {
	    key: "create",
	    value: function create() {
	      var maskW = 600;
	      var maskH = 200;
	      var boxW = maskW;
	      var boxH = 200;

	      this.carousel = new _swipe_carousel2.default(this.game, this.world, new Phaser.Rectangle(this.world.centerX - maskW / 2, 120, maskW, 400));

	      for (var i = 0; i < 10; i++) {
	        var color = Phaser.Color.getRandomColor();
	        var group = this.game.make.group(null);
	        var g = this.game.add.graphics(0, 0, group);
	        g.beginFill(color).drawRect(0, 0, boxW, boxH);

	        var txt = this.game.add.text(boxW / 2, boxH / 2, i, { font: "40px Arial", fill: "#000" }, group);
	        txt.anchor.set(0.5);
	        var img = this.game.add.image(0, 0, group.generateTexture());
	        this.carousel.add(img);
	      }

	      _get(Object.getPrototypeOf(SwipeCarouselState.prototype), "create", this).call(this);
	    }
	  }]);

	  return SwipeCarouselState;
	}(_game_state2.default);

	exports.default = SwipeCarouselState;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _list_view_core = __webpack_require__(9);

	var _list_view_core2 = _interopRequireDefault(_list_view_core);

	var _directional_scroller = __webpack_require__(12);

	var _directional_scroller2 = _interopRequireDefault(_directional_scroller);

	var _util = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultOptions = {
	  direction: "y",
	  autocull: true,
	  momentum: true,
	  bouncing: true,
	  snapping: false,
	  overflow: 100,
	  padding: 10,
	  searchForClicks: false // if you just click on the list view it will search the list view items for onInputDown and onInputUp events.
	};

	var ListView = function (_ListViewCore) {
	  _inherits(ListView, _ListViewCore);

	  function ListView(game, parent, bounds) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck(this, ListView);

	    // we have to use a new mask instance for the click object or webgl ignores the mask
	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ListView).call(this, game, parent, (0, _util.parseBounds)(bounds), Object.assign({}, defaultOptions, options)));

	    _this.scroller = new _directional_scroller2.default(_this.game, _this._addMask(bounds), Object.assign({
	      from: 0,
	      to: 0
	    }, _this.options));
	    _this.scroller.events.onUpdate.add(function (o) {
	      _this._setPosition(o.total);
	    });
	    _this.events.onAdded.add(function (limit) {
	      var _to = Math.min(-limit, 0);
	      _this.scroller.setFromTo(0, _to);
	      if (_this.options.searchForClicks) {
	        _this.scroller.registerClickables(_this.items);
	      }
	    });
	    return _this;
	  }

	  _createClass(ListView, [{
	    key: "destroy",
	    value: function destroy() {
	      this.scroller.destroy();
	      this.scroller = null;
	      _get(Object.getPrototypeOf(ListView.prototype), "destroy", this).call(this);
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this._setPosition(0);
	      this.scroller.reset();
	    }
	  }]);

	  return ListView;
	}(_list_view_core2.default);

	exports.default = ListView;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _util = __webpack_require__(10);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var defaultOptions = {
	  direction: "y",
	  autocull: true,
	  padding: 10
	};

	var ListViewCore = function () {
	  function ListViewCore(game, parent, bounds) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck(this, ListViewCore);

	    this.game = game;
	    this.parent = parent;
	    this.bounds = bounds;

	    this.o = this.options = Object.assign({}, defaultOptions, options);

	    this.items = [];

	    if (this.o.direction == "y") {
	      this.p = { xy: "y", wh: "height" };
	    } else {
	      this.p = { xy: "x", wh: "width" };
	    }

	    this.grp = this.game.add.group(parent);
	    this.grp.position.set(bounds.x, bounds.y);

	    this.events = {
	      onAdded: new Phaser.Signal()
	    };

	    this.position = 0;

	    // [MC] - is masking the fastest option here? Cropping the texture may be faster?
	    this.grp.mask = this._addMask(bounds);
	  }

	  /**
	   * [add a child to the list
	   * stacks them on top of each other by measuring their
	   * height and adding custom padding. Optionally you can
	   * specify nominalHeight or nominalWidth on the display object,
	   * this will take preference over height and width]
	   * @param {DisplayObject} child
	   */


	  _createClass(ListViewCore, [{
	    key: "add",
	    value: function add(child) {
	      this.items.push(child);
	      var xy = 0;
	      if (this.grp.children.length > 0) {
	        var lastChild = this.grp.getChildAt(this.grp.children.length - 1);
	        xy = lastChild[this.p.xy] + (0, _util.getWidthOrHeight)(lastChild, this.p.wh) + this.o.padding;
	      }
	      child[this.p.xy] = xy;
	      this.grp.addChild(child);
	      this.length = xy + child[this.p.wh];

	      // this._setPosition(this.position)
	      this.events.onAdded.dispatch(this.length - this.bounds[this.p.wh]);
	      return child;
	    }

	    /**
	     * [addMultiple children to the list]
	     * @param {...[DisplayObjects]} children
	     */

	  }, {
	    key: "addMultiple",
	    value: function addMultiple() {
	      for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
	        children[_key] = arguments[_key];
	      }

	      children.forEach(this.add, this);
	    }
	  }, {
	    key: "remove",
	    value: function remove(child) {
	      this.grp.removeChild(child);
	      var index = this.items.indexOf(child);
	      if (index == -1) return;
	      this.items.splice(index, 1);
	      return child;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.events.onAdded.dispose();
	      this.events = null;
	      this.grp.destroy();
	      this.grp = null;
	      this.game = null;
	      this.parent = null;
	      this.items = null;
	    }

	    /**
	     * [removeAll - removes all children from the group]
	     * @note This does not reset the position of the ListView.
	     */

	  }, {
	    key: "removeAll",
	    value: function removeAll() {
	      this.grp.removeAll();
	      this.items = [];
	    }

	    /**
	     * [cull - culls the off-screen list elements]
	     * mainly called internally with the autoCull property
	     */

	  }, {
	    key: "cull",
	    value: function cull() {
	      for (var i = 0; i < this.items.length; i++) {
	        var child = this.items[i];
	        child.visible = true;
	        if (child[this.p.xy] + child[this.p.wh] + this.grp[this.p.xy] < this.bounds[this.p.xy]) {
	          child.visible = false;
	        } else if (child[this.p.xy] + this.grp[this.p.xy] > this.bounds[this.p.xy] + this.bounds[this.p.wh]) {
	          child.visible = false;
	        }
	      }
	    }

	    /**
	     * [setPosition - set position of the top of the list view. Either the x or y value,
	     *                depending on what you set the direction to]
	     * @param {Number} position
	     */

	  }, {
	    key: "setPosition",
	    value: function setPosition(position) {
	      this.scroller.setTo(position);
	    }
	  }, {
	    key: "tweenToPosition",
	    value: function tweenToPosition(position) {
	      var duration = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	      this.scroller.tweenTo(duration, position);
	    }
	  }, {
	    key: "tweenToItem",
	    value: function tweenToItem(index) {
	      var duration = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

	      this.scroller.tweenTo(duration, -this.items[index][this.p.xy]);
	    }

	    /**
	     * @private
	     */

	  }, {
	    key: "_setPosition",
	    value: function _setPosition(position) {
	      this.position = position;
	      this.grp[this.p.xy] = this.bounds[this.p.xy] + position;
	      if (this.o.autocull) this.cull();
	    }

	    /**
	     * @private
	     */

	  }, {
	    key: "_addMask",
	    value: function _addMask(bounds) {
	      var mask = this.game.add.graphics(0, 0, this.parent);
	      mask.beginFill(0xff0000).drawRect(bounds.x, bounds.y, bounds.width, bounds.height);
	      mask.alpha = 0;
	      return mask;
	    }
	  }]);

	  return ListViewCore;
	}();

	exports.default = ListViewCore;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.parseBounds = parseBounds;
	exports.getWidthOrHeight = getWidthOrHeight;
	exports.capitalizeFirstLetter = capitalizeFirstLetter;
	exports.findChild = findChild;
	exports.detectDrag = detectDrag;
	exports.dispatchClicks = dispatchClicks;

	var _config = __webpack_require__(11);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function parseBounds(bounds) {
	  bounds.x = bounds.x ? bounds.x : 0;
	  bounds.y = bounds.y ? bounds.y : 0;
	  if (bounds.width <= 0) {
	    console.warn('PhaserListView: bounds.width <= 0');
	  } else if (bounds.height <= 0) {
	    console.warn('PhaserListView: bounds.height <= 0');
	  }
	  return bounds;
	}

	// prefer nominalWidth and nominalHeight
	function getWidthOrHeight(displayObject, widthOrHeight) {
	  return displayObject['nominal' + capitalizeFirstLetter(widthOrHeight)] || displayObject[widthOrHeight];
	}

	function capitalizeFirstLetter(string) {
	  return string.charAt(0).toUpperCase() + string.slice(1);
	}

	function findChild(children, predicate) {
	  var scope = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  if (!children) return false;
	  for (var i = 0; i < children.length; i++) {
	    var child = children[i];
	    if (!child) continue;
	    if (predicate.call(scope, child)) {
	      return child;
	    }
	    var found = findChild(child.children, predicate, scope);
	    if (found) {
	      return found;
	    }
	  }
	  return false;
	};

	function detectDrag(pointer) {
	  var distanceX = Math.abs(pointer.positionDown.x - pointer.positionUp.x);
	  var distanceY = Math.abs(pointer.positionDown.y - pointer.positionUp.y);
	  var time = pointer.timeUp - pointer.timeDown;
	  return distanceX > _config2.default.AUTO_DETECT_THRESHOLD || distanceY > _config2.default.AUTO_DETECT_THRESHOLD;
	};

	function dispatchClicks(pointer, clickables, type) {
	  if (type == 'onInputUp' && detectDrag(pointer)) return;
	  // SEARCH OBJECT UNDER POINT AS THERE IS NO CLICK PROPAGATION SUPPORT IN PHASER
	  var found = findChild(clickables, function (clickable) {
	    var pt = clickable.worldPosition;
	    var anchor = clickable.anchor;
	    var pivot = clickable.pivot;
	    var width = clickable.width;
	    var height = clickable.height;
	    var scale = clickable.scale;

	    var x = pt.x - (anchor ? anchor.x * width : 0) - pivot.x * scale.x;
	    var y = pt.y - (anchor ? anchor.y * height : 0) - pivot.y * scale.y;
	    // console.log('does ', x, y, clickable.width, clickable.height, ' intersect ', pointer.x, pointer.y)
	    return clickable.inputEnabled && new Phaser.Rectangle(x, y, clickable.width, clickable.height).contains(pointer.x, pointer.y);
	  });
	  if (found && found.events && found.events[type] && found.events[type].dispatch) {
	    found.events[type].dispatch(found, pointer, true);
	  }
	  return found;
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Config = {
	  AUTO_DETECT_THRESHOLD: 8
	};

	exports.default = Config;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _math_utils = __webpack_require__(13);

	var _math_utils2 = _interopRequireDefault(_math_utils);

	var _scroller = __webpack_require__(14);

	var _scroller2 = _interopRequireDefault(_scroller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var DirectionalScroller = function (_Scroller) {
	  _inherits(DirectionalScroller, _Scroller);

	  function DirectionalScroller(game, clickObject) {
	    var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	    _classCallCheck(this, DirectionalScroller);

	    return _possibleConstructorReturn(this, Object.getPrototypeOf(DirectionalScroller).call(this, game, clickObject, { x: clickObject.width, y: clickObject.height }, options));
	  }

	  _createClass(DirectionalScroller, [{
	    key: "handleDown",
	    value: function handleDown(target, pointer) {
	      this.old = this.down = pointer[this.o.direction];
	      _get(Object.getPrototypeOf(DirectionalScroller.prototype), "handleDown", this).call(this, target, pointer);
	    }
	  }, {
	    key: "handleUp",
	    value: function handleUp(target, pointer) {
	      this.current = pointer[this.o.direction];
	      _get(Object.getPrototypeOf(DirectionalScroller.prototype), "handleUp", this).call(this, target, pointer);
	    }
	  }]);

	  return DirectionalScroller;
	}(_scroller2.default);

	exports.default = DirectionalScroller;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var MathUtils = {

	    nearestMultiple: function nearestMultiple(n, multiple) {
	        return Math.round(n / multiple) * multiple;
	    },

	    scaleBetween: function scaleBetween(lo, hi, scale) {
	        return lo + (hi - lo) * scale;
	    },

	    // returns a percentage between hi and lo from a given input
	    // e.g percentageBetween2(7, 4, 10) -> .5
	    percentageBetween2: function percentageBetween2(input, lo, hi) {
	        return (input - lo) / (hi - lo);
	    }
	};

	exports.default = MathUtils;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _math_utils = __webpack_require__(13);

	var _math_utils2 = _interopRequireDefault(_math_utils);

	var _util = __webpack_require__(10);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ptHelper = new Phaser.Point();

	var defaultOptions = {
	  from: 0,
	  to: 200,
	  direction: "y",
	  momentum: false,
	  snapping: false,
	  bouncing: false,
	  deceleration: 0.5, // value between 0 and 1
	  overflow: 20,
	  snapStep: 10,
	  emitMoving: false,
	  duration: 2, // (s) duration of the inertial scrolling simulation.
	  speedLimit: 3, // set maximum speed. Higher values will allow faster scroll (which comes down to a bigger offset for the duration of the momentum scroll) note: touch motion determines actual speed, this is just a limit.
	  flickTimeThreshold: 100, // (ms) determines if a flick occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger inertial scrolling
	  offsetThreshold: 30, // (pixels) determines if calculated offset is above this threshold
	  acceleration: 0.5, // increase the multiplier by this value, each time the user swipes again when still scrolling. The multiplier is used to multiply the offset. Set to 0 to disable.
	  accelerationT: 250, // (ms) time between successive swipes that determines if the multiplier is increased (if lower than this value)
	  maxAcceleration: 4,
	  time: {}, // contains timestamps of the most recent down, up, and move events
	  multiplier: 1, //acceleration multiplier, don't edit here
	  swipeEnabled: false,
	  swipeThreshold: 5, // (pixels) must move this many pixels for a swipe action
	  swipeTimeThreshold: 250, // (ms) determines if a swipe occurred: time between last updated movement @ touchmove and time @ touchend, if smaller than this value, trigger swipe
	  minDuration: 0.5,
	  addListeners: true
	};

	// Pure logic scroller
	// Originally adapted from http://yusyuslabs.com/tutorial-momentum-scrolling-inside-scrollable-area-with-phaser-js/
	//

	var Scroller = function () {
	  function Scroller(game, clickObject) {
	    var maskLimits = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck(this, Scroller);

	    this.game = game;
	    this.clickObject = clickObject;

	    this.maskLimits = maskLimits;

	    this.o = this.options = Object.assign({}, defaultOptions, options);

	    this._updateMinMax();

	    this.dispatchValues = { step: 0, total: 0, percent: 0 };

	    this.addListeners();

	    this.clickables = [];

	    this.isDown = false; // isDown is true when the down event has fired but the up event has not
	    this.isScrolling = false; // isScrolling is true when the down event has fired but the complete event has not

	    this.scrollObject = {};

	    this.init();

	    this.tweenScroll = this.game.add.tween(this.scrollObject).to({}, 0, Phaser.Easing.Quartic.Out);
	    this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
	    this.tweenScroll.onComplete.add(this.handleComplete, this);
	  }

	  _createClass(Scroller, [{
	    key: "destroy",
	    value: function destroy() {
	      this.tweenScroll.stop();
	      this.removeListeners();
	      this.clickObject.destroy();
	      this.clickables = null;
	      this.options = this.o = null;
	      this.maskLimits = null;
	      this.enabled = false;
	      this.game = null;
	      this.dispatchValues = null;
	      this.isDown = null;
	      this.target = null;
	      this.destroyed = true;
	    }
	  }, {
	    key: "addListeners",
	    value: function addListeners() {
	      this.events = {
	        onUpdate: new Phaser.Signal(),
	        onInputUp: new Phaser.Signal(),
	        onInputDown: new Phaser.Signal(),
	        onInputMove: new Phaser.Signal(),
	        onComplete: new Phaser.Signal(),
	        onSwipe: new Phaser.Signal()
	      };

	      if (this.o.addListeners) {
	        this.clickObject.inputEnabled = true;
	        this.clickObject.events.onInputDown.add(this.handleDown, this);
	        this.clickObject.events.onInputUp.add(this.handleUp, this);
	      }
	    }
	  }, {
	    key: "removeListeners",
	    value: function removeListeners() {
	      if (this.o.addListeners) {
	        this.clickObject.events.onInputDown.remove(this.handleDown, this);
	        this.clickObject.events.onInputUp.remove(this.handleUp, this);
	      }

	      for (var property in this.events) {
	        if (this.events.hasOwnProperty(property)) {
	          this.events[property].dispose();
	        }
	      }
	    }
	  }, {
	    key: "enable",
	    value: function enable() {
	      this.enabled = true;
	    }
	  }, {
	    key: "disable",
	    value: function disable() {
	      this.enabled = false;
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      this.scrollObject[this.o.direction] = this.o.from;
	      this.maxOffset = this.maskLimits[this.o.direction] * this.o.speedLimit;
	      this.enable();
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      this.tweenScroll.pause();
	      this.o.multiplier = 1;
	      this.init();
	    }
	  }, {
	    key: "setFromTo",
	    value: function setFromTo(_from, _to) {
	      this.o.from = _from;
	      this.o.to = _to;
	      this._updateMinMax();
	    }
	  }, {
	    key: "isTweening",
	    value: function isTweening() {
	      return this.tweenScroll.isRunning;
	    }
	  }, {
	    key: "registerClickables",
	    value: function registerClickables(clickables) {
	      this.clickables = clickables;
	    }
	  }, {
	    key: "handleDown",
	    value: function handleDown(target, pointer) {
	      if (!this.enabled) return;
	      this.isDown = true;
	      // console.log('input down', pointer.y)
	      this.target = this.requested = this.scrollObject[this.o.direction];
	      this.o.time.down = pointer.timeDown;

	      if (this.o.addListeners) this.game.input.addMoveCallback(this.handleMove, this);

	      //check if block is currently scrolling and set multiplier
	      if (this.isTweening() && this.o.time.down - this.o.time.up < this.o.accelerationT) {
	        //swipe while animation was happening, increase multiplier
	        this.o.multiplier += this.o.acceleration;
	        // console.log('swipe while animation is happening', this.o.multiplier)
	      } else {
	        //reset
	        this.o.multiplier = 1;
	      }

	      //stop tween for touch-to-stop
	      this.tweenScroll.stop();
	      this.tweenScroll.pendingDelete = false;

	      (0, _util.dispatchClicks)(pointer, this.clickables, "onInputDown");
	      this.events.onInputDown.dispatch(target, pointer);
	    }
	  }, {
	    key: "handleMove",
	    value: function handleMove(pointer, x, y) {
	      if (!this.enabled) return;
	      this.isScrolling = true;
	      _ptHelper.set(x, y);
	      this.diff = this.old - _ptHelper[this.o.direction];

	      this.diff = this._requestDiff(this.diff, this.target, this.min, this.max, this.o.overflow);

	      this.target -= this.diff;

	      this.old = _ptHelper[this.o.direction];

	      //store timestamp for event
	      this.o.time.move = this.game.time.time;

	      this.acc = Math.min(Math.abs(this.diff / 30), this.o.maxAcceleration);

	      //go ahead and move the block
	      this.scrollObject[this.o.direction] = this.target;
	      this.handleUpdate();

	      if (this.o.emitMoving) this.events.onInputMove.dispatch(pointer, x, y);
	    }
	  }, {
	    key: "handleUp",
	    value: function handleUp(target, pointer) {
	      this.isDown = false;
	      // console.log('end')
	      if (this.o.addListeners) this.game.input.deleteMoveCallback(this.handleMove, this);

	      //store timestamp for event
	      this.o.time.up = pointer.timeUp;

	      if (this.o.time.up - this.o.time.down > this.o.accelerationT) {
	        this.o.multiplier = 1; // reset
	      }

	      var o = {
	        duration: 1,
	        target: this.target
	      };

	      // *** BOUNCING
	      if (!this.o.bouncing) o.duration = 0.01;

	      if (!this.o.infinite && this.scrollObject[this.o.direction] > this.max) {
	        this.target = this.max;
	        this.tweenTo(o.duration, this.target);
	      } else if (!this.o.infinite && this.scrollObject[this.o.direction] < this.min) {
	        this.target = this.min;
	        this.tweenTo(o.duration, this.target);
	      } else {
	        // *** MOMENTUM
	        this._addMomentum(o);

	        // *** SWIPING
	        this._addSwiping(o, pointer);

	        // *** SNAPPING
	        this._addSnapping(o);

	        // *** LIMITS
	        this._addLimits(o);

	        // *** DURATION
	        this._calculateDuration(o);

	        this.tweenTo(o.duration, o.target);
	      }

	      (0, _util.dispatchClicks)(pointer, this.clickables, "onInputUp");
	      this.events.onInputUp.dispatch(target, pointer, _util.dispatchClicks);
	    }
	  }, {
	    key: "_addMomentum",
	    value: function _addMomentum(o) {
	      if (!this.o.momentum) return o.target;

	      //distance to move after release
	      var offset = Math.pow(this.acc, 2) * this.maskLimits[this.o.direction];
	      offset = Math.min(this.maxOffset, offset);
	      offset = this.diff > 0 ? -this.o.multiplier * offset : this.o.multiplier * offset;

	      if (this.o.time.up - this.o.time.move < this.o.flickTimeThreshold && offset !== 0 && Math.abs(offset) > this.o.offsetThreshold) {
	        o.target += offset;
	      }
	      return o;
	    }
	  }, {
	    key: "_addSwiping",
	    value: function _addSwiping(o, pointer) {
	      var swipeDistance = Math.abs(this.down - this.current);
	      if (this.o.swipeEnabled && this.o.time.up - this.o.time.down < this.o.swipeTimeThreshold && swipeDistance > this.o.swipeThreshold) {
	        var direction = pointer[this.o.direction] < this.down ? "forward" : "backward";

	        if (direction == "forward") {
	          o.target -= this.o.snapStep / 2;
	        } else {
	          o.target += this.o.snapStep / 2;
	        }

	        this.events.onSwipe.dispatch(direction);
	      }
	      return o;
	    }
	  }, {
	    key: "_addSnapping",
	    value: function _addSnapping(o) {
	      if (!this.o.snapping) {
	        return o;
	      }
	      o.target = _math_utils2.default.nearestMultiple(o.target, this.o.snapStep);
	      return o;
	    }
	  }, {
	    key: "_addLimits",
	    value: function _addLimits(o) {
	      if (this.o.infinite) return o;
	      o.target = Math.max(o.target, this.min);
	      o.target = Math.min(o.target, this.max);
	      return o;
	    }
	  }, {
	    key: "_calculateDuration",
	    value: function _calculateDuration(o) {
	      var distance = Math.abs(o.target - this.scrollObject[this.o.direction]);
	      o.duration = this.o.duration * distance / this.maxOffset;
	      o.duration = Math.max(this.o.minDuration, o.duration);
	      return o;
	    }
	  }, {
	    key: "_requestDiff",
	    value: function _requestDiff(diff, target, min, max, overflow) {
	      if (this.o.infinite) return diff;

	      var scale = 0;
	      if (target > max) {
	        scale = (max + overflow - target) / overflow;
	        diff *= scale;
	      } else if (target < min) {
	        scale = -(min - overflow - target) / overflow;
	        diff *= scale;
	      }
	      return diff;
	    }
	  }, {
	    key: "tweenToSnap",
	    value: function tweenToSnap(duration, snapIndex) {
	      var target = this.o.from - this.o.snapStep * snapIndex;
	      this.tweenTo(duration, target);
	    }

	    /**
	     * [tweenTo tween to scroller to the target]
	     * @param  {Number} duration duration in seconds
	     * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
	     */

	  }, {
	    key: "tweenTo",
	    value: function tweenTo(duration, target) {
	      if (duration == 0) return this.setTo(target);

	      //stop a tween if it is currently happening
	      var o = _defineProperty({}, this.o.direction, target);

	      this.tweenScroll.onUpdateCallback(this.handleUpdate, this);
	      this.tweenScroll.onComplete.add(this.handleComplete, this);

	      this.tweenScroll.updateTweenData("vEnd", o, -1);
	      this.tweenScroll.updateTweenData("duration", duration * 1000, -1);
	      this.tweenScroll.updateTweenData("percent ", 0, -1);

	      this.tweenScroll.start();
	    }

	    // TODO - not really sure what this cancel method should do.
	    // Obviously it's meant to cancel a currently active scroll...but I'm
	    // not sure what expect from that.

	  }, {
	    key: "cancel",
	    value: function cancel() {
	      this.isDown = false;
	    }

	    /**
	     * [setTo sets the scroller to the target]
	     * @param  {Number} target   target relative to the scroller space (usually pixels, but can be angle)
	     */

	  }, {
	    key: "setTo",
	    value: function setTo(target) {
	      //stop a tween if it is currently happening
	      this.scrollObject[this.o.direction] = target;
	      this.tweenScroll.stop();

	      this.handleUpdate();
	      this.handleComplete();
	    }
	  }, {
	    key: "handleUpdate",
	    value: function handleUpdate() {
	      if (!this.enabled) return;
	      if (this.o.infinite) {
	        this.dispatchValues.total = Phaser.Math.wrap(this.scrollObject[this.o.direction], this.min, this.max);
	      } else {
	        this.dispatchValues.total = this.scrollObject[this.o.direction];
	      }

	      var step = this.dispatchValues.total - this.previousTotal;
	      if (step < -this.length / 2) {
	        step = step + this.length;
	      } else if (step > this.length / 2) {
	        step = step - this.length;
	      }

	      this.dispatchValues.step = step;
	      this.dispatchValues.percent = _math_utils2.default.percentageBetween2(this.dispatchValues.total, this.o.from, this.o.to);
	      this.events.onUpdate.dispatch(this.dispatchValues);

	      this.previousTotal = this.dispatchValues.total;
	    }
	  }, {
	    key: "handleComplete",
	    value: function handleComplete() {
	      if (!this.enabled) return;
	      this.isScrolling = false;
	      // reset multiplier when finished
	      this.o.multiplier = 1;
	      this.events.onComplete.dispatch();
	    }
	  }, {
	    key: "_updateMinMax",
	    value: function _updateMinMax() {
	      this.min = Math.min(this.o.from, this.o.to);
	      this.max = Math.max(this.o.from, this.o.to);
	      this.length = Math.abs(this.max - this.min);
	      this.previousTotal = this.o.from;
	    }
	  }]);

	  return Scroller;
	}();

	exports.default = Scroller;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _list_view = __webpack_require__(8);

	var _list_view2 = _interopRequireDefault(_list_view);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var defaultOptions = {
	  direction: 'x',
	  autocull: true,
	  momentum: false,
	  bouncing: true,
	  snapping: true,
	  overflow: 100,
	  padding: 10,
	  swipeEnabled: true,
	  offset: {
	    x: 100
	  }
	};

	var SwipeCarousel = function (_ListView) {
	  _inherits(SwipeCarousel, _ListView);

	  function SwipeCarousel(game, parent, bounds) {
	    var options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    _classCallCheck(this, SwipeCarousel);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SwipeCarousel).call(this, game, parent, bounds, Object.assign({}, defaultOptions, options)));

	    _this.scroller.options.snapStep = bounds.width + _this.o.padding;
	    return _this;
	  }

	  return SwipeCarousel;
	}(_list_view2.default);

	exports.default = SwipeCarousel;

/***/ }
/******/ ]);