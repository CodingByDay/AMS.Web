"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectorRoutingMode = exports.AutoZoomMode = exports.DiagramSettings = void 0;
var Utils_1 = require("./Utils");
var size_1 = require("@devexpress/utils/lib/geometry/size");
var Enums_1 = require("./Enums");
var ModelUtils_1 = require("./Model/ModelUtils");
var DiagramSettings = (function () {
    function DiagramSettings() {
        this.onZoomChanged = new Utils_1.EventDispatcher();
        this.onViewChanged = new Utils_1.EventDispatcher();
        this.onReadOnlyChanged = new Utils_1.EventDispatcher();
        this.onConnectorRoutingModeChanged = new Utils_1.EventDispatcher();
        this._zoomLevel = 1;
        this._zoomLevelWasChanged = false;
        this._zoomLevelItems = [0.5, 0.75, 1, 1.25, 1.5, 2, 3];
        this._simpleView = false;
        this._fullscreen = false;
        this._readOnly = false;
        this._autoZoom = AutoZoomMode.Disabled;
        this._snapToGrid = true;
        this._showGrid = true;
        this._contextMenuEnabled = true;
        this._gridSize = 180;
        this._gridSizeItems = [90, 180, 360, 720];
        this._pageSizeItems = [
            { size: new size_1.Size(12240, 15840), text: "US-Letter ({width} x {height})" },
            { size: new size_1.Size(12240, 20160), text: "US-Legal ({width} x {height})" },
            { size: new size_1.Size(15817, 24491), text: "US-Tabloid ({width} x {height})" },
            { size: new size_1.Size(47679, 67408), text: "A0 ({width} x {height})" },
            { size: new size_1.Size(33676, 47679), text: "A1 ({width} x {height})" },
            { size: new size_1.Size(23811, 33676), text: "A2 ({width} x {height})" },
            { size: new size_1.Size(16838, 23811), text: "A3 ({width} x {height})" },
            { size: new size_1.Size(11906, 16838), text: "A4 ({width} x {height})" },
            { size: new size_1.Size(8391, 11906), text: "A5 ({width} x {height})" },
            { size: new size_1.Size(5953, 8391), text: "A6 ({width} x {height})" },
            { size: new size_1.Size(4195, 5953), text: "A7 ({width} x {height})" }
        ];
        this._viewUnits = Enums_1.DiagramUnit.In;
        this._connectorRoutingMode = ConnectorRoutingMode.AllShapesOnly;
        this._reloadInsertedItemRequired = false;
        this._useCanvgForExportToImage = true;
    }
    Object.defineProperty(DiagramSettings.prototype, "zoomLevel", {
        get: function () { return this._zoomLevel; },
        set: function (value) {
            var _this = this;
            value = DiagramSettings.correctZoomLevel(value);
            if (value !== this._zoomLevel) {
                this._zoomLevel = value;
                this._zoomLevelWasChanged = true;
                this.onZoomChanged.raise1(function (listener) { return listener.notifyZoomChanged(value, _this._autoZoom); });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "zoomLevelWasChanged", {
        get: function () { return this._zoomLevelWasChanged; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "zoomLevelItems", {
        get: function () { return this._zoomLevelItems; },
        set: function (value) {
            value = value.map(function (l) { return DiagramSettings.correctZoomLevel(l); });
            if (value !== this._zoomLevelItems)
                this._zoomLevelItems = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "autoZoom", {
        get: function () { return this._autoZoom; },
        set: function (value) {
            var _this = this;
            if (value !== this._autoZoom) {
                this._autoZoom = value;
                this.onZoomChanged.raise1(function (l) { return l.notifyZoomChanged(_this._zoomLevel, value); });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "simpleView", {
        get: function () { return this._simpleView; },
        set: function (value) {
            if (value !== this._simpleView) {
                this._simpleView = value;
                this.notifyViewChanged();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "readOnly", {
        get: function () { return this._readOnly; },
        set: function (value) {
            if (value !== this._readOnly) {
                this._readOnly = value;
                this.onReadOnlyChanged.raise1(function (listener) { return listener.notifyReadOnlyChanged(value); });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "fullscreen", {
        get: function () { return this._fullscreen; },
        set: function (value) { this._fullscreen = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "snapToGrid", {
        get: function () { return this._snapToGrid; },
        set: function (value) { this._snapToGrid = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "showGrid", {
        get: function () { return this._showGrid; },
        set: function (value) {
            var _this = this;
            if (value !== this._showGrid) {
                this._showGrid = value;
                this.onViewChanged.raise1(function (l) { return l.notifyGridChanged(_this.showGrid, _this.gridSize); });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "contextMenuEnabled", {
        get: function () { return this._contextMenuEnabled; },
        set: function (value) {
            this._contextMenuEnabled = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "gridSize", {
        get: function () { return this._gridSize; },
        set: function (value) {
            var _this = this;
            if (value !== this._gridSize) {
                this._gridSize = value;
                this.onViewChanged.raise1(function (l) { return l.notifyGridChanged(_this.showGrid, _this.gridSize); });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "gridSizeItems", {
        get: function () { return this._gridSizeItems; },
        set: function (value) {
            if (value !== this._gridSizeItems)
                this._gridSizeItems = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "pageSizeItems", {
        get: function () { return this._pageSizeItems; },
        set: function (value) {
            if (value !== this._pageSizeItems)
                this._pageSizeItems = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "viewUnits", {
        get: function () { return this._viewUnits; },
        set: function (value) { this._viewUnits = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "connectorRoutingMode", {
        get: function () { return this._connectorRoutingMode; },
        set: function (value) {
            if (value !== this._connectorRoutingMode) {
                this._connectorRoutingMode = value;
                this.onConnectorRoutingModeChanged.raise1(function (listener) { return listener.notifyConnectorRoutingModeChanged(value); });
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "reloadInsertedItemRequired", {
        get: function () { return this._reloadInsertedItemRequired; },
        set: function (value) {
            this._reloadInsertedItemRequired = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "useCanvgForExportToImage", {
        get: function () { return this._useCanvgForExportToImage; },
        set: function (value) {
            this._useCanvgForExportToImage = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "shapeMinWidth", {
        get: function () { return this._shapeMinWidth; },
        set: function (value) { this._shapeMinWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "shapeMinHeight", {
        get: function () { return this._shapeMinHeight; },
        set: function (value) { this._shapeMinHeight = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "shapeMaxWidth", {
        get: function () { return this._shapeMaxWidth; },
        set: function (value) { this._shapeMaxWidth = value; },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DiagramSettings.prototype, "shapeMaxHeight", {
        get: function () { return this._shapeMaxHeight; },
        set: function (value) { this._shapeMaxHeight = value; },
        enumerable: false,
        configurable: true
    });
    DiagramSettings.prototype.applyShapeSizeSettings = function (settings, units) {
        if (!settings)
            return;
        if (typeof (settings.shapeMaxHeight) === "number")
            this.shapeMaxHeight = ModelUtils_1.ModelUtils.getTwipsValue(units, settings.shapeMaxHeight);
        if (typeof (settings.shapeMinHeight) === "number")
            this.shapeMinHeight = ModelUtils_1.ModelUtils.getTwipsValue(units, settings.shapeMinHeight);
        if (typeof (settings.shapeMaxWidth) === "number")
            this.shapeMaxWidth = ModelUtils_1.ModelUtils.getTwipsValue(units, settings.shapeMaxWidth);
        if (typeof (settings.shapeMinWidth) === "number")
            this.shapeMinWidth = ModelUtils_1.ModelUtils.getTwipsValue(units, settings.shapeMinWidth);
    };
    DiagramSettings.prototype.notifyViewChanged = function () {
        var _this = this;
        this.onViewChanged.raise1(function (listener) { return listener.notifyViewChanged(_this._simpleView); });
    };
    DiagramSettings.correctZoomLevel = function (level) {
        return Math.min(10, Math.max(level, 0.01));
    };
    return DiagramSettings;
}());
exports.DiagramSettings = DiagramSettings;
var AutoZoomMode;
(function (AutoZoomMode) {
    AutoZoomMode[AutoZoomMode["Disabled"] = 0] = "Disabled";
    AutoZoomMode[AutoZoomMode["FitContent"] = 1] = "FitContent";
    AutoZoomMode[AutoZoomMode["FitToWidth"] = 2] = "FitToWidth";
})(AutoZoomMode = exports.AutoZoomMode || (exports.AutoZoomMode = {}));
var ConnectorRoutingMode;
(function (ConnectorRoutingMode) {
    ConnectorRoutingMode[ConnectorRoutingMode["None"] = 0] = "None";
    ConnectorRoutingMode[ConnectorRoutingMode["ConnectorShapesOnly"] = 1] = "ConnectorShapesOnly";
    ConnectorRoutingMode[ConnectorRoutingMode["AllShapesOnly"] = 2] = "AllShapesOnly";
})(ConnectorRoutingMode = exports.ConnectorRoutingMode || (exports.ConnectorRoutingMode = {}));
//# sourceMappingURL=Settings.js.map