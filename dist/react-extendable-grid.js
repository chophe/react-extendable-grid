(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("react")) : factory(root["React"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Grid_1 = __webpack_require__(1);
	exports.Grid = Grid_1.Grid;
	var Column_1 = __webpack_require__(4);
	exports.Column = Column_1.Column;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var helpers_1 = __webpack_require__(3);
	var Grid = (function (_super) {
	    __extends(Grid, _super);
	    function Grid(props) {
	        _super.call(this, props);
	    }
	    Grid.prototype.resolveChild = function (child, data, rowIndex) {
	        if (helpers_1.isFunction(child))
	            return child(data, rowIndex);
	        else
	            return child;
	    };
	    Grid.prototype.render = function () {
	        var _this = this;
	        var props = this.props;
	        var data = props.data || [];
	        var columns = props.children;
	        return React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, columns.map(function (c, colIndex) {
	            return React.createElement("th", {key: colIndex}, c.props.title);
	        }))), React.createElement("tbody", null, data.map(function (d, rowIndex) {
	            var columnsContents = [];
	            columns.map(function (c, colIndex) {
	                columnsContents.push(React.createElement("td", {key: colIndex}, _this.resolveChild(c.props.children, d, rowIndex)));
	            });
	            return React.createElement("tr", {key: rowIndex}, columnsContents);
	        })));
	    };
	    Grid.propTypes = {};
	    return Grid;
	}(React.Component));
	exports.Grid = Grid;


/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	// from http://stackoverflow.com/a/7356528
	var isFunction = function (f) {
	    var getType = {};
	    return f && getType.toString.call(f) === '[object Function]';
	};
	exports.isFunction = isFunction;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(2);
	var Column = (function (_super) {
	    __extends(Column, _super);
	    function Column(props) {
	        _super.call(this, props);
	    }
	    Column.prototype.render = function () {
	        return React.createElement("div", null);
	    };
	    Column.propTypes = {};
	    return Column;
	}(React.Component));
	exports.Column = Column;


/***/ }
/******/ ])
});
;