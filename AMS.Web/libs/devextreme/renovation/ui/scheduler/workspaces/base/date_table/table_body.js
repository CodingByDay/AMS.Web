/**
 * DevExtreme (renovation/ui/scheduler/workspaces/base/date_table/table_body.js)
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
exports.viewFunction = exports.DateTableBodyProps = exports.DateTableBody = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _row = require("../row");
var _table_body = require("./all_day_panel/table_body");
var _layout_props = require("../layout_props");
var _cell = require("./cell");
var _combine_classes = require("../../../../../utils/combine_classes");
var _const = require("../../const");
var _excluded = ["addDateTableClass", "addVerticalSizesClassToRows", "bottomVirtualRowHeight", "cellTemplate", "dataCellTemplate", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "viewData", "width"];

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
var viewFunction = function(_ref) {
    var _ref$props = _ref.props,
        Cell = _ref$props.cellTemplate,
        dataCellTemplate = _ref$props.dataCellTemplate,
        viewData = _ref$props.viewData,
        rowClasses = _ref.rowClasses;
    return (0, _inferno.createFragment)(viewData.groupedData.map((function(_ref2) {
        var allDayPanel = _ref2.allDayPanel,
            dateTable = _ref2.dateTable,
            isGroupedAllDayPanel = _ref2.isGroupedAllDayPanel,
            fragmentKey = _ref2.key;
        return (0, _inferno.createFragment)([isGroupedAllDayPanel && (0, _inferno.createComponentVNode)(2, _table_body.AllDayPanelTableBody, {
            viewData: allDayPanel,
            dataCellTemplate: dataCellTemplate,
            isVerticalGroupOrientation: true,
            leftVirtualCellWidth: viewData.leftVirtualCellWidth,
            rightVirtualCellWidth: viewData.rightVirtualCellWidth,
            leftVirtualCellCount: viewData.leftVirtualCellCount,
            rightVirtualCellCount: viewData.rightVirtualCellCount
        }), dateTable.map((function(_ref3) {
            var cells = _ref3.cells,
                rowKey = _ref3.key;
            return (0, _inferno.createComponentVNode)(2, _row.Row, {
                className: rowClasses,
                leftVirtualCellWidth: viewData.leftVirtualCellWidth,
                rightVirtualCellWidth: viewData.rightVirtualCellWidth,
                leftVirtualCellCount: viewData.leftVirtualCellCount,
                rightVirtualCellCount: viewData.rightVirtualCellCount,
                children: cells.map((function(_ref4) {
                    var endDate = _ref4.endDate,
                        firstDayOfMonth = _ref4.firstDayOfMonth,
                        cellGroupIndex = _ref4.groupIndex,
                        groups = _ref4.groups,
                        cellIndex = _ref4.index,
                        isFirstGroupCell = _ref4.isFirstGroupCell,
                        isFocused = _ref4.isFocused,
                        isLastGroupCell = _ref4.isLastGroupCell,
                        isSelected = _ref4.isSelected,
                        key = _ref4.key,
                        otherMonth = _ref4.otherMonth,
                        startDate = _ref4.startDate,
                        text = _ref4.text,
                        today = _ref4.today;
                    return Cell({
                        isFirstGroupCell: isFirstGroupCell,
                        isLastGroupCell: isLastGroupCell,
                        startDate: startDate,
                        endDate: endDate,
                        groups: groups,
                        groupIndex: cellGroupIndex,
                        index: cellIndex,
                        dataCellTemplate: dataCellTemplate,
                        key: key,
                        text: text,
                        today: today,
                        otherMonth: otherMonth,
                        firstDayOfMonth: firstDayOfMonth,
                        isSelected: isSelected,
                        isFocused: isFocused
                    })
                }))
            }, rowKey)
        }))], 0, fragmentKey)
    })), 0)
};
exports.viewFunction = viewFunction;
var DateTableBodyProps = Object.create(Object.prototype, _extends(Object.getOwnPropertyDescriptors(_layout_props.LayoutProps), Object.getOwnPropertyDescriptors({
    cellTemplate: _cell.DateTableCellBase
})));
exports.DateTableBodyProps = DateTableBodyProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var DateTableBody = function(_BaseInfernoComponent) {
    _inheritsLoose(DateTableBody, _BaseInfernoComponent);

    function DateTableBody(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        return _this
    }
    var _proto = DateTableBody.prototype;
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                cellTemplate: getTemplate(props.cellTemplate),
                dataCellTemplate: getTemplate(props.dataCellTemplate)
            }),
            rowClasses: this.rowClasses,
            restAttributes: this.restAttributes
        })
    };
    _createClass(DateTableBody, [{
        key: "rowClasses",
        get: function() {
            var _combineClasses;
            var addVerticalSizesClassToRows = this.props.addVerticalSizesClassToRows;
            return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, _const.DATE_TABLE_ROW_CLASS, true), _defineProperty(_combineClasses, "dx-scheduler-cell-sizes-vertical", addVerticalSizesClassToRows), _combineClasses))
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.addDateTableClass, _this$props.addVerticalSizesClassToRows, _this$props.bottomVirtualRowHeight, _this$props.cellTemplate, _this$props.dataCellTemplate, _this$props.groupOrientation, _this$props.leftVirtualCellWidth, _this$props.rightVirtualCellWidth, _this$props.topVirtualRowHeight, _this$props.viewData, _this$props.width, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return DateTableBody
}(_inferno2.BaseInfernoComponent);
exports.DateTableBody = DateTableBody;
DateTableBody.defaultProps = DateTableBodyProps;
