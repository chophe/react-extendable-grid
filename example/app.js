(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDom = __webpack_require__(33);
	var index_tsx_1 = __webpack_require__(168);
	var data = [
	    {
	        name: 'raoof 1',
	        age: 28
	    },
	    {
	        name: 'raoof 2',
	        age: 19
	    },
	    {
	        name: 'hojat',
	        age: 29
	    }
	];
	ReactDom.render(React.createElement(index_tsx_1.Grid, {data: data, showFilterBox: true}, React.createElement(index_tsx_1.Column, {title: "Name", filterMethod: function (p, v) { return p.name.indexOf(v) > -1; }}, function (p) { return p.name; }), React.createElement(index_tsx_1.Column, {title: "Age", filterComponent: React.createElement("input", {type: "checkbox"}), filterMethod: function (p, e) { return e.target.checked ? p.age > 20 : p.age <= 20; }, sortMethod: function (a, b) { return a.age < b.age ? -1 : a.age > b.age ? 1 : 0; }}, function (p) { return p.age; }), React.createElement(index_tsx_1.Column, {title: "Static", filterComponent: React.createElement("input", {type: "checkbox"})}, "static value")), document.getElementById("react-root"));


/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Grid_1 = __webpack_require__(169);
	exports.Grid = Grid_1.Grid;
	var Column_1 = __webpack_require__(172);
	exports.Column = Column_1.Column;


/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var helpers_1 = __webpack_require__(170);
	var quicksorter = __webpack_require__(171);
	var qsort = quicksorter["default"];
	var Grid = (function (_super) {
	    __extends(Grid, _super);
	    function Grid(props) {
	        _super.call(this, props);
	        this.state = {};
	        this.columnsInfo = {};
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
	        var columns = props.children;
	        var originalData = props.data || [];
	        var data = originalData.map(function (d) { return d; });
	        for (var c in this.columnsInfo) {
	            if (this.columnsInfo[c].sorted) {
	                qsort(data, this.columnsInfo[c].sortMethod);
	                break;
	            }
	        }
	        var containerClassName = props.containerClassName, tableClassName = props.tableClassName;
	        if (helpers_1.isUndefined(containerClassName) && helpers_1.isUndefined(tableClassName)) {
	            containerClassName = 'extendable-grid-container shadow-z-1';
	            tableClassName = 'table table-hover';
	        }
	        return React.createElement("div", {className: containerClassName}, React.createElement("table", {className: tableClassName}, React.createElement("thead", null, React.createElement("tr", null, columns.map(function (c, colIndex) {
	            // TODO: move to componentWillMount && componentWillReceiveProps
	            if (!(colIndex in _this.columnsInfo)) {
	                var columnInfo_1 = {};
	                columnInfo_1.filterOnChange = function (v) {
	                    // TODO: if the typeof v is SyntheticEvent object then it will be null, extending it will prevent the bug, maybe there is some other way
	                    columnInfo_1.filterValue = typeof v == 'object' ? helpers_1.extend(v) : v;
	                    _this.forceUpdate();
	                };
	                if (helpers_1.isUndefined(c.props.filterComponent)) {
	                    columnInfo_1.filterComponent = React.createElement('input', {
	                        onChange: function (e) { return columnInfo_1.filterOnChange(e.target.value); }
	                    });
	                }
	                else {
	                    var newProps = helpers_1.extend(c.props.filterComponent.props, {
	                        onChange: function (v) { return columnInfo_1.filterOnChange(v); }
	                    });
	                    columnInfo_1.filterComponent = React.cloneElement(c.props.filterComponent, newProps, c.props.filterComponent.children);
	                }
	                columnInfo_1.filterMethod = c.props.filterMethod;
	                columnInfo_1.sorted = false;
	                columnInfo_1.sortMethod = c.props.sortMethod;
	                _this.columnsInfo[colIndex] = columnInfo_1;
	            }
	            return React.createElement("th", {key: colIndex}, React.createElement("div", null, c.props.title), _this.columnsInfo[colIndex].filterComponent, React.createElement("button", {onClick: function () {
	                for (var c_1 in _this.columnsInfo) {
	                    _this.columnsInfo[c_1].sorted = false;
	                }
	                _this.columnsInfo[colIndex].sorted = true;
	                _this.forceUpdate();
	            }}, "sort"));
	        }))), React.createElement("tbody", null, data.map(function (d, rowIndex) {
	            var doRenderRow = true;
	            var columnsContents = [];
	            columns.map(function (c, colIndex) {
	                columnsContents.push(React.createElement("td", {key: colIndex, "data-title": c.props.title}, _this.resolveChild(c.props.children, d, rowIndex)));
	                var columnsInfo = _this.columnsInfo[colIndex];
	                if (helpers_1.isUndefined(columnsInfo.filterMethod) == false &&
	                    columnsInfo.filterValue &&
	                    columnsInfo.filterMethod(d, columnsInfo.filterValue) == false) {
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

/***/ 170:
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

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define([], factory);
		else if(typeof exports === 'object')
			exports["quicksorter"] = factory();
		else
			root["quicksorter"] = factory();
	})(this, function() {
	return /******/ (function(modules) { // webpackBootstrap
	/******/ 	// The module cache
	/******/ 	var installedModules = {};
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
	/******/ 	// Load entry module and return exports
	/******/ 	return __webpack_require__(0);
	/******/ })
	/************************************************************************/
	/******/ ([
	/* 0 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		    value: true
		});
		exports.default = quicksort;
		
		function quicksort(array, predicate) {
		    _quicksort(array, 0, array.length - 1, predicate ? predicate : defaultPredicate);
		}
		
		function _quicksort(array, lo, hi, predicate) {
		    if (lo < hi) {
		        var pivotIndex = partition(array, lo, hi, predicate);
		        _quicksort(array, lo, pivotIndex, predicate);
		        _quicksort(array, pivotIndex + 1, hi, predicate);
		    }
		}
		
		function partition(array, lo, hi, predicate) {
		    var pivot = array[lo];
		    var i = lo - 1;
		    var j = hi + 1;
		
		    while (true) {
		
		        do {
		            i += 1;
		        } while (predicate(array[i], pivot) < 0 /*array[i] < pivot*/);
		
		        do {
		            j -= 1;
		        } while (predicate(array[j], pivot) > 0 /*array[j] > pivot*/);
		
		        if (i < j) swap(array, i, j);else return j;
		    }
		}
		
		function swap(array, i, j) {
		    var tmp = array[i];
		    array[i] = array[j];
		    array[j] = tmp;
		}
		
		function defaultPredicate(a, b) {
		    return a < b ? -1 : a > b ? 1 : 0;
		}

	/***/ }
	/******/ ])
	});
	;


/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
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

})
});
;
//# sourceMappingURL=app.js.map