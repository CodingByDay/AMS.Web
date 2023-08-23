/**
 * DevExtreme (cjs/ui/scheduler/appointments/rendering_strategies/strategy_vertical.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _strategy = _interopRequireDefault(require("./strategy.base"));
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _utils = _interopRequireDefault(require("../../utils.timeZone"));
var _expressionUtils = require("../../expressionUtils");
var _appointmentAdapter = require("../../appointmentAdapter");
var _getSkippedHoursInRange = _interopRequireDefault(require("../../../../renovation/ui/scheduler/view_model/appointments/utils/getSkippedHoursInRange"));
var _getAppointmentTakesAllDay = require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");
var _math = require("../../../../core/utils/math");

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
var ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET = 5;
var ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET = 20;
var toMs = _date.default.dateToMilliseconds;
var VerticalRenderingStrategy = function(_BaseAppointmentsStra) {
    _inheritsLoose(VerticalRenderingStrategy, _BaseAppointmentsStra);

    function VerticalRenderingStrategy() {
        return _BaseAppointmentsStra.apply(this, arguments) || this
    }
    var _proto = VerticalRenderingStrategy.prototype;
    _proto.getDeltaTime = function(args, initialSize, appointment) {
        var deltaTime = 0;
        if (this.isAllDay(appointment)) {
            deltaTime = this._getDeltaWidth(args, initialSize) * toMs("day")
        } else {
            var deltaHeight = args.height - initialSize.height;
            deltaTime = toMs("minute") * Math.round(deltaHeight / this.cellHeight * this.cellDurationInMinutes)
        }
        return deltaTime
    };
    _proto._correctCollectorCoordinatesInAdaptive = function(coordinates, isAllDay) {
        if (isAllDay) {
            _BaseAppointmentsStra.prototype._correctCollectorCoordinatesInAdaptive.call(this, coordinates, isAllDay)
        } else if (0 === this._getMaxAppointmentCountPerCellByType()) {
            var cellHeight = this.cellHeight;
            var cellWidth = this.cellWidth;
            coordinates.top += (cellHeight - this.getDropDownButtonAdaptiveSize()) / 2;
            coordinates.left += (cellWidth - this.getDropDownButtonAdaptiveSize()) / 2
        }
    };
    _proto.getAppointmentGeometry = function(coordinates) {
        var geometry = null;
        if (coordinates.allDay) {
            geometry = this._getAllDayAppointmentGeometry(coordinates)
        } else {
            geometry = this.isAdaptive && coordinates.isCompact ? this._getAdaptiveGeometry(coordinates) : this._getVerticalAppointmentGeometry(coordinates)
        }
        return _BaseAppointmentsStra.prototype.getAppointmentGeometry.call(this, geometry)
    };
    _proto._getAdaptiveGeometry = function(coordinates) {
        var config = this._calculateGeometryConfig(coordinates);
        return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset)
    };
    _proto._getItemPosition = function(appointment) {
        var allDay = this.isAllDay(appointment);
        if (allDay) {
            return _BaseAppointmentsStra.prototype._getItemPosition.call(this, appointment)
        }
        var adapter = (0, _appointmentAdapter.createAppointmentAdapter)(appointment, this.dataAccessors, this.timeZoneCalculator);
        var isRecurring = !!adapter.recurrenceRule;
        var appointmentStartDate = adapter.calculateStartDate("toGrid");
        var appointmentEndDate = adapter.calculateEndDate("toGrid");
        var appointmentDuration = appointmentEndDate - appointmentStartDate;
        var appointmentBeginInCurrentView = this.options.startViewDate < appointmentStartDate;
        var isAppointmentTakesSeveralDays = !_utils.default.isSameAppointmentDates(appointmentStartDate, appointmentEndDate);
        var settings = this.generateAppointmentSettings(appointment);
        var result = [];
        for (var j = 0; j < settings.length; j++) {
            var currentSetting = settings[j];
            var height = this.calculateAppointmentHeight(appointment, currentSetting);
            var width = this.calculateAppointmentWidth(appointment, currentSetting);
            var resultHeight = height;
            var appointmentReduced = null;
            var multiDaysAppointmentParts = [];
            var currentMaxAllowedPosition = currentSetting.vMax;
            if (this._isMultiViewAppointment(currentSetting, height) || isAppointmentTakesSeveralDays && !isRecurring) {
                var trimmedStartDate = _date.default.trimTime(appointmentStartDate);
                var trimmedSettingStartDate = _date.default.trimTime(currentSetting.info.appointment.startDate);
                var reduceHead = trimmedStartDate <= trimmedSettingStartDate || isRecurring;
                if (reduceHead) {
                    resultHeight = this._reduceMultiDayAppointment(height, {
                        top: currentSetting.top,
                        bottom: currentMaxAllowedPosition
                    });
                    multiDaysAppointmentParts = this._getAppointmentParts({
                        sourceAppointmentHeight: height,
                        reducedHeight: resultHeight,
                        width: width
                    }, currentSetting)
                }
                var _currentSetting$info$ = currentSetting.info.appointment,
                    currentSettingStartDate = _currentSetting$info$.startDate,
                    currentSettingNormalizedEndDate = _currentSetting$info$.normalizedEndDate;
                var currentSettingDuration = currentSettingNormalizedEndDate - currentSettingStartDate;
                var hasNextParts = currentSettingDuration < appointmentDuration;
                appointmentReduced = hasNextParts ? appointmentBeginInCurrentView ? "head" : "body" : appointmentBeginInCurrentView ? "head" : "tail"
            }(0, _extend.extend)(currentSetting, {
                height: resultHeight,
                width: width,
                allDay: allDay,
                appointmentReduced: appointmentReduced
            });
            result = this._getAppointmentPartsPosition(multiDaysAppointmentParts, currentSetting, result)
        }
        return result
    };
    _proto._isMultiViewAppointment = function(_ref, height) {
        var vMax = _ref.vMax,
            top = _ref.top;
        var fullAppointmentHeight = (0, _math.roundFloatPart)(height, 2);
        var remainingHeight = (0, _math.roundFloatPart)(vMax - top, 2);
        return fullAppointmentHeight > remainingHeight
    };
    _proto._reduceMultiDayAppointment = function(sourceAppointmentHeight, bound) {
        return Math.min(sourceAppointmentHeight, bound.bottom - Math.floor(bound.top))
    };
    _proto._getGroupHeight = function() {
        return this.cellHeight * this.rowCount
    };
    _proto._getGroupTopOffset = function(appointmentSettings) {
        var groupIndex = appointmentSettings.groupIndex;
        var groupTop = Math.max(0, this.positionHelper.getGroupTop({
            groupIndex: groupIndex,
            showAllDayPanel: this.showAllDayPanel,
            isGroupedAllDayPanel: this.isGroupedAllDayPanel
        }));
        var allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
            groupIndex: groupIndex,
            supportAllDayRow: this.allDaySupported(),
            showAllDayPanel: this.showAllDayPanel
        });
        var appointmentGroupTopOffset = appointmentSettings.top - groupTop - allDayPanelOffset;
        return appointmentGroupTopOffset
    };
    _proto._getTailHeight = function(appointmentGeometry, appointmentSettings) {
        if (!this.isVirtualScrolling) {
            return appointmentGeometry.sourceAppointmentHeight - appointmentGeometry.reducedHeight
        }
        var appointmentGroupTopOffset = this._getGroupTopOffset(appointmentSettings);
        var sourceAppointmentHeight = appointmentGeometry.sourceAppointmentHeight;
        var groupHeight = this._getGroupHeight();
        var tailHeight = appointmentGroupTopOffset + sourceAppointmentHeight - groupHeight;
        return tailHeight
    };
    _proto._getAppointmentParts = function(appointmentGeometry, appointmentSettings) {
        var width = appointmentGeometry.width;
        var result = [];
        var currentPartTop = Math.max(0, this.positionHelper.getGroupTop({
            groupIndex: appointmentSettings.groupIndex,
            showAllDayPanel: this.showAllDayPanel,
            isGroupedAllDayPanel: this.isGroupedAllDayPanel
        }));
        var cellsDiff = this.isGroupedByDate ? this.groupCount : 1;
        var offset = this.cellWidth * cellsDiff;
        var allDayPanelOffset = this.positionHelper.getOffsetByAllDayPanel({
            groupIndex: appointmentSettings.groupIndex,
            supportAllDayRow: this.allDaySupported(),
            showAllDayPanel: this.showAllDayPanel
        });
        currentPartTop += allDayPanelOffset;
        var minHeight = this.getAppointmentMinSize();
        var vMax = appointmentSettings.vMax,
            hMax = appointmentSettings.hMax;
        var hasTailPart = this.options.endViewDate > appointmentSettings.info.appointment.endDate;
        var left = Math.round(appointmentSettings.left + offset);
        var tailHeight = this._getTailHeight(appointmentGeometry, appointmentSettings);
        while (tailHeight > 0 && left < hMax) {
            tailHeight = Math.max(minHeight, tailHeight);
            var columnIndex = appointmentSettings.columnIndex + cellsDiff;
            var height = Math.min(tailHeight, vMax);
            result.push(_extends({}, appointmentSettings, {
                top: currentPartTop,
                left: left,
                height: height,
                width: width,
                appointmentReduced: "body",
                rowIndex: 0,
                columnIndex: columnIndex
            }));
            left += offset;
            tailHeight -= vMax
        }
        if (hasTailPart && result.length > 0) {
            result[result.length - 1].appointmentReduced = "tail"
        }
        return result
    };
    _proto._getMinuteHeight = function() {
        return this.cellHeight / this.cellDurationInMinutes
    };
    _proto._getCompactLeftCoordinate = function(itemLeft, index) {
        var cellWidth = this.cellWidth || this.getAppointmentMinSize();
        return itemLeft + (1 + cellWidth) * index
    };
    _proto._getVerticalAppointmentGeometry = function(coordinates) {
        var config = this._calculateVerticalGeometryConfig(coordinates);
        return this._customizeVerticalCoordinates(coordinates, config.width, config.appointmentCountPerCell, config.offset)
    };
    _proto._customizeVerticalCoordinates = function(coordinates, width, appointmentCountPerCell, topOffset, isAllDay) {
        var appointmentWidth = Math.max(width / appointmentCountPerCell, width / coordinates.count);
        var height = coordinates.height;
        var appointmentLeft = coordinates.left + coordinates.index * appointmentWidth;
        var top = coordinates.top;
        if (coordinates.isCompact) {
            this._markAppointmentAsVirtual(coordinates, isAllDay)
        }
        return {
            height: height,
            width: appointmentWidth,
            top: top,
            left: appointmentLeft,
            empty: this._isAppointmentEmpty(height, width)
        }
    };
    _proto._calculateVerticalGeometryConfig = function(coordinates) {
        var overlappingMode = this.maxAppointmentsPerCell;
        var offsets = this._getOffsets();
        var appointmentDefaultOffset = this._getAppointmentDefaultOffset();
        var appointmentCountPerCell = this._getAppointmentCount(overlappingMode, coordinates);
        var ratio = this._getDefaultRatio(coordinates, appointmentCountPerCell);
        var maxWidth = this._getMaxWidth();
        if (!appointmentCountPerCell) {
            appointmentCountPerCell = coordinates.count;
            ratio = (maxWidth - offsets.unlimited) / maxWidth
        }
        var topOffset = (1 - ratio) * maxWidth;
        if ("auto" === overlappingMode || (0, _type.isNumeric)(overlappingMode)) {
            ratio = 1;
            maxWidth -= appointmentDefaultOffset;
            topOffset = 0
        }
        return {
            width: ratio * maxWidth,
            appointmentCountPerCell: appointmentCountPerCell,
            offset: topOffset
        }
    };
    _proto._getMaxWidth = function() {
        return this.cellWidth
    };
    _proto.isAllDay = function(appointmentData) {
        return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)((0, _appointmentAdapter.createAppointmentAdapter)(appointmentData, this.dataAccessors, this.timeZoneCalculator), this.startDayHour, this.endDayHour, this.allDayPanelMode)
    };
    _proto._getAppointmentMaxWidth = function() {
        return this.cellWidth - this._getAppointmentDefaultOffset()
    };
    _proto.calculateAppointmentWidth = function(appointment, position) {
        if (!this.isAllDay(appointment)) {
            return 0
        }
        var startDate = _date.default.trimTime(position.info.appointment.startDate);
        var normalizedEndDate = position.info.appointment.normalizedEndDate;
        var cellWidth = this.cellWidth || this.getAppointmentMinSize();
        var durationInHours = (normalizedEndDate.getTime() - startDate.getTime()) / toMs("hour");
        var skippedHours = (0, _getSkippedHoursInRange.default)(position.info.appointment.startDate, position.info.appointment.endDate, this.viewDataProvider);
        var width = Math.ceil((durationInHours - skippedHours) / 24) * cellWidth;
        width = this.cropAppointmentWidth(width, cellWidth);
        return width
    };
    _proto.calculateAppointmentHeight = function(appointment, position) {
        if (this.isAllDay(appointment)) {
            return 0
        }
        var startDate = position.info.appointment.startDate;
        var normalizedEndDate = position.info.appointment.normalizedEndDate;
        var allDay = _expressionUtils.ExpressionUtils.getField(this.dataAccessors, "allDay", appointment);
        var duration = this.getAppointmentDurationInMs(startDate, normalizedEndDate, allDay);
        var durationInMinutes = this._adjustDurationByDaylightDiff(duration, startDate, normalizedEndDate) / toMs("minute");
        var height = durationInMinutes * this._getMinuteHeight();
        return height
    };
    _proto.getDirection = function() {
        return "vertical"
    };
    _proto._sortCondition = function(a, b) {
        var allDayCondition = a.allDay - b.allDay;
        var isAllDay = a.allDay && b.allDay;
        var condition = "vertical" === this.groupOrientation && isAllDay ? this._columnCondition(a, b) : this._rowCondition(a, b);
        return allDayCondition ? allDayCondition : condition
    };
    _proto.allDaySupported = function() {
        return true
    };
    _proto._getAllDayAppointmentGeometry = function(coordinates) {
        var config = this._calculateGeometryConfig(coordinates);
        return this._customizeCoordinates(coordinates, config.height, config.appointmentCountPerCell, config.offset, true)
    };
    _proto._calculateGeometryConfig = function(coordinates) {
        if (!this.allowResizing || !this.allowAllDayResizing) {
            coordinates.skipResizing = true
        }
        var config = _BaseAppointmentsStra.prototype._calculateGeometryConfig.call(this, coordinates);
        var minAppointmentCountPerCell = Math.min(config.appointmentCountPerCell, this._getDynamicAppointmentCountPerCell().allDay);
        if (coordinates.allDay && coordinates.count <= minAppointmentCountPerCell) {
            config.offset = 0
        }
        return config
    };
    _proto._getAppointmentCount = function(overlappingMode, coordinates) {
        return "auto" !== overlappingMode && 1 === coordinates.count && !(0, _type.isNumeric)(overlappingMode) ? coordinates.count : this._getMaxAppointmentCountPerCellByType(coordinates.allDay)
    };
    _proto._getDefaultRatio = function(coordinates, appointmentCountPerCell) {
        return coordinates.count > this.appointmentCountPerCell ? .65 : 1
    };
    _proto._getOffsets = function() {
        return {
            unlimited: ALLDAY_APPOINTMENT_MIN_VERTICAL_OFFSET,
            auto: ALLDAY_APPOINTMENT_MAX_VERTICAL_OFFSET
        }
    };
    _proto._getMaxHeight = function() {
        return this.allDayHeight || this.getAppointmentMinSize()
    };
    _proto._needVerticalGroupBounds = function(allDay) {
        return !allDay
    };
    _proto._needHorizontalGroupBounds = function() {
        return false
    };
    _proto.getPositionShift = function(timeShift, isAllDay) {
        if (!isAllDay && this.isAdaptive && 0 === this._getMaxAppointmentCountPerCellByType(isAllDay)) {
            return {
                top: 0,
                left: 0,
                cellPosition: 0
            }
        }
        return _BaseAppointmentsStra.prototype.getPositionShift.call(this, timeShift, isAllDay)
    };
    return VerticalRenderingStrategy
}(_strategy.default);
var _default = VerticalRenderingStrategy;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
