/**
 * DevExtreme (cjs/ui/validation_message.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _size = require("../core/utils/size");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _component_registrator = _interopRequireDefault(require("../core/component_registrator"));
var _ui = _interopRequireDefault(require("./overlay/ui.overlay"));
var _extend = require("../core/utils/extend");
var _string = require("../core/utils/string");
var _position = require("../core/utils/position");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
var INVALID_MESSAGE = "dx-invalid-message";
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var INVALID_MESSAGE_ALWAYS = "dx-invalid-message-always";
var INVALID_MESSAGE_CONTENT = "dx-invalid-message-content";
var VALIDATION_MESSAGE_MIN_WIDTH = 100;
var ValidationMessage = _ui.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            integrationOptions: {},
            templatesRenderAsynchronously: false,
            shading: false,
            width: "auto",
            height: "auto",
            hideOnOutsideClick: false,
            animation: null,
            visible: true,
            propagateOutsideClick: true,
            _checkParentVisibility: false,
            rtlEnabled: false,
            contentTemplate: this._renderInnerHtml,
            maxWidth: "100%",
            container: this.$element(),
            target: void 0,
            mode: "auto",
            validationErrors: void 0,
            preventScrollEvents: false,
            positionSide: "top",
            boundary: void 0,
            offset: {
                h: 0,
                v: 0
            },
            contentId: void 0
        })
    },
    _init: function() {
        this.callBase();
        this.updateMaxWidth();
        this._updatePosition()
    },
    _initMarkup: function() {
        this.callBase();
        this._ensureMessageNotEmpty();
        this._updatePositionByTarget();
        this._toggleModeClass();
        this._updateContentId()
    },
    _updatePositionByTarget: function() {
        var _this$option = this.option(),
            target = _this$option.target;
        this.option("position.of", target)
    },
    _ensureMessageNotEmpty: function() {
        this._textMarkup = this._getTextMarkup();
        var shouldShowMessage = this.option("visible") && this._textMarkup;
        this._toggleVisibilityClasses(shouldShowMessage)
    },
    _toggleVisibilityClasses: function(visible) {
        if (visible) {
            this.$element().addClass(INVALID_MESSAGE);
            this.$wrapper().addClass(INVALID_MESSAGE)
        } else {
            this.$element().removeClass(INVALID_MESSAGE);
            this.$wrapper().removeClass(INVALID_MESSAGE)
        }
    },
    _updateContentId: function() {
        var _this$option2 = this.option(),
            container = _this$option2.container,
            contentId = _this$option2.contentId;
        var id = null !== contentId && void 0 !== contentId ? contentId : (0, _renderer.default)(container).attr("aria-describedby");
        this.$content().addClass(INVALID_MESSAGE_CONTENT).attr("id", id)
    },
    _renderInnerHtml: function(element) {
        var $element = element && (0, _renderer.default)(element);
        null === $element || void 0 === $element ? void 0 : $element.html(this._textMarkup)
    },
    _getTextMarkup: function() {
        var _this$option3;
        var validationErrors = null !== (_this$option3 = this.option("validationErrors")) && void 0 !== _this$option3 ? _this$option3 : [];
        var validationErrorMessage = "";
        validationErrors.forEach((function(err) {
            var _err$message;
            var separator = validationErrorMessage ? "<br />" : "";
            validationErrorMessage += separator + (0, _string.encodeHtml)(null !== (_err$message = null === err || void 0 === err ? void 0 : err.message) && void 0 !== _err$message ? _err$message : "")
        }));
        return validationErrorMessage
    },
    _toggleModeClass: function() {
        var mode = this.option("mode");
        this.$wrapper().toggleClass(INVALID_MESSAGE_AUTO, "auto" === mode).toggleClass(INVALID_MESSAGE_ALWAYS, "always" === mode)
    },
    updateMaxWidth: function() {
        var target = this.option("target");
        var targetWidth = (0, _size.getOuterWidth)(target);
        var maxWidth = "100%";
        if (targetWidth) {
            maxWidth = Math.max(targetWidth, VALIDATION_MESSAGE_MIN_WIDTH)
        }
        this.option({
            maxWidth: maxWidth
        })
    },
    _getPositionsArray: function(positionSide, rtlSide) {
        switch (positionSide) {
            case "top":
                return ["".concat(rtlSide, " bottom"), "".concat(rtlSide, " top")];
            case "left":
                return ["right", "left"];
            case "right":
                return ["left", "right"];
            default:
                return ["".concat(rtlSide, " top"), "".concat(rtlSide, " bottom")]
        }
    },
    _updatePosition: function() {
        var _this$option4 = this.option(),
            positionSide = _this$option4.positionSide,
            rtlEnabled = _this$option4.rtlEnabled,
            componentOffset = _this$option4.offset,
            boundary = _this$option4.boundary;
        var rtlSide = (0, _position.getDefaultAlignment)(rtlEnabled);
        var positions = this._getPositionsArray(positionSide, rtlSide);
        var offset = _extends({}, componentOffset);
        this.$element().addClass("dx-invalid-message-".concat(positionSide));
        if (rtlEnabled && "left" !== positionSide && "right" !== positionSide) {
            offset.h = -offset.h
        }
        if ("top" === positionSide) {
            offset.v = -offset.v
        }
        if ("left" === positionSide) {
            offset.h = -offset.h
        }
        this.option("position", {
            offset: offset,
            boundary: boundary,
            my: positions[0],
            at: positions[1],
            collision: "none flip"
        })
    },
    _optionChanged: function(args) {
        var name = args.name,
            value = args.value,
            previousValue = args.previousValue;
        switch (name) {
            case "target":
                this._updatePositionByTarget();
                this.updateMaxWidth();
                this.callBase(args);
                break;
            case "boundary":
                this.option("position.boundary", value);
                break;
            case "mode":
                this._toggleModeClass(value);
                break;
            case "rtlEnabled":
            case "offset":
            case "positionSide":
                this.$element().removeClass("dx-invalid-message-".concat(previousValue));
                this._updatePosition();
                break;
            case "container":
                this._updateContentId();
                this.callBase(args);
                break;
            case "contentId":
                this._updateContentId();
                break;
            case "validationErrors":
                this._ensureMessageNotEmpty();
                this._renderInnerHtml(this.$content());
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)("dxValidationMessage", ValidationMessage);
var _default = ValidationMessage;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
