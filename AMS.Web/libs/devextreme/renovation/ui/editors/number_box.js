/**
 * DevExtreme (renovation/ui/editors/number_box.js)
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
exports.viewFunction = exports.NumberBoxPropsType = exports.NumberBoxProps = exports.NumberBox = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _number_box = _interopRequireDefault(require("../../../ui/number_box"));
var _dom_component_wrapper = require("../common/dom_component_wrapper");
var _editor = require("./common/editor");
var _editor_state_props = require("./common/editor_state_props");
var _editor_label_props = require("./common/editor_label_props");
var _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "inputAttr", "invalidValueMessage", "isValid", "label", "labelMode", "max", "min", "mode", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "showSpinButtons", "step", "tabIndex", "useLargeSpinButtons", "validationError", "validationErrors", "validationMessageMode", "validationMessagePosition", "validationStatus", "value", "valueChange", "visible", "width"];

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
var DEFAULT_VALUE = 0;
var viewFunction = function(_ref) {
    var componentProps = _ref.componentProps,
        restAttributes = _ref.restAttributes;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
        componentType: _number_box.default,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
exports.viewFunction = viewFunction;
var NumberBoxProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_editor.EditorProps), Object.getOwnPropertyDescriptors({
    defaultValue: DEFAULT_VALUE,
    isReactComponentWrapper: true
})));
exports.NumberBoxProps = NumberBoxProps;
var NumberBoxPropsType = Object.defineProperties({
    isReactComponentWrapper: true
}, {
    defaultValue: {
        get: function() {
            return NumberBoxProps.defaultValue
        },
        configurable: true,
        enumerable: true
    },
    readOnly: {
        get: function() {
            return NumberBoxProps.readOnly
        },
        configurable: true,
        enumerable: true
    },
    name: {
        get: function() {
            return NumberBoxProps.name
        },
        configurable: true,
        enumerable: true
    },
    validationError: {
        get: function() {
            return NumberBoxProps.validationError
        },
        configurable: true,
        enumerable: true
    },
    validationErrors: {
        get: function() {
            return NumberBoxProps.validationErrors
        },
        configurable: true,
        enumerable: true
    },
    validationMessageMode: {
        get: function() {
            return NumberBoxProps.validationMessageMode
        },
        configurable: true,
        enumerable: true
    },
    validationMessagePosition: {
        get: function() {
            return NumberBoxProps.validationMessagePosition
        },
        configurable: true,
        enumerable: true
    },
    validationStatus: {
        get: function() {
            return NumberBoxProps.validationStatus
        },
        configurable: true,
        enumerable: true
    },
    isValid: {
        get: function() {
            return NumberBoxProps.isValid
        },
        configurable: true,
        enumerable: true
    },
    inputAttr: {
        get: function() {
            return NumberBoxProps.inputAttr
        },
        configurable: true,
        enumerable: true
    },
    className: {
        get: function() {
            return NumberBoxProps.className
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
            return NumberBoxProps.disabled
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
            return NumberBoxProps.tabIndex
        },
        configurable: true,
        enumerable: true
    },
    visible: {
        get: function() {
            return NumberBoxProps.visible
        },
        configurable: true,
        enumerable: true
    },
    label: {
        get: function() {
            return _editor_label_props.EditorLabelProps.label
        },
        configurable: true,
        enumerable: true
    },
    labelMode: {
        get: function() {
            return _editor_label_props.EditorLabelProps.labelMode
        },
        configurable: true,
        enumerable: true
    }
});
exports.NumberBoxPropsType = NumberBoxPropsType;
var NumberBox = function(_BaseInfernoComponent) {
    _inheritsLoose(NumberBox, _BaseInfernoComponent);

    function NumberBox(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {
            value: void 0 !== _this.props.value ? _this.props.value : _this.props.defaultValue
        };
        return _this
    }
    var _proto = NumberBox.prototype;
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
    _createClass(NumberBox, [{
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
                restProps = (_this$props$value.accessKey, _this$props$value.activeStateEnabled, _this$props$value.className, _this$props$value.defaultValue, _this$props$value.disabled, _this$props$value.focusStateEnabled, _this$props$value.height, _this$props$value.hint, _this$props$value.hoverStateEnabled, _this$props$value.inputAttr, _this$props$value.invalidValueMessage, _this$props$value.isValid, _this$props$value.label, _this$props$value.labelMode, _this$props$value.max, _this$props$value.min, _this$props$value.mode, _this$props$value.name, _this$props$value.onClick, _this$props$value.onFocusIn, _this$props$value.onKeyDown, _this$props$value.readOnly, _this$props$value.rtlEnabled, _this$props$value.showSpinButtons, _this$props$value.step, _this$props$value.tabIndex, _this$props$value.useLargeSpinButtons, _this$props$value.validationError, _this$props$value.validationErrors, _this$props$value.validationMessageMode, _this$props$value.validationMessagePosition, _this$props$value.validationStatus, _this$props$value.value, _this$props$value.valueChange, _this$props$value.visible, _this$props$value.width, _objectWithoutProperties(_this$props$value, _excluded));
            return restProps
        }
    }]);
    return NumberBox
}(_inferno2.BaseInfernoComponent);
exports.NumberBox = NumberBox;
NumberBox.defaultProps = NumberBoxPropsType;
