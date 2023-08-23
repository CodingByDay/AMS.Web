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
exports.MouseHandlerDragParameterPointState = void 0;
var MouseHandlerDraggingState_1 = require("./MouseHandlerDraggingState");
var ChangeShapeParametersHistoryItem_1 = require("../../History/Common/ChangeShapeParametersHistoryItem");
var MouseHandlerDragParameterPointState = (function (_super) {
    __extends(MouseHandlerDragParameterPointState, _super);
    function MouseHandlerDragParameterPointState(handler, history, model) {
        var _this = _super.call(this, handler, history) || this;
        _this.model = model;
        _this.startScrollLeft = 0;
        _this.startScrollTop = 0;
        return _this;
    }
    MouseHandlerDragParameterPointState.prototype.onMouseDown = function (evt) {
        this.startPoint = evt.modelPoint;
        this.shape = this.model.findShape(evt.source.key);
        this.parameterPointKey = evt.source.value;
        this.startParameters = this.shape.parameters.clone();
        _super.prototype.onMouseDown.call(this, evt);
    };
    MouseHandlerDragParameterPointState.prototype.onApplyChanges = function (evt) {
        var offset = this.handler.getSnappedOffsetOnDragPoint(evt, this.startPoint);
        var parameters = this.startParameters.clone();
        this.shape.description.modifyParameters(this.shape, parameters, offset.x, offset.y);
        this.history.addAndRedo(new ChangeShapeParametersHistoryItem_1.ChangeShapeParametersHistoryItem(this.shape.key, parameters));
    };
    MouseHandlerDragParameterPointState.prototype.getDraggingElementKeys = function () {
        return [this.shape.key];
    };
    return MouseHandlerDragParameterPointState;
}(MouseHandlerDraggingState_1.MouseHandlerDraggingState));
exports.MouseHandlerDragParameterPointState = MouseHandlerDragParameterPointState;
//# sourceMappingURL=MouseHandlerDragParameterPointState.js.map