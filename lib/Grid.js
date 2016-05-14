"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require("react");
var Grid = (function (_super) {
    __extends(Grid, _super);
    function Grid(props) {
        _super.call(this, props);
    }
    Grid.prototype.render = function () {
        return React.createElement("div", null, "test");
    };
    Grid.propTypes = {};
    return Grid;
}(React.Component));
module.exports = Grid;
//# sourceMappingURL=Grid.js.map