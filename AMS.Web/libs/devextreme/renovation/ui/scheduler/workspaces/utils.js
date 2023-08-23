/**
 * DevExtreme (renovation/ui/scheduler/workspaces/utils.js)
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
exports.isVerticalGroupingApplied = exports.isHorizontalGroupingApplied = exports.isGroupingByDate = exports.getKeyByGroup = exports.getKeyByDateAndGroup = exports.getIsGroupedAllDayPanel = exports.getGroupCellClasses = exports.addWidthToStyle = exports.addToStyles = exports.addHeightToStyle = void 0;
var _combine_classes = require("../../../utils/combine_classes");
var _consts = require("../consts");

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
var getKeyByDateAndGroup = function(date, groupIndex) {
    var key = date.getTime();
    if (!groupIndex) {
        return key.toString()
    }
    return (key + groupIndex).toString()
};
exports.getKeyByDateAndGroup = getKeyByDateAndGroup;
var getKeyByGroup = function(groupIndex, isVerticalGrouping) {
    if (isVerticalGrouping && !!groupIndex) {
        return groupIndex.toString()
    }
    return "0"
};
exports.getKeyByGroup = getKeyByGroup;
var addToStyles = function(options, style) {
    var nextStyle = null !== style && void 0 !== style ? style : {};
    var result = _extends({}, nextStyle);
    options.forEach((function(_ref) {
        var attr = _ref.attr,
            value = _ref.value;
        result[attr] = value || nextStyle[attr]
    }));
    return result
};
exports.addToStyles = addToStyles;
var addHeightToStyle = function(value, style) {
    var height = value ? "".concat(value, "px") : "";
    return addToStyles([{
        attr: "height",
        value: height
    }], style)
};
exports.addHeightToStyle = addHeightToStyle;
var addWidthToStyle = function(value, style) {
    var width = value ? "".concat(value, "px") : "";
    return addToStyles([{
        attr: "width",
        value: width
    }], style)
};
exports.addWidthToStyle = addWidthToStyle;
var getGroupCellClasses = function() {
    var isFirstGroupCell = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    var isLastGroupCell = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : false;
    var className = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
    return (0, _combine_classes.combineClasses)(_defineProperty({
        "dx-scheduler-first-group-cell": isFirstGroupCell,
        "dx-scheduler-last-group-cell": isLastGroupCell
    }, className, true))
};
exports.getGroupCellClasses = getGroupCellClasses;
var getIsGroupedAllDayPanel = function(hasAllDayRow, isVerticalGrouping) {
    return hasAllDayRow && isVerticalGrouping
};
exports.getIsGroupedAllDayPanel = getIsGroupedAllDayPanel;
var isVerticalGroupingApplied = function(groups, groupOrientation) {
    return groupOrientation === _consts.VERTICAL_GROUP_ORIENTATION && !!groups.length
};
exports.isVerticalGroupingApplied = isVerticalGroupingApplied;
var isHorizontalGroupingApplied = function(groups, groupOrientation) {
    return groupOrientation === _consts.HORIZONTAL_GROUP_ORIENTATION && !!groups.length
};
exports.isHorizontalGroupingApplied = isHorizontalGroupingApplied;
var isGroupingByDate = function(groups, groupOrientation, groupByDate) {
    var isHorizontalGrouping = isHorizontalGroupingApplied(groups, groupOrientation);
    return groupByDate && isHorizontalGrouping
};
exports.isGroupingByDate = isGroupingByDate;
