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
	        this.state = {};
	        this.filters = {};
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
	        var containerClassName = props.containerClassName, tableClassName = props.tableClassName;
	        if (helpers_1.isUndefined(containerClassName) && helpers_1.isUndefined(tableClassName)) {
	            containerClassName = 'extendable-grid-container shadow-z-1';
	            tableClassName = 'table table-hover';
	        }
	        return React.createElement("div", {className: containerClassName}, React.createElement("table", {className: tableClassName}, React.createElement("thead", null, React.createElement("tr", null, columns.map(function (c, colIndex) {
	            if (!(colIndex in _this.filters)) {
	                var filterInfo_1 = {};
	                filterInfo_1.onChange = function (v) {
	                    // TODO: if the typeof v is SyntheticEvent object then it will be null, extending it will prevent the bug, maybe there is some other way
	                    filterInfo_1.value = typeof v == 'object' ? helpers_1.extend(v) : v;
	                    _this.forceUpdate();
	                };
	                if (helpers_1.isUndefined(c.props.filterComponent)) {
	                    filterInfo_1.component = React.createElement('input', {
	                        onChange: function (e) { return filterInfo_1.onChange(e.target.value); }
	                    });
	                }
	                else {
	                    var newProps = helpers_1.extend(c.props.filterComponent.props, {
	                        onChange: function (v) { return filterInfo_1.onChange(v); }
	                    });
	                    filterInfo_1.component = React.cloneElement(c.props.filterComponent, newProps, c.props.filterComponent.children);
	                }
	                filterInfo_1.filterMethod = c.props.filterMethod;
	                _this.filters[colIndex] = filterInfo_1;
	            }
	            return React.createElement("th", {key: colIndex}, React.createElement("div", null, c.props.title), _this.filters[colIndex].component);
	        }))), React.createElement("tbody", null, data.map(function (d, rowIndex) {
	            var doRenderRow = true;
	            var columnsContents = [];
	            columns.map(function (c, colIndex) {
	                columnsContents.push(React.createElement("td", {key: colIndex, "data-title": c.props.title}, _this.resolveChild(c.props.children, d, rowIndex)));
	                var filter = _this.filters[colIndex];
	                if (helpers_1.isUndefined(filter.filterMethod) == false &&
	                    filter.value &&
	                    filter.filterMethod(d, filter.value) == false) {
	                    doRenderRow = false;
	                }
	            });
	            return doRenderRow ? React.createElement("tr", {key: rowIndex}, columnsContents) : null;
	        }))));
	    };
	    Grid.propTypes = {};
	    Grid.defaultProps = {
	        showFilterBox: false
	    };
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
	var isUndefined = function (v) {
	    return typeof (v) == "undefined";
	};
	exports.isUndefined = isUndefined;
	// from http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
	var extend = function () {
	    // Variables
	    var extended = {};
	    var deep = false;
	    var i = 0;
	    var length = arguments.length;
	    // Check if a deep merge
	    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
	        deep = arguments[0];
	        i++;
	    }
	    // Merge the object into the extended object
	    var merge = function (obj) {
	        for (var prop in obj) {
	            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
	                // If deep merge and property is an object, merge properties
	                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
	                    extended[prop] = extend(true, extended[prop], obj[prop]);
	                }
	                else {
	                    extended[prop] = obj[prop];
	                }
	            }
	        }
	    };
	    // Loop through each object and conduct a merge
	    for (; i < length; i++) {
	        var obj = arguments[i];
	        merge(obj);
	    }
	    return extended;
	};
	exports.extend = extend;


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