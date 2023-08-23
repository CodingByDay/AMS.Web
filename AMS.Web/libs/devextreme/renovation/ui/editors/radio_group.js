/**
 * DevExtreme (renovation/ui/editors/radio_group.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
}
exports.viewFunction = exports.RadioGroupPropsType = exports.RadioGroupProps = exports.RadioGroup = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _radio_group = _interopRequireDefault(require("../../../ui/radio_group"));
var _editor = require("./common/editor");
var _editor_state_props = require("./common/editor_state_props");
var _dom_component_wrapper = require("../common/dom_component_wrapper");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _excluded = ["accessKey", "activeStateEnabled", "className", "dataSource", "defaultValue", "disabled", "displayExpr", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "isValid", "items", "layout", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "tabIndex", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "valueExpr", "visible", "width"];

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _objectWithoutProperties(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) {
            continue
        }
        target[key] = source[key]
    }
    return target
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    Object.defineProperty(Constructor, "prototype", {
        writable: false
    });
    return Constructor
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
var viewFunction = function(_ref) {
    var componentProps = _ref.componentProps,
        restAttributes = _ref.restAttributes;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
        componentType: _radio_group.default,
        componentProps: componentProps,
        templateNames: ["itemTemplate"]
    }, restAttributes)))
};
exports.viewFunction = viewFunction;
var RadioGroupProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_editor.EditorProps), Object.getOwnPropertyDescriptors(Object.defineProperties({
    isReactComponentWrapper: true
}, {
    layout: {
        get: function() {
            return "tablet" === _devices.default.real().deviceType ? "horizontal" : "vertical"
        },
        configurable: true,
        enumerable: true
    }
}))));
exports.RadioGroupProps = RadioGroupProps;
var RadioGroupPropsType = Object.defineProperties({
    isReactComponentWrapper: true
}, {
    layout: {
        get: function() {
            return RadioGroupProps.layout
        },
        configurable: true,
        enumerable: true
    },
    readOnly: {
        get: function() {
            return RadioGroupProps.readOnly
        },
        configurable: true,
        enumerable: true
    },
    name: {
        get: function() {
            return RadioGroupProps.name
        },
        configurable: true,
        enumerable: true
    },
    validationError: {
        get: function() {
            return RadioGroupProps.validationError
        },
        configurable: true,
        enumerable: true
    },
    validationErrors: {
        get: function() {
            return RadioGroupProps.validationErrors
        },
        configurable: true,
        enumerable: true
    },
    validationMessageMode: {
        get: function() {
            return RadioGroupProps.validationMessageMode
        },
        configurable: true,
        enumerable: true
    },
    validationMessagePosition: {
        get: function() {
            return RadioGroupProps.validationMessagePosition
        },
        configurable: true,
        enumerable: true
    },
    validationStatus: {
        get: function() {
            return RadioGroupProps.validationStatus
        },
        configurable: true,
        enumerable: true
    },
    isValid: {
        get: function() {
            return RadioGroupProps.isValid
        },
        configurable: true,
        enumerable: true
    },
    inputAttr: {
        get: function() {
            return RadioGroupProps.inputAttr
        },
        configurable: true,
        enumerable: true
    },
    defaultValue: {
        get: function() {
            return RadioGroupProps.defaultValue
        },
        configurable: true,
        enumerable: true
    },
    className: {
        get: function() {
            return RadioGroupProps.className
        },
        configurable: true,
        enumerable: true
    },
    activeStateEnabled: {
        get: function() {
            return _editor_state_props.EditorStateProps.activeStateEnabled
        },
        configurable: true,
        enumerable: true
    },
    disabled: {
        get: function() {
            return RadioGroupProps.disabled
        },
        configurable: true,
        enumerable: true
    },
    focusStateEnabled: {
        get: function() {
            return _editor_state_props.EditorStateProps.focusStateEnabled
        },
        configurable: true,
        enumerable: true
    },
    hoverStateEnabled: {
        get: function() {
            return _editor_state_props.EditorStateProps.hoverStateEnabled
        },
        configurable: true,
        enumerable: true
    },
    tabIndex: {
        get: function() {
            return RadioGroupProps.tabIndex
        },
        configurable: true,
        enumerable: true
    },
    visible: {
        get: function() {
            return RadioGroupProps.visible
        },
        configurable: true,
        enumerable: true
    }
});
exports.RadioGroupPropsType = RadioGroupPropsType;
var RadioGroup = function(_BaseInfernoComponent) {
    _inheritsLoose(RadioGroup, _BaseInfernoComponent);

    function RadioGroup(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {
            value: void 0 !== _this.props.value ? _this.props.value : _this.props.defaultValue
        };
        return _this
    }
    var _proto = RadioGroup.prototype;
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            }),
            componentProps: this.componentProps,
            restAttributes: this.restAttributes
        })
    };
    _createClass(RadioGroup, [{
        key: "componentProps",
        get: function() {
            return _extends({}, this.props, {
                value: void 0 !== this.props.value ? this.props.value : this.state.value
            })
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props$value = _extends({}, this.props, {
                    value: void 0 !== this.props.value ? this.props.value : this.state.value
                }),
                restProps = (_this$props$value.accessKey, _this$props$value.activeStateEnabled, _this$props$value.className, _this$props$value.dataSource, _this$props$value.defaultValue, _this$props$value.disabled, _this$props$value.displayExpr, _this$props$value.focusStateEnabled, _this$props$value.height, _this$props$value.hint, _this$props$value.hoverStateEnabled, _this$props$value.inputAttr, _this$props$value.isValid, _this$props$value.items, _this$props$value.layout, _this$props$value.name, _this$props$value.onClick, _this$props$value.onFocusIn, _this$props$value.onKeyDown, _this$props$value.readOnly, _this$props$value.rtlEnabled, _this$props$value.tabIndex, _this$props$value.validationError, _this$props$value.validationErrors, _this$props$value.validationMessageMode, _this$props$value.validationMessagePosition, _this$props$value.validationStatus, _this$props$value.value, _this$props$value.valueChange, _this$props$value.valueExpr, _this$props$value.visible, _this$props$value.width, _objectWithoutProperties(_this$props$value, _excluded));
            return restProps
        }
    }]);
    return RadioGroup
}(_inferno2.BaseInfernoComponent);
exports.RadioGroup = RadioGroup;
RadioGroup.defaultProps = RadioGroupPropsType;
