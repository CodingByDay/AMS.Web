/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/date_table/cell.js)
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
exports.viewFunction = exports.DateTableCellBaseProps = exports.DateTableCellBase = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _cell = require("../cell");
var _combine_classes = require("../../../../../utils/combine_classes");
var _const = require("../../const");
var _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "dataCellTemplate", "endDate", "firstDayOfMonth", "groupIndex", "groups", "index", "isFirstGroupCell", "isFocused", "isLastGroupCell", "isSelected", "otherMonth", "startDate", "text", "today"];

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
var ADD_APPOINTMENT_LABEL = "Add appointment";
var viewFunction = function(_ref) {
    var ariaLabel = _ref.ariaLabel,
        classes = _ref.classes,
        dataCellTemplateProps = _ref.dataCellTemplateProps,
        _ref$props = _ref.props,
        children = _ref$props.children,
        DataCellTemplate = _ref$props.dataCellTemplate,
        isFirstGroupCell = _ref$props.isFirstGroupCell,
        isLastGroupCell = _ref$props.isLastGroupCell;
    return (0, _inferno.createComponentVNode)(2, _cell.CellBase, {
        isFirstGroupCell: isFirstGroupCell,
        isLastGroupCell: isLastGroupCell,
        className: classes,
        ariaLabel: ariaLabel,
        children: [!DataCellTemplate && children, !!DataCellTemplate && DataCellTemplate({
            index: dataCellTemplateProps.index,
            data: dataCellTemplateProps.data
        })]
    })
};
exports.viewFunction = viewFunction;
var DateTableCellBaseProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_cell.CellBaseProps), Object.getOwnPropertyDescriptors({
    otherMonth: false,
    today: false,
    firstDayOfMonth: false,
    isSelected: false,
    isFocused: false
})));
exports.DateTableCellBaseProps = DateTableCellBaseProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var DateTableCellBase = function(_BaseInfernoComponent) {
    _inheritsLoose(DateTableCellBase, _BaseInfernoComponent);

    function DateTableCellBase(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        _this.__getterCache = {};
        return _this
    }
    var _proto = DateTableCellBase.prototype;
    _proto.componentWillUpdate = function(nextProps, nextState, context) {
        if (this.props.allDay !== nextProps.allDay || this.props.contentTemplateProps !== nextProps.contentTemplateProps || this.props.endDate !== nextProps.endDate || this.props.groupIndex !== nextProps.groupIndex || this.props.groups !== nextProps.groups || this.props.index !== nextProps.index || this.props.startDate !== nextProps.startDate) {
            this.__getterCache.dataCellTemplateProps = void 0
        }
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                dataCellTemplate: getTemplate(props.dataCellTemplate)
            }),
            classes: this.classes,
            dataCellTemplateProps: this.dataCellTemplateProps,
            ariaLabel: this.ariaLabel,
            restAttributes: this.restAttributes
        })
    };
    _createClass(DateTableCellBase, [{
        key: "classes",
        get: function() {
            var _combineClasses;
            var _this$props = this.props,
                allDay = _this$props.allDay,
                className = _this$props.className,
                isFocused = _this$props.isFocused,
                isSelected = _this$props.isSelected;
            return (0, _combine_classes.combineClasses)((_combineClasses = {
                "dx-scheduler-cell-sizes-horizontal": true,
                "dx-scheduler-cell-sizes-vertical": !allDay
            }, _defineProperty(_combineClasses, _const.DATE_TABLE_CELL_CLASS, !allDay), _defineProperty(_combineClasses, "dx-state-focused", isSelected), _defineProperty(_combineClasses, "dx-scheduler-focused-cell", isFocused), _defineProperty(_combineClasses, className, true), _combineClasses))
        }
    }, {
        key: "dataCellTemplateProps",
        get: function() {
            var _this2 = this;
            if (void 0 !== this.__getterCache.dataCellTemplateProps) {
                return this.__getterCache.dataCellTemplateProps
            }
            return this.__getterCache.dataCellTemplateProps = (_this2$props = _this2.props, allDay = _this2$props.allDay, contentTemplateProps = _this2$props.contentTemplateProps, endDate = _this2$props.endDate, groupIndex = _this2$props.groupIndex, groups = _this2$props.groups, index = _this2$props.index, startDate = _this2$props.startDate, {
                data: _extends({
                    startDate: startDate,
                    endDate: endDate,
                    groups: groups,
                    groupIndex: groups ? groupIndex : void 0,
                    text: "",
                    allDay: !!allDay || void 0
                }, contentTemplateProps.data),
                index: index
            });
            var _this2$props, allDay, contentTemplateProps, endDate, groupIndex, groups, index, startDate
        }
    }, {
        key: "ariaLabel",
        get: function() {
            return this.props.isSelected ? ADD_APPOINTMENT_LABEL : void 0
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props2 = this.props,
                restProps = (_this$props2.allDay, _this$props2.ariaLabel, _this$props2.children, _this$props2.className, _this$props2.contentTemplateProps, _this$props2.dataCellTemplate, _this$props2.endDate, _this$props2.firstDayOfMonth, _this$props2.groupIndex, _this$props2.groups, _this$props2.index, _this$props2.isFirstGroupCell, _this$props2.isFocused, _this$props2.isLastGroupCell, _this$props2.isSelected, _this$props2.otherMonth, _this$props2.startDate, _this$props2.text, _this$props2.today, _objectWithoutProperties(_this$props2, _excluded));
            return restProps
        }
    }]);
    return DateTableCellBase
}(_inferno2.BaseInfernoComponent);
exports.DateTableCellBase = DateTableCellBase;
DateTableCellBase.defaultProps = DateTableCellBaseProps;
