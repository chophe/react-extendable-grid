"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var helpers_1 = require("./utils/helpers");
var quicksorter = require('quicksorter');
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
//# sourceMappingURL=Grid.js.map