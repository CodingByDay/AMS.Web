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
exports.PasteSelectionCommand = void 0;
var point_1 = require("@devexpress/utils/lib/geometry/point");
var PasteSelectionCommandBase_1 = require("./PasteSelectionCommandBase");
var PasteSelectionCommand = (function (_super) {
    __extends(PasteSelectionCommand, _super);
    function PasteSelectionCommand() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasteSelectionCommand.prototype.getEventPositionOffset = function (_items, _evtPosition) {
        return new point_1.Point(0, 0);
    };
    return PasteSelectionCommand;
}(PasteSelectionCommandBase_1.PasteSelectionCommandBase));
exports.PasteSelectionCommand = PasteSelectionCommand;
//# sourceMappingURL=PasteSelectionCommand.js.map