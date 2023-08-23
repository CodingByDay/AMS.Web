/**
 * DevExtreme (cjs/ui/text_box/texteditor_button_collection/index.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _custom = _interopRequireDefault(require("./custom"));
var _extend = require("../../../core/utils/extend");
var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

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
var TEXTEDITOR_BUTTONS_CONTAINER_CLASS = "dx-texteditor-buttons-container";

function checkButtonInfo(buttonInfo) {
    ! function() {
        if (!buttonInfo || "object" !== _typeof(buttonInfo) || Array.isArray(buttonInfo)) {
            throw _ui.default.Error("E1053")
        }
    }();
    ! function() {
        if (!("name" in buttonInfo)) {
            throw _ui.default.Error("E1054")
        }
    }();
    ! function() {
        var name = buttonInfo.name;
        if ("string" !== typeof name) {
            throw _ui.default.Error("E1055")
        }
    }();
    ! function() {
        var location = buttonInfo.location;
        if ("location" in buttonInfo && "after" !== location && "before" !== location) {
            buttonInfo.location = "after"
        }
    }()
}

function checkNamesUniqueness(existingNames, newName) {
    if (-1 !== existingNames.indexOf(newName)) {
        throw _ui.default.Error("E1055", newName)
    }
    existingNames.push(newName)
}

function isPredefinedButtonName(name, predefinedButtonsInfo) {
    return !!predefinedButtonsInfo.find((function(info) {
        return info.name === name
    }))
}
var TextEditorButtonCollection = function() {
    function TextEditorButtonCollection(editor, defaultButtonsInfo) {
        this.buttons = [];
        this.defaultButtonsInfo = defaultButtonsInfo;
        this.editor = editor
    }
    var _proto = TextEditorButtonCollection.prototype;
    _proto._compileButtonInfo = function(buttons) {
        var _this = this;
        var names = [];
        return buttons.map((function(button) {
            var isStringButton = "string" === typeof button;
            if (!isStringButton) {
                checkButtonInfo(button)
            }
            var isDefaultButton = isStringButton || isPredefinedButtonName(button.name, _this.defaultButtonsInfo);
            if (isDefaultButton) {
                var defaultButtonInfo = _this.defaultButtonsInfo.find((function(_ref) {
                    var name = _ref.name;
                    return name === button || name === button.name
                }));
                if (!defaultButtonInfo) {
                    throw _ui.default.Error("E1056", _this.editor.NAME, button)
                }
                checkNamesUniqueness(names, button);
                return defaultButtonInfo
            } else {
                var name = button.name;
                checkNamesUniqueness(names, name);
                return (0, _extend.extend)(button, {
                    Ctor: _custom.default
                })
            }
        }))
    };
    _proto._createButton = function(buttonsInfo) {
        var Ctor = buttonsInfo.Ctor,
            options = buttonsInfo.options,
            name = buttonsInfo.name;
        var button = new Ctor(name, this.editor, options);
        this.buttons.push(button);
        return button
    };
    _proto._renderButtons = function(buttons, $container, targetLocation) {
        var _this2 = this;
        var $buttonsContainer = null;
        var buttonsInfo = buttons ? this._compileButtonInfo(buttons) : this.defaultButtonsInfo;
        buttonsInfo.forEach((function(buttonsInfo) {
            var _buttonsInfo$location = buttonsInfo.location,
                location = void 0 === _buttonsInfo$location ? "after" : _buttonsInfo$location;
            if (location === targetLocation) {
                _this2._createButton(buttonsInfo).render(function() {
                    $buttonsContainer = $buttonsContainer || (0, _renderer.default)("<div>").addClass(TEXTEDITOR_BUTTONS_CONTAINER_CLASS);
                    "before" === targetLocation ? $container.prepend($buttonsContainer) : $container.append($buttonsContainer);
                    return $buttonsContainer
                }())
            }
        }));
        return $buttonsContainer
    };
    _proto.clean = function() {
        this.buttons.forEach((function(button) {
            return button.dispose()
        }));
        this.buttons = []
    };
    _proto.getButton = function(buttonName) {
        var button = this.buttons.find((function(_ref2) {
            var name = _ref2.name;
            return name === buttonName
        }));
        return button && button.instance
    };
    _proto.renderAfterButtons = function(buttons, $container) {
        return this._renderButtons(buttons, $container, "after")
    };
    _proto.renderBeforeButtons = function(buttons, $container) {
        return this._renderButtons(buttons, $container, "before")
    };
    _proto.updateButtons = function(names) {
        this.buttons.forEach((function(button) {
            if (!names || -1 !== names.indexOf(button.name)) {
                button.update()
            }
        }))
    };
    return TextEditorButtonCollection
}();
exports.default = TextEditorButtonCollection;
module.exports = exports.default;
module.exports.default = exports.default;
