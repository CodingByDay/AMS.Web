"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NativeScrollView = void 0;
var Utils_1 = require("../Utils");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var RenderHelper_1 = require("./RenderHelper");
var NativeScrollView = (function () {
    function NativeScrollView(mainElement) {
        this.onScroll = new Utils_1.EventDispatcher();
        this.scrollBarWidth = dom_1.DomUtils.getVerticalScrollBarWidth();
        this.mainElement = mainElement;
        this.attachEvents();
    }
    NativeScrollView.prototype.attachEvents = function () {
        var _this = this;
        this.onScrollHandler = function () { return _this.onScroll.raise1(function (l) { return l.notifyScrollChanged(function () { return _this.getScroll(); }); }); };
        RenderHelper_1.RenderHelper.addEventListener(this.mainElement, "scroll", this.onScrollHandler);
    };
    NativeScrollView.prototype.detachEvents = function () {
        RenderHelper_1.RenderHelper.removeEventListener(this.mainElement, "scroll", this.onScrollHandler);
    };
    NativeScrollView.prototype.getScrollContainer = function () {
        return this.mainElement;
    };
    NativeScrollView.prototype.setScroll = function (left, top) {
        var _this = this;
        this.mainElement.style.overflow = "scroll";
        this.mainElement.scrollLeft = left;
        this.mainElement.scrollTop = top;
        this.mainElement.style.overflow = "";
        this.onScroll.raise1(function (l) { return l.notifyScrollChanged(function () { return _this.getScroll(); }); });
    };
    NativeScrollView.prototype.offsetScroll = function (left, top) {
        var _this = this;
        if (left)
            this.mainElement.scrollLeft += left;
        if (top)
            this.mainElement.scrollTop += top;
        this.onScroll.raise1(function (l) { return l.notifyScrollChanged(function () { return _this.getScroll(); }); });
    };
    NativeScrollView.prototype.getScroll = function () {
        return new point_1.Point(this.mainElement.scrollLeft, this.mainElement.scrollTop);
    };
    NativeScrollView.prototype.getSize = function () {
        var boundingRect = this.mainElement.getBoundingClientRect();
        return new size_1.Size(Math.floor(boundingRect.width), Math.floor(boundingRect.height));
    };
    NativeScrollView.prototype.getScrollBarWidth = function () {
        return this.scrollBarWidth;
    };
    return NativeScrollView;
}());
exports.NativeScrollView = NativeScrollView;
//# sourceMappingURL=ScrollView.js.map