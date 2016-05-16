"use strict";
// from http://stackoverflow.com/a/7356528
var isFunction = function (f) {
    var getType = {};
    return f && getType.toString.call(f) === '[object Function]';
};
exports.isFunction = isFunction;
//# sourceMappingURL=helpers.js.map