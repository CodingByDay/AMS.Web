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
exports.DeleteShapeImageCommand = void 0;
var EditShapeImageCommandBase_1 = require("./EditShapeImageCommandBase");
var DeleteShapeImageCommand = (function (_super) {
    __extends(DeleteShapeImageCommand, _super);
    function DeleteShapeImageCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DeleteShapeImageCommand.prototype.isEnabled = function () {
        var selectedShape = this.getSelectedShape();
        return _super.prototype.isEnabled.call(this) && !selectedShape.image.isEmpty;
    };
    DeleteShapeImageCommand.prototype.executeCore = function (state, parameter) {
        return _super.prototype.executeCore.call(this, state, undefined);
    };
    return DeleteShapeImageCommand;
}(EditShapeImageCommandBase_1.EditShapeImageCommandBase));
exports.DeleteShapeImageCommand = DeleteShapeImageCommand;
//# sourceMappingURL=DeleteShapeImageCommand.js.map