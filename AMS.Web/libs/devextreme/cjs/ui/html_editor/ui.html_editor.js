/**
 * DevExtreme (cjs/ui/html_editor/ui.html_editor.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _element = require("../../core/element");
var _common = require("../../core/utils/common");
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _empty_template = require("../../core/templates/empty_template");
var _editor = _interopRequireDefault(require("../editor/editor"));
var _ui = _interopRequireDefault(require("../widget/ui.errors"));
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _deferred = require("../../core/utils/deferred");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _index = require("../../events/utils/index");
var _index2 = require("../../events/index");
var _emitterGesture = _interopRequireDefault(require("../../events/gesture/emitter.gesture.scroll"));
var _utils = require("../text_box/utils.scroll");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _quill_registrator = _interopRequireDefault(require("./quill_registrator"));
require("./converters/delta");
var _converterController = _interopRequireDefault(require("./converterController"));
var _wordLists = _interopRequireDefault(require("./matchers/wordLists"));
var _formDialog = _interopRequireDefault(require("./ui/formDialog"));
var _config = _interopRequireDefault(require("../../core/config"));

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}

function _extends() {
    _extends = Object.assign ? Object.assign.bind() : function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) {
        return
    }
    if ("string" === typeof o) {
        return _arrayLikeToArray(o, minLen)
    }
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if ("Object" === n && o.constructor) {
        n = o.constructor.name
    }
    if ("Map" === n || "Set" === n) {
        return Array.from(o)
    }
    if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) {
        return _arrayLikeToArray(o, minLen)
    }
}

function _iterableToArray(iter) {
    if ("undefined" !== typeof Symbol && null != iter[Symbol.iterator] || null != iter["@@iterator"]) {
        return Array.from(iter)
    }
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        return _arrayLikeToArray(arr)
    }
}

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}

function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");
    return "symbol" === _typeof(key) ? key : String(key)
}

function _toPrimitive(input, hint) {
    if ("object" !== _typeof(input) || null === input) {
        return input
    }
    var prim = input[Symbol.toPrimitive];
    if (void 0 !== prim) {
        var res = prim.call(input, hint || "default");
        if ("object" !== _typeof(res)) {
            return res
        }
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === hint ? String : Number)(input)
}
var HTML_EDITOR_CLASS = "dx-htmleditor";
var QUILL_CONTAINER_CLASS = "dx-quill-container";
var QUILL_CLIPBOARD_CLASS = "ql-clipboard";
var HTML_EDITOR_SUBMIT_ELEMENT_CLASS = "dx-htmleditor-submit-element";
var HTML_EDITOR_CONTENT_CLASS = "dx-htmleditor-content";
var MARKDOWN_VALUE_TYPE = "markdown";
var ANONYMOUS_TEMPLATE_NAME = "htmlContent";
var isIos = "ios" === _devices.default.current().platform;
var editorsCount = 0;
var HtmlEditor = _editor.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            focusStateEnabled: true,
            valueType: "html",
            placeholder: "",
            toolbar: null,
            variables: null,
            mediaResizing: null,
            tableResizing: null,
            mentions: null,
            customizeModules: null,
            tableContextMenu: null,
            allowSoftLineBreak: false,
            formDialogOptions: null,
            imageUpload: null,
            stylingMode: (0, _config.default)().editorStylingMode || "outlined"
        })
    },
    _init: function() {
        this._mentionKeyInTemplateStorage = editorsCount++;
        this.callBase();
        this._cleanCallback = (0, _callbacks.default)();
        this._contentInitializedCallback = (0, _callbacks.default)()
    },
    _getAnonymousTemplateName: function() {
        return ANONYMOUS_TEMPLATE_NAME
    },
    _initTemplates: function() {
        this._templateManager.addDefaultTemplates(_defineProperty({}, ANONYMOUS_TEMPLATE_NAME, new _empty_template.EmptyTemplate));
        this.callBase()
    },
    _focusTarget: function() {
        return this._getContent()
    },
    _getContent: function() {
        return this.$element().find(".".concat(HTML_EDITOR_CONTENT_CLASS))
    },
    _focusInHandler: function(_ref) {
        var relatedTarget = _ref.relatedTarget;
        if (this._shouldSkipFocusEvent(relatedTarget)) {
            return
        }
        this._toggleFocusClass(true, this.$element());
        this.callBase.apply(this, arguments)
    },
    _focusOutHandler: function(_ref2) {
        var relatedTarget = _ref2.relatedTarget;
        if (this._shouldSkipFocusEvent(relatedTarget)) {
            return
        }
        this._toggleFocusClass(false, this.$element());
        this.callBase.apply(this, arguments)
    },
    _shouldSkipFocusEvent: function(relatedTarget) {
        return (0, _renderer.default)(relatedTarget).hasClass(QUILL_CLIPBOARD_CLASS)
    },
    _initMarkup: function() {
        this._$htmlContainer = (0, _renderer.default)("<div>").addClass(QUILL_CONTAINER_CLASS);
        this.$element().attr("role", "application").addClass(HTML_EDITOR_CLASS).wrapInner(this._$htmlContainer);
        this._renderStylingMode();
        var template = this._getTemplate(ANONYMOUS_TEMPLATE_NAME);
        this._$templateResult = template && template.render({
            container: (0, _element.getPublicElement)(this._$htmlContainer),
            noModel: true,
            transclude: true
        });
        this._renderSubmitElement();
        this.callBase();
        this._updateContainerMarkup()
    },
    _renderSubmitElement: function() {
        this._$submitElement = (0, _renderer.default)("<textarea>").addClass(HTML_EDITOR_SUBMIT_ELEMENT_CLASS).attr("hidden", true).appendTo(this.$element());
        this._setSubmitValue(this.option("value"))
    },
    _setSubmitValue: function(value) {
        this._getSubmitElement().val(value)
    },
    _getSubmitElement: function() {
        return this._$submitElement
    },
    _createNoScriptFrame: function() {
        return (0, _renderer.default)("<iframe>").css("display", "none").attr({
            srcdoc: "",
            id: "xss-frame",
            sandbox: "allow-same-origin"
        })
    },
    _removeXSSVulnerableHtml: function(value) {
        var $frame = this._createNoScriptFrame().appendTo("body");
        var frame = $frame.get(0);
        var frameWindow = frame.contentWindow;
        var frameDocument = frameWindow.document;
        var frameDocumentBody = frameDocument.body;
        frameDocumentBody.innerHTML = value;
        ! function removeInlineHandlers(element) {
            if (element.attributes) {
                for (var i = 0; i < element.attributes.length; i++) {
                    var name = element.attributes[i].name;
                    if (name.startsWith("on")) {
                        element.removeAttribute(name)
                    }
                }
            }
            if (element.childNodes) {
                for (var _i = 0; _i < element.childNodes.length; _i++) {
                    removeInlineHandlers(element.childNodes[_i])
                }
            }
        }(frameDocumentBody);
        frameDocumentBody.querySelectorAll("script").forEach((function(scriptNode) {
            scriptNode.remove()
        }));
        var sanitizedHtml = frameDocumentBody.innerHTML;
        $frame.remove();
        return sanitizedHtml
    },
    _updateContainerMarkup: function() {
        var markup = this.option("value");
        if (this._isMarkdownValue()) {
            this._prepareMarkdownConverter();
            markup = this._markdownConverter.toHtml(markup)
        }
        if (markup) {
            var sanitizedMarkup = this._removeXSSVulnerableHtml(markup);
            this._$htmlContainer.html(sanitizedMarkup)
        }
    },
    _prepareMarkdownConverter: function() {
        var MarkdownConverter = _converterController.default.getConverter("markdown");
        if (MarkdownConverter) {
            this._markdownConverter = new MarkdownConverter
        } else {
            throw _ui.default.Error("E1051", "markdown")
        }
    },
    _render: function() {
        this._prepareConverters();
        this.callBase()
    },
    _prepareQuillRegistrator: function() {
        if (!this._quillRegistrator) {
            this._quillRegistrator = new _quill_registrator.default
        }
    },
    _getRegistrator: function() {
        this._prepareQuillRegistrator();
        return this._quillRegistrator
    },
    _prepareConverters: function() {
        if (!this._deltaConverter) {
            var DeltaConverter = _converterController.default.getConverter("delta");
            if (DeltaConverter) {
                this._deltaConverter = new DeltaConverter
            }
        }
        if (this.option("valueType") === MARKDOWN_VALUE_TYPE && !this._markdownConverter) {
            this._prepareMarkdownConverter()
        }
    },
    _renderContentImpl: function() {
        this._contentRenderedDeferred = new _deferred.Deferred;
        var renderContentPromise = this._contentRenderedDeferred.promise();
        this.callBase();
        this._renderHtmlEditor();
        this._renderFormDialog();
        this._addKeyPressHandler();
        return renderContentPromise
    },
    _pointerMoveHandler: function(e) {
        if (isIos) {
            e.stopPropagation()
        }
    },
    _attachFocusEvents: function() {
        (0, _common.deferRender)(this.callBase.bind(this))
    },
    _addKeyPressHandler: function() {
        var keyDownEvent = (0, _index.addNamespace)("keydown", "".concat(this.NAME, "TextChange"));
        _events_engine.default.on(this._$htmlContainer, keyDownEvent, this._keyDownHandler.bind(this))
    },
    _keyDownHandler: function(e) {
        this._saveValueChangeEvent(e)
    },
    _renderHtmlEditor: function() {
        var _this = this;
        var customizeModules = this.option("customizeModules");
        var modulesConfig = this._getModulesConfig();
        if ((0, _type.isFunction)(customizeModules)) {
            customizeModules(modulesConfig)
        }
        this._quillInstance = this._getRegistrator().createEditor(this._$htmlContainer[0], {
            placeholder: this.option("placeholder"),
            readOnly: this.option("readOnly") || this.option("disabled"),
            modules: modulesConfig,
            theme: "basic"
        });
        this._deltaConverter.setQuillInstance(this._quillInstance);
        this._textChangeHandlerWithContext = this._textChangeHandler.bind(this);
        this._quillInstance.on("text-change", this._textChangeHandlerWithContext);
        this._renderScrollHandler();
        if (this._hasTranscludedContent()) {
            this._updateContentTask = (0, _common.executeAsync)((function() {
                _this._applyTranscludedContent()
            }))
        } else {
            this._finalizeContentRendering()
        }
    },
    _renderScrollHandler: function() {
        var $scrollContainer = this._getContent();
        var initScrollData = (0, _utils.prepareScrollData)($scrollContainer);
        _events_engine.default.on($scrollContainer, (0, _index.addNamespace)(_emitterGesture.default.init, this.NAME), initScrollData, _common.noop);
        _events_engine.default.on($scrollContainer, (0, _index.addNamespace)(_pointer.default.move, this.NAME), this._pointerMoveHandler.bind(this))
    },
    _applyTranscludedContent: function() {
        var valueOption = this.option("value");
        if (!(0, _type.isDefined)(valueOption)) {
            var html = this._deltaConverter.toHtml();
            var newDelta = this._quillInstance.clipboard.convert({
                html: html
            });
            if (newDelta.ops.length) {
                this._quillInstance.setContents(newDelta);
                return
            }
        }
        this._finalizeContentRendering()
    },
    _hasTranscludedContent: function() {
        return this._$templateResult && this._$templateResult.length
    },
    _getModulesConfig: function() {
        var _this2 = this;
        var quill = this._getRegistrator().getQuill();
        var wordListMatcher = (0, _wordLists.default)(quill);
        var modulesConfig = (0, _extend.extend)({}, {
            table: true,
            toolbar: this._getModuleConfigByOption("toolbar"),
            variables: this._getModuleConfigByOption("variables"),
            resizing: this._getModuleConfigByOption("mediaResizing"),
            tableResizing: this._getModuleConfigByOption("tableResizing"),
            tableContextMenu: this._getModuleConfigByOption("tableContextMenu"),
            imageUpload: this._getModuleConfigByOption("imageUpload"),
            imageCursor: this._getBaseModuleConfig(),
            mentions: this._getModuleConfigByOption("mentions"),
            uploader: {
                onDrop: function(e) {
                    return _this2._saveValueChangeEvent((0, _index2.Event)(e))
                },
                imageBlot: "extendedImage"
            },
            keyboard: {
                onKeydown: function(e) {
                    return _this2._saveValueChangeEvent((0, _index2.Event)(e))
                }
            },
            clipboard: {
                onPaste: function(e) {
                    return _this2._saveValueChangeEvent((0, _index2.Event)(e))
                },
                onCut: function(e) {
                    return _this2._saveValueChangeEvent((0, _index2.Event)(e))
                },
                matchers: [
                    ["p.MsoListParagraphCxSpFirst", wordListMatcher],
                    ["p.MsoListParagraphCxSpMiddle", wordListMatcher],
                    ["p.MsoListParagraphCxSpLast", wordListMatcher]
                ]
            },
            multiline: Boolean(this.option("allowSoftLineBreak"))
        }, this._getCustomModules());
        return modulesConfig
    },
    _getModuleConfigByOption: function(userOptionName) {
        var optionValue = this.option(userOptionName);
        var config = {};
        if (!(0, _type.isDefined)(optionValue)) {
            return
        }
        if (Array.isArray(optionValue)) {
            config[userOptionName] = optionValue
        } else {
            config = optionValue
        }
        return (0, _extend.extend)(this._getBaseModuleConfig(), config)
    },
    _getBaseModuleConfig: function() {
        return {
            editorInstance: this
        }
    },
    _getCustomModules: function() {
        var _this3 = this;
        var modules = {};
        var moduleNames = this._getRegistrator().getRegisteredModuleNames();
        moduleNames.forEach((function(modulePath) {
            modules[modulePath] = _this3._getBaseModuleConfig()
        }));
        return modules
    },
    _textChangeHandler: function(newDelta, oldDelta, source) {
        var htmlMarkup = this._deltaConverter.toHtml();
        var convertedValue = this._isMarkdownValue() ? this._updateValueByType(MARKDOWN_VALUE_TYPE, htmlMarkup) : htmlMarkup;
        var currentValue = this.option("value");
        if (currentValue !== convertedValue && !this._isNullValueConverted(currentValue, convertedValue)) {
            this._isEditorUpdating = true;
            this.option("value", convertedValue)
        }
        this._finalizeContentRendering()
    },
    _isNullValueConverted: function(currentValue, convertedValue) {
        return null === currentValue && "" === convertedValue
    },
    _finalizeContentRendering: function() {
        if (this._contentRenderedDeferred) {
            this.clearHistory();
            this._contentInitializedCallback.fire();
            this._contentRenderedDeferred.resolve();
            this._contentRenderedDeferred = void 0
        }
    },
    _updateValueByType: function(valueType, value) {
        var converter = this._markdownConverter;
        if (!(0, _type.isDefined)(converter)) {
            return
        }
        var currentValue = (0, _common.ensureDefined)(value, this.option("value"));
        return valueType === MARKDOWN_VALUE_TYPE ? converter.toMarkdown(currentValue) : converter.toHtml(currentValue)
    },
    _isMarkdownValue: function() {
        return this.option("valueType") === MARKDOWN_VALUE_TYPE
    },
    _resetEnabledState: function() {
        if (this._quillInstance) {
            var isEnabled = !(this.option("readOnly") || this.option("disabled"));
            this._quillInstance.enable(isEnabled)
        }
    },
    _renderFormDialog: function() {
        var userOptions = (0, _extend.extend)(true, {
            width: "auto",
            height: "auto",
            hideOnOutsideClick: true
        }, this.option("formDialogOptions"));
        this._formDialog = new _formDialog.default(this, userOptions)
    },
    _getStylingModePrefix: function() {
        return "dx-htmleditor-"
    },
    _getQuillContainer: function() {
        return this._$htmlContainer
    },
    _prepareModuleOptions: function(args) {
        var _args$fullName;
        var optionData = null === (_args$fullName = args.fullName) || void 0 === _args$fullName ? void 0 : _args$fullName.split(".");
        var value = args.value;
        var optionName = optionData.length >= 2 ? optionData[1] : args.name;
        if (3 === optionData.length) {
            value = _defineProperty({}, optionData[2], value)
        }
        return [optionName, value]
    },
    _moduleOptionChanged: function(moduleName, args) {
        var moduleInstance = this.getModule(moduleName);
        var shouldPassOptionsToModule = Boolean(moduleInstance);
        if (shouldPassOptionsToModule) {
            moduleInstance.option.apply(moduleInstance, _toConsumableArray(this._prepareModuleOptions(args)))
        } else {
            this._invalidate()
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "value":
                if (this._quillInstance) {
                    if (this._isEditorUpdating) {
                        this._isEditorUpdating = false
                    } else {
                        var updatedValue = this._isMarkdownValue() ? this._updateValueByType("HTML", args.value) : args.value;
                        this._suppressValueChangeAction();
                        this._updateHtmlContent(updatedValue);
                        this._resumeValueChangeAction()
                    }
                } else {
                    this._$htmlContainer.html(args.value)
                }
                var value = this.option("value");
                if (value !== args.previousValue) {
                    this._setSubmitValue(value);
                    this.callBase(_extends({}, args, {
                        value: value
                    }))
                }
                break;
            case "placeholder":
            case "variables":
            case "toolbar":
            case "mentions":
            case "customizeModules":
            case "allowSoftLineBreak":
                this._invalidate();
                break;
            case "tableResizing":
                this._moduleOptionChanged("tableResizing", args);
                break;
            case "valueType":
                this._prepareConverters();
                var newValue = this._updateValueByType(args.value);
                if ("html" === args.value && this._quillInstance) {
                    this._updateHtmlContent(newValue)
                } else {
                    this.option("value", newValue)
                }
                break;
            case "stylingMode":
                this._renderStylingMode();
                break;
            case "readOnly":
            case "disabled":
                this.callBase(args);
                this._resetEnabledState();
                break;
            case "formDialogOptions":
                this._renderFormDialog();
                break;
            case "tableContextMenu":
                this._moduleOptionChanged("tableContextMenu", args);
                break;
            case "mediaResizing":
                if (!args.previousValue || !args.value) {
                    this._invalidate()
                } else {
                    this.getModule("resizing").option(args.name, args.value)
                }
                break;
            case "width":
                this.callBase(args);
                this._repaintToolbar();
                break;
            case "imageUpload":
                this._moduleOptionChanged("imageUpload", args);
                break;
            default:
                this.callBase(args)
        }
    },
    _repaintToolbar: function() {
        this._applyToolbarMethod("repaint")
    },
    _updateHtmlContent: function(html) {
        var newDelta = this._quillInstance.clipboard.convert({
            html: html
        });
        this._quillInstance.setContents(newDelta)
    },
    _clean: function() {
        if (this._quillInstance) {
            _events_engine.default.off(this._getContent(), ".".concat(this.NAME));
            this._quillInstance.off("text-change", this._textChangeHandlerWithContext);
            this._cleanCallback.fire()
        }
        this._abortUpdateContentTask();
        this._cleanCallback.empty();
        this._contentInitializedCallback.empty();
        this.callBase()
    },
    _abortUpdateContentTask: function() {
        if (this._updateContentTask) {
            this._updateContentTask.abort();
            this._updateContentTask = void 0
        }
    },
    _applyQuillMethod: function(methodName, args) {
        if (this._quillInstance) {
            return this._quillInstance[methodName].apply(this._quillInstance, args)
        }
    },
    _applyQuillHistoryMethod: function(methodName) {
        if (this._quillInstance && this._quillInstance.history) {
            this._quillInstance.history[methodName]()
        }
    },
    _applyToolbarMethod: function(methodName) {
        var _this$getModule;
        null === (_this$getModule = this.getModule("toolbar")) || void 0 === _this$getModule ? void 0 : _this$getModule[methodName]()
    },
    addCleanCallback: function(callback) {
        this._cleanCallback.add(callback)
    },
    addContentInitializedCallback: function(callback) {
        this._contentInitializedCallback.add(callback)
    },
    register: function(components) {
        this._getRegistrator().registerModules(components);
        if (this._quillInstance) {
            this.repaint()
        }
    },
    get: function(modulePath) {
        return this._getRegistrator().getQuill().import(modulePath)
    },
    getModule: function(moduleName) {
        return this._applyQuillMethod("getModule", arguments)
    },
    getQuillInstance: function() {
        return this._quillInstance
    },
    getSelection: function(focus) {
        return this._applyQuillMethod("getSelection", arguments)
    },
    setSelection: function(index, length) {
        this._applyQuillMethod("setSelection", arguments)
    },
    getText: function(index, length) {
        return this._applyQuillMethod("getText", arguments)
    },
    format: function(formatName, formatValue) {
        this._applyQuillMethod("format", arguments)
    },
    formatText: function(index, length, formatName, formatValue) {
        this._applyQuillMethod("formatText", arguments)
    },
    formatLine: function(index, length, formatName, formatValue) {
        this._applyQuillMethod("formatLine", arguments)
    },
    getFormat: function(index, length) {
        return this._applyQuillMethod("getFormat", arguments)
    },
    removeFormat: function(index, length) {
        return this._applyQuillMethod("removeFormat", arguments)
    },
    clearHistory: function() {
        this._applyQuillHistoryMethod("clear");
        this._applyToolbarMethod("updateHistoryWidgets")
    },
    undo: function() {
        this._applyQuillHistoryMethod("undo")
    },
    redo: function() {
        this._applyQuillHistoryMethod("redo")
    },
    getLength: function() {
        return this._applyQuillMethod("getLength")
    },
    getBounds: function(index, length) {
        return this._applyQuillMethod("getBounds", arguments)
    },
    delete: function(index, length) {
        this._applyQuillMethod("deleteText", arguments)
    },
    insertText: function(index, text, formats) {
        this._applyQuillMethod("insertText", arguments)
    },
    insertEmbed: function(index, type, config) {
        this._applyQuillMethod("insertEmbed", arguments)
    },
    showFormDialog: function(formConfig) {
        return this._formDialog.show(formConfig)
    },
    formDialogOption: function(optionName, optionValue) {
        return this._formDialog.popupOption.apply(this._formDialog, arguments)
    },
    focus: function() {
        this.callBase();
        this._applyQuillMethod("focus")
    },
    blur: function() {
        this._applyQuillMethod("blur")
    },
    getMentionKeyInTemplateStorage: function() {
        return this._mentionKeyInTemplateStorage
    }
});
(0, _component_registrator.default)("dxHtmlEditor", HtmlEditor);
var _default = HtmlEditor;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
