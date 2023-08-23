/**
 * DevExtreme (cjs/ui/scheduler/appointments/dataProvider/appointmentFilter.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.AppointmentFilterVirtualStrategy = exports.AppointmentFilterBaseStrategy = void 0;
var _date = _interopRequireDefault(require("../../../../core/utils/date"));
var _recurrence = require("../../recurrence");
var _array = require("../../../../core/utils/array");
var _iterator = require("../../../../core/utils/iterator");
var _type = require("../../../../core/utils/type");
var _query = _interopRequireDefault(require("../../../../data/query"));
var _appointmentAdapter = require("../../appointmentAdapter");
var _hasResourceValue = require("../../../../renovation/ui/scheduler/resources/hasResourceValue");
var _base = require("../../../../renovation/ui/scheduler/view_model/to_test/views/utils/base");
var _utils = require("../../resources/utils");
var _utils2 = require("./utils");
var _getDatesWithoutTime5 = _interopRequireDefault(require("../../../../renovation/ui/scheduler/utils/filtering/getDatesWithoutTime"));
var _getAppointmentTakesAllDay = require("../../../../renovation/ui/scheduler/appointment/utils/getAppointmentTakesAllDay");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

function _typeof(obj) {
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj) {
        return typeof obj
    } : function(obj) {
        return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
    }, _typeof(obj)
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
var toMs = _date.default.dateToMilliseconds;
var FilterStrategies = {
    virtual: "virtual",
    standard: "standard"
};
var AppointmentFilterBaseStrategy = function() {
    function AppointmentFilterBaseStrategy(options) {
        this.options = options;
        this.dataAccessors = this.options.dataAccessors;
        this._init()
    }
    var _proto = AppointmentFilterBaseStrategy.prototype;
    _proto._resolveOption = function(name) {
        var result = this.options[name];
        return "function" === typeof result ? result() : result
    };
    _proto._init = function() {
        this.setDataAccessors(this.dataAccessors)
    };
    _proto.filter = function(preparedItems) {
        var dateRange = this.dateRange;
        var allDay;
        if (!this.showAllDayPanel && this.supportAllDayRow) {
            allDay = false
        }
        return this.filterLoadedAppointments({
            startDayHour: this.viewStartDayHour,
            endDayHour: this.viewEndDayHour,
            viewStartDayHour: this.viewStartDayHour,
            viewEndDayHour: this.viewEndDayHour,
            min: dateRange[0],
            max: dateRange[1],
            resources: this.loadedResources,
            allDay: allDay,
            supportMultiDayAppointments: (0, _base.isTimelineView)(this.viewType),
            firstDayOfWeek: this.firstDayOfWeek
        }, preparedItems)
    };
    _proto.hasAllDayAppointments = function(filteredItems, preparedItems) {
        var _this = this;
        var adapters = filteredItems.map((function(item) {
            return (0, _appointmentAdapter.createAppointmentAdapter)(item, _this.dataAccessors, _this.timeZoneCalculator)
        }));
        var result = false;
        (0, _iterator.each)(adapters, (function(_, item) {
            if ((0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(item, _this.viewStartDayHour, _this.viewEndDayHour, _this.allDayPanelMode)) {
                result = true;
                return false
            }
        }));
        return result
    };
    _proto.setDataAccessors = function(dataAccessors) {
        this.dataAccessors = dataAccessors
    };
    _proto._createAllDayAppointmentFilter = function(filterOptions) {
        var _this2 = this;
        var viewStartDayHour = filterOptions.viewStartDayHour,
            viewEndDayHour = filterOptions.viewEndDayHour;
        return [
            [function(appointment) {
                return (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(appointment, viewStartDayHour, viewEndDayHour, _this2.allDayPanelMode)
            }]
        ]
    };
    _proto._createCombinedFilter = function(filterOptions) {
        var _this3 = this;
        var min = new Date(filterOptions.min);
        var max = new Date(filterOptions.max);
        var startDayHour = filterOptions.startDayHour,
            endDayHour = filterOptions.endDayHour,
            viewStartDayHour = filterOptions.viewStartDayHour,
            viewEndDayHour = filterOptions.viewEndDayHour,
            resources = filterOptions.resources,
            firstDayOfWeek = filterOptions.firstDayOfWeek,
            checkIntersectViewport = filterOptions.checkIntersectViewport,
            supportMultiDayAppointments = filterOptions.supportMultiDayAppointments;
        var _getDatesWithoutTime = (0, _getDatesWithoutTime5.default)(min, max),
            _getDatesWithoutTime2 = _slicedToArray(_getDatesWithoutTime, 2),
            trimMin = _getDatesWithoutTime2[0],
            trimMax = _getDatesWithoutTime2[1];
        var useRecurrence = (0, _type.isDefined)(this.dataAccessors.getter.recurrenceRule);
        return [
            [function(appointment) {
                var _appointment$visible;
                var appointmentVisible = null !== (_appointment$visible = appointment.visible) && void 0 !== _appointment$visible ? _appointment$visible : true;
                if (!appointmentVisible) {
                    return false
                }
                var startDate = appointment.startDate,
                    endDate = appointment.endDate,
                    hasRecurrenceRule = appointment.hasRecurrenceRule;
                if (!hasRecurrenceRule) {
                    if (!(endDate >= trimMin && startDate < trimMax || _date.default.sameDate(endDate, trimMin) && _date.default.sameDate(startDate, trimMin))) {
                        return false
                    }
                }
                var appointmentTakesAllDay = (0, _getAppointmentTakesAllDay.getAppointmentTakesAllDay)(appointment, viewStartDayHour, viewEndDayHour, _this3.allDayPanelMode);
                var appointmentTakesSeveralDays = (0, _utils2.getAppointmentTakesSeveralDays)(appointment);
                var isAllDay = appointment.allDay;
                var isLongAppointment = appointmentTakesSeveralDays || appointmentTakesAllDay;
                if (null !== resources && void 0 !== resources && resources.length && !_this3._filterAppointmentByResources(appointment.rawAppointment, resources)) {
                    return false
                }
                if (appointmentTakesAllDay && false === filterOptions.allDay) {
                    return false
                }
                if (hasRecurrenceRule) {
                    var recurrenceException = (0, _utils2.getRecurrenceException)(appointment, _this3.timeZoneCalculator, _this3.timezone);
                    if (!_this3._filterAppointmentByRRule(_extends({}, appointment, {
                            recurrenceException: recurrenceException,
                            allDay: appointmentTakesAllDay
                        }), min, max, startDayHour, endDayHour, firstDayOfWeek)) {
                        return false
                    }
                }
                if (!isAllDay && supportMultiDayAppointments && isLongAppointment) {
                    if (endDate < min && (!useRecurrence || useRecurrence && !hasRecurrenceRule)) {
                        return false
                    }
                }
                if ((0, _type.isDefined)(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
                    if (!(0, _utils2.compareDateWithStartDayHour)(startDate, endDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays)) {
                        return false
                    }
                }
                if ((0, _type.isDefined)(endDayHour)) {
                    if (!(0, _utils2.compareDateWithEndDayHour)({
                            startDate: startDate,
                            endDate: endDate,
                            startDayHour: startDayHour,
                            endDayHour: endDayHour,
                            viewStartDayHour: viewStartDayHour,
                            viewEndDayHour: viewEndDayHour,
                            allDay: appointmentTakesAllDay,
                            severalDays: appointmentTakesSeveralDays,
                            min: min,
                            max: max,
                            checkIntersectViewport: checkIntersectViewport
                        })) {
                        return false
                    }
                }
                if (!isAllDay && (!isLongAppointment || supportMultiDayAppointments)) {
                    if (endDate < min && useRecurrence && !hasRecurrenceRule) {
                        return false
                    }
                }
                return true
            }]
        ]
    };
    _proto._createAppointmentFilter = function(filterOptions) {
        return this._createCombinedFilter(filterOptions)
    };
    _proto._filterAppointmentByResources = function(appointment, resources) {
        var _this4 = this;
        var checkAppointmentResourceValues = function(resourceName, resourceIndex) {
            var resourceGetter = _this4.dataAccessors.resources.getter[resourceName];
            var resource;
            if ((0, _type.isFunction)(resourceGetter)) {
                resource = resourceGetter(appointment)
            }
            var appointmentResourceValues = (0, _array.wrapToArray)(resource);
            var resourceData = (0, _iterator.map)(resources[resourceIndex].items, (function(_ref) {
                var id = _ref.id;
                return id
            }));
            for (var i = 0; i < appointmentResourceValues.length; i++) {
                if ((0, _hasResourceValue.hasResourceValue)(resourceData, appointmentResourceValues[i])) {
                    return true
                }
            }
            return false
        };
        var result = false;
        for (var i = 0; i < resources.length; i++) {
            var resourceName = resources[i].name;
            result = checkAppointmentResourceValues(resourceName, i);
            if (!result) {
                return false
            }
        }
        return result
    };
    _proto._filterAppointmentByRRule = function(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
        var recurrenceRule = appointment.recurrenceRule;
        var recurrenceException = appointment.recurrenceException;
        var allDay = appointment.allDay;
        var result = true;
        var appointmentStartDate = appointment.startDate;
        var appointmentEndDate = appointment.endDate;
        var recurrenceProcessor = (0, _recurrence.getRecurrenceProcessor)();
        if (allDay || (0, _utils2._appointmentPartInInterval)(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
            var _getDatesWithoutTime3 = (0, _getDatesWithoutTime5.default)(min, max),
                _getDatesWithoutTime4 = _slicedToArray(_getDatesWithoutTime3, 2),
                trimMin = _getDatesWithoutTime4[0],
                trimMax = _getDatesWithoutTime4[1];
            min = trimMin;
            max = new Date(trimMax.getTime() - toMs("minute"))
        }
        if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
            result = appointmentEndDate > min && appointmentStartDate <= max
        }
        if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
            result = recurrenceProcessor.hasRecurrence({
                rule: recurrenceRule,
                exception: recurrenceException,
                start: appointmentStartDate,
                end: appointmentEndDate,
                min: min,
                max: max,
                firstDayOfWeek: firstDayOfWeek,
                appointmentTimezoneOffset: this.timeZoneCalculator.getOriginStartDateOffsetInMs(appointmentStartDate, appointment.startDateTimeZone, false)
            })
        }
        return result
    };
    _proto.filterLoadedAppointments = function(filterOptions, preparedItems) {
        var filteredItems = this.filterPreparedItems(filterOptions, preparedItems);
        return filteredItems.map((function(_ref2) {
            var rawAppointment = _ref2.rawAppointment;
            return rawAppointment
        }))
    };
    _proto.filterPreparedItems = function(filterOptions, preparedItems) {
        var combinedFilter = this._createAppointmentFilter(filterOptions);
        return (0, _query.default)(preparedItems).filter(combinedFilter).toArray()
    };
    _proto.filterAllDayAppointments = function(filterOptions, preparedItems) {
        var combinedFilter = this._createAllDayAppointmentFilter(filterOptions);
        return (0, _query.default)(preparedItems).filter(combinedFilter).toArray().map((function(_ref3) {
            var rawAppointment = _ref3.rawAppointment;
            return rawAppointment
        }))
    };
    _createClass(AppointmentFilterBaseStrategy, [{
        key: "strategyName",
        get: function() {
            return FilterStrategies.standard
        }
    }, {
        key: "timeZoneCalculator",
        get: function() {
            return this.options.timeZoneCalculator
        }
    }, {
        key: "viewStartDayHour",
        get: function() {
            return this.options.startDayHour
        }
    }, {
        key: "viewEndDayHour",
        get: function() {
            return this.options.endDayHour
        }
    }, {
        key: "timezone",
        get: function() {
            return this.options.timezone
        }
    }, {
        key: "firstDayOfWeek",
        get: function() {
            return this.options.firstDayOfWeek
        }
    }, {
        key: "showAllDayPanel",
        get: function() {
            return this.options.showAllDayPanel
        }
    }, {
        key: "loadedResources",
        get: function() {
            return this._resolveOption("loadedResources")
        }
    }, {
        key: "supportAllDayRow",
        get: function() {
            return this._resolveOption("supportAllDayRow")
        }
    }, {
        key: "viewType",
        get: function() {
            return this._resolveOption("viewType")
        }
    }, {
        key: "viewDirection",
        get: function() {
            return this._resolveOption("viewDirection")
        }
    }, {
        key: "dateRange",
        get: function() {
            return this._resolveOption("dateRange")
        }
    }, {
        key: "groupCount",
        get: function() {
            return this._resolveOption("groupCount")
        }
    }, {
        key: "viewDataProvider",
        get: function() {
            return this._resolveOption("viewDataProvider")
        }
    }, {
        key: "allDayPanelMode",
        get: function() {
            return this._resolveOption("allDayPanelMode")
        }
    }]);
    return AppointmentFilterBaseStrategy
}();
exports.AppointmentFilterBaseStrategy = AppointmentFilterBaseStrategy;
var AppointmentFilterVirtualStrategy = function(_AppointmentFilterBas) {
    _inheritsLoose(AppointmentFilterVirtualStrategy, _AppointmentFilterBas);

    function AppointmentFilterVirtualStrategy() {
        return _AppointmentFilterBas.apply(this, arguments) || this
    }
    var _proto2 = AppointmentFilterVirtualStrategy.prototype;
    _proto2.filter = function(preparedItems) {
        var _this5 = this;
        var hourMs = toMs("hour");
        var isCalculateStartAndEndDayHour = (0, _base.isDateAndTimeView)(this.viewType);
        var checkIntersectViewport = isCalculateStartAndEndDayHour && "horizontal" === this.viewDirection;
        var isAllDayWorkspace = !this.supportAllDayRow;
        var showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
        var endViewDate = this.viewDataProvider.getLastViewDateByEndDayHour(this.viewEndDayHour);
        var filterOptions = [];
        var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
        groupsInfo.forEach((function(item) {
            var groupIndex = item.groupIndex;
            var groupStartDate = item.startDate;
            var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
            var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : _this5.viewStartDayHour;
            var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / hourMs : _this5.viewEndDayHour;
            var resources = _this5._getPrerenderFilterResources(groupIndex);
            var hasAllDayPanel = _this5.viewDataProvider.hasGroupAllDayPanel(groupIndex);
            var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && hasAllDayPanel;
            filterOptions.push({
                isVirtualScrolling: true,
                startDayHour: startDayHour,
                endDayHour: endDayHour,
                viewStartDayHour: _this5.viewStartDayHour,
                viewEndDayHour: _this5.viewEndDayHour,
                min: groupStartDate,
                max: groupEndDate,
                supportMultiDayAppointments: (0, _base.isTimelineView)(_this5.viewType),
                allDay: supportAllDayAppointment,
                resources: resources,
                firstDayOfWeek: _this5.firstDayOfWeek,
                checkIntersectViewport: checkIntersectViewport
            })
        }));
        return this.filterLoadedAppointments({
            filterOptions: filterOptions,
            groupCount: this.groupCount
        }, preparedItems)
    };
    _proto2.filterPreparedItems = function(_ref4, preparedItems) {
        var _this6 = this;
        var filterOptions = _ref4.filterOptions,
            groupCount = _ref4.groupCount;
        var combinedFilters = [];
        var itemsToFilter = preparedItems;
        var needPreFilter = groupCount > 0;
        if (needPreFilter) {
            itemsToFilter = itemsToFilter.filter((function(_ref5) {
                var rawAppointment = _ref5.rawAppointment;
                for (var i = 0; i < filterOptions.length; ++i) {
                    var resources = filterOptions[i].resources;
                    if (_this6._filterAppointmentByResources(rawAppointment, resources)) {
                        return true
                    }
                }
            }))
        }
        filterOptions.forEach((function(option) {
            combinedFilters.length && combinedFilters.push("or");
            var filter = _this6._createAppointmentFilter(option);
            combinedFilters.push(filter)
        }));
        return (0, _query.default)(itemsToFilter).filter(combinedFilters).toArray()
    };
    _proto2.hasAllDayAppointments = function(adapters, preparedItems) {
        return this.filterAllDayAppointments({
            viewStartDayHour: this.viewStartDayHour,
            viewEndDayHour: this.viewEndDayHour
        }, preparedItems).length > 0
    };
    _proto2._getPrerenderFilterResources = function(groupIndex) {
        var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
        return (0, _utils.getResourcesDataByGroups)(this.loadedResources, this.resources, [cellGroup])
    };
    _createClass(AppointmentFilterVirtualStrategy, [{
        key: "strategyName",
        get: function() {
            return FilterStrategies.virtual
        }
    }, {
        key: "resources",
        get: function() {
            return this.options.resources
        }
    }]);
    return AppointmentFilterVirtualStrategy
}(AppointmentFilterBaseStrategy);
exports.AppointmentFilterVirtualStrategy = AppointmentFilterVirtualStrategy;
