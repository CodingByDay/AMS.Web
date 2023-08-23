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
exports.MouseHandlerSelectionState = void 0;
var Event_1 = require("../Event");
var rectangle_1 = require("@devexpress/utils/lib/geometry/rectangle");
var MouseHandlerStateBase_1 = require("./MouseHandlerStateBase");
var MouseHandlerSelectionState = (function (_super) {
    __extends(MouseHandlerSelectionState, _super);
    function MouseHandlerSelectionState(handler, selection, visualizerManager) {
        var _this = _super.call(this, handler) || this;
        _this.selection = selection;
        _this.visualizerManager = visualizerManager;
        return _this;
    }
    MouseHandlerSelectionState.prototype.finish = function () {
        this.handler.raiseDragEnd([]);
        this.visualizerManager.resetSelectionRectangle();
        _super.prototype.finish.call(this);
    };
    MouseHandlerSelectionState.prototype.cancelChanges = function () {
    };
    MouseHandlerSelectionState.prototype.onMouseDown = function (evt) {
        this.startPoint = evt.modelPoint;
        this.handler.raiseDragStart([]);
    };
    MouseHandlerSelectionState.prototype.onMouseMove = function (evt) {
        if (evt.button !== Event_1.MouseButton.Left)
            this.handler.switchToDefaultState();
        else {
            this.rectangle = rectangle_1.Rectangle.fromPoints(this.startPoint, evt.modelPoint);
            this.visualizerManager.setSelectionRectangle(this.rectangle);
        }
    };
    MouseHandlerSelectionState.prototype.onMouseUp = function (evt) {
        if (this.rectangle !== undefined)
            this.selection.selectRect(this.rectangle);
        else
            this.selection.set([]);
        this.rectangle = undefined;
        this.handler.switchToDefaultState();
    };
    return MouseHandlerSelectionState;
}(MouseHandlerStateBase_1.MouseHandlerCancellableState));
exports.MouseHandlerSelectionState = MouseHandlerSelectionState;
//# sourceMappingURL=MouseHandlerSelectionState.js.map