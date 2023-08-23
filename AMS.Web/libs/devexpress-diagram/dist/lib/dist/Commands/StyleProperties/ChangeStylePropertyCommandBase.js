"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeStylePropertyCommandBase = void 0;
var StylePropertyCommandBase_1 = require("./StylePropertyCommandBase");
var ChangeStylePropertyCommandBase = (function (_super) {
    __extends(ChangeStylePropertyCommandBase, _super);
    function ChangeStylePropertyCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChangeStylePropertyCommandBase.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.history.beginTransaction();
        var items = this.control.selection.getSelectedItems();
        parameter = this.processParameter(parameter);
        items.forEach(function (item) {
            var styleProperty = _this.getStyleProperty();
            _this.control.history.addAndRedo(_this.createHistoryItem(item, styleProperty, parameter));
        });
        this.updateInputPosition(parameter);
        this.control.history.endTransaction();
        return true;
    };
    ChangeStylePropertyCommandBase.prototype.getDefaultValue = function () {
        return this.getDefaultStyleObj()[this.getStyleProperty()];
    };
    ChangeStylePropertyCommandBase.prototype.processParameter = function (parameter) {
        return parameter;
    };
    return ChangeStylePropertyCommandBase;
}(StylePropertyCommandBase_1.StylePropertyCommandBase));
exports.ChangeStylePropertyCommandBase = ChangeStylePropertyCommandBase;
//# sourceMappingURL=ChangeStylePropertyCommandBase.js.map