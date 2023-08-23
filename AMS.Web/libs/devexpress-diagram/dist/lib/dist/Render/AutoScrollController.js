"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoScrollController = void 0;
var RenderHelper_1 = require("./RenderHelper");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var Utils_1 = require("../Utils");
var SCROLL_EDGE = 40;
var SCROLL_RATIO = 5;
var SCROLL_MAXOFFSET = 5;
var SCROLL_DELAY = 50;
var AutoScrollController = (function () {
    function AutoScrollController(scroll, svgElement, view, dom) {
        this.scroll = scroll;
        this.svgElement = svgElement;
        this.view = view;
        this.dom = dom;
        this.leftButtonPressed = false;
        this.scrollDragging = false;
        this.scrollTimer = -1;
        this.scrollBarWidth = dom_1.DomUtils.getVerticalScrollBarWidth();
    }
    AutoScrollController.prototype.onMouseMove = function (evt, raiseMouseMoveFunc) {
        this.clearScrollTimer();
        if (!Utils_1.EventUtils.isLeftButtonPressed(evt))
            this.leftButtonPressed = false;
        if (this.canAutoScroll())
            this.changeScrollPosition(evt, raiseMouseMoveFunc, false);
    };
    AutoScrollController.prototype.onMouseDown = function (evt) {
        this.leftButtonPressed = !!Utils_1.EventUtils.isLeftButtonPressed(evt);
    };
    AutoScrollController.prototype.onMouseUp = function (evt) {
        this.clearScrollTimer();
        this.leftButtonPressed = false;
    };
    AutoScrollController.prototype.onMouseEnter = function (evt) {
        var _this = this;
        if (Utils_1.EventUtils.isLeftButtonPressed(evt))
            setTimeout(function () {
                _this.leftButtonPressed = true;
            }, 500);
    };
    AutoScrollController.prototype.onDragScrollStart = function () {
        this.scrollDragging = true;
    };
    AutoScrollController.prototype.onDragScrollEnd = function () {
        this.scrollDragging = false;
    };
    AutoScrollController.prototype.canAutoScroll = function () {
        return this.leftButtonPressed && !this.scrollDragging;
    };
    AutoScrollController.prototype.changeScrollPosition = function (evt, raiseMouseMoveFunc, raiseMouseMove) {
        var _this = this;
        var changed = false;
        if (!this.view.isAutoScrollLocked()) {
            var scrollContainer = this.scroll.getScrollContainer();
            var x_1 = evt.pageX - dom_1.DomUtils.getAbsolutePositionX(scrollContainer);
            var y_1 = evt.pageY - dom_1.DomUtils.getAbsolutePositionY(scrollContainer);
            var size = this.scroll.getSize();
            var scrollSize = new size_1.Size(parseFloat(this.svgElement.style.width), parseFloat(this.svgElement.style.height));
            var width_1 = size.width;
            if (size.width < scrollSize.width)
                width_1 -= this.scrollBarWidth;
            var height_1 = size.height;
            if (size.height < scrollSize.height)
                height_1 -= this.scrollBarWidth;
            if (x_1 <= SCROLL_EDGE) {
                this.dom.changeByFunc(null, function () {
                    if (!_this.view.isAutoScrollLocked())
                        _this.scroll.offsetScroll(-_this.getScrollingOffset(x_1), 0);
                });
                changed = true;
            }
            else if (width_1 - SCROLL_EDGE <= x_1) {
                this.dom.changeByFunc(null, function () {
                    if (!_this.view.isAutoScrollLocked())
                        _this.scroll.offsetScroll(_this.getScrollingOffset(width_1 - x_1), 0);
                });
                changed = true;
            }
            if (y_1 <= SCROLL_EDGE) {
                this.dom.changeByFunc(null, function () {
                    if (!_this.view.isAutoScrollLocked())
                        _this.scroll.offsetScroll(0, -_this.getScrollingOffset(y_1));
                });
                changed = true;
            }
            else if (height_1 - SCROLL_EDGE <= y_1) {
                this.dom.changeByFunc(null, function () {
                    if (!_this.view.isAutoScrollLocked())
                        _this.scroll.offsetScroll(0, _this.getScrollingOffset(height_1 - y_1));
                });
                changed = true;
            }
        }
        if (changed || this.view.isAutoScrollLocked())
            this.scrollTimer = window.setTimeout(function () { return _this.changeScrollPosition(evt, raiseMouseMoveFunc, changed); }, SCROLL_DELAY);
        if (raiseMouseMove)
            raiseMouseMoveFunc();
    };
    AutoScrollController.prototype.clearScrollTimer = function () {
        if (this.scrollTimer > -1) {
            window.clearTimeout(this.scrollTimer);
            this.scrollTimer = -1;
        }
    };
    AutoScrollController.prototype.getScrollingOffset = function (edgeOffset) {
        var offset = Math.pow((SCROLL_EDGE - edgeOffset) / SCROLL_RATIO, 2);
        return Math.round(Math.min(offset, SCROLL_MAXOFFSET));
    };
    AutoScrollController.createMainElement = function (parent) {
        var element = document.createElement("div");
        element.setAttribute("class", "dxdi-control");
        parent.appendChild(element);
        return element;
    };
    AutoScrollController.createSvgElement = function (parent, forExport) {
        if (forExport === void 0) { forExport = false; }
        var svgElement = document.createElementNS(RenderHelper_1.svgNS, "svg");
        svgElement.className.baseVal = "dxdi-canvas" + (forExport ? " export" : "");
        parent.appendChild(svgElement);
        return svgElement;
    };
    return AutoScrollController;
}());
exports.AutoScrollController = AutoScrollController;
//# sourceMappingURL=AutoScrollController.js.map