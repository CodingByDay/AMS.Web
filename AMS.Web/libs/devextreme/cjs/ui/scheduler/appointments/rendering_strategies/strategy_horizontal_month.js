/**
 * DevExtreme (cjs/ui/scheduler/appointments/rendering_strategies/strategy_horizontal_month.js)
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
exports.default = void 0;
var _strategy_horizontal_month_line = _interopRequireDefault(require("./strategy_horizontal_month_line"));
var _positionHelper = require("../../workspaces/helpers/positionHelper");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));

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
var MONTH_APPOINTMENT_HEIGHT_RATIO = .6;
var MONTH_APPOINTMENT_MIN_OFFSET = 26;
var MONTH_APPOINTMENT_MAX_OFFSET = 30;
var MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET = 36;
var MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET = 60;
var toMs = _date.default.dateToMilliseconds;
var HorizontalMonthRenderingStrategy = function(_HorizontalMonthLineR) {
    _inheritsLoose(HorizontalMonthRenderingStrategy, _HorizontalMonthLineR);

    function HorizontalMonthRenderingStrategy() {
        return _HorizontalMonthLineR.apply(this, arguments) || this
    }
    var _proto = HorizontalMonthRenderingStrategy.prototype;
    _proto._getLeftPosition = function(settings) {
        var fullWeekAppointmentWidth = this.getGroupWidth(settings.groupIndex);
        return this._calculateMultiWeekAppointmentLeftOffset(settings.hMax, fullWeekAppointmentWidth)
    };
    _proto._getChunkCount = function(fullChunksWidth, firstChunkWidth, weekWidth, settings) {
        var groupIndex = settings.groupIndex,
            startDate = settings.info.appointment.startDate;
        var rawFullChunksWidth = fullChunksWidth - firstChunkWidth + weekWidth;
        var allChunksCount = Math.ceil(rawFullChunksWidth / weekWidth);
        var viewRowIndex = this._tryGetRowIndexInView(startDate);
        if (void 0 !== viewRowIndex) {
            var viewChunksCount = this.viewDataProvider.getRowCountInGroup(groupIndex);
            var allowedChunksCount = viewChunksCount - viewRowIndex;
            return allChunksCount <= allowedChunksCount ? allChunksCount : allowedChunksCount
        }
        return allChunksCount
    };
    _proto._tryGetRowIndexInView = function(positionStartDate) {
        var _this$options$dataRan;
        var columnsCount = this.viewDataProvider.getColumnsCount();
        if ((null === (_this$options$dataRan = this.options.dataRange) || void 0 === _this$options$dataRan ? void 0 : _this$options$dataRan.length) < 1 || !columnsCount) {
            return
        }
        var _this$options$dateRan = _slicedToArray(this.options.dateRange, 1),
            startViewDate = _this$options$dateRan[0];
        var dayDurationMs = toMs("day");
        var timeFromStart = positionStartDate.getTime() - startViewDate.getTime();
        return Math.floor(timeFromStart / dayDurationMs / columnsCount)
    };
    _proto._getChunkWidths = function(geometry) {
        var firstChunkWidth = geometry.reducedWidth;
        var fullChunksWidth = Math.floor(geometry.sourceAppointmentWidth);
        var widthWithoutFirstChunk = fullChunksWidth - firstChunkWidth;
        return [firstChunkWidth, fullChunksWidth, widthWithoutFirstChunk]
    };
    _proto._getTailChunkSettings = function(withoutFirstChunkWidth, weekWidth, leftPosition) {
        var tailChunkWidth = withoutFirstChunkWidth % weekWidth || weekWidth;
        var rtlPosition = leftPosition + (weekWidth - tailChunkWidth);
        var tailChunkLeftPosition = this.rtlEnabled ? rtlPosition : leftPosition;
        return [tailChunkWidth, tailChunkLeftPosition]
    };
    _proto._getAppointmentParts = function(geometry, settings) {
        var result = [];
        var weekWidth = Math.round(this.getGroupWidth(settings.groupIndex));
        var _this$_getChunkWidths = this._getChunkWidths(geometry, settings, weekWidth),
            _this$_getChunkWidths2 = _slicedToArray(_this$_getChunkWidths, 3),
            firstChunkWidth = _this$_getChunkWidths2[0],
            fullChunksWidth = _this$_getChunkWidths2[1],
            withoutFirstChunkWidth = _this$_getChunkWidths2[2];
        var leftPosition = this._getLeftPosition(settings);
        var hasTailChunk = this.endViewDate > settings.info.appointment.endDate;
        var chunkCount = this._getChunkCount(fullChunksWidth, firstChunkWidth, weekWidth, settings);
        var _this$_getTailChunkSe = this._getTailChunkSettings(withoutFirstChunkWidth, weekWidth, leftPosition),
            _this$_getTailChunkSe2 = _slicedToArray(_this$_getTailChunkSe, 2),
            tailChunkWidth = _this$_getTailChunkSe2[0],
            tailChunkLeftPosition = _this$_getTailChunkSe2[1];
        for (var chunkIndex = 1; chunkIndex < chunkCount; chunkIndex++) {
            var topPosition = settings.top + this.cellHeight * chunkIndex;
            var isTailChunk = hasTailChunk && chunkIndex === chunkCount - 1;
            result.push(_extends({}, settings, {
                top: topPosition,
                left: isTailChunk ? tailChunkLeftPosition : leftPosition,
                height: geometry.height,
                width: isTailChunk ? tailChunkWidth : weekWidth,
                appointmentReduced: isTailChunk ? "tail" : "body",
                rowIndex: ++settings.rowIndex,
                columnIndex: 0
            }))
        }
        return result
    };
    _proto._calculateMultiWeekAppointmentLeftOffset = function(max, width) {
        return this.rtlEnabled ? max : max - width
    };
    _proto.getGroupWidth = function(groupIndex) {
        return (0, _positionHelper.getGroupWidth)(groupIndex, this.viewDataProvider, {
            intervalCount: this.options.intervalCount,
            currentDate: this.options.currentDate,
            viewType: this.options.viewType,
            hoursInterval: this.options.hoursInterval,
            startDayHour: this.options.startDayHour,
            endDayHour: this.options.endDayHour,
            isVirtualScrolling: this.isVirtualScrolling,
            rtlEnabled: this.rtlEnabled,
            DOMMetaData: this.DOMMetaData
        })
    };
    _proto._getAppointmentDefaultHeight = function() {
        return this._getAppointmentHeightByTheme()
    };
    _proto._getAppointmentMinHeight = function() {
        return this._getAppointmentDefaultHeight()
    };
    _proto._columnCondition = function(a, b) {
        var conditions = this._getConditions(a, b);
        return conditions.rowCondition || conditions.columnCondition || conditions.cellPositionCondition
    };
    _proto.createTaskPositionMap = function(items) {
        return _HorizontalMonthLineR.prototype.createTaskPositionMap.call(this, items, true)
    };
    _proto._getSortedPositions = function(map) {
        return _HorizontalMonthLineR.prototype._getSortedPositions.call(this, map, true)
    };
    _proto._getDefaultRatio = function() {
        return MONTH_APPOINTMENT_HEIGHT_RATIO
    };
    _proto._getOffsets = function() {
        return {
            unlimited: MONTH_APPOINTMENT_MIN_OFFSET,
            auto: MONTH_APPOINTMENT_MAX_OFFSET
        }
    };
    _proto.getDropDownAppointmentWidth = function(intervalCount) {
        if (this.adaptivityEnabled) {
            return this.getDropDownButtonAdaptiveSize()
        }
        var offset = intervalCount > 1 ? MONTH_DROPDOWN_APPOINTMENT_MAX_RIGHT_OFFSET : MONTH_DROPDOWN_APPOINTMENT_MIN_RIGHT_OFFSET;
        return this.cellWidth - offset
    };
    _proto.needCorrectAppointmentDates = function() {
        return false
    };
    _proto._needVerticalGroupBounds = function() {
        return false
    };
    _proto._needHorizontalGroupBounds = function() {
        return true
    };
    _proto.getPositionShift = function(timeShift) {
        return {
            cellPosition: timeShift * this.cellWidth,
            top: 0,
            left: 0
        }
    };
    _createClass(HorizontalMonthRenderingStrategy, [{
        key: "endViewDate",
        get: function() {
            return this.options.endViewDate
        }
    }, {
        key: "adaptivityEnabled",
        get: function() {
            return this.options.adaptivityEnabled
        }
    }, {
        key: "DOMMetaData",
        get: function() {
            return this.options.DOMMetaData
        }
    }]);
    return HorizontalMonthRenderingStrategy
}(_strategy_horizontal_month_line.default);
var _default = HorizontalMonthRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
