"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageCache = exports.CacheImageInfo = void 0;
var base64_1 = require("@devexpress/utils/lib/utils/base64");
var ImageInfo_1 = require("./ImageInfo");
var Utils_1 = require("../Utils");
var CacheImageInfo = (function () {
    function CacheImageInfo(base64, actualId, imageUrl, referenceInfo, isLoaded) {
        this._base64 = base64 !== undefined ? base64_1.Base64Utils.normalizeToDataUrl(base64, "image/png") : undefined;
        this.actualId = actualId;
        this._referenceInfo = referenceInfo;
        this._isLoaded = isLoaded !== undefined ? isLoaded : false;
        this.imageUrl = imageUrl;
    }
    Object.defineProperty(CacheImageInfo.prototype, "isLoaded", {
        get: function () { return this._referenceInfo ? this._referenceInfo._isLoaded : this._isLoaded; },
        set: function (val) { this._isLoaded = val; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CacheImageInfo.prototype, "base64", {
        get: function () { return this._base64; },
        set: function (val) { this._base64 = base64_1.Base64Utils.normalizeToDataUrl(val, "image/png"); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CacheImageInfo.prototype, "referenceInfo", {
        get: function () { return this._referenceInfo; },
        set: function (val) {
            this._referenceInfo = val;
            this._base64 = undefined;
            this._isLoaded = undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CacheImageInfo.prototype, "isLoading", {
        get: function () { return this._referenceInfo ? this.referenceInfo._isLoading : this._isLoading; },
        enumerable: false,
        configurable: true
    });
    CacheImageInfo.prototype.startLoading = function () {
        if (this._referenceInfo)
            this._referenceInfo.startLoading();
        else
            this._isLoading = true;
    };
    CacheImageInfo.prototype.finalizeLoading = function () {
        if (this._referenceInfo)
            this._referenceInfo.finalizeLoading();
        else
            this._isLoading = false;
    };
    return CacheImageInfo;
}());
exports.CacheImageInfo = CacheImageInfo;
var ImageCache = (function () {
    function ImageCache() {
        this.emptyImageId = 0;
        this.lastActualId = 0;
        this.onReadyStateChanged = new Utils_1.EventDispatcher();
        this.cache = [];
        this.nonLoadedImages = [];
        var emptyImage = this.createUnloadedInfoByBase64(ImageInfo_1.ImageInfo.transparentOnePixelImage);
        emptyImage.isLoaded = true;
    }
    ImageCache.prototype.reset = function () {
        this.cache.splice(1);
        this.nonLoadedImages = [];
        this.lastActualId = 1;
    };
    Object.defineProperty(ImageCache.prototype, "emptyImage", {
        get: function () { return this.cache[this.emptyImageId]; },
        enumerable: false,
        configurable: true
    });
    ImageCache.prototype.getImageData = function (id) {
        return this.cache[id];
    };
    ImageCache.prototype.createUnloadedInfoByUrl = function (imageUrl) {
        var info = this.findInfoByUrl(imageUrl);
        if (info)
            return info;
        return this.registerImageData(new CacheImageInfo(undefined, this.getNextActualId(), imageUrl));
    };
    ImageCache.prototype.createUnloadedInfoByBase64 = function (base64) {
        var info = this.findInfoByBase64(base64);
        if (info)
            return info;
        return this.registerImageData(new CacheImageInfo(base64, this.getNextActualId()));
    };
    ImageCache.prototype.createUnloadedInfoByShapeImageInfo = function (imageInfo) {
        var data = imageInfo.exportUrl;
        return base64_1.Base64Utils.checkPrependDataUrl(data) ?
            this.createUnloadedInfoByBase64(data) :
            this.createUnloadedInfoByUrl(data);
    };
    ImageCache.prototype.registerImageData = function (data) {
        var existingData = this.cache[data.actualId];
        if (!existingData)
            existingData = data;
        if (data.actualId !== undefined)
            this.cache[data.actualId] = existingData;
        if (data.actualId !== 0) {
            this.nonLoadedImages.push(data);
            if (this.nonLoadedImages.length === 1)
                this.raiseReadyStateChanged(false);
        }
        return existingData;
    };
    ImageCache.prototype.loadAllImages = function (loader) {
        var _this = this;
        this.cache.forEach(function (cacheInfo) {
            if (_this.emptyImageId !== cacheInfo.actualId && !cacheInfo.isLoaded && !cacheInfo.isLoading)
                loader.load(cacheInfo);
        });
    };
    ImageCache.prototype.finalizeLoading = function (existingInfo, loadedInfo) {
        existingInfo.finalizeLoading();
        existingInfo.isLoaded = true;
        var imageInfoIndex = this.nonLoadedImages.indexOf(existingInfo);
        this.nonLoadedImages.splice(imageInfoIndex, 1);
        if (this.nonLoadedImages.length === 0)
            this.raiseReadyStateChanged(true);
        if (existingInfo.referenceInfo)
            return;
        if (loadedInfo.base64) {
            var base64_2 = base64_1.Base64Utils.normalizeToDataUrl(loadedInfo.base64, "image/png");
            this.cache.forEach(function (cacheElem) {
                var isReference = cacheElem.base64 === base64_2 && cacheElem !== existingInfo && cacheElem.isLoaded;
                if (isReference)
                    existingInfo.referenceInfo = cacheElem.referenceInfo ? cacheElem.referenceInfo : cacheElem;
                return isReference;
            });
            existingInfo.base64 = base64_2;
        }
    };
    ImageCache.prototype.hasNonLoadedImages = function () {
        return this.nonLoadedImages.length !== 0;
    };
    ImageCache.prototype.getNextActualId = function () {
        return this.lastActualId++;
    };
    ImageCache.prototype.findInfoByBase64 = function (base64) {
        base64 = base64_1.Base64Utils.normalizeToDataUrl(base64, "image/png");
        return this.findInfoCore(function (cacheImageInfo) { return cacheImageInfo.base64 === base64; });
    };
    ImageCache.prototype.findInfoByUrl = function (imageUrl) {
        return this.findInfoCore(function (cacheImageInfo) { return cacheImageInfo.imageUrl === imageUrl; });
    };
    ImageCache.prototype.findInfoCore = function (callback) {
        var cacheInfo;
        this.cache.forEach(function (item) {
            if (callback(item))
                cacheInfo = item;
        });
        return cacheInfo;
    };
    ImageCache.prototype.raiseReadyStateChanged = function (ready) {
        this.onReadyStateChanged.raise1(function (l) { return l.notifyImageCacheReadyStateChanged(ready); });
    };
    ImageCache.instance = new ImageCache();
    return ImageCache;
}());
exports.ImageCache = ImageCache;
//# sourceMappingURL=ImageCache.js.map