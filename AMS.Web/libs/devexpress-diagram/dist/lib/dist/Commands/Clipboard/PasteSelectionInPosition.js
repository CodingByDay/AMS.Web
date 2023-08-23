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
exports.PasteSelectionInPositionCommand = void 0;
var PasteSelectionCommandBase_1 = require("./PasteSelectionCommandBase");
var Shape_1 = require("../../Model/Shapes/Shape");
var Connector_1 = require("../../Model/Connectors/Connector");
var point_1 = require("@devexpress/utils/lib/geometry/point");
var PasteSelectionInPositionCommand = (function (_super) {
    __extends(PasteSelectionInPositionCommand, _super);
    function PasteSelectionInPositionCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasteSelectionInPositionCommand.prototype.getEventPositionOffset = function (items, evtPosition) {
        if (!evtPosition)
            return point_1.Point.zero();
        var selectionPos = items.reduce(function (min, i) {
            return {
                x: Math.min(min.x, i instanceof Shape_1.Shape ? i.position.x : i instanceof Connector_1.Connector ? i.getMinX() : Number.MAX_VALUE),
                y: Math.min(min.y, i instanceof Shape_1.Shape ? i.position.y : i instanceof Connector_1.Connector ? i.getMinY() : Number.MAX_VALUE)
            };
        }, {
            x: Number.MAX_VALUE,
            y: Number.MAX_VALUE
        });
        var newSelectionPos = this.control.render.getModelPointByEventPoint(evtPosition.x, evtPosition.y);
        return new point_1.Point(newSelectionPos.x - selectionPos.x, newSelectionPos.y - selectionPos.y);
    };
    return PasteSelectionInPositionCommand;
}(PasteSelectionCommandBase_1.PasteSelectionCommandBase));
exports.PasteSelectionInPositionCommand = PasteSelectionInPositionCommand;
//# sourceMappingURL=PasteSelectionInPosition.js.map