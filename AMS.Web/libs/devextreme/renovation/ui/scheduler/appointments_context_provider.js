/**
 * DevExtreme (renovation/ui/scheduler/appointments_context_provider.js)
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
exports.viewFunction = exports.AppointmentsContextProviderProps = exports.AppointmentsContextProvider = void 0;
var _inferno = require("@devextreme/runtime/inferno");
var _appointments_context = require("./appointments_context");
var _excluded = ["appointmentsContextValue", "children"];

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

function _defineProperty(obj, key, value) {
    key = _toPropertyKey(key);
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
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
var viewFunction = function(viewModel) {
    return viewModel.props.children
};
exports.viewFunction = viewFunction;
var AppointmentsContextProviderProps = {};
exports.AppointmentsContextProviderProps = AppointmentsContextProviderProps;
var AppointmentsContextProvider = function(_BaseInfernoComponent) {
    _inheritsLoose(AppointmentsContextProvider, _BaseInfernoComponent);

    function AppointmentsContextProvider(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        _this.__getterCache = {};
        return _this
    }
    var _proto = AppointmentsContextProvider.prototype;
    _proto.getChildContext = function() {
        return _extends({}, this.context, _defineProperty({}, _appointments_context.AppointmentsContext.id, this.appointmentsContextValue || _appointments_context.AppointmentsContext.defaultValue))
    };
    _proto.componentWillUpdate = function(nextProps, nextState, context) {
        if (this.props.appointmentsContextValue !== nextProps.appointmentsContextValue) {
            this.__getterCache.appointmentsContextValue = void 0
        }
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            appointmentsContextValue: this.appointmentsContextValue,
            restAttributes: this.restAttributes
        })
    };
    _createClass(AppointmentsContextProvider, [{
        key: "appointmentsContextValue",
        get: function() {
            var _this2 = this;
            if (void 0 !== this.__getterCache.appointmentsContextValue) {
                return this.__getterCache.appointmentsContextValue
            }
            return this.__getterCache.appointmentsContextValue = _this2.props.appointmentsContextValue
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.appointmentsContextValue, _this$props.children, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return AppointmentsContextProvider
}(_inferno.BaseInfernoComponent);
exports.AppointmentsContextProvider = AppointmentsContextProvider;
AppointmentsContextProvider.defaultProps = AppointmentsContextProviderProps;
