Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

Object.get = function(obj,item) {
    for (var key in obj) {
        if(key === item)
            return obj;
    }
};