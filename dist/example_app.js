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
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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

	    return _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).apply(this, arguments));
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
	        var _ref2 = _slicedToArray(_ref, 2),
	            name = _ref2[0],
	            stateClass = _ref2[1];

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
	        var _a = _slicedToArray(a, 2),
	            name = _a[0],
	            klass = _a[1];

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

	    return _possibleConstructorReturn(this, (GameState.__proto__ || Object.getPrototypeOf(GameState)).apply(this, arguments));
	  }

	  _createClass(GameState, [{
	    key: "create",
	    value: function create() {
	      this.game.time.advancedTiming = true;
	      this.stage.backgroundColor = "#4488AA";
	      this.fpsTxt = this.game.add.text(50, 20, this.game.time.fps || '--', { font: "24px Arial", fill: "#00ff00" });
	      var txt = this.add.text(this.world.centerX, 50, this.name || this.game.state.current, { font: "30px Arial", fill: "#fff" });
	      txt.anchor.set(.5);
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

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

	    return _possibleConstructorReturn(this, (Boot.__proto__ || Object.getPrototypeOf(Boot)).apply(this, arguments));
	  }

	  _createClass(Boot, [{
	    key: 'preload',
	    value: function preload() {
	      this.game.load.crossOrigin = 'anonymous';
	    }
	  }, {
	    key: 'create',
	    value: function create() {
	      console.log('boot me up');
	      this.game.addDropDownMenu();
	      this.game.setupStage();
	      this.game.addStates();
	      this.game.startGame();
	    }
	  }]);

	  return Boot;
	}(Phaser.State);

	exports.default = Boot;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _game_state = __webpack_require__(3);

	var _game_state2 = _interopRequireDefault(_game_state);

	var _math_utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ListView = window.PhaserListView.ListView;

	var ListViewState = function (_GameState) {
	  _inherits(ListViewState, _GameState);

	  function ListViewState() {
	    _classCallCheck(this, ListViewState);

	    return _possibleConstructorReturn(this, (ListViewState.__proto__ || Object.getPrototypeOf(ListViewState)).apply(this, arguments));
	  }

	  _createClass(ListViewState, [{
	    key: 'preload',
	    value: function preload() {
	      this.game.load.crossOrigin = 'anonymous';
	    }
	  }, {
	    key: 'shutdown',
	    value: function shutdown() {
	      this.listView.destroy();
	    }
	  }, {
	    key: 'create',
	    value: function create() {
	      var maskW = 600;
	      var maskH = 200;
	      var boxW = maskW;
	      var boxH = 50;

	      this.listView = new ListView(this.game, this.world, new Phaser.Rectangle(this.world.centerX - maskW / 2, 120, maskW, 400), {
	        direction: 'y'
	      });

	      for (var i = 0; i < 500; i++) {
	        var color = Phaser.Color.getRandomColor();
	        var group = this.game.make.group(null);
	        var g = this.game.add.graphics(0, 0, group);
	        var h = boxH + Math.floor(Math.random() * 100);
	        g.beginFill(color).drawRect(0, 0, boxW, h);

	        var txt = this.game.add.text(boxW / 2, h / 2, i, { font: "40px Arial", fill: "#000" }, group);
	        txt.anchor.set(.5);
	        var img = this.game.add.image(0, 0, group.generateTexture());
	        this.listView.add(img);
	      }

	      _get(ListViewState.prototype.__proto__ || Object.getPrototypeOf(ListViewState.prototype), 'create', this).call(this);
	    }
	  }]);

	  return ListViewState;
	}(_game_state2.default);

	exports.default = ListViewState;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

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

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _game_state = __webpack_require__(3);

	var _game_state2 = _interopRequireDefault(_game_state);

	var _math_utils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var SwipeCarousel = window.PhaserListView.SwipeCarousel;

	var SwipeCarouselState = function (_GameState) {
	  _inherits(SwipeCarouselState, _GameState);

	  function SwipeCarouselState() {
	    _classCallCheck(this, SwipeCarouselState);

	    return _possibleConstructorReturn(this, (SwipeCarouselState.__proto__ || Object.getPrototypeOf(SwipeCarouselState)).apply(this, arguments));
	  }

	  _createClass(SwipeCarouselState, [{
	    key: 'preload',
	    value: function preload() {
	      this.game.load.crossOrigin = 'anonymous';
	    }
	  }, {
	    key: 'shutdown',
	    value: function shutdown() {
	      this.carousel.destroy();
	    }
	  }, {
	    key: 'create',
	    value: function create() {
	      var maskW = 600;
	      var maskH = 200;
	      var boxW = maskW;
	      var boxH = 200;

	      this.carousel = new SwipeCarousel(this.game, this.world, new Phaser.Rectangle(this.world.centerX - maskW / 2, 120, maskW, 400));

	      for (var i = 0; i < 10; i++) {
	        var color = Phaser.Color.getRandomColor();
	        var group = this.game.make.group(null);
	        var g = this.game.add.graphics(0, 0, group);
	        g.beginFill(color).drawRect(0, 0, boxW, boxH);

	        var txt = this.game.add.text(boxW / 2, boxH / 2, i, { font: "40px Arial", fill: "#000" }, group);
	        txt.anchor.set(.5);
	        var img = this.game.add.image(0, 0, group.generateTexture());
	        this.carousel.add(img);
	      }

	      _get(SwipeCarouselState.prototype.__proto__ || Object.getPrototypeOf(SwipeCarouselState.prototype), 'create', this).call(this);
	    }
	  }]);

	  return SwipeCarouselState;
	}(_game_state2.default);

	exports.default = SwipeCarouselState;

/***/ })
/******/ ]);