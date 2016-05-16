// from http://stackoverflow.com/a/7356528
let isFunction = (f) => {
    var getType = {};
    return f && getType.toString.call(f) === '[object Function]';
}
let isUndefined = (v) => {
    return typeof (v) == "undefined";
}

// from http://gomakethings.com/vanilla-javascript-version-of-jquery-extend/
let extend: any = function() {

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
    var merge = function(obj) {
        for (var prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                // If deep merge and property is an object, merge properties
                if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
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

export {
isFunction, isUndefined, extend
}
