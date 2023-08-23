"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputManager = void 0;
var key_1 = require("@devexpress/utils/lib/utils/key");
var dom_1 = require("@devexpress/utils/lib/utils/dom");
var Utils_1 = require("./Utils");
var Event_1 = require("../Events/Event");
var Shape_1 = require("../Model/Shapes/Shape");
var Connector_1 = require("../Model/Connectors/Connector");
var evt_1 = require("@devexpress/utils/lib/utils/evt");
var ITextMeasurer_1 = require("./Measurer/ITextMeasurer");
var browser_1 = require("@devexpress/utils/lib/browser");
var unit_converter_1 = require("@devexpress/utils/lib/class/unit-converter");
var RenderHelper_1 = require("./RenderHelper");
var TextUtils_1 = require("../Utils/TextUtils");
var Utils_2 = require("../Utils");
var TEXT_INPUT_CSSCLASS = "dxdi-text-input";
var InputManager = (function () {
    function InputManager(mainElement, layoutPointResolver, eventManager, textMeasurer, actualZoom, focusElementsParent) {
        this.mainElement = mainElement;
        this.layoutPointResolver = layoutPointResolver;
        this.eventManager = eventManager;
        this.textMeasurer = textMeasurer;
        this.actualZoom = actualZoom;
        this.focusElementsParent = focusElementsParent;
        this.focused = false;
        this.focusLocked = false;
        this.createInputElements(this.mainElement, this.focusElementsParent);
    }
    InputManager.prototype.detachEvents = function () {
        this.detachInputElementEvents();
        this.detachTextInputElementEvents();
    };
    InputManager.prototype.isFocused = function () {
        return this.focused;
    };
    InputManager.prototype.captureFocus = function (keepTextInputFocused) {
        if (keepTextInputFocused && document.activeElement === this.textInputElement)
            Utils_2.HtmlFocusUtils.focusWithPreventScroll(this.textInputElement || this.inputElement);
        else
            Utils_2.HtmlFocusUtils.focusWithPreventScroll(this.inputElement);
    };
    InputManager.prototype.setClipboardData = function (data) {
        this.clipboardInputElement.value = data;
        Utils_2.HtmlFocusUtils.focusWithPreventScroll(this.clipboardInputElement);
        this.clipboardInputElement.select();
        document.execCommand("copy");
        this.captureFocus();
    };
    InputManager.prototype.getClipboardData = function (callback) {
        var _this = this;
        if (navigator && navigator["clipboard"])
            navigator["clipboard"].readText().then(function (clipText) {
                callback(clipText);
                _this.captureFocus();
            }).catch(function () {
                callback("");
                _this.captureFocus();
            });
        else if (browser_1.Browser.IE) {
            this.clipboardInputElement.value = "";
            Utils_2.HtmlFocusUtils.focusWithPreventScroll(this.clipboardInputElement);
            this.clipboardInputElement.select();
            document.execCommand("Paste");
            callback(this.clipboardInputElement.value);
            this.captureFocus();
        }
    };
    InputManager.prototype.isPasteSupportedByBrowser = function () {
        return browser_1.Browser.IE || (browser_1.Browser.WebKitFamily && navigator && navigator["clipboard"] !== undefined);
    };
    InputManager.prototype.createInputElements = function (parent, focusElementsParent) {
        this.createFocusInputElement(focusElementsParent || parent);
        this.createTextInputElement(parent);
        this.createClipboardInputElement(focusElementsParent || parent);
        this.attachInputElementEvents();
    };
    InputManager.prototype.setInputElementFocusHandlerMode = function (captureFocus) {
        this.textInputElementContainer.setAttribute("class", "dxdi-text-input-container");
        if (captureFocus)
            this.captureFocus();
    };
    InputManager.prototype.setInputElementTextInputMode = function (text, position, size, style, className, textAngle) {
        this.textInputElementContainer.setAttribute("class", "dxdi-text-input-container " + className);
        this.textInputElement.value = text;
        this.setTextInputElementBounds(position, size, textAngle);
        this.setTextInputElementStyle(style);
        this.updateTextInputPadding();
        var element = this.textInputElement || this.inputElement;
        Utils_2.HtmlFocusUtils.focusWithPreventScroll(element);
        if (element.select)
            element.select();
    };
    InputManager.prototype.setTextInputElementBounds = function (position, size, textAngle) {
        this.savedTextInputPosition = position;
        this.savedTextInputSize = size;
        this.savedTextInputAngle = textAngle;
        var abs = this.layoutPointResolver.getAbsolutePoint(position, true);
        this.textInputElementContainer.style.left = abs.x + "px";
        this.textInputElementContainer.style.top = abs.y + "px";
        this.textInputElementContainer.style.width = size && size.width + "px" || "0px";
        this.textInputElementContainer.style.height = size && size.height + "px" || "0px";
        var transforms = [];
        this.textInputElementContainer.style.transform = "";
        if (this.actualZoom !== 1)
            transforms.push("scale(" + this.actualZoom + ")");
        if (textAngle)
            transforms.push("rotate(" + textAngle + "deg)");
        this.textInputElementContainer.style.transform = transforms.join(" ");
        this.textInputElement.style.width = size && size.width + "px" || "";
        this.textInputElement.style.height = size && size.height + "px" || "auto";
    };
    InputManager.prototype.setTextInputElementStyle = function (style) {
        this.savedTextInputStyle = style;
        Utils_1.RenderUtils.applyStyleToElement(style, this.textInputElement);
    };
    InputManager.prototype.createFocusInputElement = function (parent) {
        this.inputElement = document.createElement("textarea");
        this.inputElement.readOnly = browser_1.Browser.TouchUI;
        this.inputElement.setAttribute("class", "dxdi-focus-input");
        parent.appendChild(this.inputElement);
    };
    InputManager.prototype.attachInputElementEvents = function () {
        this.onInputBlurHandler = this.onInputBlur.bind(this);
        this.onInputFocusHandler = this.onInputFocus.bind(this);
        this.onInputKeyDownHandler = this.onInputKeyDown.bind(this);
        this.onInputKeyPressHandler = this.onInputKeyPress.bind(this);
        this.onInputKeyUpHandler = this.onInputKeyUp.bind(this);
        this.onPasteHandler = this.onPaste.bind(this);
        RenderHelper_1.RenderHelper.addEventListener(this.inputElement, "blur", this.onInputBlurHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.inputElement, "focus", this.onInputFocusHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.inputElement, "keydown", this.onInputKeyDownHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.inputElement, "keypress", this.onInputKeyPressHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.inputElement, "keyup", this.onInputKeyUpHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.inputElement, "paste", this.onPasteHandler);
    };
    InputManager.prototype.detachInputElementEvents = function () {
        RenderHelper_1.RenderHelper.removeEventListener(this.inputElement, "blur", this.onInputBlurHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.inputElement, "focus", this.onInputFocusHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.inputElement, "keydown", this.onInputKeyDownHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.inputElement, "keypress", this.onInputKeyPressHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.inputElement, "keyup", this.onInputKeyUpHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.inputElement, "paste", this.onPasteHandler);
    };
    InputManager.prototype.createTextInputElement = function (parent) {
        this.textInputElementContainer = document.createElement("div");
        this.textInputElementContainer.setAttribute("class", "dxdi-text-input-container");
        parent.appendChild(this.textInputElementContainer);
        this.textInputElement = document.createElement("textarea");
        this.textInputElement.setAttribute("class", TEXT_INPUT_CSSCLASS);
        this.attachTextInputElementEvents();
        this.textInputElementContainer.appendChild(this.textInputElement);
    };
    InputManager.prototype.attachTextInputElementEvents = function () {
        this.onTextInputBlurHandler = this.onTextInputBlur.bind(this);
        this.onTextInputFocusHandler = this.onTextInputFocus.bind(this);
        this.onTextInputKeyDownHandler = this.onTextInputKeyDown.bind(this);
        this.onTextInputMouseWheelHandler = this.onTextInputMouseWheel.bind(this);
        this.onTextInputMouseUpHandler = this.onTextInputMouseUp.bind(this);
        this.onTextInputKeyUpHandler = this.onTextInputKeyUp.bind(this);
        this.onTextInputChangeHandler = this.onTextInputChange.bind(this);
        RenderHelper_1.RenderHelper.addEventListener(this.textInputElement, "mousewheel", this.onTextInputMouseWheelHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.textInputElement, "mouseup", this.onTextInputMouseUpHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.textInputElement, "blur", this.onTextInputBlurHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.textInputElement, "focus", this.onTextInputFocusHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.textInputElement, "keydown", this.onTextInputKeyDownHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.textInputElement, "keyup", this.onTextInputKeyUpHandler);
        RenderHelper_1.RenderHelper.addEventListener(this.textInputElement, "change", this.onTextInputChangeHandler);
    };
    InputManager.prototype.detachTextInputElementEvents = function () {
        RenderHelper_1.RenderHelper.removeEventListener(this.textInputElement, "mousewheel", this.onTextInputMouseWheelHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.textInputElement, "mouseup", this.onTextInputMouseUpHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.textInputElement, "blur", this.onTextInputBlurHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.textInputElement, "focus", this.onTextInputFocusHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.textInputElement, "keydown", this.onTextInputKeyDownHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.textInputElement, "keyup", this.onTextInputKeyUpHandler);
        RenderHelper_1.RenderHelper.removeEventListener(this.textInputElement, "change", this.onTextInputChangeHandler);
    };
    InputManager.prototype.createClipboardInputElement = function (parent) {
        this.clipboardInputElement = document.createElement("textarea");
        this.clipboardInputElement.setAttribute("class", "dxdi-clipboard-input");
        parent.appendChild(this.clipboardInputElement);
    };
    InputManager.prototype.blurControl = function () {
        if (!this.focusLocked) {
            this.focused = false;
            dom_1.DomUtils.removeClassName(this.mainElement, "focused");
        }
    };
    InputManager.prototype.focusControl = function () {
        this.focused = true;
        this.focusLocked = false;
        dom_1.DomUtils.addClassName(this.mainElement, "focused");
    };
    InputManager.prototype.updateTextInputPadding = function () {
        var text = this.textInputElement.value;
        if (!this.savedTextInputSize) {
            var measureResults = this.textMeasurer.measureWords(" ", this.savedTextInputStyle, ITextMeasurer_1.TextOwner.Connector);
            var textHeight = TextUtils_1.getLineHeight(measureResults) * ((TextUtils_1.textToParagraphs(text).length || 1) + 1);
            this.textInputElement.style.height = Math.ceil(textHeight) + "px";
        }
        else {
            var measureResults = this.textMeasurer.measureWords(text, this.savedTextInputStyle, ITextMeasurer_1.TextOwner.Shape);
            var textHeight = TextUtils_1.getTextHeight(text, this.savedTextInputSize.width, measureResults, true);
            var top_1 = Math.max(0, (this.savedTextInputSize.height - textHeight) * 0.5);
            this.textInputElement.style.paddingTop = Math.ceil(top_1) + "px";
            this.textInputElement.style.height = Math.floor(this.savedTextInputSize.height) + "px";
        }
    };
    InputManager.prototype.onInputBlur = function (evt) {
        var _this = this;
        this.blurControl();
        Utils_1.raiseEvent(evt, this.getDiagramFocusEvent(evt), function (e) { return _this.eventManager.onBlur(e); });
    };
    InputManager.prototype.onInputFocus = function (evt) {
        var _this = this;
        this.focusControl();
        Utils_1.raiseEvent(evt, this.getDiagramFocusEvent(evt), function (e) { return _this.eventManager.onFocus(e); });
    };
    InputManager.prototype.onInputKeyDown = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.getDiagramKeyboardEvent(evt), function (e) { return _this.eventManager.onKeyDown(e); });
    };
    InputManager.prototype.onInputKeyPress = function (evt) {
        if (evt.preventDefault && !(browser_1.Browser.Safari && evt.code === "KeyV"))
            evt.preventDefault();
    };
    InputManager.prototype.onInputKeyUp = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.getDiagramKeyboardEvent(evt), function (e) { return _this.eventManager.onKeyUp(e); });
    };
    InputManager.prototype.onTextInputBlur = function (evt) {
        var _this = this;
        if (this.eventManager.canFinishTextEditing()) {
            this.blurControl();
            Utils_1.raiseEvent(evt, this.getDiagramFocusEvent(evt), function (e) { return _this.eventManager.onTextInputBlur(e); });
        }
        else {
            var srcElement = evt_1.EvtUtils.getEventSource(evt);
            if (document.activeElement !== srcElement)
                srcElement.focus();
        }
    };
    InputManager.prototype.onTextInputFocus = function (evt) {
        var _this = this;
        this.focusControl();
        Utils_1.raiseEvent(evt, this.getDiagramFocusEvent(evt), function (e) { return _this.eventManager.onTextInputFocus(e); });
    };
    InputManager.prototype.onTextInputKeyDown = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.getDiagramKeyboardEvent(evt), function (e) { return _this.eventManager.onTextInputKeyDown(e); });
    };
    InputManager.prototype.onTextInputKeyUp = function (evt) {
        this.updateTextInputPadding();
    };
    InputManager.prototype.onTextInputChange = function (evt) {
        this.updateTextInputPadding();
    };
    InputManager.prototype.onPaste = function (evt) {
        var _this = this;
        Utils_1.raiseEvent(evt, this.getDiagramClipboardEvent(evt), function (e) { return _this.eventManager.onPaste(e); });
    };
    InputManager.prototype.onTextInputMouseWheel = function (evt) {
        this.mouseWheelHandler && this.mouseWheelHandler(evt);
    };
    InputManager.prototype.onTextInputMouseUp = function (evt) {
        if (evt.stopPropagation)
            evt.stopPropagation();
        evt_1.EvtUtils.cancelBubble(evt);
    };
    InputManager.prototype.getDiagramKeyboardEvent = function (evt) {
        return new Event_1.DiagramKeyboardEvent(key_1.KeyUtils.getKeyModifiers(evt), key_1.KeyUtils.getEventKeyCode(evt), this.textInputElement.value);
    };
    InputManager.prototype.getTextInputElementValue = function () {
        return this.textInputElement.value;
    };
    InputManager.prototype.getDiagramFocusEvent = function (evt) {
        return new Event_1.DiagramFocusEvent(evt.target.value);
    };
    InputManager.prototype.getDiagramClipboardEvent = function (evt) {
        var clipboardData;
        var evtClipboardData = evt.clipboardData || (evt["originalEvent"] && evt["originalEvent"].clipboardData);
        if (evtClipboardData !== undefined)
            clipboardData = evtClipboardData.getData("text/plain");
        else
            clipboardData = window["clipboardData"].getData("Text");
        return new Event_1.DiagramClipboardEvent(clipboardData);
    };
    InputManager.prototype.isTextInputElement = function (element) {
        return typeof element.className === "string" && element.className.indexOf(TEXT_INPUT_CSSCLASS) > -1;
    };
    InputManager.prototype.lockFocus = function () {
        var _this = this;
        this.focusLocked = true;
        setTimeout(function () { return _this.focusLocked = false; }, 10);
    };
    InputManager.prototype.notifyViewAdjusted = function (canvasOffset) { };
    InputManager.prototype.notifyActualZoomChanged = function (actualZoom) {
        this.actualZoom = actualZoom;
        if (this.savedTextInputPosition && this.savedTextInputSize)
            this.setTextInputElementBounds(this.savedTextInputPosition, this.savedTextInputSize, this.savedTextInputAngle);
    };
    InputManager.prototype.notifyTextInputStart = function (item, text, position, size) {
        var className = "";
        var textAngle;
        if (item instanceof Shape_1.Shape) {
            className = "shape-text";
            textAngle = item.textAngle;
        }
        else if (item instanceof Connector_1.Connector)
            className = "connector-text";
        size = size && size.clone().applyConverter(unit_converter_1.UnitConverter.twipsToPixels);
        this.setInputElementTextInputMode(text, position, size, item.styleText, className, textAngle);
    };
    InputManager.prototype.notifyTextInputEnd = function (item, captureFocus) {
        this.setInputElementFocusHandlerMode(captureFocus);
    };
    InputManager.prototype.notifyTextInputPermissionsCheck = function (item, allowed) { };
    return InputManager;
}());
exports.InputManager = InputManager;
//# sourceMappingURL=InputManager.js.map