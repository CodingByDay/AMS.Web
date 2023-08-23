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
exports.ChangeShapeImageHistoryItem = void 0;
var HistoryItem_1 = require("../HistoryItem");
var ImageInfo_1 = require("../../Images/ImageInfo");
var ChangeShapeImageHistoryItem = (function (_super) {
    __extends(ChangeShapeImageHistoryItem, _super);
    function ChangeShapeImageHistoryItem(item, imageUrl) {
        var _this = _super.call(this) || this;
        _this.shapeKey = item.key;
        _this.imageUrl = imageUrl;
        return _this;
    }
    ChangeShapeImageHistoryItem.prototype.redo = function (manipulator) {
        var item = manipulator.model.findShape(this.shapeKey);
        this.oldImage = item.image;
        manipulator.changeShapeImage(item, new ImageInfo_1.ImageInfo(this.imageUrl));
    };
    ChangeShapeImageHistoryItem.prototype.undo = function (manipulator) {
        var item = manipulator.model.findShape(this.shapeKey);
        manipulator.changeShapeImage(item, this.oldImage);
    };
    return ChangeShapeImageHistoryItem;
}(HistoryItem_1.HistoryItem));
exports.ChangeShapeImageHistoryItem = ChangeShapeImageHistoryItem;
//# sourceMappingURL=ChangeShapeImageHistoryItem.js.map