/**
 * DevExtreme (esm/renovation/ui/scheduler/model/views.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
var _excluded = ["height", "scrolling", "width"];
import {
    isObject,
    isString
} from "../../../../core/utils/type";
var VIEW_TYPES = ["day", "week", "workWeek", "month", "timelineDay", "timelineWeek", "timelineWorkWeek", "timelineMonth", "agenda"];
export var getCurrentView = (currentView, views) => {
    var currentViewProps = views.find(view => {
        var names = isObject(view) ? [view.name, view.type] : [view];
        if (names.includes(currentView)) {
            return true
        }
        return false
    });
    if (void 0 === currentViewProps) {
        if (VIEW_TYPES.includes(currentView)) {
            currentViewProps = currentView
        } else {
            [currentViewProps] = views
        }
    }
    return currentViewProps
};
export var getCurrentViewProps = (currentView, views) => {
    var currentViewProps = getCurrentView(currentView, views);
    return isString(currentViewProps) ? {
        type: currentViewProps
    } : currentViewProps
};
export function getViewConfigProp(schedulerProp, viewProp) {
    return void 0 !== viewProp ? viewProp : schedulerProp
}
export var getCurrentViewConfig = (currentViewProps, schedulerProps, currentDate) => {
    var {
        scrolling: schedulerScrolling
    } = schedulerProps, restSchedulerProps = _objectWithoutPropertiesLoose(schedulerProps, _excluded);
    var {
        scrolling: scrolling
    } = currentViewProps;
    var isVirtualScrolling = "virtual" === schedulerScrolling.mode || "virtual" === (null === scrolling || void 0 === scrolling ? void 0 : scrolling.mode);
    var crossScrollingEnabled = schedulerProps.crossScrollingEnabled || isVirtualScrolling;
    var result = _extends({
        scrolling: schedulerScrolling
    }, restSchedulerProps, currentViewProps, {
        schedulerHeight: schedulerProps.height,
        schedulerWidth: schedulerProps.width,
        crossScrollingEnabled: crossScrollingEnabled,
        appointmentTemplate: currentViewProps.appointmentTemplate || restSchedulerProps.appointmentTemplate,
        dataCellTemplate: currentViewProps.dataCellTemplate || restSchedulerProps.dataCellTemplate,
        dateCellTemplate: currentViewProps.dateCellTemplate || restSchedulerProps.dateCellTemplate,
        timeCellTemplate: currentViewProps.timeCellTemplate || restSchedulerProps.timeCellTemplate,
        resourceCellTemplate: currentViewProps.resourceCellTemplate || restSchedulerProps.resourceCellTemplate,
        appointmentCollectorTemplate: currentViewProps.appointmentCollectorTemplate || restSchedulerProps.appointmentCollectorTemplate,
        appointmentTooltipTemplate: currentViewProps.appointmentTooltipTemplate || restSchedulerProps.appointmentTooltipTemplate,
        allDayPanelMode: currentViewProps.allDayPanelMode || restSchedulerProps.allDayPanelMode
    });
    return _extends({}, result, {
        hoursInterval: result.cellDuration / 60,
        allDayPanelExpanded: true,
        allowMultipleCellSelection: true,
        currentDate: currentDate
    })
};
export var getValidGroups = (schedulerGroups, viewGroups) => getViewConfigProp(schedulerGroups, viewGroups);
