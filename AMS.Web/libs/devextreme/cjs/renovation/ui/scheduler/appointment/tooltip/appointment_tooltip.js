/**
 * DevExtreme (cjs/renovation/ui/scheduler/appointment/tooltip/appointment_tooltip.js)
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
exports.AppointmentTooltipProps = exports.AppointmentTooltip = void 0;
exports.defaultOptions = defaultOptions;
exports.viewFunction = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _tooltip = require("../../../overlays/tooltip");
var _appointment_list = require("./appointment_list");
var _utils = require("../../../../../core/options/utils");
var _excluded = ["dataList", "onVisibleChange", "target", "visible"];

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
var wrapperAttr = {
    class: "dx-scheduler-appointment-tooltip-wrapper"
};
var viewFunction = function(_ref) {
    var _ref$props = _ref.props,
        dataList = _ref$props.dataList,
        onVisibleChange = _ref$props.onVisibleChange,
        target = _ref$props.target,
        visible = _ref$props.visible;
    return (0, _inferno.createComponentVNode)(2, _tooltip.Tooltip, {
        focusStateEnabled: false,
        hideOnOutsideClick: true,
        visible: visible,
        visibleChange: onVisibleChange,
        target: target,
        wrapperAttr: wrapperAttr,
        children: (0, _inferno.createComponentVNode)(2, _appointment_list.AppointmentList, {
            appointments: dataList
        })
    })
};
exports.viewFunction = viewFunction;
var AppointmentTooltipProps = {};
exports.AppointmentTooltipProps = AppointmentTooltipProps;
var AppointmentTooltip = function(_BaseInfernoComponent) {
    _inheritsLoose(AppointmentTooltip, _BaseInfernoComponent);

    function AppointmentTooltip(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        return _this
    }
    var _proto = AppointmentTooltip.prototype;
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            restAttributes: this.restAttributes
        })
    };
    _createClass(AppointmentTooltip, [{
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.dataList, _this$props.onVisibleChange, _this$props.target, _this$props.visible, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return AppointmentTooltip
}(_inferno2.BaseInfernoComponent);
exports.AppointmentTooltip = AppointmentTooltip;
AppointmentTooltip.defaultProps = AppointmentTooltipProps;
var __defaultOptionRules = [];

function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    AppointmentTooltip.defaultProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(AppointmentTooltip.defaultProps), Object.getOwnPropertyDescriptors((0, _utils.convertRulesToOptions)(__defaultOptionRules))))
}
