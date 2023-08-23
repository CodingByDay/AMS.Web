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
exports.MoveStepDownCommand = exports.MoveDownCommand = exports.MoveStepUpCommand = exports.MoveUpCommand = exports.MoveStepRightCommand = exports.MoveRightCommand = exports.MoveStepLeftCommand = exports.MoveLeftCommand = exports.MoveCommand = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var ModelUtils_1 = require("../../Model/ModelUtils");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var SimpleCommandBase_1 = require("../SimpleCommandBase");
var __1 = require("../..");
var MoveCommand = (function (_super) {
    __extends(MoveCommand, _super);
    function MoveCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveCommand.prototype.isEnabled = function () {
        return _super.prototype.isEnabled.call(this) && !this.control.selection.isEmpty();
    };
    MoveCommand.prototype.executeCore = function (state, parameter) {
        var _this = this;
        this.control.history.beginTransaction();
        var selection = this.control.selection;
        var selectedShapes = selection.getSelectedShapes();
        var selectedShapesWithoutDuplicates = selectedShapes.filter(function (shape) {
            while (shape.container) {
                if (selectedShapes.indexOf(shape.container) !== -1)
                    return false;
                shape = shape.container;
            }
            return true;
        });
        selectedShapesWithoutDuplicates.forEach(function (shape) {
            _this.permissionsProvider.addInteractingItem(shape, __1.DiagramModelOperation.MoveShape);
            var pos = _this.getPosition(shape.position);
            ModelUtils_1.ModelUtils.setShapePosition(_this.control.history, _this.control.model, shape, pos);
            ModelUtils_1.ModelUtils.updateShapeAttachedConnectors(_this.control.history, _this.control.model, shape);
            _this.permissionsProvider.clearInteractingItems();
        });
        var selectedItems = ModelUtils_1.ModelUtils.createSelectedItems(selection);
        selection.getSelectedConnectors().forEach(function (connector) {
            if (ModelUtils_1.ModelUtils.canMoveConnector(selectedItems, connector)) {
                var startPtIndex = connector.beginItem ? 1 : 0;
                var endPtIndex = connector.endItem ? (connector.points.length - 2) : (connector.points.length - 1);
                for (var i = startPtIndex; i <= endPtIndex; i++) {
                    var pos = _this.getPosition(connector.points[i]);
                    ModelUtils_1.ModelUtils.moveConnectorPoint(_this.control.history, connector, i, pos);
                }
            }
        });
        ModelUtils_1.ModelUtils.tryUpdateModelRectangle(this.control.history);
        this.control.history.endTransaction();
        return true;
    };
    Object.defineProperty(MoveCommand.prototype, "isPermissionsRequired", {
        get: function () { return true; },
        enumerable: false,
        configurable: true
    });
    return MoveCommand;
}(SimpleCommandBase_1.SimpleCommandBase));
exports.MoveCommand = MoveCommand;
var MoveLeftCommand = (function (_super) {
    __extends(MoveLeftCommand, _super);
    function MoveLeftCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveLeftCommand.prototype.getPosition = function (position) {
        return position.clone().offset(-unit_converter_1.UnitConverter.pixelsToTwips(1), 0);
    };
    return MoveLeftCommand;
}(MoveCommand));
exports.MoveLeftCommand = MoveLeftCommand;
var MoveStepLeftCommand = (function (_super) {
    __extends(MoveStepLeftCommand, _super);
    function MoveStepLeftCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveStepLeftCommand.prototype.getPosition = function (position) {
        if (this.control.settings.snapToGrid)
            return new point_1.Point(ModelUtils_1.ModelUtils.getSnappedPos(this.control.model, this.control.settings.gridSize, position.x - (this.control.settings.gridSize / 2 + 2), true), position.y);
        else
            return position.clone().offset(-this.control.settings.gridSize, 0);
    };
    return MoveStepLeftCommand;
}(MoveCommand));
exports.MoveStepLeftCommand = MoveStepLeftCommand;
var MoveRightCommand = (function (_super) {
    __extends(MoveRightCommand, _super);
    function MoveRightCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveRightCommand.prototype.getPosition = function (position) {
        return position.clone().offset(unit_converter_1.UnitConverter.pixelsToTwips(1), 0);
    };
    return MoveRightCommand;
}(MoveCommand));
exports.MoveRightCommand = MoveRightCommand;
var MoveStepRightCommand = (function (_super) {
    __extends(MoveStepRightCommand, _super);
    function MoveStepRightCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveStepRightCommand.prototype.getPosition = function (position) {
        if (this.control.settings.snapToGrid)
            return new point_1.Point(ModelUtils_1.ModelUtils.getSnappedPos(this.control.model, this.control.settings.gridSize, position.x + (this.control.settings.gridSize / 2 + 2), true), position.y);
        else
            return position.clone().offset(this.control.settings.gridSize, 0);
    };
    return MoveStepRightCommand;
}(MoveCommand));
exports.MoveStepRightCommand = MoveStepRightCommand;
var MoveUpCommand = (function (_super) {
    __extends(MoveUpCommand, _super);
    function MoveUpCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveUpCommand.prototype.getPosition = function (position) {
        return position.clone().offset(0, -unit_converter_1.UnitConverter.pixelsToTwips(1));
    };
    return MoveUpCommand;
}(MoveCommand));
exports.MoveUpCommand = MoveUpCommand;
var MoveStepUpCommand = (function (_super) {
    __extends(MoveStepUpCommand, _super);
    function MoveStepUpCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveStepUpCommand.prototype.getPosition = function (position) {
        if (this.control.settings.snapToGrid)
            return new point_1.Point(position.x, ModelUtils_1.ModelUtils.getSnappedPos(this.control.model, this.control.settings.gridSize, position.y - (this.control.settings.gridSize / 2 + 2), false));
        else
            return position.clone().offset(0, -this.control.settings.gridSize);
    };
    return MoveStepUpCommand;
}(MoveCommand));
exports.MoveStepUpCommand = MoveStepUpCommand;
var MoveDownCommand = (function (_super) {
    __extends(MoveDownCommand, _super);
    function MoveDownCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveDownCommand.prototype.getPosition = function (position) {
        return position.clone().offset(0, unit_converter_1.UnitConverter.pixelsToTwips(1));
    };
    return MoveDownCommand;
}(MoveCommand));
exports.MoveDownCommand = MoveDownCommand;
var MoveStepDownCommand = (function (_super) {
    __extends(MoveStepDownCommand, _super);
    function MoveStepDownCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MoveStepDownCommand.prototype.getPosition = function (position) {
        if (this.control.settings.snapToGrid)
            return new point_1.Point(position.x, ModelUtils_1.ModelUtils.getSnappedPos(this.control.model, this.control.settings.gridSize, position.y + (this.control.settings.gridSize / 2 + 2), false));
        else
            return position.clone().offset(0, this.control.settings.gridSize);
    };
    return MoveStepDownCommand;
}(MoveCommand));
exports.MoveStepDownCommand = MoveStepDownCommand;
//# sourceMappingURL=MoveCommands.js.map