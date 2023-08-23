/**
 * DevExtreme (cjs/renovation/ui/scheduler/utils/filtering/local.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getFilterStrategy = void 0;
var _appointmentFilter = require("../../../../../ui/scheduler/appointments/dataProvider/appointmentFilter");
var getFilterStrategy = function(resources, startDayHour, endDayHour, cellDurationInMinutes, showAllDayPanel, supportAllDayRow, firstDayOfWeek, viewType, dateRange, groupCount, loadedResources, isVirtualScrolling, timeZoneCalculator, dataAccessors, viewDataProvider) {
    var filterOptions = {
        resources: resources,
        startDayHour: startDayHour,
        endDayHour: endDayHour,
        appointmentDuration: cellDurationInMinutes,
        showAllDayPanel: showAllDayPanel,
        supportAllDayRow: supportAllDayRow,
        firstDayOfWeek: firstDayOfWeek,
        viewType: viewType,
        viewDirection: "vertical",
        dateRange: dateRange,
        groupCount: groupCount,
        loadedResources: loadedResources,
        isVirtualScrolling: isVirtualScrolling,
        timeZoneCalculator: timeZoneCalculator,
        dataSource: void 0,
        dataAccessors: dataAccessors,
        viewDataProvider: viewDataProvider
    };
    return isVirtualScrolling ? new _appointmentFilter.AppointmentFilterVirtualStrategy(filterOptions) : new _appointmentFilter.AppointmentFilterBaseStrategy(filterOptions)
};
exports.getFilterStrategy = getFilterStrategy;
