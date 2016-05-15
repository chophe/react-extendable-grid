// from http://stackoverflow.com/a/7356528
let isFunction = (f)=>{
    var getType = {};
    return f && getType.toString.call(f) === '[object Function]';
}

export{
    isFunction
}
