/**
 * DevExtreme (cjs/ui/scheduler/appointments/dataProvider/appointmentDataProvider.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.AppointmentDataProvider = void 0;
var _config = _interopRequireDefault(require("../../../../core/config"));
var _appointmentDataSource = require("./appointmentDataSource");
var _appointmentFilter = require("./appointmentFilter");
var _remote = _interopRequireDefault(require("../../../../renovation/ui/scheduler/utils/filtering/remote"));

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
var FilterStrategies = {
    virtual: "virtual",
    standard: "standard"
};
var AppointmentDataProvider = function() {
    function AppointmentDataProvider(options) {
        this.options = options;
        this.dataSource = this.options.dataSource;
        this.dataAccessors = this.options.dataAccessors;
        this.timeZoneCalculator = this.options.timeZoneCalculator;
        this.appointmentDataSource = new _appointmentDataSource.AppointmentDataSource(this.dataSource);
        this.initFilterStrategy()
    }
    var _proto = AppointmentDataProvider.prototype;
    _proto.getFilterStrategy = function() {
        if (!this.filterStrategy || this.filterStrategy.strategyName !== this.filterStrategyName) {
            this.initFilterStrategy()
        }
        return this.filterStrategy
    };
    _proto.initFilterStrategy = function() {
        var filterOptions = {
            resources: this.options.resources,
            dataAccessors: this.dataAccessors,
            startDayHour: this.options.startDayHour,
            endDayHour: this.options.endDayHour,
            showAllDayPanel: this.options.showAllDayPanel,
            timeZoneCalculator: this.options.timeZoneCalculator,
            loadedResources: this.options.getLoadedResources,
            supportAllDayRow: this.options.getSupportAllDayRow,
            viewType: this.options.getViewType,
            viewDirection: this.options.getViewDirection,
            dateRange: this.options.getDateRange,
            groupCount: this.options.getGroupCount,
            viewDataProvider: this.options.getViewDataProvider,
            allDayPanelMode: this.options.allDayPanelMode
        };
        this.filterStrategy = this.filterStrategyName === FilterStrategies.virtual ? new _appointmentFilter.AppointmentFilterVirtualStrategy(filterOptions) : new _appointmentFilter.AppointmentFilterBaseStrategy(filterOptions)
    };
    _proto.setDataSource = function(dataSource) {
        this.dataSource = dataSource;
        this.initFilterStrategy();
        this.appointmentDataSource.setDataSource(this.dataSource)
    };
    _proto.updateDataAccessors = function(dataAccessors) {
        this.dataAccessors = dataAccessors;
        this.initFilterStrategy()
    };
    _proto.filter = function(preparedItems) {
        return this.getFilterStrategy().filter(preparedItems)
    };
    _proto.filterByDate = function(min, max, remoteFiltering, dateSerializationFormat) {
        if (!this.dataSource || !remoteFiltering) {
            return
        }
        var dataSourceFilter = this.dataSource.filter();
        var filter = (0, _remote.default)({
            dataSourceFilter: dataSourceFilter,
            dataAccessors: this.dataAccessors,
            min: min,
            max: max,
            dateSerializationFormat: dateSerializationFormat,
            forceIsoDateParsing: (0, _config.default)().forceIsoDateParsing
        });
        this.dataSource.filter(filter)
    };
    _proto.hasAllDayAppointments = function(filteredItems, preparedItems) {
        return this.getFilterStrategy().hasAllDayAppointments(filteredItems, preparedItems)
    };
    _proto.filterLoadedAppointments = function(filterOption, preparedItems) {
        return this.getFilterStrategy().filterLoadedAppointments(filterOption, preparedItems)
    };
    _proto.calculateAppointmentEndDate = function(isAllDay, startDate) {
        return this.getFilterStrategy().calculateAppointmentEndDate(isAllDay, startDate)
    };
    _proto.cleanState = function() {
        this.appointmentDataSource.cleanState()
    };
    _proto.getUpdatedAppointment = function() {
        return this.appointmentDataSource._updatedAppointment
    };
    _proto.getUpdatedAppointmentKeys = function() {
        return this.appointmentDataSource._updatedAppointmentKeys
    };
    _proto.add = function(rawAppointment) {
        return this.appointmentDataSource.add(rawAppointment)
    };
    _proto.update = function(target, rawAppointment) {
        return this.appointmentDataSource.update(target, rawAppointment)
    };
    _proto.remove = function(rawAppointment) {
        return this.appointmentDataSource.remove(rawAppointment)
    };
    _proto.destroy = function() {
        this.appointmentDataSource.destroy()
    };
    _createClass(AppointmentDataProvider, [{
        key: "keyName",
        get: function() {
            return this.appointmentDataSource.keyName
        }
    }, {
        key: "isDataSourceInit",
        get: function() {
            return !!this.dataSource
        }
    }, {
        key: "filterStrategyName",
        get: function() {
            return this.options.getIsVirtualScrolling() ? FilterStrategies.virtual : FilterStrategies.standard
        }
    }]);
    return AppointmentDataProvider
}();
exports.AppointmentDataProvider = AppointmentDataProvider;
