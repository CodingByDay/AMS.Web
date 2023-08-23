/**
 * DevExtreme (cjs/renovation/ui/scheduler/appointment_edit_form/popup_config.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.isPopupFullScreenNeeded = exports.getPopupToolbarItems = exports.getPopupSize = exports.getMaxWidth = exports.defaultAnimation = exports.POPUP_WIDTH = void 0;
var _message = _interopRequireDefault(require("../../../../localization/message"));
var _devices = _interopRequireDefault(require("../../../../core/devices"));
var _size = require("../../../../core/utils/size");
var _window = require("../../../../core/utils/window");

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
var POPUP_WIDTH = {
    DEFAULT: 485,
    RECURRENCE: 970,
    FULLSCREEN: 1e3,
    MOBILE: {
        DEFAULT: 350,
        FULLSCREEN: 500
    }
};
exports.POPUP_WIDTH = POPUP_WIDTH;
var defaultAnimation = {
    show: {
        type: "pop",
        duration: 300,
        from: {
            scale: .55
        }
    },
    hide: {
        type: "pop",
        duration: 300,
        to: {
            opacity: 0,
            scale: .55
        },
        from: {
            opacity: 1,
            scale: 1
        }
    }
};
exports.defaultAnimation = defaultAnimation;
var isMobile = function() {
    return "desktop" !== _devices.default.current().deviceType
};
var isIOSPlatform = function() {
    return "ios" === _devices.default.current().platform
};
var TOOLBAR_LOCATION = {
    AFTER: "after",
    BEFORE: "before"
};
var getButtonsConfig = function() {
    return {
        doneButton: {
            shortcut: "done",
            options: {
                text: _message.default.format("Done")
            },
            location: TOOLBAR_LOCATION.AFTER
        },
        cancelButton: {
            shortcut: "cancel",
            location: isIOSPlatform() ? TOOLBAR_LOCATION.BEFORE : TOOLBAR_LOCATION.AFTER
        }
    }
};
var getPopupToolbarItems = function(allowUpdating, doneClick) {
    var result = [];
    var buttonsConfig = getButtonsConfig();
    if (allowUpdating) {
        result.push(_extends({}, buttonsConfig.doneButton, {
            onClick: doneClick
        }))
    }
    result.push(buttonsConfig.cancelButton);
    return result
};
exports.getPopupToolbarItems = getPopupToolbarItems;
var isPopupFullScreenNeeded = function() {
    var window = (0, _window.getWindow)();
    var width = window && (0, _size.getWidth)(window);
    if (width) {
        return isMobile() ? width < POPUP_WIDTH.MOBILE.FULLSCREEN : width < POPUP_WIDTH.FULLSCREEN
    }
    return false
};
exports.isPopupFullScreenNeeded = isPopupFullScreenNeeded;
var getMaxWidth = function(isRecurrence) {
    if (isMobile()) {
        return POPUP_WIDTH.MOBILE.DEFAULT
    }
    return isRecurrence ? POPUP_WIDTH.RECURRENCE : POPUP_WIDTH.DEFAULT
};
exports.getMaxWidth = getMaxWidth;
var getPopupSize = function(isRecurrence) {
    return {
        fullScreen: isPopupFullScreenNeeded(),
        maxWidth: getMaxWidth(isRecurrence)
    }
};
exports.getPopupSize = getPopupSize;
