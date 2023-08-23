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
exports.CanvasPageManager = void 0;
var Style_1 = require("../Model/Style");
var RectaglePrimitive_1 = require("./Primitives/RectaglePrimitive");
var PathPrimitive_1 = require("./Primitives/PathPrimitive");
var PatternPrimitive_1 = require("./Primitives/PatternPrimitive");
var ClipPathPrimitive_1 = require("./Primitives/ClipPathPrimitive");
var CanvasManagerBase_1 = require("./CanvasManagerBase");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var Utils_1 = require("./Utils");
var color_1 = require("@devexpress/utils/lib/utils/color");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var GRID_PAGES_LINEWIDTH = 2;
var CanvasPageManager = (function (_super) {
    __extends(CanvasPageManager, _super);
    function CanvasPageManager(parent, settings, dom, instanceId) {
        var _this = _super.call(this, settings.zoomLevel, dom, instanceId) || this;
        _this.snapPoint = new point_1.Point(0, 0);
        _this.gridPatternId = Utils_1.RenderUtils.generateSvgElementId("gridPattern");
        _this.pagesGridPatternId = Utils_1.RenderUtils.generateSvgElementId("pagesGridPattern");
        _this.pagesGridClipId = Utils_1.RenderUtils.generateSvgElementId("pagesGridClip");
        _this.pageColor = settings.pageColor;
        _this.modelSize = settings.modelSize;
        _this.simpleView = settings.simpleView;
        _this.gridSize = settings.gridSize;
        _this.gridVisible = settings.gridVisible;
        _this.pageSize = settings.pageLandscape ? new size_1.Size(settings.pageSize.height, settings.pageSize.width) : settings.pageSize;
        _this.canvasViewOffset = new point_1.Point(0, 0);
        _this.initContainers(parent);
        return _this;
    }
    CanvasPageManager.prototype.initContainers = function (parent) {
        this.backgroundContainer = parent;
    };
    CanvasPageManager.prototype.redraw = function () {
        this.redrawPage(this.pageColor);
        this.redrawGrid();
    };
    CanvasPageManager.prototype.redrawPage = function (color) {
        var style = new Style_1.Style();
        style["fill"] = color_1.ColorUtils.colorToHash(color);
        this.getOrCreateElement("page-bg", new RectaglePrimitive_1.RectanglePrimitive(0, 0, "100%", "100%", style, "page"), this.backgroundContainer);
        this.createTextFloodFilter(this.instanceId, "page-bg-textflood-filter", this.backgroundContainer, color);
    };
    CanvasPageManager.prototype.redrawGrid = function () {
        this.updateGridElements();
        this.updatePagesGridElements();
    };
    CanvasPageManager.prototype.getGridRectElement = function (primitive) {
        if (this.gridRectElement === undefined)
            this.gridRectElement = this.createPrimitiveElement(primitive, this.backgroundContainer);
        return this.gridRectElement;
    };
    CanvasPageManager.prototype.getGridPatternElement = function (primitive) {
        if (this.gridPatternElement === undefined)
            this.gridPatternElement = this.createPrimitiveElement(primitive, this.backgroundContainer);
        return this.gridPatternElement;
    };
    CanvasPageManager.prototype.updateGridElements = function () {
        var _this = this;
        var gridRectPrimitive = new RectaglePrimitive_1.RectanglePrimitive("0", "0", "100%", "100%", null, "grid", null, function (element) {
            element.style.setProperty("fill", Utils_1.RenderUtils.getUrlPathById(_this.gridPatternId));
        });
        var rectEl = this.getGridRectElement(gridRectPrimitive);
        if (!this.gridVisible)
            rectEl.style.display = "none";
        else {
            rectEl.style.display = "";
            this.changePrimitiveElement(gridRectPrimitive, rectEl);
            var absGridSize_1 = unit_converter_1.UnitConverter.twipsToPixelsF(this.gridSize) * this.actualZoom;
            var sizes = [0, 1, 2, 3, 4].map(function (i) { return Math.round(absGridSize_1 * i); });
            var outerPathCommands = [
                new PathPrimitive_1.PathPrimitiveMoveToCommand(sizes[4].toString(), "0"),
                new PathPrimitive_1.PathPrimitiveLineToCommand(sizes[4].toString(), sizes[4].toString()),
                new PathPrimitive_1.PathPrimitiveLineToCommand("0", sizes[4].toString())
            ];
            var innerPathCommands = [];
            for (var i = 1; i <= 3; i++) {
                innerPathCommands.push(new PathPrimitive_1.PathPrimitiveMoveToCommand(sizes[i].toString(), "0"));
                innerPathCommands.push(new PathPrimitive_1.PathPrimitiveLineToCommand(sizes[i].toString(), sizes[4].toString()));
            }
            for (var i = 1; i <= 3; i++) {
                innerPathCommands.push(new PathPrimitive_1.PathPrimitiveMoveToCommand("0", sizes[i].toString()));
                innerPathCommands.push(new PathPrimitive_1.PathPrimitiveLineToCommand(sizes[4].toString(), sizes[i].toString()));
            }
            var commonSize = absGridSize_1 * 4;
            var canvasViewOffset = this.simpleView ? this.canvasViewOffset : point_1.Point.zero();
            var gridPatternPrimitive = new PatternPrimitive_1.PatternPrimitive(this.gridPatternId, [
                this.createGridPathPrimitive(outerPathCommands, "grid-outer-line"),
                this.createGridPathPrimitive(innerPathCommands, "grid-inner-line")
            ], this.createGridPatternPrimitivePosition(canvasViewOffset.x, this.snapPoint.x, commonSize), this.createGridPatternPrimitivePosition(canvasViewOffset.y, this.snapPoint.y, commonSize), commonSize.toString(), commonSize.toString());
            this.changePrimitiveElement(gridPatternPrimitive, this.getGridPatternElement(gridPatternPrimitive));
        }
    };
    CanvasPageManager.prototype.createGridPatternPrimitivePosition = function (offset, coord, commonSize) {
        return (((offset + coord * this.actualZoom) % commonSize - commonSize) % commonSize).toString();
    };
    CanvasPageManager.prototype.createGridPathPrimitive = function (commands, className) {
        return new PathPrimitive_1.PathPrimitive(commands, Style_1.StrokeStyle.default1pxNegativeOffsetInstance, className);
    };
    CanvasPageManager.prototype.getPagesGridRectElement = function (primitive) {
        return this.getOrCreateElement("grid-pages-rect", primitive, this.backgroundContainer);
    };
    CanvasPageManager.prototype.getPagesGridClipPathElement = function (primitive) {
        if (this.pagesGridClipPathElement === undefined)
            this.pagesGridClipPathElement = this.createPrimitiveElement(primitive, this.backgroundContainer);
        return this.pagesGridClipPathElement;
    };
    CanvasPageManager.prototype.getPagesGridPatternElement = function (primitive) {
        if (this.pagesGridPatternElement === undefined)
            this.pagesGridPatternElement = this.createPrimitiveElement(primitive, this.backgroundContainer);
        return this.pagesGridPatternElement;
    };
    CanvasPageManager.prototype.updatePagesGridElements = function () {
        var _this = this;
        var pageAbsSize = this.getAbsoluteSize(this.pageSize);
        var rectPrimitive = new RectaglePrimitive_1.RectanglePrimitive("0", "0", "100%", "100%", null, "grid-page", this.pagesGridClipId, function (element) {
            element.style.setProperty("fill", Utils_1.RenderUtils.getUrlPathById(_this.pagesGridPatternId));
            element.style.setProperty("display", _this.simpleView ? "none" : "");
        });
        this.getPagesGridRectElement(rectPrimitive);
        if (!this.simpleView) {
            var modelSize = this.modelSize.clone().multiply(this.actualZoom, this.actualZoom);
            var pageGridPathCommands = [
                new PathPrimitive_1.PathPrimitiveMoveToCommand((pageAbsSize.width - GRID_PAGES_LINEWIDTH / 2).toString(), "0"),
                new PathPrimitive_1.PathPrimitiveLineToCommand((pageAbsSize.width - GRID_PAGES_LINEWIDTH / 2).toString(), (pageAbsSize.height - GRID_PAGES_LINEWIDTH / 2).toString()),
                new PathPrimitive_1.PathPrimitiveLineToCommand("0", (pageAbsSize.height - GRID_PAGES_LINEWIDTH / 2).toString())
            ];
            var pagesGridPatternPrimitive = new PatternPrimitive_1.PatternPrimitive(this.pagesGridPatternId, [
                new PathPrimitive_1.PathPrimitive(pageGridPathCommands, null, "pages-grid-line")
            ], 0, 0, pageAbsSize.width.toString(), pageAbsSize.height.toString());
            this.changePrimitiveElement(pagesGridPatternPrimitive, this.getPagesGridPatternElement(pagesGridPatternPrimitive));
            var pagesGridClipPathPrimitive = new ClipPathPrimitive_1.ClipPathPrimitive(this.pagesGridClipId, [
                new RectaglePrimitive_1.RectanglePrimitive(0, 0, (unit_converter_1.UnitConverter.twipsToPixelsF(modelSize.width) - GRID_PAGES_LINEWIDTH * 2).toString(), (unit_converter_1.UnitConverter.twipsToPixelsF(modelSize.height) - GRID_PAGES_LINEWIDTH * 2).toString())
            ]);
            this.changePrimitiveElement(pagesGridClipPathPrimitive, this.getPagesGridClipPathElement(pagesGridClipPathPrimitive));
        }
    };
    CanvasPageManager.prototype.notifyModelSizeChanged = function (size, offset) {
        this.modelSize = size.clone();
        this.redraw();
    };
    CanvasPageManager.prototype.notifyModelRectangleChanged = function (rectangle) { };
    CanvasPageManager.prototype.notifySnapPointPositionChanged = function (point) {
        this.snapPoint = point.clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixelsF);
        this.redrawGrid();
    };
    CanvasPageManager.prototype.notifyPageColorChanged = function (color) {
        this.pageColor = color;
        this.redrawPage(this.pageColor);
    };
    CanvasPageManager.prototype.notifyModelChanged = function (changes) { };
    CanvasPageManager.prototype.notifyPageSizeChanged = function (pageSize, pageLandscape) {
        this.pageSize = pageLandscape ? new size_1.Size(pageSize.height, pageSize.width) : pageSize.clone();
        this.redraw();
    };
    CanvasPageManager.prototype.notifyActualZoomChanged = function (actualZoom) {
        this.actualZoom = actualZoom;
        this.redraw();
    };
    CanvasPageManager.prototype.notifyViewAdjusted = function (canvasViewOffset) {
        if (!this.canvasViewOffset.equals(canvasViewOffset)) {
            this.canvasViewOffset = canvasViewOffset;
            if (this.simpleView)
                this.redraw();
        }
    };
    CanvasPageManager.prototype.notifyViewChanged = function (simpleView) {
        this.simpleView = simpleView;
        this.redraw();
    };
    CanvasPageManager.prototype.notifyGridChanged = function (showGrid, gridSize) {
        this.gridVisible = showGrid;
        this.gridSize = gridSize;
        this.redraw();
    };
    return CanvasPageManager;
}(CanvasManagerBase_1.CanvasManagerBase));
exports.CanvasPageManager = CanvasPageManager;
//# sourceMappingURL=CanvasPageManager.js.map