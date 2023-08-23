"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewController = void 0;
var CommandManager_1 = require("./Commands/CommandManager");
var LOG_MIN_ZOOM = Math.log(0.05);
var LOG_MAX_ZOOM = Math.log(3);
var ZOOM_STEPS = 40;
var ZERO_STEP = getStepByZoom(1);
var ZOOMLEVEL_COMMANDS = [CommandManager_1.DiagramCommand.ZoomLevel, CommandManager_1.DiagramCommand.ZoomLevelInPercentage, CommandManager_1.DiagramCommand.Zoom100, CommandManager_1.DiagramCommand.Zoom125, CommandManager_1.DiagramCommand.Zoom200, CommandManager_1.DiagramCommand.Zoom25, CommandManager_1.DiagramCommand.Zoom50, CommandManager_1.DiagramCommand.Zoom75];
var AUTOZOOM_COMMANDS = [CommandManager_1.DiagramCommand.SwitchAutoZoom, CommandManager_1.DiagramCommand.ToggleAutoZoom, CommandManager_1.DiagramCommand.AutoZoomToContent, CommandManager_1.DiagramCommand.AutoZoomToWidth];
var ViewController = (function () {
    function ViewController(settings, bars) {
        this.settings = settings;
        this.bars = bars;
        settings.onZoomChanged.add(this);
        this.autoZoom = settings.autoZoom;
    }
    ViewController.prototype.initialize = function (view) {
        this.view = view;
        this.view.onViewChanged.add(this);
    };
    ViewController.prototype.scrollTo = function (modelPoint, offsetPoint) {
        if (this.view)
            this.view.setScrollTo(modelPoint, offsetPoint);
    };
    ViewController.prototype.scrollBy = function (offset) {
        if (this.view && (offset.x !== 0 || offset.y !== 0))
            return this.view.scrollBy(offset);
        return offset;
    };
    ViewController.prototype.scrollIntoView = function (rectangle) {
        this.view && this.view.scrollIntoView(rectangle);
    };
    ViewController.prototype.normalize = function () {
        this.view.tryNormalizePaddings();
    };
    ViewController.prototype.getNextStepZoom = function (increase) {
        var currentZoomStep = this.getNearestCurrentZoomStep();
        var delta = increase ? 1 : -1;
        var step = Math.min(ZOOM_STEPS - 1, Math.max(0, currentZoomStep + delta));
        if (step !== ZERO_STEP) {
            var logZoom = LOG_MIN_ZOOM + (LOG_MAX_ZOOM - LOG_MIN_ZOOM) * step / (ZOOM_STEPS - 1);
            return Math.exp(logZoom);
        }
        return 1;
    };
    ViewController.prototype.getNearestCurrentZoomStep = function () {
        var zoom = this.getZoom();
        return getStepByZoom(zoom);
    };
    ViewController.prototype.getZoom = function () {
        return this.view ? this.view.actualZoom : this.settings.zoomLevel;
    };
    ViewController.prototype.resetScroll = function () {
        this.view.adjust({ horizontal: true, vertical: true });
    };
    ViewController.prototype.notifyViewAdjusted = function (canvasOffset) { };
    ViewController.prototype.notifyActualZoomChanged = function (actualZoom) {
        this.bars.updateItemsState(ZOOMLEVEL_COMMANDS);
    };
    ViewController.prototype.notifyZoomChanged = function (fixedZoomLevel, autoZoom) {
        if (this.autoZoom !== autoZoom) {
            this.autoZoom = autoZoom;
            this.bars.updateItemsState(AUTOZOOM_COMMANDS);
        }
    };
    return ViewController;
}());
exports.ViewController = ViewController;
function getStepByZoom(zoom) {
    var logZoom = Math.log(zoom);
    return Math.round((logZoom - LOG_MIN_ZOOM) * (ZOOM_STEPS - 1) / (LOG_MAX_ZOOM - LOG_MIN_ZOOM));
}
//# sourceMappingURL=ViewController.js.map