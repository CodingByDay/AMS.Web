/**
 * DevExtreme (cjs/renovation/ui/scheduler/appointment/appointment.js)
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
exports.viewFunction = exports.AppointmentProps = exports.Appointment = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _utils = require("./utils");
var _layout = require("./content/layout");
var _widget = require("../../common/widget");
var _combine_classes = require("../../../utils/combine_classes");
var _utils2 = require("../resources/utils");
var _appointments_context = require("../appointments_context");
var _excluded = ["appointmentTemplate", "groups", "hideReducedIconTooltip", "index", "onItemClick", "onItemDoubleClick", "showReducedIconTooltip", "viewModel"];

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

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
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
    var classes = _ref.classes,
        data = _ref.data,
        dateText = _ref.dateText,
        isReduced = _ref.isReduced,
        onItemClick = _ref.onItemClick,
        _ref$props = _ref.props,
        appointmentTemplate = _ref$props.appointmentTemplate,
        hideReducedIconTooltip = _ref$props.hideReducedIconTooltip,
        index = _ref$props.index,
        showReducedIconTooltip = _ref$props.showReducedIconTooltip,
        isRecurrent = _ref$props.viewModel.info.isRecurrent,
        ref = _ref.ref,
        styles = _ref.styles,
        text = _ref.text;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
        focusStateEnabled: true,
        onClick: onItemClick,
        rootElementRef: ref,
        style: (0, _inferno2.normalizeStyles)(styles),
        classes: classes,
        hint: text
    }, {
        role: "button",
        "data-index": index
    }, {
        children: (0, _inferno.createComponentVNode)(2, _layout.AppointmentContent, {
            text: text,
            isReduced: isReduced,
            dateText: dateText,
            isRecurrent: isRecurrent,
            index: index,
            data: data,
            showReducedIconTooltip: showReducedIconTooltip,
            hideReducedIconTooltip: hideReducedIconTooltip,
            appointmentTemplate: appointmentTemplate
        })
    })))
};
exports.viewFunction = viewFunction;
var AppointmentProps = {
    index: 0
};
exports.AppointmentProps = AppointmentProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var Appointment = function(_InfernoComponent) {
    _inheritsLoose(Appointment, _InfernoComponent);

    function Appointment(props) {
        var _this;
        _this = _InfernoComponent.call(this, props) || this;
        _this.ref = (0, _inferno.createRef)();
        _this.state = {
            color: void 0
        };
        _this.updateStylesEffect = _this.updateStylesEffect.bind(_assertThisInitialized(_this));
        _this.bindDoubleClickEffect = _this.bindDoubleClickEffect.bind(_assertThisInitialized(_this));
        _this.onItemClick = _this.onItemClick.bind(_assertThisInitialized(_this));
        _this.onItemDoubleClick = _this.onItemDoubleClick.bind(_assertThisInitialized(_this));
        return _this
    }
    var _proto = Appointment.prototype;
    _proto.createEffects = function() {
        return [new _inferno2.InfernoEffect(this.updateStylesEffect, [this.props.viewModel, this.appointmentsContextValue, this.props.groups]), new _inferno2.InfernoEffect(this.bindDoubleClickEffect, [])]
    };
    _proto.updateEffects = function() {
        var _this$_effects$;
        null === (_this$_effects$ = this._effects[0]) || void 0 === _this$_effects$ ? void 0 : _this$_effects$.update([this.props.viewModel, this.appointmentsContextValue, this.props.groups])
    };
    _proto.updateStylesEffect = function() {
        var _viewModel$info$group, _this2 = this;
        var viewModel = this.props.viewModel;
        var groupIndex = null !== (_viewModel$info$group = viewModel.info.groupIndex) && void 0 !== _viewModel$info$group ? _viewModel$info$group : 0;
        var appointment = viewModel.appointment;
        (0, _utils2.getAppointmentColor)({
            resources: this.appointmentsContextValue.resources,
            resourceLoaderMap: this.appointmentsContextValue.resourceLoaderMap,
            resourcesDataAccessors: this.appointmentsContextValue.dataAccessors.resources,
            loadedResources: this.appointmentsContextValue.loadedResources
        }, {
            itemData: appointment,
            groupIndex: groupIndex,
            groups: this.props.groups
        }).then((function(color) {
            _this2.setState((function(__state_argument) {
                return {
                    color: color
                }
            }))
        })).catch((function() {
            return ""
        }))
    };
    _proto.bindDoubleClickEffect = function() {
        var _this$ref$current, _this3 = this;
        var onDoubleClick = function() {
            return _this3.onItemDoubleClick()
        };
        null === (_this$ref$current = this.ref.current) || void 0 === _this$ref$current ? void 0 : _this$ref$current.addEventListener("dblclick", onDoubleClick);
        return function() {
            var _this3$ref$current;
            null === (_this3$ref$current = _this3.ref.current) || void 0 === _this3$ref$current ? void 0 : _this3$ref$current.removeEventListener("dblclick", onDoubleClick)
        }
    };
    _proto.onItemClick = function() {
        var e = {
            data: [this.props.viewModel],
            target: this.ref.current,
            index: this.props.index
        };
        this.props.onItemClick(e)
    };
    _proto.onItemDoubleClick = function() {
        var e = {
            data: [this.props.viewModel],
            target: this.ref.current,
            index: this.props.index
        };
        this.props.onItemDoubleClick(e)
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                appointmentTemplate: getTemplate(props.appointmentTemplate)
            }),
            color: this.state.color,
            ref: this.ref,
            appointmentsContextValue: this.appointmentsContextValue,
            appointmentStyles: this.appointmentStyles,
            styles: this.styles,
            text: this.text,
            isReduced: this.isReduced,
            classes: this.classes,
            dateText: this.dateText,
            data: this.data,
            onItemClick: this.onItemClick,
            onItemDoubleClick: this.onItemDoubleClick,
            restAttributes: this.restAttributes
        })
    };
    _createClass(Appointment, [{
        key: "appointmentsContextValue",
        get: function() {
            if (this.context[_appointments_context.AppointmentsContext.id]) {
                return this.context[_appointments_context.AppointmentsContext.id]
            }
            return _appointments_context.AppointmentsContext.defaultValue
        }
    }, {
        key: "appointmentStyles",
        get: function() {
            return (0, _utils.getAppointmentStyles)(this.props.viewModel)
        }
    }, {
        key: "styles",
        get: function() {
            return (0, _utils.mergeStylesWithColor)(this.state.color, this.appointmentStyles)
        }
    }, {
        key: "text",
        get: function() {
            return this.props.viewModel.appointment.text
        }
    }, {
        key: "isReduced",
        get: function() {
            var appointmentReduced = this.props.viewModel.info.appointmentReduced;
            return !!appointmentReduced
        }
    }, {
        key: "classes",
        get: function() {
            var _this$props$viewModel = this.props.viewModel,
                focused = _this$props$viewModel.focused,
                _this$props$viewModel2 = _this$props$viewModel.info,
                allDay = _this$props$viewModel2.allDay,
                appointmentReduced = _this$props$viewModel2.appointmentReduced,
                direction = _this$props$viewModel2.direction,
                isRecurrent = _this$props$viewModel2.isRecurrent;
            var isVerticalDirection = "vertical" === direction;
            return (0, _combine_classes.combineClasses)({
                "dx-state-focused": !!focused,
                "dx-scheduler-appointment": true,
                "dx-scheduler-appointment-horizontal": !isVerticalDirection,
                "dx-scheduler-appointment-vertical": isVerticalDirection,
                "dx-scheduler-appointment-recurrence": isRecurrent,
                "dx-scheduler-all-day-appointment": allDay,
                "dx-scheduler-appointment-reduced": this.isReduced,
                "dx-scheduler-appointment-head": "head" === appointmentReduced,
                "dx-scheduler-appointment-body": "body" === appointmentReduced,
                "dx-scheduler-appointment-tail": "tail" === appointmentReduced
            })
        }
    }, {
        key: "dateText",
        get: function() {
            return this.props.viewModel.info.dateText
        }
    }, {
        key: "data",
        get: function() {
            return {
                appointmentData: this.props.viewModel.info.appointment,
                targetedAppointmentData: this.props.viewModel.appointment
            }
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.appointmentTemplate, _this$props.groups, _this$props.hideReducedIconTooltip, _this$props.index, _this$props.onItemClick, _this$props.onItemDoubleClick, _this$props.showReducedIconTooltip, _this$props.viewModel, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return Appointment
}(_inferno2.InfernoComponent);
exports.Appointment = Appointment;
Appointment.defaultProps = AppointmentProps;
