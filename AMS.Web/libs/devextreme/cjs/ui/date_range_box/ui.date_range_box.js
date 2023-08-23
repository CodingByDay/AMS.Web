/**
 * DevExtreme (cjs/ui/date_range_box/ui.date_range_box.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));
var _extend = require("../../core/utils/extend");
var _icon = require("../../core/utils/icon");
var _config = _interopRequireDefault(require("../../core/config"));
var _devices = _interopRequireDefault(require("../../core/devices"));
var _message = _interopRequireDefault(require("../../localization/message"));
var _themes = require("../themes");
var _editor = _interopRequireDefault(require("../editor/editor"));
var _ui = _interopRequireDefault(require("./ui.multiselect_date_box"));
var _index = _interopRequireDefault(require("../text_box/texteditor_button_collection/index"));
var _ui2 = _interopRequireDefault(require("../drop_down_editor/ui.drop_down_button"));
var _uiText_editor = _interopRequireDefault(require("../text_box/ui.text_editor.clear"));
var _function_template = require("../../core/templates/function_template");
var _uiDate_range = require("./ui.date_range.utils");
var _iterator = require("../../core/utils/iterator");
var _inflector = require("../../core/utils/inflector");
var _index2 = require("../../events/utils/index");
var _events_engine = _interopRequireDefault(require("../../events/core/events_engine"));

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

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest()
}

function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
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

function _arrayLikeToArray(arr, len) {
    if (null == len || len > arr.length) {
        len = arr.length
    }
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
}

function _iterableToArrayLimit(arr, i) {
    var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
    if (null != _i) {
        var _s, _e, _x, _r, _arr = [],
            _n = !0,
            _d = !1;
        try {
            if (_x = (_i = _i.call(arr)).next, 0 === i) {
                if (Object(_i) !== _i) {
                    return
                }
                _n = !1
            } else {
                for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {}
            }
        } catch (err) {
            _d = !0, _e = err
        } finally {
            try {
                if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) {
                    return
                }
            } finally {
                if (_d) {
                    throw _e
                }
            }
        }
        return _arr
    }
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) {
        return arr
    }
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var DATERANGEBOX_CLASS = "dx-daterangebox";
var DATERANGEBOX_WITH_LABEL_CLASS = "dx-daterangebox-with-label";
var DATERANGEBOX_WITH_FLOATING_LABEL_CLASS = "dx-daterangebox-with-floating-label";
var START_DATEBOX_CLASS = "dx-start-datebox";
var END_DATEBOX_CLASS = "dx-end-datebox";
var DATERANGEBOX_SEPARATOR_CLASS = "dx-daterangebox-separator";
var DROP_DOWN_EDITOR_BUTTON_ICON = "dx-dropdowneditor-icon";
var INVALID_BADGE_CLASS = "dx-show-invalid-badge";
var READONLY_STATE_CLASS = "dx-state-readonly";
var TEXTEDITOR_CLASS = "dx-texteditor";
var TEXTEDITOR_INPUT_CLASS = "dx-texteditor-input";
var TEXTEDITOR_EMPTY_INPUT_CLASS = "dx-texteditor-empty";
var DROP_DOWN_EDITOR_CLASS = "dx-dropdowneditor";
var DROP_DOWN_EDITOR_ACTIVE_CLASS = "dx-dropdowneditor-active";
var SEPARATOR_ICON_NAME = "to";
var EVENTS_LIST = ["KeyDown", "KeyUp", "Change", "Cut", "Copy", "Paste", "Input", "EnterKey"];
var DateRangeBox = function(_Editor) {
    _inheritsLoose(DateRangeBox, _Editor);

    function DateRangeBox() {
        return _Editor.apply(this, arguments) || this
    }
    var _proto = DateRangeBox.prototype;
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Editor.prototype._getDefaultOptions.call(this), {
            acceptCustomValue: true,
            activeStateEnabled: true,
            applyButtonText: _message.default.format("OK"),
            applyValueMode: "instantly",
            buttons: void 0,
            calendarOptions: {},
            cancelButtonText: _message.default.format("Cancel"),
            endDateOutOfRangeMessage: _message.default.format("dxDateRangeBox-endDateOutOfRangeMessage"),
            dateSerializationFormat: void 0,
            deferRendering: true,
            disableOutOfRangeSelection: false,
            disabledDates: null,
            displayFormat: null,
            dropDownButtonTemplate: "dropDownButton",
            dropDownOptions: {},
            endDate: null,
            endDateInputAttr: {},
            endDateLabel: _message.default.format("dxDateRangeBox-endDateLabel"),
            endDateName: "",
            endDatePlaceholder: "",
            endDateText: void 0,
            focusStateEnabled: true,
            hoverStateEnabled: true,
            invalidStartDateMessage: _message.default.format("dxDateRangeBox-invalidStartDateMessage"),
            invalidEndDateMessage: _message.default.format("dxDateRangeBox-invalidEndDateMessage"),
            isValid: true,
            labelMode: "static",
            max: void 0,
            min: void 0,
            multiView: true,
            onChange: null,
            onClosed: null,
            onCopy: null,
            onCut: null,
            onEnterKey: null,
            onInput: null,
            onKeyDown: null,
            onKeyUp: null,
            onOpened: null,
            onPaste: null,
            onValueChanged: null,
            openOnFieldClick: true,
            opened: false,
            pickerType: "calendar",
            readOnly: false,
            showClearButton: false,
            showDropDownButton: true,
            spellcheck: false,
            startDate: null,
            startDateInputAttr: {},
            startDateLabel: _message.default.format("dxDateRangeBox-startDateLabel"),
            startDateName: "",
            startDateOutOfRangeMessage: _message.default.format("dxDateRangeBox-startDateOutOfRangeMessage"),
            startDatePlaceholder: "",
            startDateText: void 0,
            stylingMode: (0, _config.default)().editorStylingMode || "outlined",
            todayButtonText: _message.default.format("dxCalendar-todayButtonText"),
            useHiddenSubmitElement: false,
            useMaskBehavior: false,
            validationError: null,
            validationErrors: null,
            validationMessageMode: "auto",
            validationMessagePosition: "auto",
            validationStatus: "valid",
            value: [null, null],
            valueChangeEvent: "change",
            _internalValidationErrors: [],
            _currentSelection: "startDate"
        })
    };
    _proto._defaultOptionsRules = function() {
        return _Editor.prototype._defaultOptionsRules.call(this).concat([{
            device: function() {
                var themeName = (0, _themes.current)();
                return (0, _themes.isMaterial)(themeName)
            },
            options: {
                stylingMode: (0, _config.default)().editorStylingMode || "filled",
                labelMode: "floating"
            }
        }, {
            device: function() {
                var realDevice = _devices.default.real();
                var platform = realDevice.platform;
                return "ios" === platform || "android" === platform
            },
            options: {
                multiView: false
            }
        }])
    };
    _proto._initOptions = function(options) {
        _Editor.prototype._initOptions.call(this, options);
        var _this$initialOption = this.initialOption(),
            initialValue = _this$initialOption.value;
        var _this$option = this.option(),
            value = _this$option.value,
            startDate = _this$option.startDate,
            endDate = _this$option.endDate;
        if (value[0] && value[1] && (0, _uiDate_range.getDeserializedDate)(value[0]) > (0, _uiDate_range.getDeserializedDate)(value[1])) {
            value = [value[1], value[0]]
        }
        if (startDate && endDate && (0, _uiDate_range.getDeserializedDate)(startDate) > (0, _uiDate_range.getDeserializedDate)(endDate)) {
            var _ref = [endDate, startDate];
            startDate = _ref[0];
            endDate = _ref[1]
        }
        if ((0, _uiDate_range.isSameDateArrays)(initialValue, value)) {
            value = [startDate, endDate]
        } else {
            var _value = value;
            var _value2 = _slicedToArray(_value, 2);
            startDate = _value2[0];
            endDate = _value2[1]
        }
        this.option({
            startDate: startDate,
            endDate: endDate,
            value: value
        })
    };
    _proto._createOpenAction = function() {
        this._openAction = this._createActionByOption("onOpened", {
            excludeValidators: ["disabled", "readOnly"]
        })
    };
    _proto._raiseOpenAction = function() {
        if (!this._openAction) {
            this._createOpenAction()
        }
        this._openAction()
    };
    _proto._createCloseAction = function() {
        this._closeAction = this._createActionByOption("onClosed", {
            excludeValidators: ["disabled", "readOnly"]
        })
    };
    _proto._raiseCloseAction = function() {
        if (!this._closeAction) {
            this._createCloseAction()
        }
        this._closeAction()
    };
    _proto._createEventAction = function(eventName) {
        this["_".concat((0, _inflector.camelize)(eventName), "Action")] = this._createActionByOption("on".concat(eventName), {
            excludeValidators: ["readOnly"]
        })
    };
    _proto._raiseAction = function(eventName, event) {
        var action = this["_".concat((0, _inflector.camelize)(eventName), "Action")];
        if (!action) {
            this._createEventAction(eventName)
        }
        this["_".concat((0, _inflector.camelize)(eventName), "Action")]({
            event: event
        })
    };
    _proto._initTemplates = function() {
        this._templateManager.addDefaultTemplates({
            dropDownButton: new _function_template.FunctionTemplate((function(options) {
                var $icon = (0, _renderer.default)("<div>").addClass(DROP_DOWN_EDITOR_BUTTON_ICON);
                (0, _renderer.default)(options.container).append($icon)
            }))
        });
        this.callBase()
    };
    _proto._getDefaultButtons = function() {
        return [{
            name: "clear",
            Ctor: _uiText_editor.default
        }, {
            name: "dropDown",
            Ctor: _ui2.default
        }]
    };
    _proto._initMarkup = function() {
        this.$element().addClass(DATERANGEBOX_CLASS).addClass(TEXTEDITOR_CLASS).addClass(DROP_DOWN_EDITOR_CLASS);
        this._toggleDropDownEditorActiveClass();
        this._toggleEditorLabelClass();
        this._toggleReadOnlyState();
        this._renderStylingMode();
        this._renderEndDateBox();
        this._renderSeparator();
        this._renderStartDateBox();
        this._toggleEmptinessState();
        this._renderEmptinessEvent();
        this._renderButtonsContainer();
        _Editor.prototype._initMarkup.call(this);
        this.$element().removeClass(INVALID_BADGE_CLASS)
    };
    _proto._renderEmptinessEvent = function() {
        var eventName = (0, _index2.addNamespace)("input blur", this.NAME);
        _events_engine.default.off(this._focusTarget(), eventName);
        _events_engine.default.on(this._focusTarget(), eventName, this._toggleEmptinessState.bind(this))
    };
    _proto._toggleEmptinessState = function() {
        var isEmpty = this.getStartDateBox().$element().hasClass(TEXTEDITOR_EMPTY_INPUT_CLASS) && this.getEndDateBox().$element().hasClass(TEXTEDITOR_EMPTY_INPUT_CLASS);
        this.$element().toggleClass(TEXTEDITOR_EMPTY_INPUT_CLASS, isEmpty)
    };
    _proto._attachKeyboardEvents = function() {
        if (!this.option("readOnly")) {
            _Editor.prototype._attachKeyboardEvents.call(this)
        }
    };
    _proto._toggleReadOnlyState = function() {
        var _this$option2 = this.option(),
            readOnly = _this$option2.readOnly;
        this.$element().toggleClass(READONLY_STATE_CLASS, !!readOnly)
    };
    _proto._toggleDropDownEditorActiveClass = function() {
        var _this$option3 = this.option(),
            opened = _this$option3.opened;
        this.$element().toggleClass(DROP_DOWN_EDITOR_ACTIVE_CLASS, opened)
    };
    _proto._toggleEditorLabelClass = function() {
        var _this$option4 = this.option(),
            startDateLabel = _this$option4.startDateLabel,
            endDateLabel = _this$option4.endDateLabel,
            labelMode = _this$option4.labelMode;
        var isLabelVisible = (!!startDateLabel || !!endDateLabel) && "hidden" !== labelMode;
        this.$element().removeClass(DATERANGEBOX_WITH_FLOATING_LABEL_CLASS).removeClass(DATERANGEBOX_WITH_LABEL_CLASS);
        if (isLabelVisible) {
            this.$element().addClass("floating" === labelMode ? DATERANGEBOX_WITH_FLOATING_LABEL_CLASS : DATERANGEBOX_WITH_LABEL_CLASS)
        }
    };
    _proto._renderStartDateBox = function() {
        this._$startDateBox = (0, _renderer.default)("<div>").addClass(START_DATEBOX_CLASS).prependTo(this.$element());
        this._startDateBox = this._createComponent(this._$startDateBox, _ui.default, this._getStartDateBoxConfig());
        this._startDateBox.NAME = "_StartDateBox"
    };
    _proto._renderEndDateBox = function() {
        this._$endDateBox = (0, _renderer.default)("<div>").addClass(END_DATEBOX_CLASS).appendTo(this.$element());
        this._endDateBox = this._createComponent(this._$endDateBox, _ui.default, this._getEndDateBoxConfig());
        this._endDateBox.NAME = "_EndDateBox"
    };
    _proto._renderSeparator = function() {
        var $icon = (0, _icon.getImageContainer)(SEPARATOR_ICON_NAME);
        this._$separator = (0, _renderer.default)("<div>").addClass(DATERANGEBOX_SEPARATOR_CLASS).prependTo(this.$element());
        this._renderPreventBlurOnSeparatorClick();
        $icon.appendTo(this._$separator)
    };
    _proto._renderPreventBlurOnSeparatorClick = function() {
        var _this = this;
        var eventName = (0, _index2.addNamespace)("mousedown", this.NAME);
        _events_engine.default.off(this._$separator, eventName);
        _events_engine.default.on(this._$separator, eventName, (function(e) {
            if (!_this._hasActiveElement()) {
                _this.focus()
            }
            e.preventDefault()
        }))
    };
    _proto._renderButtonsContainer = function() {
        this._buttonCollection = new _index.default(this, this._getDefaultButtons());
        this._$beforeButtonsContainer = null;
        this._$afterButtonsContainer = null;
        var _this$option5 = this.option(),
            buttons = _this$option5.buttons;
        this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, this.$element());
        this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, this.$element())
    };
    _proto._updateButtons = function(names) {
        this._buttonCollection.updateButtons(names)
    };
    _proto._openHandler = function() {
        this._toggleOpenState()
    };
    _proto._shouldCallOpenHandler = function() {
        return true
    };
    _proto._toggleOpenState = function() {
        var _this$option6 = this.option(),
            opened = _this$option6.opened;
        if (!opened) {
            this.getStartDateBox()._focusInput()
        }
        if (!this.option("readOnly")) {
            this.option("opened", !this.option("opened"))
        }
    };
    _proto._clearValueHandler = function(e) {
        e.stopPropagation();
        this._saveValueChangeEvent(e);
        this.reset();
        !this._isStartDateActiveElement() && this.focus();
        _events_engine.default.trigger((0, _renderer.default)(this.startDateField()), "input")
    };
    _proto._isClearButtonVisible = function() {
        return this.option("showClearButton") && !this.option("readOnly")
    };
    _proto._focusInHandler = function(event) {
        if (this._shouldSkipFocusEvent(event)) {
            return
        }
        _Editor.prototype._focusInHandler.call(this, event)
    };
    _proto._focusOutHandler = function(event) {
        if (this._shouldSkipFocusEvent(event)) {
            return
        }
        _Editor.prototype._focusOutHandler.call(this, event)
    };
    _proto._shouldSkipFocusEvent = function(event) {
        var target = event.target,
            relatedTarget = event.relatedTarget;
        return (0, _renderer.default)(target).is(this.startDateField()) && (0, _renderer.default)(relatedTarget).is(this.endDateField()) || (0, _renderer.default)(target).is(this.endDateField()) && (0, _renderer.default)(relatedTarget).is(this.startDateField())
    };
    _proto._getPickerType = function() {
        var _this$option7 = this.option(),
            pickerType = _this$option7.pickerType;
        return ["calendar", "native"].includes(pickerType) ? pickerType : "calendar"
    };
    _proto._getRestErrors = function(allErrors, partialErrors) {
        return allErrors.filter((function(error) {
            return !partialErrors.some((function(prevError) {
                return error.message === prevError.message
            }))
        }))
    };
    _proto._syncValidationErrors = function(optionName, newPartialErrors, previousPartialErrors) {
        newPartialErrors || (newPartialErrors = []);
        previousPartialErrors || (previousPartialErrors = []);
        var allErrors = this.option(optionName) || [];
        var otherErrors = this._getRestErrors(allErrors, previousPartialErrors);
        this.option(optionName, [].concat(_toConsumableArray(otherErrors), _toConsumableArray(newPartialErrors)))
    };
    _proto._getDateBoxConfig = function() {
        var _this2 = this;
        var options = this.option();
        var dateBoxConfig = {
            acceptCustomValue: options.acceptCustomValue,
            activeStateEnabled: options.activeStateEnabled,
            applyValueMode: options.applyValueMode,
            dateOutOfRangeMessage: options.dateOutOfRangeMessage,
            dateSerializationFormat: options.dateSerializationFormat,
            deferRendering: options.deferRendering,
            disabled: options.disabled,
            displayFormat: options.displayFormat,
            focusStateEnabled: options.focusStateEnabled,
            isValid: options.isValid,
            tabIndex: options.tabIndex,
            height: options.height,
            hoverStateEnabled: options.hoverStateEnabled,
            labelMode: options.labelMode,
            max: options.max,
            min: options.min,
            openOnFieldClick: options.openOnFieldClick,
            pickerType: this._getPickerType(),
            readOnly: options.readOnly,
            rtlEnabled: options.rtlEnabled,
            spellcheck: options.spellcheck,
            stylingMode: options.stylingMode,
            type: "date",
            useMaskBehavior: options.useMaskBehavior,
            validationMessageMode: options.validationMessageMode,
            validationMessagePosition: options.validationMessagePosition,
            valueChangeEvent: options.valueChangeEvent,
            onKeyDown: options.onKeyDown,
            onKeyUp: options.onKeyUp,
            onChange: options.onChange,
            onInput: options.onInput,
            onCut: options.onCut,
            onCopy: options.onCopy,
            onPaste: options.onPaste,
            onEnterKey: options.onEnterKey,
            _dateRangeBoxInstance: this,
            _showValidationMessage: false
        };
        (0, _iterator.each)(EVENTS_LIST, (function(_, eventName) {
            var optionName = "on".concat(eventName);
            if (_this2.hasActionSubscription(optionName)) {
                dateBoxConfig[optionName] = function(e) {
                    _this2._raiseAction(eventName, e.event)
                }
            }
        }));
        return dateBoxConfig
    };
    _proto._hideOnOutsideClickHandler = function(_ref2) {
        var target = _ref2.target;
        var $target = (0, _renderer.default)(target);
        var dropDownButton = this.getButton("dropDown");
        var $dropDownButton = dropDownButton && dropDownButton.$element();
        var isInputClicked = !!$target.closest(this.$element()).length;
        var isDropDownButtonClicked = !!$target.closest($dropDownButton).length;
        var isOutsideClick = !isInputClicked && !isDropDownButtonClicked;
        return isOutsideClick
    };
    _proto._getStartDateBoxConfig = function() {
        var _options$dropDownOpti, _this3 = this;
        var options = this.option();
        return _extends({}, this._getDateBoxConfig(), {
            applyButtonText: options.applyButtonText,
            calendarOptions: options.calendarOptions,
            cancelButtonText: options.cancelButtonText,
            dateOutOfRangeMessage: options.startDateOutOfRangeMessage,
            deferRendering: options.deferRendering,
            disabledDates: null === (_options$dropDownOpti = options.dropDownOptions) || void 0 === _options$dropDownOpti ? void 0 : _options$dropDownOpti.disabledDates,
            dropDownOptions: _extends({
                showTitle: false,
                title: "",
                hideOnOutsideClick: function(e) {
                    return _this3._hideOnOutsideClickHandler(e)
                },
                hideOnParentScroll: false,
                preventScrollEvents: false
            }, options.dropDownOptions),
            invalidDateMessage: options.invalidStartDateMessage,
            onValueChanged: function(_ref3) {
                var value = _ref3.value,
                    event = _ref3.event;
                var newValue = [value, _this3.option("value")[1]];
                _this3.updateValue(newValue, event)
            },
            opened: options.opened,
            onOpened: function() {
                _this3._raiseOpenAction()
            },
            onClosed: function() {
                _this3._raiseCloseAction()
            },
            onOptionChanged: function(args) {
                var name = args.name,
                    value = args.value,
                    previousValue = args.previousValue;
                if ("text" === name) {
                    _this3.option("startDateText", value)
                }
                if ("validationErrors" === name) {
                    _this3._syncValidationErrors("_internalValidationErrors", value, previousValue)
                }
            },
            todayButtonText: options.todayButtonText,
            showClearButton: false,
            showDropDownButton: false,
            value: this.option("value")[0],
            label: options.startDateLabel,
            placeholder: options.startDatePlaceholder,
            inputAttr: options.startDateInputAttr,
            name: options.startDateName,
            _showValidationIcon: false
        })
    };
    _proto._getEndDateBoxConfig = function() {
        var _this4 = this;
        var options = this.option();
        return _extends({}, this._getDateBoxConfig(), {
            invalidDateMessage: options.invalidEndDateMessage,
            dateOutOfRangeMessage: options.endDateOutOfRangeMessage,
            onValueChanged: function(_ref4) {
                var value = _ref4.value,
                    event = _ref4.event;
                var newValue = [_this4.option("value")[0], value];
                _this4.updateValue(newValue, event)
            },
            onOptionChanged: function(args) {
                var name = args.name,
                    value = args.value,
                    previousValue = args.previousValue;
                if ("text" === name) {
                    _this4.option("endDateText", value)
                }
                if ("validationErrors" === name) {
                    _this4._syncValidationErrors("_internalValidationErrors", value, previousValue)
                }
            },
            opened: options.opened,
            showClearButton: false,
            showDropDownButton: false,
            value: this.option("value")[1],
            label: options.endDateLabel,
            placeholder: options.endDatePlaceholder,
            deferRendering: true,
            inputAttr: options.endDateInputAttr,
            name: options.endDateName
        })
    };
    _proto._getValidationMessagePosition = function() {
        var _this$option8 = this.option(),
            validationMessagePosition = _this$option8.validationMessagePosition;
        if ("auto" === validationMessagePosition) {
            return this.option("opened") ? "top" : "bottom"
        }
        return validationMessagePosition
    };
    _proto.updateValue = function(newValue, event) {
        if (!(0, _uiDate_range.isSameDateArrays)(newValue, this.option("value"))) {
            if (event) {
                this._saveValueChangeEvent(event)
            }
            this.option("value", newValue)
        }
    };
    _proto._updateDateBoxesValue = function(newValue) {
        var startDateBox = this.getStartDateBox();
        var endDateBox = this.getEndDateBox();
        var _newValue = _slicedToArray(newValue, 2),
            newStartDate = _newValue[0],
            newEndDate = _newValue[1];
        var oldStartDate = startDateBox.option("value");
        var oldEndDate = endDateBox.option("value");
        if (!(0, _uiDate_range.isSameDates)(newStartDate, oldStartDate)) {
            startDateBox.option("value", newStartDate)
        }
        if (!(0, _uiDate_range.isSameDates)(newEndDate, oldEndDate)) {
            endDateBox.option("value", newEndDate)
        }
    };
    _proto._renderAccessKey = function() {
        var $startDateInput = (0, _renderer.default)(this.field()[0]);
        var _this$option9 = this.option(),
            accessKey = _this$option9.accessKey;
        $startDateInput.attr("accesskey", accessKey)
    };
    _proto._focusTarget = function() {
        return this.$element().find(".".concat(TEXTEDITOR_INPUT_CLASS))
    };
    _proto._focusEventTarget = function() {
        return this.element()
    };
    _proto._focusClassTarget = function() {
        return this.$element()
    };
    _proto._toggleFocusClass = function(isFocused, $element) {
        _Editor.prototype._toggleFocusClass.call(this, isFocused, this._focusClassTarget($element))
    };
    _proto._hasActiveElement = function() {
        return this._isStartDateActiveElement() || this._isEndDateActiveElement()
    };
    _proto._isStartDateActiveElement = function() {
        return this._isActiveElement(this.startDateField())
    };
    _proto._isEndDateActiveElement = function() {
        return this._isActiveElement(this.endDateField())
    };
    _proto._isActiveElement = function(input) {
        return (0, _renderer.default)(input).is(_dom_adapter.default.getActiveElement(input))
    };
    _proto._popupContentIdentifier = function(identifier) {
        if (identifier) {
            this._popupContentId = identifier
        }
        return this._popupContentId
    };
    _proto._setAriaAttributes = function() {
        var _this$option10 = this.option(),
            opened = _this$option10.opened;
        var arias = {
            expanded: opened,
            controls: this._popupContentIdentifier()
        };
        var ariaOwns = opened ? this._popupContentIdentifier() : void 0;
        this.setAria(arias);
        this.setAria("owns", ariaOwns, this.$element())
    };
    _proto._cleanButtonContainers = function() {
        var _this$_$beforeButtons, _this$_$afterButtonsC;
        null === (_this$_$beforeButtons = this._$beforeButtonsContainer) || void 0 === _this$_$beforeButtons ? void 0 : _this$_$beforeButtons.remove();
        null === (_this$_$afterButtonsC = this._$afterButtonsContainer) || void 0 === _this$_$afterButtonsC ? void 0 : _this$_$afterButtonsC.remove();
        this._buttonCollection.clean();
        this._$beforeButtonsContainer = null;
        this._$afterButtonsContainer = null
    };
    _proto._applyCustomValidation = function(value) {
        this.validationRequest.fire({
            editor: this,
            value: value
        })
    };
    _proto._clean = function() {
        var _this$_$startDateBox, _this$_$endDateBox, _this$_$separator;
        this._cleanButtonContainers();
        null === (_this$_$startDateBox = this._$startDateBox) || void 0 === _this$_$startDateBox ? void 0 : _this$_$startDateBox.remove();
        null === (_this$_$endDateBox = this._$endDateBox) || void 0 === _this$_$endDateBox ? void 0 : _this$_$endDateBox.remove();
        null === (_this$_$separator = this._$separator) || void 0 === _this$_$separator ? void 0 : _this$_$separator.remove();
        _Editor.prototype._clean.call(this)
    };
    _proto._optionChanged = function(args) {
        var name = args.name,
            fullName = args.fullName,
            value = args.value,
            previousValue = args.previousValue;
        switch (name) {
            case "acceptCustomValue":
            case "dateSerializationFormat":
            case "displayFormat":
            case "max":
            case "min":
            case "openOnFieldClick":
            case "spellcheck":
            case "useMaskBehavior":
            case "valueChangeEvent":
                this.getStartDateBox().option(name, value);
                this.getEndDateBox().option(name, value);
                break;
            case "rtlEnabled":
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "labelMode":
                this._toggleEditorLabelClass();
                this.getStartDateBox().option(name, value);
                this.getEndDateBox().option(name, value);
                break;
            case "applyButtonText":
            case "applyValueMode":
            case "cancelButtonText":
            case "deferRendering":
            case "disabledDates":
            case "todayButtonText":
                this.getStartDateBox().option(name, value);
                break;
            case "opened":
                this._toggleDropDownEditorActiveClass();
                this.getStartDateBox().option(name, value);
                this.getEndDateBox()._setOptionWithoutOptionChange(name, value);
                break;
            case "buttons":
                this._cleanButtonContainers();
                this._renderButtonsContainer();
                break;
            case "calendarOptions":
            case "dropDownOptions":
                this.getStartDateBox().option(fullName, value);
                break;
            case "pickerType":
                var pickerType = this._getPickerType();
                this.getStartDateBox().option(name, pickerType);
                this.getEndDateBox().option(name, pickerType);
                break;
            case "dateOutOfRangeMessage":
                break;
            case "height":
                this.getStartDateBox().option(name, value);
                this.getEndDateBox().option(name, value);
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "dropDownButtonTemplate":
            case "showDropDownButton":
                this._updateButtons(["dropDown"]);
                break;
            case "showClearButton":
                this._updateButtons(["clear"]);
                break;
            case "endDate":
                this.updateValue([this.option("value")[0], value]);
                break;
            case "startDateLabel":
                this._toggleEditorLabelClass();
                this.getStartDateBox().option("label", value);
                break;
            case "endDateLabel":
                this._toggleEditorLabelClass();
                this.getEndDateBox().option("label", value);
                break;
            case "startDatePlaceholder":
                this.getStartDateBox().option("placeholder", value);
                break;
            case "endDatePlaceholder":
                this.getEndDateBox().option("placeholder", value);
                break;
            case "startDateInputAttr":
                this.getStartDateBox().option("inputAttr", value);
                break;
            case "startDateName":
                this.getStartDateBox().option("name", value);
                break;
            case "endDateInputAttr":
                this.getEndDateBox().option("inputAttr", value);
                break;
            case "endDateName":
                this.getEndDateBox().option("name", value);
                break;
            case "multiView":
                this.getStartDateBox().option("calendarOptions.viewsCount", value ? 2 : 1);
                break;
            case "tabIndex":
            case "activeStateEnabled":
            case "focusStateEnabled":
            case "hoverStateEnabled":
                _Editor.prototype._optionChanged.call(this, args);
                this.getStartDateBox().option(name, value);
                this.getEndDateBox().option(name, value);
                break;
            case "onValueChanged":
                this._createValueChangeAction();
                break;
            case "onOpened":
                this._createOpenAction();
                break;
            case "onClosed":
                this._createCloseAction();
                break;
            case "onKeyDown":
            case "onKeyUp":
            case "onChange":
            case "onInput":
            case "onCut":
            case "onCopy":
            case "onPaste":
            case "onEnterKey":
                this._createEventAction(name.replace("on", ""));
                break;
            case "readOnly":
            case "disabled":
                this._updateButtons();
                _Editor.prototype._optionChanged.call(this, args);
                this.getStartDateBox().option(name, value);
                this.getEndDateBox().option(name, value);
                break;
            case "disableOutOfRangeSelection":
                break;
            case "startDate":
                this.updateValue([value, this.option("value")[1]]);
                break;
            case "stylingMode":
                this._renderStylingMode();
                this.getStartDateBox().option(name, value);
                this.getEndDateBox().option(name, value);
                break;
            case "startDateText":
            case "endDateText":
            case "useHiddenSubmitElement":
                break;
            case "invalidStartDateMessage":
                this.getStartDateBox().option("invalidDateMessage", value);
                break;
            case "invalidEndDateMessage":
                this.getEndDateBox().option("invalidDateMessage", value);
                break;
            case "startDateOutOfRangeMessage":
                this.getStartDateBox().option("dateOutOfRangeMessage", value);
                break;
            case "endDateOutOfRangeMessage":
                this.getEndDateBox().option("dateOutOfRangeMessage", value);
                break;
            case "validationMessagePosition":
                this.getStartDateBox().option(name, value);
                _Editor.prototype._optionChanged.call(this, args);
                break;
            case "_internalValidationErrors":
                this._syncValidationErrors("validationErrors", value, previousValue);
                var validationErrors = this.option("validationErrors");
                this.option("isValid", !(null !== validationErrors && void 0 !== validationErrors && validationErrors.length));
                break;
            case "isValid":
                this.getStartDateBox().option(name, value);
                this.getEndDateBox().option(name, value);
                var isValid = value && !this.option("_internalValidationErrors").length;
                if (this._shouldSkipIsValidChange || isValid === value) {
                    _Editor.prototype._optionChanged.call(this, args);
                    return
                }
                this._shouldSkipIsValidChange = true;
                this.option("isValid", isValid);
                this._shouldSkipIsValidChange = false;
                break;
            case "validationErrors":
                var internalValidationErrors = this.option("_internalValidationErrors") || [];
                var allErrors = value || [];
                var externalErrors = this._getRestErrors(allErrors, internalValidationErrors);
                var errors = [].concat(_toConsumableArray(externalErrors), _toConsumableArray(internalValidationErrors));
                var newValue = errors.length ? errors : null;
                this._options.silent("validationErrors", newValue);
                _Editor.prototype._optionChanged.call(this, _extends({}, args, {
                    value: newValue
                }));
                break;
            case "value":
                var _newValue2 = (0, _uiDate_range.sortDatesArray)(value);
                if (!(0, _uiDate_range.isSameDateArrays)(_newValue2, previousValue)) {
                    this._setOptionWithoutOptionChange("value", _newValue2);
                    this._setOptionWithoutOptionChange("startDate", _newValue2[0]);
                    this._setOptionWithoutOptionChange("endDate", _newValue2[1]);
                    this._applyCustomValidation(_newValue2);
                    this._updateDateBoxesValue(_newValue2);
                    this.getStartDateBox()._strategy.renderValue();
                    this._toggleEmptinessState();
                    this._raiseValueChangeAction(_newValue2, previousValue);
                    this._saveValueChangeEvent(void 0)
                }
                break;
            case "_currentSelection":
                break;
            default:
                _Editor.prototype._optionChanged.call(this, args)
        }
    };
    _proto.getStartDateBox = function() {
        return this._startDateBox
    };
    _proto.getEndDateBox = function() {
        return this._endDateBox
    };
    _proto.getButton = function(name) {
        return this._buttonCollection.getButton(name)
    };
    _proto.open = function() {
        this.option("opened", true)
    };
    _proto.close = function() {
        this.option("opened", false)
    };
    _proto.content = function() {
        return this.getStartDateBox().content()
    };
    _proto.field = function() {
        return [this.startDateField(), this.endDateField()]
    };
    _proto.startDateField = function() {
        return this.getStartDateBox().field()
    };
    _proto.endDateField = function() {
        return this.getEndDateBox().field()
    };
    _proto.focus = function() {
        this.getStartDateBox().focus()
    };
    _proto.reset = function() {
        _Editor.prototype.reset.call(this);
        this.getEndDateBox().reset();
        this.getStartDateBox().reset()
    };
    return DateRangeBox
}(_editor.default);
(0, _component_registrator.default)("dxDateRangeBox", DateRangeBox);
var _default = DateRangeBox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
