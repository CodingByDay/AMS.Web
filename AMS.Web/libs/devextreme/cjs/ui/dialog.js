/**
 * DevExtreme (cjs/ui/dialog.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.custom = exports.confirm = exports.alert = void 0;
var _size = require("../core/utils/size");
var _renderer = _interopRequireDefault(require("../core/renderer"));
var _action = _interopRequireDefault(require("../core/action"));
var _devices = _interopRequireDefault(require("../core/devices"));
var _config = _interopRequireDefault(require("../core/config"));
var _dom = require("../core/utils/dom");
var _deferred = require("../core/utils/deferred");
var _type = require("../core/utils/type");
var _iterator = require("../core/utils/iterator");
var _extend = require("../core/utils/extend");
var _window = require("../core/utils/window");
var _events_engine = _interopRequireDefault(require("../events/core/events_engine"));
var _view_port = require("../core/utils/view_port");
var _message = _interopRequireDefault(require("../localization/message"));
var _ui = _interopRequireDefault(require("./widget/ui.errors"));
var _ui2 = _interopRequireDefault(require("./popup/ui.popup"));
var _common = require("../core/utils/common");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var window = (0, _window.getWindow)();
var DEFAULT_BUTTON = {
    text: "OK",
    onClick: function() {
        return true
    }
};
var DX_DIALOG_CLASSNAME = "dx-dialog";
var DX_DIALOG_WRAPPER_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-wrapper");
var DX_DIALOG_ROOT_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-root");
var DX_DIALOG_CONTENT_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-content");
var DX_DIALOG_MESSAGE_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-message");
var DX_DIALOG_BUTTONS_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-buttons");
var DX_DIALOG_BUTTON_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-button");
var DX_BUTTON_CLASSNAME = "dx-button";
var custom = function(options) {
    var _options$title;
    var deferred = new _deferred.Deferred;
    options = options || {};
    var $element = (0, _renderer.default)("<div>").addClass(DX_DIALOG_CLASSNAME).appendTo((0, _view_port.value)());
    var isMessageDefined = "message" in options;
    var isMessageHtmlDefined = "messageHtml" in options;
    if (isMessageDefined) {
        _ui.default.log("W1013")
    }
    var messageHtml = String(isMessageHtmlDefined ? options.messageHtml : options.message);
    var $message = (0, _renderer.default)("<div>").addClass(DX_DIALOG_MESSAGE_CLASSNAME).html(messageHtml);
    var popupToolbarItems = [];
    (0, _iterator.each)(options.buttons || [DEFAULT_BUTTON], (function() {
        var action = new _action.default(this.onClick, {
            context: popupInstance
        });
        popupToolbarItems.push({
            toolbar: "bottom",
            location: _devices.default.current().android ? "after" : "center",
            widget: "dxButton",
            options: (0, _extend.extend)({}, this, {
                onClick: function() {
                    var result = action.execute.apply(action, arguments);
                    hide(result)
                }
            })
        })
    }));
    var popupInstance = new _ui2.default($element, (0, _extend.extend)({
        title: null !== (_options$title = options.title) && void 0 !== _options$title ? _options$title : "",
        showTitle: (0, _common.ensureDefined)(options.showTitle, true),
        dragEnabled: (0, _common.ensureDefined)(options.dragEnabled, true),
        height: "auto",
        width: options.width,
        showCloseButton: options.showCloseButton || false,
        ignoreChildEvents: false,
        container: $element,
        visualContainer: window,
        dragAndResizeArea: window,
        onContentReady: function(args) {
            args.component.$content().addClass(DX_DIALOG_CONTENT_CLASSNAME).append($message)
        },
        onShowing: function(e) {
            e.component.bottomToolbar().addClass(DX_DIALOG_BUTTONS_CLASSNAME).find(".".concat(DX_BUTTON_CLASSNAME)).addClass(DX_DIALOG_BUTTON_CLASSNAME);
            (0, _dom.resetActiveElement)()
        },
        onShown: function(e) {
            var $firstButton = e.component.bottomToolbar().find(".".concat(DX_BUTTON_CLASSNAME)).first();
            _events_engine.default.trigger($firstButton, "focus")
        },
        onHiding: function() {
            deferred.reject()
        },
        onHidden: function(_ref) {
            var element = _ref.element;
            (0, _renderer.default)(element).remove()
        },
        toolbarItems: popupToolbarItems,
        animation: {
            show: {
                type: "pop",
                duration: 400
            },
            hide: {
                type: "pop",
                duration: 400,
                to: {
                    opacity: 0,
                    scale: 0
                },
                from: {
                    opacity: 1,
                    scale: 1
                }
            }
        },
        rtlEnabled: (0, _config.default)().rtlEnabled,
        position: {
            boundaryOffset: {
                h: 10,
                v: 0
            }
        }
    }, options.popupOptions));
    popupInstance.$wrapper().addClass(DX_DIALOG_WRAPPER_CLASSNAME);
    if (options.position) {
        popupInstance.option("position", options.position)
    }
    popupInstance.$wrapper().addClass(DX_DIALOG_ROOT_CLASSNAME);

    function hide(value) {
        deferred.resolve(value);
        popupInstance.hide()
    }
    return {
        show: function() {
            if ("phone" === _devices.default.real().deviceType) {
                var isPortrait = (0, _size.getHeight)(window) > (0, _size.getWidth)(window);
                var width = isPortrait ? "90%" : "60%";
                popupInstance.option({
                    width: width
                })
            }
            popupInstance.show();
            return deferred.promise()
        },
        hide: hide
    }
};
exports.custom = custom;
var alert = function(messageHtml) {
    var title = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    var showTitle = arguments.length > 2 ? arguments[2] : void 0;
    var options = (0, _type.isPlainObject)(messageHtml) ? messageHtml : {
        title: title,
        messageHtml: messageHtml,
        showTitle: showTitle,
        dragEnabled: showTitle
    };
    return custom(options).show()
};
exports.alert = alert;
var confirm = function(messageHtml) {
    var title = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    var showTitle = arguments.length > 2 ? arguments[2] : void 0;
    var options = (0, _type.isPlainObject)(messageHtml) ? messageHtml : {
        title: title,
        messageHtml: messageHtml,
        showTitle: showTitle,
        buttons: [{
            text: _message.default.format("Yes"),
            onClick: function() {
                return true
            }
        }, {
            text: _message.default.format("No"),
            onClick: function() {
                return false
            }
        }],
        dragEnabled: showTitle
    };
    return custom(options).show()
};
exports.confirm = confirm;
