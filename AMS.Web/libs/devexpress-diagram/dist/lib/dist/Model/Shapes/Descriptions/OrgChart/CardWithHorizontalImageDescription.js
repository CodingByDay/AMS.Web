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
exports.CardWithImageOnRightDescription = exports.CardWithImageOnLeftDescription = void 0;
var ShapeDescription_1 = require("../ShapeDescription");
var ShapeTypes_1 = require("../../ShapeTypes");
var CardBaseDescription_1 = require("./CardBaseDescription");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var CardWithHorizontalImageDescription = (function (_super) {
    __extends(CardWithHorizontalImageDescription, _super);
    function CardWithHorizontalImageDescription() {
        var _this = _super.call(this, new size_1.Size(1.5 * ShapeDescription_1.ShapeDefaultDimension, 0.5 * ShapeDescription_1.ShapeDefaultDimension)) || this;
        _this.isHorizontal = true;
        return _this;
    }
    CardWithHorizontalImageDescription.prototype.getToolboxHeightToWidthRatio = function (_width, _height) {
        return 26 / 46;
    };
    CardWithHorizontalImageDescription.prototype.getImageSize = function (shapeSize, includeMargins, forToolbox) {
        var imageSize = Math.min(shapeSize.height, shapeSize.width);
        if (!includeMargins)
            imageSize = Math.max(0, imageSize - 2 * this.getImageMargin(forToolbox));
        return new size_1.Size(imageSize, imageSize);
    };
    CardWithHorizontalImageDescription.prototype.getImageSizeByTextBlockSize = function (textBlockSize) {
        return this.getImageSize(new size_1.Size(Number.MAX_VALUE, textBlockSize.height), true);
    };
    return CardWithHorizontalImageDescription;
}(CardBaseDescription_1.CardBaseDescription));
var CardWithImageOnLeftDescription = (function (_super) {
    __extends(CardWithImageOnLeftDescription, _super);
    function CardWithImageOnLeftDescription() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTextAfterImage = true;
        return _this;
    }
    Object.defineProperty(CardWithImageOnLeftDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.CardWithImageOnLeft; },
        enumerable: false,
        configurable: true
    });
    return CardWithImageOnLeftDescription;
}(CardWithHorizontalImageDescription));
exports.CardWithImageOnLeftDescription = CardWithImageOnLeftDescription;
var CardWithImageOnRightDescription = (function (_super) {
    __extends(CardWithImageOnRightDescription, _super);
    function CardWithImageOnRightDescription() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isTextAfterImage = false;
        return _this;
    }
    Object.defineProperty(CardWithImageOnRightDescription.prototype, "key", {
        get: function () { return ShapeTypes_1.ShapeTypes.CardWithImageOnRight; },
        enumerable: false,
        configurable: true
    });
    return CardWithImageOnRightDescription;
}(CardWithHorizontalImageDescription));
exports.CardWithImageOnRightDescription = CardWithImageOnRightDescription;
//# sourceMappingURL=CardWithHorizontalImageDescription.js.map