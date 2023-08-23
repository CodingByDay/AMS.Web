"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageInfo = void 0;
var base64_1 = require("@devexpress/utils/lib/utils/base64");
var ImageInfo = (function () {
    function ImageInfo(imageUrlOrBase64) {
        this.url = undefined;
        this.base64 = undefined;
        if (imageUrlOrBase64)
            if (base64_1.Base64Utils.checkPrependDataUrl(imageUrlOrBase64))
                this.base64 = imageUrlOrBase64;
            else
                this.url = imageUrlOrBase64;
        this.loadFailed = false;
    }
    ImageInfo.prototype.clone = function () {
        var result = new ImageInfo();
        result.url = this.url;
        result.base64 = this.base64;
        return result;
    };
    Object.defineProperty(ImageInfo.prototype, "isEmpty", {
        get: function () { return this.url === undefined && this.base64 === undefined; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageInfo.prototype, "unableToLoad", {
        get: function () { return this.loadFailed; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageInfo.prototype, "renderUrl", {
        get: function () { return this.base64 || ""; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageInfo.prototype, "exportUrl", {
        get: function () { return this.base64 ? this.base64 : this.url; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageInfo.prototype, "actualUrl", {
        get: function () { return this.url ? this.url : this.base64; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageInfo, "transparentOnePixelImage", {
        get: function () { return this.transparentWhiteImage1_1; },
        enumerable: false,
        configurable: true
    });
    ImageInfo.prototype.loadBase64Content = function (base64Content) {
        this.base64 = base64_1.Base64Utils.normalizeToDataUrl(base64Content, "image/png");
    };
    ImageInfo.prototype.setUnableToLoadFlag = function () {
        this.loadFailed = true;
    };
    ImageInfo.transparentWhiteImage1_1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAANSURBVBhXY/j///9/AAn7A/0FQ0XKAAAAAElFTkSuQmCC";
    return ImageInfo;
}());
exports.ImageInfo = ImageInfo;
//# sourceMappingURL=ImageInfo.js.map