"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var helpers_1 = require("./utils/helpers");
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
//# sourceMappingURL=Grid.js.map