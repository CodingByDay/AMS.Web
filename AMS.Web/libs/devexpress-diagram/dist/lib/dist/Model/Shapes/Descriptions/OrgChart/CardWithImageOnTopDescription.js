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
exports.CardWithImageOnTopDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var ShapeTypes_1 = require("../../ShapeTypes");
var CardBaseDescription_1 = require("./CardBaseDescription");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var CardWithImageOnTopDescription = (function (_super) {
    __extends(CardWithImageOnTopDescription, _super);
    function CardWithImageOnTopDescription() {
        var _this = _super.call(this, new size_1.Size(32 / 40 * ShapeDescription_1.ShapeDefaultDimension, ShapeDescription_1.ShapeDefaultDimension)) || this;
        _this.isTextAfterImage = true;
        _this.isHorizontal = false;
        return _this;
    }
    Object.defineProperty(CardWithImageOnTopDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.CardWithImageOnTop; },
        enumerable: false,
        configurable: true
    });
    CardWithImageOnTopDescription.prototype.getImageSize = function (shapeSize, includeMargins, forToolbox) {
        var w = shapeSize.width / 2;
        if (unit_converter_1.UnitConverter.twipsToPixels(w) % 2 === 1)
            w -= unit_converter_1.UnitConverter.pixelsToTwips(1);
        var imageSize = Math.max(0, shapeSize.height - (includeMargins ? 0 : 2 * this.getImageMargin(forToolbox)));
        imageSize = Math.min(w, imageSize);
        return new size_1.Size(imageSize, imageSize);
    };
    CardWithImageOnTopDescription.prototype.getImageSizeByTextBlockSize = function (textBlockSize) {
        return this.getImageSize(new size_1.Size(textBlockSize.width, Number.MAX_VALUE), true);
    };
    return CardWithImageOnTopDescription;
}(CardBaseDescription_1.CardBaseDescription));
exports.CardWithImageOnTopDescription = CardWithImageOnTopDescription;
//# sourceMappingURL=CardWithImageOnTopDescription.js.map