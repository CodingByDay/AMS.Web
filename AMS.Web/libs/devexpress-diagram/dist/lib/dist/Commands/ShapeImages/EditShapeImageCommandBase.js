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
exports.EditShapeImageCommandBase = void 0;
var ChangeShapeImageHistoryItem_1 = require("../../History/Properties/ChangeShapeImageHistoryItem");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var EditShapeImageCommandBase = (function (_super) {
    __extends(EditShapeImageCommandBase, _super);
    function EditShapeImageCommandBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EditShapeImageCommandBase.prototype.isEnabled = function () {
        var selectedShape = this.getSelectedShape();
        return _super.prototype.isEnabled.call(this) && !!selectedShape && !selectedShape.locked && selectedShape.enableImage && selectedShape.allowEditImage;
    };
    EditShapeImageCommandBase.prototype.getValue = function () {
        var selectedShape = this.getSelectedShape();
        var imageUrl = (selectedShape) ? selectedShape.image.exportUrl : undefined;
        return imageUrl;
    };
    EditShapeImageCommandBase.prototype.getSelectedShape = function () {
        var selectedShapes = this.control.selection.getSelectedShapes(true);
        return (selectedShapes.length === 1) ? selectedShapes[0] : undefined;
    };
    EditShapeImageCommandBase.prototype.executeCore = function (state, parameter) {
        this.control.history.beginTransaction();
        var selectedUnlockedShapes = this.control.selection.getSelectedShapes(false);
        this.control.history.addAndRedo(new ChangeShapeImageHistoryItem_1.ChangeShapeImageHistoryItem(selectedUnlockedShapes[0], parameter));
        this.control.history.endTransaction();
        return true;
    };
    return EditShapeImageCommandBase;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.EditShapeImageCommandBase = EditShapeImageCommandBase;
//# sourceMappingURL=EditShapeImageCommandBase.js.map