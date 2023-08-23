"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiagramModelOperation = exports.ModelOperationSettings = void 0;
var ModelOperationSettings = (function () {
    function ModelOperationSettings() {
        this._addShape = true;
        this._addShapeFromToolbox = true;
        this._deleteShape = true;
        this._deleteConnector = true;
        this._changeConnection = true;
        this._changeConnectorPoints = true;
        this._changeShapeText = true;
        this._changeConnectorText = true;
        this._resizeShape = true;
        this._moveShape = true;
    }
    Object.defineProperty(ModelOperationSettings.prototype, "addShape", {
        get: function () { return this._addShape; },
        set: function (value) {
            if (value !== this._addShape)
                this._addShape = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "addShapeFromToolbox", {
        get: function () { return this._addShapeFromToolbox; },
        set: function (value) {
            if (value !== this._addShapeFromToolbox)
                this._addShapeFromToolbox = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "deleteShape", {
        get: function () { return this._deleteShape; },
        set: function (value) {
            if (value !== this._deleteShape)
                this._deleteShape = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "deleteConnector", {
        get: function () { return this._deleteConnector; },
        set: function (value) {
            if (value !== this._deleteConnector)
                this._deleteConnector = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "changeConnection", {
        get: function () { return this._changeConnection; },
        set: function (value) {
            if (value !== this._changeConnection)
                this._changeConnection = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "changeConnectorPoints", {
        get: function () { return this._changeConnectorPoints; },
        set: function (value) {
            if (value !== this._changeConnectorPoints)
                this._changeConnectorPoints = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "changeShapeText", {
        get: function () { return this._changeShapeText; },
        set: function (value) {
            if (value !== this._changeShapeText)
                this._changeShapeText = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "changeConnectorText", {
        get: function () { return this._changeConnectorText; },
        set: function (value) {
            if (value !== this._changeConnectorText)
                this._changeConnectorText = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "resizeShape", {
        get: function () { return this._resizeShape; },
        set: function (value) {
            if (value !== this._resizeShape)
                this._resizeShape = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ModelOperationSettings.prototype, "moveShape", {
        get: function () { return this._moveShape; },
        set: function (value) {
            if (value !== this._moveShape)
                this._moveShape = value;
        },
        enumerable: false,
        configurable: true
    });
    ModelOperationSettings.prototype.applySettings = function (settings) {
        if (!settings)
            return;
        if (typeof settings.addShape === "boolean")
            this.addShape = settings.addShape;
        if (typeof settings.addShapeFromToolbox === "boolean")
            this.addShapeFromToolbox = settings.addShapeFromToolbox;
        if (typeof settings.deleteShape === "boolean")
            this.deleteShape = settings.deleteShape;
        if (typeof settings.deleteConnector === "boolean")
            this.deleteConnector = settings.deleteConnector;
        if (typeof settings.changeConnection === "boolean")
            this.changeConnection = settings.changeConnection;
        if (typeof settings.changeConnectorPoints === "boolean")
            this.changeConnectorPoints = settings.changeConnectorPoints;
        if (typeof settings.changeShapeText === "boolean")
            this.changeShapeText = settings.changeShapeText;
        if (typeof settings.changeConnectorText === "boolean")
            this.changeConnectorText = settings.changeConnectorText;
        if (typeof settings.resizeShape === "boolean")
            this.resizeShape = settings.resizeShape;
        if (typeof settings.moveShape === "boolean")
            this.moveShape = settings.moveShape;
    };
    return ModelOperationSettings;
}());
exports.ModelOperationSettings = ModelOperationSettings;
var DiagramModelOperation;
(function (DiagramModelOperation) {
    DiagramModelOperation[DiagramModelOperation["AddShape"] = 0] = "AddShape";
    DiagramModelOperation[DiagramModelOperation["AddShapeFromToolbox"] = 1] = "AddShapeFromToolbox";
    DiagramModelOperation[DiagramModelOperation["DeleteShape"] = 2] = "DeleteShape";
    DiagramModelOperation[DiagramModelOperation["DeleteConnector"] = 3] = "DeleteConnector";
    DiagramModelOperation[DiagramModelOperation["ChangeConnection"] = 4] = "ChangeConnection";
    DiagramModelOperation[DiagramModelOperation["ChangeConnectorPoints"] = 5] = "ChangeConnectorPoints";
    DiagramModelOperation[DiagramModelOperation["BeforeChangeShapeText"] = 6] = "BeforeChangeShapeText";
    DiagramModelOperation[DiagramModelOperation["ChangeShapeText"] = 7] = "ChangeShapeText";
    DiagramModelOperation[DiagramModelOperation["BeforeChangeConnectorText"] = 8] = "BeforeChangeConnectorText";
    DiagramModelOperation[DiagramModelOperation["ChangeConnectorText"] = 9] = "ChangeConnectorText";
    DiagramModelOperation[DiagramModelOperation["ResizeShape"] = 10] = "ResizeShape";
    DiagramModelOperation[DiagramModelOperation["MoveShape"] = 11] = "MoveShape";
})(DiagramModelOperation = exports.DiagramModelOperation || (exports.DiagramModelOperation = {}));
//# sourceMappingURL=ModelOperationSettings.js.map