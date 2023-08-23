"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageLoader = void 0;
var ImageCache_1 = require("./ImageCache");
var ImageLoader = (function () {
    function ImageLoader(loadedCallback) {
        this.loadedCallback = loadedCallback;
    }
    ImageLoader.prototype.load = function (data) {
        if (data.isLoaded)
            this.loadedCallback(data);
        else if (!data.isLoading)
            this.loadInner(data);
    };
    ImageLoader.prototype.loadInner = function (data) {
        var _this = this;
        if (data.imageUrl)
            this.loadPictureByUrl(data, function () { return _this.finalizeLoading(data, data); });
        else if (data.base64)
            this.loadPictureByBase64(data, function () { return _this.finalizeLoading(data, data); });
        return data;
    };
    ImageLoader.prototype.finalizeLoading = function (loadedData, existingInfo) {
        if (!existingInfo)
            existingInfo = ImageCache_1.ImageCache.instance.getImageData(loadedData.actualId);
        if (!existingInfo.isLoaded)
            ImageCache_1.ImageCache.instance.finalizeLoading(existingInfo, loadedData);
        this.loadedCallback(existingInfo);
    };
    ImageLoader.prototype.loadPictureByBase64 = function (data, imageLoaded) {
        var img = new Image();
        img.onload = function () {
            imageLoaded(data);
        };
        img.src = data.base64;
    };
    ImageLoader.prototype.loadPictureByUrl = function (data, imageLoaded) {
        var _this = this;
        var xhr = new XMLHttpRequest();
        try {
            xhr.onload = function () {
                var reader = new FileReader();
                reader.onloadend = function () {
                    data.base64 = reader.result;
                    _this.loadPictureByBase64(data, function (data) { return imageLoaded(data); });
                };
                reader.readAsDataURL(xhr.response);
            };
            xhr.onerror = function () { return imageLoaded(data); };
            xhr.onloadend = function () {
                if (xhr.status === 404)
                    imageLoaded(data);
            };
            xhr.open("GET", data.imageUrl, true);
            xhr.responseType = "blob";
            data.startLoading();
            xhr.send();
        }
        catch (_a) { }
    };
    return ImageLoader;
}());
exports.ImageLoader = ImageLoader;
//# sourceMappingURL=ImageLoader.js.map