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
exports.DiagramClipboardEvent = exports.DiagramKeyboardEvent = exports.DiagramContextMenuEvent = exports.DiagramWheelEvent = exports.DiagramMouseEvent = exports.DiagramMouseEventBase = exports.DiagramMouseEventTouch = exports.DiagramFocusEvent = exports.DiagramEvent = exports.ResizeEventSource = exports.MouseEventSource = exports.MouseEventElementType = exports.MouseButton = void 0;
var key_1 = require("@devexpress/utils/lib/utils/key");
var MouseButton;
(function (MouseButton) {
    MouseButton[MouseButton["None"] = 0] = "None";
    MouseButton[MouseButton["Left"] = 1] = "Left";
    MouseButton[MouseButton["Right"] = 2] = "Right";
    MouseButton[MouseButton["Middle"] = 4] = "Middle";
})(MouseButton = exports.MouseButton || (exports.MouseButton = {}));
var MouseEventElementType;
(function (MouseEventElementType) {
    MouseEventElementType[MouseEventElementType["Undefined"] = 0] = "Undefined";
    MouseEventElementType[MouseEventElementType["Background"] = 1] = "Background";
    MouseEventElementType[MouseEventElementType["Document"] = 2] = "Document";
    MouseEventElementType[MouseEventElementType["Connector"] = 3] = "Connector";
    MouseEventElementType[MouseEventElementType["ConnectorPoint"] = 4] = "ConnectorPoint";
    MouseEventElementType[MouseEventElementType["ConnectorSide"] = 5] = "ConnectorSide";
    MouseEventElementType[MouseEventElementType["ConnectorOrthogonalSide"] = 6] = "ConnectorOrthogonalSide";
    MouseEventElementType[MouseEventElementType["ConnectorText"] = 7] = "ConnectorText";
    MouseEventElementType[MouseEventElementType["Shape"] = 8] = "Shape";
    MouseEventElementType[MouseEventElementType["ShapeResizeBox"] = 9] = "ShapeResizeBox";
    MouseEventElementType[MouseEventElementType["ShapeParameterBox"] = 10] = "ShapeParameterBox";
    MouseEventElementType[MouseEventElementType["SelectionRect"] = 11] = "SelectionRect";
    MouseEventElementType[MouseEventElementType["ShapeConnectionPoint"] = 12] = "ShapeConnectionPoint";
    MouseEventElementType[MouseEventElementType["ShapeExpandButton"] = 13] = "ShapeExpandButton";
})(MouseEventElementType = exports.MouseEventElementType || (exports.MouseEventElementType = {}));
var MouseEventSource = (function () {
    function MouseEventSource(type, key, value) {
        this.type = type;
        this.key = key;
        this.value = value;
    }
    return MouseEventSource;
}());
exports.MouseEventSource = MouseEventSource;
var ResizeEventSource;
(function (ResizeEventSource) {
    ResizeEventSource[ResizeEventSource["Undefined"] = 0] = "Undefined";
    ResizeEventSource[ResizeEventSource["ResizeBox_NW"] = 1] = "ResizeBox_NW";
    ResizeEventSource[ResizeEventSource["ResizeBox_NE"] = 2] = "ResizeBox_NE";
    ResizeEventSource[ResizeEventSource["ResizeBox_SE"] = 3] = "ResizeBox_SE";
    ResizeEventSource[ResizeEventSource["ResizeBox_SW"] = 4] = "ResizeBox_SW";
    ResizeEventSource[ResizeEventSource["ResizeBox_N"] = 5] = "ResizeBox_N";
    ResizeEventSource[ResizeEventSource["ResizeBox_E"] = 6] = "ResizeBox_E";
    ResizeEventSource[ResizeEventSource["ResizeBox_S"] = 7] = "ResizeBox_S";
    ResizeEventSource[ResizeEventSource["ResizeBox_W"] = 8] = "ResizeBox_W";
})(ResizeEventSource = exports.ResizeEventSource || (exports.ResizeEventSource = {}));
var DiagramEvent = (function () {
    function DiagramEvent(modifiers) {
        this.modifiers = modifiers;
    }
    return DiagramEvent;
}());
exports.DiagramEvent = DiagramEvent;
var DiagramFocusEvent = (function (_super) {
    __extends(DiagramFocusEvent, _super);
    function DiagramFocusEvent(inputText) {
        var _this = _super.call(this, key_1.ModifierKey.None) || this;
        _this.inputText = inputText;
        return _this;
    }
    return DiagramFocusEvent;
}(DiagramEvent));
exports.DiagramFocusEvent = DiagramFocusEvent;
var DiagramMouseEventTouch = (function () {
    function DiagramMouseEventTouch(offsetPoint, modelPoint) {
        this.offsetPoint = offsetPoint;
        this.modelPoint = modelPoint;
    }
    return DiagramMouseEventTouch;
}());
exports.DiagramMouseEventTouch = DiagramMouseEventTouch;
var DiagramMouseEventBase = (function (_super) {
    __extends(DiagramMouseEventBase, _super);
    function DiagramMouseEventBase(modifiers, offsetPoint, modelPoint, source) {
        var _this = _super.call(this, modifiers) || this;
        _this.offsetPoint = offsetPoint;
        _this.modelPoint = modelPoint;
        _this.source = source;
        return _this;
    }
    return DiagramMouseEventBase;
}(DiagramEvent));
exports.DiagramMouseEventBase = DiagramMouseEventBase;
var DiagramMouseEvent = (function (_super) {
    __extends(DiagramMouseEvent, _super);
    function DiagramMouseEvent(modifiers, button, offsetPoint, modelPoint, source, touches, isTouchMode) {
        if (touches === void 0) { touches = []; }
        var _this = _super.call(this, modifiers, offsetPoint, modelPoint, source) || this;
        _this.button = button;
        _this.touches = touches;
        _this.isTouchMode = isTouchMode;
        _this.scrollX = 0;
        _this.scrollY = 0;
        return _this;
    }
    return DiagramMouseEvent;
}(DiagramMouseEventBase));
exports.DiagramMouseEvent = DiagramMouseEvent;
var DiagramWheelEvent = (function (_super) {
    __extends(DiagramWheelEvent, _super);
    function DiagramWheelEvent(modifiers, deltaX, deltaY, offsetPoint, modelPoint, source) {
        var _this = _super.call(this, modifiers, offsetPoint, modelPoint, source) || this;
        _this.deltaX = deltaX;
        _this.deltaY = deltaY;
        return _this;
    }
    return DiagramWheelEvent;
}(DiagramMouseEventBase));
exports.DiagramWheelEvent = DiagramWheelEvent;
var DiagramContextMenuEvent = (function (_super) {
    __extends(DiagramContextMenuEvent, _super);
    function DiagramContextMenuEvent(modifiers, eventPoint, modelPoint) {
        var _this = _super.call(this, modifiers) || this;
        _this.eventPoint = eventPoint;
        _this.modelPoint = modelPoint;
        return _this;
    }
    return DiagramContextMenuEvent;
}(DiagramEvent));
exports.DiagramContextMenuEvent = DiagramContextMenuEvent;
var DiagramKeyboardEvent = (function (_super) {
    __extends(DiagramKeyboardEvent, _super);
    function DiagramKeyboardEvent(modifiers, keyCode, inputText) {
        var _this = _super.call(this, modifiers) || this;
        _this.keyCode = keyCode;
        _this.inputText = inputText;
        return _this;
    }
    DiagramKeyboardEvent.prototype.getShortcutCode = function () {
        return this.modifiers | this.keyCode;
    };
    return DiagramKeyboardEvent;
}(DiagramEvent));
exports.DiagramKeyboardEvent = DiagramKeyboardEvent;
var DiagramClipboardEvent = (function (_super) {
    __extends(DiagramClipboardEvent, _super);
    function DiagramClipboardEvent(clipboardData) {
        var _this = _super.call(this, key_1.ModifierKey.None) || this;
        _this.clipboardData = clipboardData;
        return _this;
    }
    return DiagramClipboardEvent;
}(DiagramEvent));
exports.DiagramClipboardEvent = DiagramClipboardEvent;
//# sourceMappingURL=Event.js.map