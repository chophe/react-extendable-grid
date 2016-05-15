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
	ReactDom.render(React.createElement(index_tsx_1.Grid, null, React.createElement(index_tsx_1.Column, null, function (p) { return p.name; }), React.createElement(index_tsx_1.Column, null, function (p) { return p.age; })), document.getElementById("react-root"));


/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Grid = __webpack_require__(169);
	exports.Grid = Grid;
	var Column = __webpack_require__(170);
	exports.Column = Column;


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
	var Grid = (function (_super) {
	    __extends(Grid, _super);
	    function Grid(props) {
	        _super.call(this, props);
	    }
	    Grid.prototype.render = function () {
	        var props = this.props;
	        var data = props.data || [];
	        var columns = props.children;
	        console.log(columns[0].props.children);
	        return React.createElement("table", null, React.createElement("tbody", null, data.map(function (d, rowIndex) {
	            console.log('rowIndex', rowIndex);
	            var columnsContents = [];
	            columns.map(function (c, colIndex) {
	                columnsContents.push(c.props.children(c, rowIndex));
	            });
	            return React.createElement("tr", {key: rowIndex}, columnsContents);
	        })));
	    };
	    Grid.propTypes = {};
	    return Grid;
	}(React.Component));
	module.exports = Grid;


/***/ },

/***/ 170:
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
	module.exports = Column;


/***/ }

})
});
;
//# sourceMappingURL=app.js.map