"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReloadContentParameters = void 0;
var ReloadContentParameters = (function () {
    function ReloadContentParameters() {
        this.isEmpty = true;
    }
    ReloadContentParameters.prototype.add = function (dataKey, getData, layoutParameters) {
        if (dataKey !== undefined) {
            if (this._dataKeys === undefined)
                this._dataKeys = [];
            if (Array.isArray(dataKey))
                this._dataKeys = this._dataKeys.concat(dataKey);
            else
                this._dataKeys.push(dataKey);
        }
        this._getData = this._getData || getData;
        this._layoutParameters = this._layoutParameters || layoutParameters;
        this.isEmpty = false;
    };
    ReloadContentParameters.prototype.clear = function () {
        this.isEmpty = true;
        this._dataKeys = undefined;
        this._getData = undefined;
        this._layoutParameters = undefined;
    };
    Object.defineProperty(ReloadContentParameters.prototype, "empty", {
        get: function () { return this.isEmpty; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReloadContentParameters.prototype, "dataKeys", {
        get: function () { return this._dataKeys; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReloadContentParameters.prototype, "getData", {
        get: function () { return this._getData; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReloadContentParameters.prototype, "layoutParameters", {
        get: function () { return this._layoutParameters; },
        enumerable: false,
        configurable: true
    });
    return ReloadContentParameters;
}());
exports.ReloadContentParameters = ReloadContentParameters;
//# sourceMappingURL=ReloadContentParameters.js.map