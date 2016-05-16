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
//# sourceMappingURL=Grid.js.map