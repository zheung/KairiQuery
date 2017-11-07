webpackJsonp([2],{

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_test_vue__ = __webpack_require__(308);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_test_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_test_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30ab9993_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_test_vue__ = __webpack_require__(309);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(306)
}
var normalizeComponent = __webpack_require__(50)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-30ab9993"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_test_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_30ab9993_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_test_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "comp\\test\\_test.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30ab9993", Component.options)
  } else {
    hotAPI.reload("data-v-30ab9993", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 236:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FrameScroll_vue__ = __webpack_require__(281);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FrameScroll_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FrameScroll_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3b078eca_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FrameScroll_vue__ = __webpack_require__(282);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(279)
}
var normalizeComponent = __webpack_require__(50)
/* script */

/* template */

/* template functional */
  var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3b078eca"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_FrameScroll_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3b078eca_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_FrameScroll_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "comp\\_comp\\FrameScroll.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3b078eca", Component.options)
  } else {
    hotAPI.reload("data-v-3b078eca", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 279:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(280);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("f7390652", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b078eca\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./FrameScroll.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-3b078eca\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./FrameScroll.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 280:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(41)(undefined);
// imports


// module
exports.push([module.i, "\n.compFrameScroll[data-v-3b078eca] {\n\toverflow: hidden;\n}\n.inbox[data-v-3b078eca] {\n\tposition: relative;\n\n\twidth: calc(100% + 17px);\n\theight: calc(100% + 17px);\n\n\toverflow: scroll;\n}\n.scr[data-v-3b078eca] {\n\twidth: 10px;\n\theight: 20px;\n\n\tposition: absolute;\n\n\ttop: 0px;\n\tright: 0px;\n\n\tcursor: pointer;\n\n\tborder-radius: 5px 0px 0px 5px;\n\tbackground-color: transparent;\n}\n.scr.show[data-v-3b078eca] {\n\tbackground-color: rgba(119, 119, 119, 0.4);\n}\n.scr.show[data-v-3b078eca]:hover {\n\tbackground-color: rgba(119, 119, 119, 0.7);\n}\n", ""]);

// exports


/***/ }),

/***/ 281:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ToggleButton = __webpack_require__(96);

var _ToggleButton2 = _interopRequireDefault(_ToggleButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } //
//
//
//
//
//
//
//
//

exports.default = {
	props: {
		size: {},
		height: {},
		width: {},
		clazz: {}
	},
	components: {
		ToggleButton: _ToggleButton2.default
	},
	data: function data() {
		var event = 'ontouchstart' in window ? {
			down: 'touchstart',
			move: 'touchmove',
			up: 'touchend',
			over: 'touchstart',
			out: 'touchend'
		} : {
			down: 'mousedown',
			move: 'mousemove',
			up: 'mouseup',
			over: 'mouseover',
			out: 'mouseout'
		};

		return {
			mobile: 'ontouchstart' in window,
			event: event,
			active: false,
			now: 0,
			down: false
		};
	},
	methods: {
		click: function () {
			var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
				return regeneratorRuntime.wrap(function _callee$(_context) {
					while (1) {
						switch (_context.prev = _context.next) {
							case 0:
								if (this.dealer) this.dealer(this.id);

							case 1:
							case 'end':
								return _context.stop();
						}
					}
				}, _callee, this);
			}));

			function click() {
				return _ref.apply(this, arguments);
			}

			return click;
		}(),
		scrRoll: function scrRoll() {
			var ib = this.$refs.ib;

			if (ib.scrollHeight > ib.clientHeight) {
				var scr = this.$refs.scr;

				scr.style.top = ib.scrollTop * ib.clientHeight / ib.scrollHeight + 'px';
			}
		},
		scrDown: function scrDown() {
			var scr = this.$refs.scr;

			document.addEventListener(this.event.move, this.scrMove);
			document.addEventListener(this.event.up, this.scrUpon);

			document.body.className += ' nosel';
			scr.style.backgroundColor = 'rgba(119, 119, 119, 0.7)';

			this.down = true;

			return false;
		},
		scrUpon: function scrUpon() {
			var scr = this.$refs.scr;

			this.down = false;

			scr.style.backgroundColor = '';
			document.body.className = document.body.className.replace(/ nosel/g, '');

			document.removeEventListener(this.event.move, this.scrMove);
			document.removeEventListener(this.event.up, this.scrUpon);

			return false;
		},
		scrMove: function scrMove(e) {
			if (this.down) {
				var ib = this.$refs.ib;
				var scr = this.$refs.scr;

				if (ib.scrollHeight > ib.clientHeight) {
					var top = scr.offsetTop + e.movementY;
					var max = ib.clientHeight - ib.clientHeight * ib.clientHeight / ib.scrollHeight;

					if (top >= 0 && top <= max) {
						scr.style.top = top + 'px';
						ib.scrollTop = top * ib.scrollHeight / ib.clientHeight;
					}
				}
			}

			return false;
		}
	},

	updated: function updated() {
		var ib = this.$refs.ib;
		var scr = this.$refs.scr;

		if (ib.scrollHeight > ib.clientHeight) {

			scr.style.height = ib.clientHeight * ib.clientHeight / ib.scrollHeight + 'px';
			scr.className += ' show';
		} else {
			scr.className = scr.className.replace(/ show/g, '');
		}
	}
};

/***/ }),

/***/ 282:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "compFrameScroll" }, [
    _c(
      "div",
      { ref: "ib", staticClass: "inbox", on: { scroll: _vm.scrRoll } },
      [_vm._t("default")],
      2
    ),
    _vm._v(" "),
    _c("div", {
      ref: "scr",
      staticClass: "scr",
      on: { mousedown: _vm.scrDown, touchstart: _vm.scrDown }
    })
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3b078eca", esExports)
  }
}

/***/ }),

/***/ 306:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(307);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(49)("e06336d2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30ab9993\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./_test.vue", function() {
     var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30ab9993\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./_test.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 307:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(41)(undefined);
// imports


// module
exports.push([module.i, "\ndiv[data-v-30ab9993] {\r\n\tcolor: snow;\n}\r\n", ""]);

// exports


/***/ }),

/***/ 308:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _FrameScroll = __webpack_require__(236);

var _FrameScroll2 = _interopRequireDefault(_FrameScroll);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	components: {
		FrameScroll: _FrameScroll2.default
	},
	mounted: function mounted() {
		this.msg += 1;
	},
	activated: function activated() {
		this.msg += 1;
	},
	data: function data() {
		return {};
	}
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 309:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "h" }, [_vm._v("这里就是V2的试验场啦")]),
      _vm._v(" "),
      _c("div", { staticClass: "h" }, [_vm._v("黄黑色很酷炫不是吗？！")]),
      _vm._v(" "),
      _c("FrameScroll", { attrs: { card: _vm.card } })
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30ab9993", esExports)
  }
}

/***/ })

});