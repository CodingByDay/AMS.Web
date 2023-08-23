"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShapeParameters = exports.ShapeParameter = void 0;
var ShapeParameter = (function () {
    function ShapeParameter(key, value) {
        this.key = key;
        this.value = value;
    }
    return ShapeParameter;
}());
exports.ShapeParameter = ShapeParameter;
var ShapeParameters = (function () {
    function ShapeParameters() {
        this.items = {};
    }
    ShapeParameters.prototype.add = function (parameter) {
        this.items[parameter.key] = parameter;
    };
    ShapeParameters.prototype.addRange = function (parameters) {
        for (var i = 0; i < parameters.length; i++)
            this.add(parameters[i]);
    };
    ShapeParameters.prototype.get = function (key) {
        return this.items[key];
    };
    ShapeParameters.prototype.forEach = function (callback) {
        for (var key in this.items)
            if (Object.prototype.hasOwnProperty.call(this.items, key))
                callback(this.items[key]);
    };
    ShapeParameters.prototype.clone = function () {
        var result = new ShapeParameters();
        this.forEach(function (p) { result.add(new ShapeParameter(p.key, p.value)); });
        return result;
    };
    ShapeParameters.prototype.toObject = function () {
        var result = {};
        var modified = false;
        this.forEach(function (p) {
            result[p.key] = { "value": p.value };
            modified = true;
        });
        return modified ? result : null;
    };
    ShapeParameters.prototype.fromObject = function (obj) {
        this.forEach(function (p) {
            var paramObj = obj[p.key];
            if (paramObj)
                if (typeof paramObj["value"] === "number")
                    p.value = paramObj["value"];
        });
    };
    return ShapeParameters;
}());
exports.ShapeParameters = ShapeParameters;
//# sourceMappingURL=ShapeParameters.js.map