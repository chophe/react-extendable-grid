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
	        name: 'raoof',
	        age: 28
	    },
	    {
	        name: 'hojat',
	        age: 29
	    }
	];
	ReactDom.render(React.createElement(index_tsx_1.Grid, {data: data}, React.createElement(index_tsx_1.Column, {title: "Name"}, function (p) { return p.name; }), React.createElement(index_tsx_1.Column, {title: "Age"}, function (p) { return p.age; }), React.createElement(index_tsx_1.Column, {title: "Static"}, "static value")), document.getElementById("react-root"));


/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Grid_1 = __webpack_require__(169);
	exports.Grid = Grid_1.Grid;
	var Column_1 = __webpack_require__(171);
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

/***/ 170:
/***/ function(module, exports) {

	"use strict";
	// from http://stackoverflow.com/a/7356528
	var isFunction = function (f) {
	    var getType = {};
	    return f && getType.toString.call(f) === '[object Function]';
	};
	exports.isFunction = isFunction;


/***/ },

/***/ 171:
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