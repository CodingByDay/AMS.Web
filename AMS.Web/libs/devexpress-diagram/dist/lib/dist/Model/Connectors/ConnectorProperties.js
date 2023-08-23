"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorProperties = exports.DEFAULT_CONNECTOR_ENDLINEENDING = exports.DEFAULT_CONNECTOR_STARTLINEENDING = exports.DEFAULT_CONNECTOR_LINEOPTION = exports.ConnectorLineEnding = exports.ConnectorLineOption = void 0;
var ConnectorLineOption;
(function (ConnectorLineOption) {
    ConnectorLineOption[ConnectorLineOption["Straight"] = 0] = "Straight";
    ConnectorLineOption[ConnectorLineOption["Orthogonal"] = 1] = "Orthogonal";
})(ConnectorLineOption = exports.ConnectorLineOption || (exports.ConnectorLineOption = {}));
var ConnectorLineEnding;
(function (ConnectorLineEnding) {
    ConnectorLineEnding[ConnectorLineEnding["None"] = 0] = "None";
    ConnectorLineEnding[ConnectorLineEnding["Arrow"] = 1] = "Arrow";
    ConnectorLineEnding[ConnectorLineEnding["OutlinedTriangle"] = 2] = "OutlinedTriangle";
    ConnectorLineEnding[ConnectorLineEnding["FilledTriangle"] = 3] = "FilledTriangle";
})(ConnectorLineEnding = exports.ConnectorLineEnding || (exports.ConnectorLineEnding = {}));
exports.DEFAULT_CONNECTOR_LINEOPTION = ConnectorLineOption.Orthogonal;
exports.DEFAULT_CONNECTOR_STARTLINEENDING = ConnectorLineEnding.None;
exports.DEFAULT_CONNECTOR_ENDLINEENDING = ConnectorLineEnding.Arrow;
var ConnectorProperties = (function () {
    function ConnectorProperties() {
        this.lineOption = exports.DEFAULT_CONNECTOR_LINEOPTION;
        this.startLineEnding = exports.DEFAULT_CONNECTOR_STARTLINEENDING;
        this.endLineEnding = exports.DEFAULT_CONNECTOR_ENDLINEENDING;
    }
    ConnectorProperties.prototype.clone = function () {
        var clone = new ConnectorProperties();
        clone.lineOption = this.lineOption;
        clone.startLineEnding = this.startLineEnding;
        clone.endLineEnding = this.endLineEnding;
        return clone;
    };
    ConnectorProperties.prototype.forEach = function (callback) {
        for (var propertyName in this)
            if (Object.prototype.hasOwnProperty.call(this, propertyName))
                callback(propertyName);
    };
    ConnectorProperties.prototype.toObject = function () {
        var result = {};
        var modified = false;
        if (this.lineOption !== exports.DEFAULT_CONNECTOR_LINEOPTION) {
            result["lineOption"] = this.lineOption;
            modified = true;
        }
        if (this.startLineEnding !== exports.DEFAULT_CONNECTOR_STARTLINEENDING) {
            result["startLineEnding"] = this.startLineEnding;
            modified = true;
        }
        if (this.endLineEnding !== exports.DEFAULT_CONNECTOR_ENDLINEENDING) {
            result["endLineEnding"] = this.endLineEnding;
            modified = true;
        }
        return modified ? result : null;
    };
    ConnectorProperties.prototype.fromObject = function (obj) {
        if (typeof obj["lineOption"] === "number")
            this.lineOption = obj["lineOption"];
        if (typeof obj["startLineEnding"] === "number")
            this.startLineEnding = obj["startLineEnding"];
        if (typeof obj["endLineEnding"] === "number")
            this.endLineEnding = obj["endLineEnding"];
    };
    return ConnectorProperties;
}());
exports.ConnectorProperties = ConnectorProperties;
//# sourceMappingURL=ConnectorProperties.js.map