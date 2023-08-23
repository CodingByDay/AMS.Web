/**
 * DevExtreme (esm/renovation/ui/scheduler/utils/filtering/local.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    AppointmentFilterBaseStrategy,
    AppointmentFilterVirtualStrategy
} from "../../../../../ui/scheduler/appointments/dataProvider/appointmentFilter";
export var getFilterStrategy = (resources, startDayHour, endDayHour, cellDurationInMinutes, showAllDayPanel, supportAllDayRow, firstDayOfWeek, viewType, dateRange, groupCount, loadedResources, isVirtualScrolling, timeZoneCalculator, dataAccessors, viewDataProvider) => {
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
    return isVirtualScrolling ? new AppointmentFilterVirtualStrategy(filterOptions) : new AppointmentFilterBaseStrategy(filterOptions)
};
