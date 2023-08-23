/**
 * DevExtreme (renovation/ui/form/wrapper/form.js)
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
exports.viewFunction = exports.Form = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _form = _interopRequireDefault(require("../../../../ui/form"));
var _dom_component_wrapper = require("../../common/dom_component_wrapper");
var _form_props = require("./form_props");
var _excluded = ["accessKey", "activeStateEnabled", "className", "colCount", "colCountByScreen", "disabled", "focusStateEnabled", "formData", "height", "hint", "hoverStateEnabled", "items", "labelLocation", "onClick", "onKeyDown", "rtlEnabled", "scrollingEnabled", "showColonAfterLabel", "showValidationSummary", "tabIndex", "visible", "width"];

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
        componentType: _form.default,
        componentProps: componentProps,
        templateNames: []
    }, restAttributes)))
};
exports.viewFunction = viewFunction;
var Form = function(_InfernoWrapperCompon) {
    _inheritsLoose(Form, _InfernoWrapperCompon);

    function Form(props) {
        var _this;
        _this = _InfernoWrapperCompon.call(this, props) || this;
        _this.state = {};
        _this.__getterCache = {};
        return _this
    }
    var _proto = Form.prototype;
    _proto.createEffects = function() {
        return [(0, _inferno2.createReRenderEffect)()]
    };
    _proto.componentWillUpdate = function(nextProps, nextState, context) {
        _InfernoWrapperCompon.prototype.componentWillUpdate.call(this);
        if (this.props !== nextProps) {
            this.__getterCache.componentProps = void 0
        }
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            componentProps: this.componentProps,
            restAttributes: this.restAttributes
        })
    };
    _createClass(Form, [{
        key: "componentProps",
        get: function() {
            var _this2 = this;
            if (void 0 !== this.__getterCache.componentProps) {
                return this.__getterCache.componentProps
            }
            return this.__getterCache.componentProps = _this2.props
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.accessKey, _this$props.activeStateEnabled, _this$props.className, _this$props.colCount, _this$props.colCountByScreen, _this$props.disabled, _this$props.focusStateEnabled, _this$props.formData, _this$props.height, _this$props.hint, _this$props.hoverStateEnabled, _this$props.items, _this$props.labelLocation, _this$props.onClick, _this$props.onKeyDown, _this$props.rtlEnabled, _this$props.scrollingEnabled, _this$props.showColonAfterLabel, _this$props.showValidationSummary, _this$props.tabIndex, _this$props.visible, _this$props.width, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return Form
}(_inferno2.InfernoWrapperComponent);
exports.Form = Form;
Form.defaultProps = _form_props.FormProps;
