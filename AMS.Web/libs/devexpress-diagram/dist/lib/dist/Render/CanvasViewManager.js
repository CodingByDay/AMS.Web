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
exports.CanvasViewManager = exports.CROP_OFFSET = exports.CANVAS_SCROLL_PADDING = exports.CANVAS_MIN_PADDING = void 0;
var CanvasManagerBase_1 = require("./CanvasManagerBase");
var Settings_1 = require("../Settings");
var Utils_1 = require("../Utils");
var offsets_1 = require("@devexpress/utils/lib/geometry/offsets");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var GroupPrimitive_1 = require("./Primitives/GroupPrimitive");
var ClipPathPrimitive_1 = require("./Primitives/ClipPathPrimitive");
var RectaglePrimitive_1 = require("./Primitives/RectaglePrimitive");
var Utils_2 = require("./Utils");
var ShadowFilterPrimitive_1 = require("./Primitives/ShadowFilterPrimitive");
var Style_1 = require("../Model/Style");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
exports.CANVAS_MIN_PADDING = 8;
exports.CANVAS_SCROLL_PADDING = 18;
exports.CROP_OFFSET = 40;
var DRAG_SCROLL_CSSCLASS = "dxdi-drag-scroll";
var DRAG_ITEM_CSSCLASS = "dxdi-drag-item";
var CanvasViewManager = (function (_super) {
    __extends(CanvasViewManager, _super);
    function CanvasViewManager(scrollView, svgElement, modelSize, fixedZoomLevel, autoZoom, simpleView, rectangle, dom, instanceId) {
        var _this = _super.call(this, fixedZoomLevel, dom, instanceId) || this;
        _this.svgElement = svgElement;
        _this.paddings = new offsets_1.Offsets(0, 0, 0, 0);
        _this.scroll = new point_1.Point(0, 0);
        _this.crop = offsets_1.Offsets.empty();
        _this.lockAutoZoom = false;
        _this.autoScrollLocker = 0;
        _this.pageClipPathId = Utils_2.RenderUtils.generateSvgElementId("page-clip");
        _this.pageShadowId = Utils_2.RenderUtils.generateSvgElementId("page-shadow");
        _this.onViewChanged = new Utils_1.EventDispatcher();
        scrollView.onScroll.add(_this);
        modelSize = modelSize.clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF);
        _this.scrollView = scrollView;
        _this.modelSize = modelSize;
        _this.simpleView = simpleView;
        _this.fixedZoomLevel = fixedZoomLevel;
        _this.autoZoom = autoZoom;
        _this.crop = _this.rectangleToCrop(rectangle, modelSize);
        _this.updateElements(modelSize.clone().multiply(fixedZoomLevel, fixedZoomLevel), point_1.Point.zero(), simpleView);
        _this.getOrCreateElement("shadow", new ShadowFilterPrimitive_1.ShadowFilterPrimitive(_this.pageShadowId), _this.svgElement);
        _this.containerSize = scrollView.getSize();
        return _this;
    }
    CanvasViewManager.prototype.adjust = function (resetPaddings, saveVerticalScroll) {
        var offset;
        if (!resetPaddings) {
            resetPaddings = { vertical: false, horizontal: false };
            offset = offsets_1.Offsets.empty();
        }
        this.containerSize = this.scrollView.getSize();
        this.adjustCore(this.modelSize, this.fixedZoomLevel, this.autoZoom, this.simpleView, this.crop, resetPaddings, this.containerSize, offset, saveVerticalScroll);
        this.tryNormalizePaddings();
    };
    CanvasViewManager.prototype.notifyModelSizeChanged = function (size, offset) {
        size = size.clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF);
        var resetPaddings = { horizontal: !offset, vertical: !offset };
        this.adjustCore(size, this.fixedZoomLevel, this.autoZoom, this.simpleView, this.crop, resetPaddings, this.containerSize, offset && offset.clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF));
        this.modelSize = size;
    };
    CanvasViewManager.prototype.notifyModelRectangleChanged = function (rectangle) {
        var crop = this.rectangleToCrop(rectangle, this.modelSize);
        if (!this.crop || !this.crop.equals(crop)) {
            if (this.simpleView)
                this.adjustCore(this.modelSize, this.fixedZoomLevel, this.autoZoom, this.simpleView, crop, { horizontal: false, vertical: false }, this.containerSize, offsets_1.Offsets.empty());
            this.crop = crop;
        }
    };
    CanvasViewManager.prototype.notifySnapPointPositionChanged = function (point) { };
    CanvasViewManager.prototype.notifyZoomChanged = function (fixedZoomLevel, autoZoom) {
        this.adjustCore(this.modelSize, fixedZoomLevel, autoZoom, this.simpleView, this.crop, {
            horizontal: false,
            vertical: false
        }, this.containerSize);
        this.fixedZoomLevel = fixedZoomLevel;
        this.autoZoom = autoZoom;
    };
    CanvasViewManager.prototype.notifyViewChanged = function (simpleView) {
        this.adjustCore(this.modelSize, this.fixedZoomLevel, this.autoZoom, simpleView, this.crop, { vertical: true, horizontal: true }, this.containerSize);
        this.simpleView = simpleView;
    };
    CanvasViewManager.prototype.notifyGridChanged = function (showGrid, gridSize) { };
    CanvasViewManager.prototype.notifyDragStart = function (itemKeys) {
        this.lockAutoZoom = true;
        dom_1.DomUtils.addClassName(this.svgElement, DRAG_ITEM_CSSCLASS);
    };
    CanvasViewManager.prototype.notifyDragEnd = function (itemKeys) {
        this.lockAutoZoom = false;
        dom_1.DomUtils.removeClassName(this.svgElement, DRAG_ITEM_CSSCLASS);
        this.adjustAfterDragEnd();
    };
    CanvasViewManager.prototype.adjustAfterDragEnd = function () {
        if (this.autoZoom && !this.autoZoomLocked)
            this.adjust({ horizontal: true, vertical: this.autoZoom === Settings_1.AutoZoomMode.FitContent }, this.autoZoom === Settings_1.AutoZoomMode.FitToWidth);
    };
    CanvasViewManager.prototype.notifyShowContextToolbox = function () {
        this.autoZoomLocked = true;
    };
    CanvasViewManager.prototype.notifyHideContextToolbox = function () {
        this.autoZoomLocked = false;
        this.adjustAfterDragEnd();
    };
    CanvasViewManager.prototype.notifyDragScrollStart = function () {
        dom_1.DomUtils.addClassName(this.svgElement, DRAG_SCROLL_CSSCLASS);
    };
    CanvasViewManager.prototype.notifyDragScrollEnd = function () {
        dom_1.DomUtils.removeClassName(this.svgElement, DRAG_SCROLL_CSSCLASS);
    };
    CanvasViewManager.prototype.notifyScrollChanged = function (getScroll) {
        this.scroll = getScroll();
    };
    CanvasViewManager.prototype.checkFitToCanvas = function (containerSize) {
        containerSize = containerSize || this.containerSize;
        var scrollSize = this.scrollView.getScrollBarWidth();
        containerSize = containerSize.clone().offset(-exports.CANVAS_MIN_PADDING * 2, -exports.CANVAS_MIN_PADDING * 2).nonNegativeSize();
        var modelAbsSize = this.getActualModelSizeWithoutZoom(this.modelSize, this.simpleView, this.crop).clone().multiply(this.actualZoom, this.actualZoom);
        var scrollbars = this.checkScrollBars(containerSize, scrollSize, modelAbsSize, offsets_1.Offsets.empty());
        containerSize = containerSize.clone().offset(scrollbars.vertical ? -scrollSize : 0, scrollbars.horizontal ? -scrollSize : 0).nonNegativeSize();
        return {
            vertical: containerSize.height >= modelAbsSize.height,
            horizontal: containerSize.width >= modelAbsSize.width
        };
    };
    CanvasViewManager.prototype.rectangleToCrop = function (rectangle, modelSize) {
        var absRectangle = rectangle.clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF);
        return new offsets_1.Offsets(this.correctCrop(absRectangle.x), this.correctCrop(modelSize.width - absRectangle.right), this.correctCrop(absRectangle.y), this.correctCrop(modelSize.height - absRectangle.bottom));
    };
    CanvasViewManager.prototype.correctCrop = function (newVal) {
        return exports.CROP_OFFSET * Math.floor(newVal / exports.CROP_OFFSET);
    };
    CanvasViewManager.prototype.setActualZoom = function (actualZoom) {
        if (this.actualZoom !== actualZoom) {
            this.actualZoom = actualZoom;
            this.raiseActualZoomChanged();
        }
    };
    CanvasViewManager.prototype.getActualAutoZoomLevel = function (autoZoom) {
        if (autoZoom === Settings_1.AutoZoomMode.Disabled)
            return this.actualZoom;
        var containerSize = this.containerSize;
        var scrollbarWidth = this.scrollView.getScrollBarWidth();
        var actualModelSizeWithoutZoom = this.getActualModelSizeWithoutZoom(this.modelSize, this.simpleView, this.crop);
        return this.getActualAutoZoom(containerSize, scrollbarWidth, actualModelSizeWithoutZoom, autoZoom);
    };
    CanvasViewManager.prototype.getActualZoom = function (containerSize, scrollbarWidth, actualModelSizeWithoutZoom, fixedZoom, autoZoom) {
        return this.lockAutoZoom ? this.actualZoom :
            autoZoom === Settings_1.AutoZoomMode.Disabled ? fixedZoom : this.getActualAutoZoom(containerSize, scrollbarWidth, actualModelSizeWithoutZoom, autoZoom);
    };
    CanvasViewManager.prototype.getActualAutoZoom = function (containerSize, scrollbarWidth, actualModelSizeWithoutZoom, autoZoom) {
        if (containerSize.width === 0 || containerSize.height === 0)
            return 1;
        if (autoZoom === Settings_1.AutoZoomMode.FitContent)
            return Math.min((containerSize.width - exports.CANVAS_MIN_PADDING * 2) / actualModelSizeWithoutZoom.width, (containerSize.height - exports.CANVAS_MIN_PADDING * 2) / actualModelSizeWithoutZoom.height, 1);
        return Math.min((containerSize.width - exports.CANVAS_MIN_PADDING * 2 - scrollbarWidth) / actualModelSizeWithoutZoom.width, 1);
    };
    CanvasViewManager.prototype.raiseActualZoomChanged = function () {
        var _this = this;
        this.onViewChanged.raise1(function (l) { return l.notifyActualZoomChanged(_this.actualZoom); });
    };
    CanvasViewManager.prototype.tryNormalizePaddings = function () {
        var scrollbarWidth = this.scrollView.getScrollBarWidth();
        var actualModelSize = this.getActualModelSizeWithoutZoom(this.modelSize, this.simpleView, this.crop).clone().multiply(this.actualZoom, this.actualZoom);
        var translate = new point_1.Point(this.paddings.left, this.paddings.top);
        var currentTail = new size_1.Size(this.paddings.right, this.paddings.bottom);
        var tail = this.getTailSpace(translate, this.scroll, actualModelSize, this.containerSize, scrollbarWidth);
        if (!tail.equals(currentTail))
            this.applyChanges(new offsets_1.Offsets(translate.x, tail.width, translate.y, tail.height), actualModelSize, this.simpleView, this.crop.clone().multiply(this.actualZoom));
    };
    CanvasViewManager.prototype.scrollBy = function (offset) {
        var _a, _b, _c;
        var scroll = this.scroll;
        var containerSize = this.containerSize;
        var scrollbarWidth = this.scrollView.getScrollBarWidth();
        var actualModelSize = this.getActualModelSizeWithoutZoom(this.modelSize, this.simpleView, this.crop).clone().multiply(this.actualZoom, this.actualZoom);
        var scrollbars = this.checkScrollBars(containerSize, scrollbarWidth, actualModelSize, this.paddings);
        var translate = new point_1.Point(this.paddings.left, this.paddings.top);
        var tail = new size_1.Size(this.paddings.right, this.paddings.bottom);
        (_a = this.changeScrollByOffset(translate, scroll, tail, actualModelSize, offset, containerSize, scrollbars), scroll = _a.scroll, offset = _a.offset);
        (_b = this.changeTranslateByOffset(translate, tail, offset, scrollbars), translate = _b.translate, offset = _b.offset);
        (_c = this.cropHiddenHead(translate, scroll), translate = _c.translate, scroll = _c.scroll);
        tail = this.getTailSpace(translate, scroll, actualModelSize, containerSize, scrollbarWidth);
        this.applyChanges(new offsets_1.Offsets(translate.x, tail.width, translate.y, tail.height), actualModelSize, this.simpleView, this.crop.clone().multiply(this.actualZoom), scroll);
        return offset;
    };
    CanvasViewManager.prototype.changeScrollByOffset = function (curTranslate, curScroll, curTail, modelSize, curOffset, containerSize, scrollbars) {
        var scroll = curScroll.clone();
        var offset = curOffset.clone();
        if (curOffset.x && scrollbars.horizontal)
            scroll.x -= (offset.x = -this.getScrollDeltaByOffset(curOffset.x, curScroll.x, curTranslate.x + modelSize.width + curTail.width, containerSize.width, scrollbars.vertical));
        if (curOffset.y && scrollbars.vertical)
            scroll.y -= (offset.y = -this.getScrollDeltaByOffset(curOffset.y, curScroll.y, curTranslate.y + modelSize.height + curTail.height, containerSize.height, scrollbars.horizontal));
        return { scroll: scroll, offset: offset };
    };
    CanvasViewManager.prototype.changeTranslateByOffset = function (curTranslate, curTail, curOffset, scrollbars) {
        var translate = curTranslate.clone();
        var offset = curOffset.clone();
        if (curOffset.x && !scrollbars.horizontal)
            translate.x += (offset.x = this.getTranslateDeltaByOffset(curOffset.x, translate.x, curTail.width));
        if (curOffset.y && !scrollbars.vertical)
            translate.y += (offset.y = this.getTranslateDeltaByOffset(curOffset.y, translate.y, curTail.height));
        return { translate: translate, offset: offset };
    };
    CanvasViewManager.prototype.getScrollDeltaByOffset = function (offset, scroll, commonWidth, containerWidth, hasScrollbar) {
        if (offset > 0)
            return -Math.min(scroll, offset);
        var maxScroll = commonWidth - (containerWidth - (hasScrollbar ? this.scrollView.getScrollBarWidth() : 0));
        return Math.min(maxScroll - scroll, -offset);
    };
    CanvasViewManager.prototype.getTranslateDeltaByOffset = function (offset, headPadding, tailPadding) {
        if (!offset)
            return 0;
        return offset < 0 ?
            -Math.min(headPadding - exports.CANVAS_MIN_PADDING, -offset) :
            Math.min(tailPadding - exports.CANVAS_MIN_PADDING, offset);
    };
    CanvasViewManager.prototype.getActualModelSizeWithoutZoom = function (originModelSize, simpleView, crop) {
        return simpleView && crop ? originModelSize.clone().offset(-crop.horizontal, -crop.vertical).nonNegativeSize() : originModelSize;
    };
    CanvasViewManager.prototype.setScrollTo = function (modelPoint, offsetPoint) {
        var containerSize = this.containerSize;
        var shift = this.getVisibileAreaAbsShift();
        var absPoint = modelPoint
            .clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF)
            .clone().multiply(this.actualZoom, this.actualZoom)
            .clone().offset(shift.x, shift.y);
        var scroll = this.scroll;
        if (!offsetPoint) {
            if (absPoint.x < 0)
                scroll.x += absPoint.x - exports.CANVAS_MIN_PADDING;
            if (absPoint.y < 0)
                scroll.y += absPoint.y - exports.CANVAS_MIN_PADDING;
            if (absPoint.x > containerSize.width)
                scroll.x += (absPoint.x - containerSize.width + exports.CANVAS_MIN_PADDING);
            if (absPoint.y > containerSize.height)
                scroll.y += (absPoint.y - containerSize.height + exports.CANVAS_MIN_PADDING);
        }
        else {
            scroll.x += absPoint.x - offsetPoint.x;
            scroll.y += absPoint.y - offsetPoint.y;
        }
        this.setScroll(scroll);
    };
    CanvasViewManager.prototype.scrollIntoView = function (rectangle) {
        rectangle = rectangle
            .clone()
            .applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF)
            .multiply(this.actualZoom, this.actualZoom)
            .moveRectangle(this.paddings.left, this.paddings.top);
        var scroll = this.scroll;
        var container = this.containerSize;
        if (rectangle.x >= scroll.x && rectangle.y >= scroll.y && rectangle.right <= scroll.x + container.width && rectangle.bottom <= scroll.y + container.height)
            return;
        var newScroll = scroll.clone();
        if (rectangle.x < scroll.x)
            newScroll.x = rectangle.x - exports.CANVAS_SCROLL_PADDING;
        else if (rectangle.right > scroll.x + container.width)
            newScroll.x = Math.min(rectangle.x - exports.CANVAS_SCROLL_PADDING, rectangle.right + exports.CANVAS_SCROLL_PADDING - container.width);
        if (rectangle.y < scroll.y)
            newScroll.y = rectangle.y - exports.CANVAS_SCROLL_PADDING;
        else
            newScroll.y = Math.min(rectangle.y - exports.CANVAS_SCROLL_PADDING, rectangle.bottom + exports.CANVAS_SCROLL_PADDING - container.height);
        this.setScroll(newScroll);
    };
    CanvasViewManager.prototype.setScroll = function (pt) {
        var _this = this;
        var modelAbsSize = this.modelSize.clone().multiply(this.actualZoom, this.actualZoom);
        pt.x = Math.max(0, Math.min(pt.x, modelAbsSize.width + this.paddings.horizontal - this.containerSize.width));
        pt.y = Math.max(0, Math.min(pt.y, modelAbsSize.height + this.paddings.vertical - this.containerSize.height));
        this.dom.changeByFunc(null, function () {
            _this.scrollView.setScroll(pt.x, pt.y);
        });
        this.scroll = pt.clone();
    };
    CanvasViewManager.prototype.updateElements = function (modelAbsSize, translate, simpleView) {
        this.updatePageElement(modelAbsSize, translate, simpleView);
        this.updateCanvasElement(translate);
    };
    CanvasViewManager.prototype.updateCanvasElement = function (translate) {
        this.canvasElement = this.getOrCreateElement("dxdi-main", new GroupPrimitive_1.GroupPrimitive([], "dxdi-main", null, null, function (el) {
            el.setAttribute("transform", "translate(" + Math.round(translate.x) + ", " + Math.round(translate.y) + ")");
        }), this.svgElement);
    };
    CanvasViewManager.prototype.updatePageElement = function (modelAbsSize, translate, simpleView) {
        if (simpleView)
            this.updatePageElementCore("", 0, 0, modelAbsSize.width, modelAbsSize.height);
        else {
            var x = translate.x;
            var y = translate.y;
            var modelAbsWidth = modelAbsSize.width;
            var modelAbsHeight = modelAbsSize.height;
            this.createPageShadow(x, y, modelAbsWidth, modelAbsHeight);
            this.updatePageElementCore(this.pageClipPathId, Math.round(x), Math.round(y), modelAbsWidth, modelAbsHeight);
        }
    };
    CanvasViewManager.prototype.createPageShadow = function (left, top, width, height) {
        this.getOrCreateElement("pageShadowRect", new RectaglePrimitive_1.RectanglePrimitive(left.toString(), top.toString(), width.toString(), height.toString(), new Style_1.EmptyStyle({ "filter": Utils_2.RenderUtils.getUrlPathById(this.pageShadowId) }), "dxdi-page-shadow"), this.svgElement, this.svgElement.firstChild);
    };
    CanvasViewManager.prototype.updatePageElementCore = function (groupClipPathId, translateX, translateY, modelAbsWidth, modelAbsHeight) {
        this.pageElement = this.getOrCreateElement("page", new GroupPrimitive_1.GroupPrimitive([], "dxdi-page", null, groupClipPathId, function (el) {
            el.setAttribute("transform", "translate(" + translateX + ", " + translateY + ")");
        }), this.svgElement);
        this.getOrCreateElement("pageClip", this.createPageClipPathPrimitive(modelAbsWidth, modelAbsHeight), this.svgElement);
    };
    CanvasViewManager.prototype.createPageClipPathPrimitive = function (modelAbsWidth, modelAbsHeight) {
        return new ClipPathPrimitive_1.ClipPathPrimitive(this.pageClipPathId, [new RectaglePrimitive_1.RectanglePrimitive(0, 0, modelAbsWidth.toString(), modelAbsHeight.toString())]);
    };
    CanvasViewManager.prototype.adjustCore = function (newModelSize, fixedZoomLevel, autoZoom, simpleView, crop, resetPaddings, containerSize, offset, saveVerticalScroll) {
        var actualModelSizeWithoutZoom = this.getActualModelSizeWithoutZoom(newModelSize, simpleView, crop);
        if (!this.lockAutoZoom && (autoZoom || !offset || !this.modelSize)) {
            var scrollbarWidth = this.scrollView.getScrollBarWidth();
            var actualZoom = this.getActualZoom(containerSize, scrollbarWidth, actualModelSizeWithoutZoom, fixedZoomLevel, autoZoom);
            if (autoZoom && actualZoom === this.actualZoom && (!resetPaddings.horizontal || (!resetPaddings.vertical && !saveVerticalScroll)))
                this.resizeView(actualModelSizeWithoutZoom, actualZoom, containerSize, simpleView, crop, offset || offsets_1.Offsets.empty());
            else {
                this.resetView(actualModelSizeWithoutZoom, actualZoom, containerSize, simpleView, crop, resetPaddings);
                this.setActualZoom(actualZoom);
            }
        }
        else
            this.resizeView(actualModelSizeWithoutZoom, this.actualZoom, containerSize, simpleView, crop, offset);
    };
    CanvasViewManager.prototype.resetView = function (actualModelSizeWithoutZoom, actualZoom, containerSize, simpleView, cropWithoutZoom, toReset) {
        var actualModelSize = actualModelSizeWithoutZoom.clone().multiply(actualZoom, actualZoom);
        var paddings = offsets_1.Offsets.fromNumber(exports.CANVAS_MIN_PADDING);
        toReset = toReset || { horizontal: true, vertical: true };
        if (!toReset.horizontal && this.paddings) {
            paddings.left = this.paddings.left;
            paddings.right = this.paddings.right;
        }
        if (!toReset.vertical && this.paddings) {
            paddings.top = this.paddings.top;
            paddings.bottom = this.paddings.bottom;
        }
        var scrollbars = this.checkScrollBars(containerSize, this.scrollView.getScrollBarWidth(), actualModelSize, paddings);
        var scrollBarWidth = this.scrollView.getScrollBarWidth();
        var scroll = (toReset.horizontal || toReset.vertical) ? this.scroll : undefined;
        if (toReset.horizontal) {
            var paddingsH = Math.max((containerSize.width - (scrollbars.vertical ? scrollBarWidth : 0) - actualModelSize.width) / 2, exports.CANVAS_MIN_PADDING);
            paddings.left = paddingsH;
            paddings.right = paddingsH;
            scroll.x = 0;
        }
        if (toReset.vertical) {
            var paddingsV = Math.max((containerSize.height - (scrollbars.horizontal ? scrollBarWidth : 0) - actualModelSize.height) / 2, exports.CANVAS_MIN_PADDING);
            paddings.top = paddingsV;
            paddings.bottom = paddingsV;
            scroll.y = 0;
        }
        this.applyChanges(paddings, actualModelSize, simpleView, cropWithoutZoom.clone().multiply(actualZoom), scroll);
    };
    CanvasViewManager.prototype.resizeView = function (actualModelSizeWithoutZoom, actualZoom, containerSize, simpleView, cropWithoutZoom, offset) {
        var _a, _b;
        var oldZoom = this.actualZoom;
        var oldCrop = this.simpleView && this.crop ? this.crop.clone().multiply(oldZoom) : offsets_1.Offsets.empty();
        var actualModelSize = actualModelSizeWithoutZoom.clone().multiply(actualZoom, actualZoom);
        offset = offset.clone().multiply(actualZoom);
        var newCrop = simpleView && cropWithoutZoom ? cropWithoutZoom.clone().multiply(actualZoom) : offsets_1.Offsets.empty();
        var translate = new point_1.Point(this.paddings.left, this.paddings.top);
        var scroll = this.scroll;
        (_a = this.applyOffset(translate, scroll, oldCrop, newCrop, offset), translate = _a.translate, scroll = _a.scroll);
        (_b = this.cropHiddenHead(translate, scroll), translate = _b.translate, scroll = _b.scroll);
        var tailSpace = this.getTailSpace(translate, scroll, actualModelSize, containerSize, this.scrollView.getScrollBarWidth());
        if (!simpleView) {
            var maxTailSpaceWidth = containerSize.width - exports.CANVAS_SCROLL_PADDING;
            var maxTailSpaceHeight = containerSize.height - exports.CANVAS_SCROLL_PADDING;
            if (offset.left < 0)
                if (translate.x > maxTailSpaceWidth) {
                    translate.x = maxTailSpaceWidth;
                    scroll.x = 0;
                }
            if (offset.right < 0)
                if (tailSpace.width > maxTailSpaceWidth) {
                    tailSpace.width = maxTailSpaceWidth;
                    if (scroll.x > actualModelSize.width)
                        scroll.x = actualModelSize.width;
                }
            if (offset.top < 0)
                if (translate.y > maxTailSpaceHeight) {
                    translate.y = maxTailSpaceHeight;
                    scroll.y = 0;
                }
            if (offset.bottom < 0)
                if (tailSpace.height > maxTailSpaceHeight) {
                    tailSpace.height = maxTailSpaceHeight;
                    if (scroll.y > actualModelSize.height)
                        scroll.y = actualModelSize.height;
                }
        }
        var newPaddings = new offsets_1.Offsets(translate.x, tailSpace.width, translate.y, tailSpace.height);
        this.applyChanges(newPaddings, actualModelSize, simpleView, newCrop, scroll);
    };
    CanvasViewManager.prototype.applyChanges = function (paddings, actualModelSize, simpleView, crop, scroll) {
        var _this = this;
        var translate = new point_1.Point(paddings.left, paddings.top);
        if (simpleView && crop)
            translate = translate.clone().offset(-crop.left, -crop.top);
        this.updateElements(actualModelSize, translate, simpleView);
        this.setSvgSize(actualModelSize.width + paddings.horizontal, actualModelSize.height + paddings.vertical);
        this.onViewChanged.raise1(function (l) { return l.notifyViewAdjusted(new point_1.Point(translate.x, translate.y)); });
        if (scroll) {
            this.lockAutoScroll();
            scroll && this.dom.changeByFunc(this.scrollView, function (s) {
                s.setScroll(scroll.x, scroll.y);
                _this.unlockAutoScroll();
            });
            this.scroll = scroll;
        }
        this.paddings = paddings;
    };
    CanvasViewManager.prototype.isAutoScrollLocked = function () {
        return this.autoScrollLocker !== 0;
    };
    CanvasViewManager.prototype.lockAutoScroll = function () {
        this.autoScrollLocker++;
    };
    CanvasViewManager.prototype.unlockAutoScroll = function () {
        this.autoScrollLocker--;
    };
    CanvasViewManager.prototype.applyOffset = function (curTranslate, curScroll, oldCrop, newCrop, modelOffset) {
        var translate = curTranslate.clone();
        var scroll = curScroll.clone();
        var offset = this.getActualOffset(oldCrop, newCrop, modelOffset);
        if (offset.left) {
            translate.x = Math.max(exports.CANVAS_MIN_PADDING, translate.x - offset.left);
            scroll.x += offset.left - (curTranslate.x - translate.x);
        }
        if (offset.top) {
            translate.y = Math.max(exports.CANVAS_MIN_PADDING, translate.y - offset.top);
            scroll.y += offset.top - (curTranslate.y - translate.y);
        }
        return { translate: translate, scroll: scroll };
    };
    CanvasViewManager.prototype.cropHiddenHead = function (curTranslate, curScroll) {
        var scroll = curScroll.clone();
        var translate = curTranslate.clone();
        if (scroll.x && translate.x > exports.CANVAS_MIN_PADDING) {
            var delta = translate.x - Math.max(exports.CANVAS_MIN_PADDING, translate.x - scroll.x);
            translate.x -= delta;
            scroll.x -= delta;
        }
        if (scroll.y && translate.y > exports.CANVAS_MIN_PADDING) {
            var delta = translate.y - Math.max(exports.CANVAS_MIN_PADDING, translate.y - scroll.y);
            translate.y -= delta;
            scroll.y -= delta;
        }
        return { translate: translate, scroll: scroll };
    };
    CanvasViewManager.prototype.getTailSpace = function (curTranslate, curScroll, newModelAbsSize, containerSize, scrollbarWidth) {
        var translate = curTranslate.clone();
        var scroll = curScroll.clone();
        var right = Math.max(containerSize.width + scroll.x - (translate.x + newModelAbsSize.width), exports.CANVAS_MIN_PADDING);
        var bottom = Math.max(containerSize.height + scroll.y - (translate.y + newModelAbsSize.height), exports.CANVAS_MIN_PADDING);
        var scrollbars = this.checkScrollBars(containerSize, scrollbarWidth, newModelAbsSize, new offsets_1.Offsets(translate.x, right, translate.y, bottom));
        if (scrollbars.vertical)
            right = Math.max(exports.CANVAS_MIN_PADDING, right - scrollbarWidth);
        if (scrollbars.horizontal)
            bottom = Math.max(exports.CANVAS_MIN_PADDING, bottom - scrollbarWidth);
        return new size_1.Size(right, bottom);
    };
    CanvasViewManager.prototype.getActualOffset = function (oldCrop, newCrop, docOffset) {
        return new offsets_1.Offsets(-(newCrop.left - oldCrop.left) + docOffset.left, -(newCrop.right - oldCrop.right) + docOffset.right, -(newCrop.top - oldCrop.top) + docOffset.top, -(newCrop.bottom - oldCrop.bottom) + docOffset.bottom);
    };
    CanvasViewManager.prototype.checkScrollBars = function (containerSize, scrollBarWidth, modelAbsSize, paddings) {
        var hasHorizontalScroll = containerSize.width < modelAbsSize.width + paddings.horizontal;
        var hasVerticalScroll = containerSize.height < modelAbsSize.height + paddings.vertical;
        if (hasHorizontalScroll && !hasVerticalScroll)
            hasVerticalScroll = containerSize.height - scrollBarWidth < modelAbsSize.height + paddings.vertical;
        if (hasVerticalScroll && !hasHorizontalScroll)
            hasHorizontalScroll = containerSize.width - scrollBarWidth < modelAbsSize.width + paddings.horizontal;
        return { horizontal: hasHorizontalScroll, vertical: hasVerticalScroll };
    };
    CanvasViewManager.prototype.setSvgSize = function (width, height) {
        if (width !== this.lastWidth || height !== this.lastHeight) {
            this.dom.changeByFunc(this.svgElement, function (e) { return Utils_2.RenderUtils.updateSvgElementSize(e, width, height); });
            this.lastWidth = width;
            this.lastHeight = height;
        }
    };
    CanvasViewManager.prototype.getVisibileAreaAbsShift = function (excludeScroll) {
        var scroll = this.scroll;
        var paddings = this.paddings.clone();
        var simpleView = this.simpleView;
        var cropLeft = simpleView && this.crop ? this.crop.left * this.actualZoom : 0;
        var cropTop = simpleView && this.crop ? this.crop.top * this.actualZoom : 0;
        return new point_1.Point(paddings.left - cropLeft - (excludeScroll ? 0 : scroll.x), paddings.top - cropTop - (excludeScroll ? 0 : scroll.y));
    };
    CanvasViewManager.prototype.getModelPoint = function (absolutePoint, checkScrollArea) {
        var shift = this.getVisibileAreaAbsShift();
        var modelPoint = absolutePoint
            .clone().offset(-shift.x, -shift.y)
            .multiply(1 / this.actualZoom, 1 / this.actualZoom);
        if (checkScrollArea) {
            var scrollSize = this.containerSize;
            if (absolutePoint.x < 0 || absolutePoint.y < 0 || absolutePoint.x > scrollSize.width || absolutePoint.y > scrollSize.height)
                return null;
            if (modelPoint.x < 0 || modelPoint.y < 0)
                return null;
            if (modelPoint.x > this.modelSize.width || modelPoint.y > this.modelSize.height)
                return null;
        }
        return modelPoint.clone().applyConverter(unit_converter_1.UnitConverter.pixelsToTwips);
    };
    CanvasViewManager.prototype.getAbsolutePoint = function (modelPoint, excludeScroll, checkScrollArea) {
        var shift = this.getVisibileAreaAbsShift(excludeScroll);
        var absPoint = modelPoint
            .clone().multiply(this.actualZoom, this.actualZoom)
            .clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF)
            .clone().offset(shift.x, shift.y);
        if (checkScrollArea) {
            if (absPoint.x < 0 || absPoint.y < 0)
                return null;
            var scrollSize = this.containerSize;
            if (absPoint.x > scrollSize.width || absPoint.y > scrollSize.height)
                return null;
        }
        return absPoint;
    };
    return CanvasViewManager;
}(CanvasManagerBase_1.CanvasManagerBase));
exports.CanvasViewManager = CanvasViewManager;
//# sourceMappingURL=CanvasViewManager.js.map