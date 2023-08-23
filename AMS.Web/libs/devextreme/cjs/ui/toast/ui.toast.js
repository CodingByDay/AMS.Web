/**
 * DevExtreme (cjs/ui/toast/ui.toast.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _window = require("../../core/utils/window");
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));
var _ready_callbacks = _interopRequireDefault(require("../../core/utils/ready_callbacks"));
var _type = require("../../core/utils/type");
var _extend = require("../../core/utils/extend");
var _pointer = _interopRequireDefault(require("../../events/pointer"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _ui = _interopRequireDefault(require("../overlay/ui.overlay"));
var _themes = require("../themes");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var window = (0, _window.getWindow)();
var ready = _ready_callbacks.default.add;
var TOAST_CLASS = "dx-toast";
var TOAST_CLASS_PREFIX = TOAST_CLASS + "-";
var TOAST_WRAPPER_CLASS = TOAST_CLASS_PREFIX + "wrapper";
var TOAST_CONTENT_CLASS = TOAST_CLASS_PREFIX + "content";
var TOAST_MESSAGE_CLASS = TOAST_CLASS_PREFIX + "message";
var TOAST_ICON_CLASS = TOAST_CLASS_PREFIX + "icon";
var WIDGET_NAME = "dxToast";
var toastTypes = ["info", "warning", "error", "success"];
var TOAST_STACK = [];
var FIRST_Z_INDEX_OFFSET = 8e3;
var POSITION_ALIASES = {
    top: {
        my: "top",
        at: "top",
        of: null,
        offset: "0 0"
    },
    bottom: {
        my: "bottom",
        at: "bottom",
        of: null,
        offset: "0 -20"
    },
    center: {
        my: "center",
        at: "center",
        of: null,
        offset: "0 0"
    },
    right: {
        my: "center right",
        at: "center right",
        of: null,
        offset: "0 0"
    },
    left: {
        my: "center left",
        at: "center left",
        of: null,
        offset: "0 0"
    }
};
var DEFAULT_BOUNDARY_OFFSET = {
    h: 0,
    v: 0
};
ready((function() {
    _events_engine.default.subscribeGlobal(_dom_adapter.default.getDocument(), _pointer.default.down, (function(e) {
        for (var i = TOAST_STACK.length - 1; i >= 0; i--) {
            if (!TOAST_STACK[i]._proxiedDocumentDownHandler(e)) {
                return
            }
        }
    }))
}));
var Toast = _ui.default.inherit({
    _getDefaultOptions: function() {
        return (0, _extend.extend)(this.callBase(), {
            message: "",
            type: "info",
            displayTime: 2e3,
            position: "bottom center",
            animation: {
                show: {
                    type: "fade",
                    duration: 400,
                    from: 0,
                    to: 1
                },
                hide: {
                    type: "fade",
                    duration: 400,
                    from: 1,
                    to: 0
                }
            },
            shading: false,
            height: "auto",
            hideTopOverlayHandler: null,
            preventScrollEvents: false,
            closeOnSwipe: true,
            closeOnClick: false
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "android"
            },
            options: {
                hideOnOutsideClick: true,
                width: "auto",
                animation: {
                    show: {
                        type: "slide",
                        duration: 200,
                        from: {
                            position: {
                                my: "top",
                                at: "bottom",
                                of: window
                            }
                        }
                    },
                    hide: {
                        type: "slide",
                        duration: 200,
                        to: {
                            position: {
                                my: "top",
                                at: "bottom",
                                of: window
                            }
                        }
                    }
                }
            }
        }, {
            device: function(_device) {
                var isPhone = "phone" === _device.deviceType;
                var isAndroid = "android" === _device.platform;
                return isPhone && isAndroid
            },
            options: {
                width: "100vw",
                position: {
                    at: "bottom center",
                    my: "bottom center",
                    offset: "0 0"
                }
            }
        }, {
            device: function(_device2) {
                return "phone" === _device2.deviceType
            },
            options: {
                width: "100vw"
            }
        }, {
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                minWidth: 344,
                maxWidth: 568,
                displayTime: 4e3
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._posStringToObject()
    },
    _renderContentImpl: function() {
        this._message = (0, _renderer.default)("<div>").addClass(TOAST_MESSAGE_CLASS).text(this.option("message")).appendTo(this.$content());
        this.setAria("role", "alert", this._message);
        if (toastTypes.includes(this.option("type").toLowerCase())) {
            this.$content().prepend((0, _renderer.default)("<div>").addClass(TOAST_ICON_CLASS))
        }
        this.callBase()
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(TOAST_CLASS);
        this.$wrapper().addClass(TOAST_WRAPPER_CLASS);
        this.$content().addClass(TOAST_CLASS_PREFIX + String(this.option("type")).toLowerCase());
        this.$content().addClass(TOAST_CONTENT_CLASS);
        this._toggleCloseEvents("Swipe");
        this._toggleCloseEvents("Click")
    },
    _toggleCloseEvents: function(event) {
        var dxEvent = "dx" + event.toLowerCase();
        _events_engine.default.off(this.$content(), dxEvent);
        this.option("closeOn" + event) && _events_engine.default.on(this.$content(), dxEvent, this.hide.bind(this))
    },
    _posStringToObject: function() {
        if (!(0, _type.isString)(this.option("position"))) {
            return
        }
        var verticalPosition = this.option("position").split(" ")[0];
        var horizontalPosition = this.option("position").split(" ")[1];
        this.option("position", (0, _extend.extend)({
            boundaryOffset: DEFAULT_BOUNDARY_OFFSET
        }, POSITION_ALIASES[verticalPosition]));
        switch (horizontalPosition) {
            case "center":
            case "left":
            case "right":
                this.option("position").at += " " + horizontalPosition;
                this.option("position").my += " " + horizontalPosition
        }
    },
    _show: function() {
        return this.callBase.apply(this, arguments).always(function() {
            clearTimeout(this._hideTimeout);
            this._hideTimeout = setTimeout(this.hide.bind(this), this.option("displayTime"))
        }.bind(this))
    },
    _overlayStack: function() {
        return TOAST_STACK
    },
    _zIndexInitValue: function() {
        return this.callBase() + FIRST_Z_INDEX_OFFSET
    },
    _dispose: function() {
        clearTimeout(this._hideTimeout);
        this.callBase()
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "type":
                this.$content().removeClass(TOAST_CLASS_PREFIX + args.previousValue);
                this.$content().addClass(TOAST_CLASS_PREFIX + String(args.value).toLowerCase());
                break;
            case "message":
                if (this._message) {
                    this._message.text(args.value)
                }
                break;
            case "closeOnSwipe":
                this._toggleCloseEvents("Swipe");
                break;
            case "closeOnClick":
                this._toggleCloseEvents("Click");
                break;
            case "displayTime":
                break;
            default:
                this.callBase(args)
        }
    }
});
(0, _component_registrator.default)(WIDGET_NAME, Toast);
var _default = Toast;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
