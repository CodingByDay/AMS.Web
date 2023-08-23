"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataLayoutParameters = exports.DataLayoutType = void 0;
var LayoutSettings_1 = require("../Layout/LayoutSettings");
var WideTree_1 = require("../Layout/Builders/WideTree");
var Sugiyama_1 = require("../Layout/Builders/Sugiyama");
var DataLayoutType;
(function (DataLayoutType) {
    DataLayoutType[DataLayoutType["Tree"] = 0] = "Tree";
    DataLayoutType[DataLayoutType["Sugiyama"] = 1] = "Sugiyama";
})(DataLayoutType = exports.DataLayoutType || (exports.DataLayoutType = {}));
var DataLayoutParameters = (function () {
    function DataLayoutParameters(sizeSettings, parameter) {
        this.sizeSettings = sizeSettings;
        if (parameter) {
            if (parameter.type !== undefined) {
                this.layoutType = parameter.type;
                this.layoutSettings = this.layoutType === DataLayoutType.Sugiyama ? new LayoutSettings_1.LayoutSettings() : new LayoutSettings_1.TreeLayoutSettings();
            }
            if (parameter.orientation !== undefined)
                this.layoutSettings.orientation = parameter.orientation;
            this.skipPointIndices = parameter.skipPointIndices;
            this.autoSizeEnabled = parameter.autoSizeEnabled;
        }
    }
    Object.defineProperty(DataLayoutParameters.prototype, "needAutoLayout", {
        get: function () { return this.layoutType !== undefined; },
        enumerable: false,
        configurable: true
    });
    DataLayoutParameters.prototype.getLayoutBuilder = function (graph) {
        return (this.layoutType === DataLayoutType.Tree) ?
            new WideTree_1.TreeLayoutBuilder(this.layoutSettings, graph) :
            new Sugiyama_1.SugiyamaLayoutBuilder(this.layoutSettings, graph);
    };
    return DataLayoutParameters;
}());
exports.DataLayoutParameters = DataLayoutParameters;
//# sourceMappingURL=DataLayoutParameters.js.map