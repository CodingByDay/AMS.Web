/**
 * DevExtreme (esm/ui/scheduler/appointments/resizing/core.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import _extends from "@babel/runtime/helpers/esm/extends";
import {
    normalizeStartDate,
    normalizeEndDate
} from "./utils";
var getAppointmentLeftCell = options => {
    var {
        cellHeight: cellHeight,
        cellWidth: cellWidth,
        viewDataProvider: viewDataProvider,
        relativeAppointmentRect: relativeAppointmentRect,
        appointmentSettings: appointmentSettings,
        rtlEnabled: rtlEnabled
    } = options;
    var cellRowIndex = Math.floor(relativeAppointmentRect.top / cellHeight);
    var cellColumnIndex = Math.round(relativeAppointmentRect.left / cellWidth);
    var leftCell = viewDataProvider.getCellData(cellRowIndex, cellColumnIndex, appointmentSettings.allDay, rtlEnabled);
    return leftCell
};
var getDateRangeHorizontal = options => {
    var {
        cellWidth: cellWidth,
        cellCountInRow: cellCountInRow,
        relativeAppointmentRect: relativeAppointmentRect,
        viewDataProvider: viewDataProvider,
        appointmentSettings: appointmentSettings,
        handles: handles
    } = options;
    var appointmentFirstCell = getAppointmentLeftCell(options);
    var appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
    var appointmentLastCellIndex = appointmentFirstCell.index + (appointmentCellsAmount - 1);
    var {
        allDay: allDay,
        sourceAppointment: sourceAppointment
    } = appointmentSettings.info;
    if (handles.left) {
        var startDate = normalizeStartDate(options, appointmentFirstCell.startDate, sourceAppointment.startDate);
        return {
            startDate: startDate,
            endDate: sourceAppointment.endDate
        }
    }
    var appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
    var appointmentColumnIndex = appointmentLastCellIndex % cellCountInRow;
    var appointmentLastCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentColumnIndex, allDay);
    var endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
    endDate = normalizeEndDate(options, endDate, sourceAppointment.endDate);
    return {
        startDate: sourceAppointment.startDate,
        endDate: endDate
    }
};
var getDateRangeHorizontalRTL = options => {
    var {
        viewDataProvider: viewDataProvider,
        cellCountInRow: cellCountInRow,
        appointmentSettings: appointmentSettings,
        handles: handles,
        cellWidth: cellWidth,
        relativeAppointmentRect: relativeAppointmentRect
    } = options;
    var appointmentLastCell = getAppointmentLeftCell(options);
    var {
        allDay: allDay,
        sourceAppointment: sourceAppointment
    } = appointmentSettings.info;
    if (handles.right) {
        var appointmentLastCellIndex = appointmentLastCell.index;
        var appointmentCellsAmount = Math.round(relativeAppointmentRect.width / cellWidth);
        var appointmentFirstCellIndex = appointmentLastCellIndex - appointmentCellsAmount + 1;
        var appointmentRowIndex = Math.floor(appointmentLastCellIndex / cellCountInRow);
        var appointmentFirstCell = viewDataProvider.getCellData(appointmentRowIndex, appointmentFirstCellIndex, allDay, true);
        var startDate = normalizeStartDate(options, appointmentFirstCell.startDate, sourceAppointment.endDate);
        return {
            startDate: startDate,
            endDate: sourceAppointment.endDate
        }
    }
    var endDate = !options.considerTime ? appointmentLastCell.endDate : appointmentLastCell.startDate;
    endDate = normalizeEndDate(options, endDate, sourceAppointment.endDate);
    return {
        startDate: sourceAppointment.startDate,
        endDate: endDate
    }
};
var getRelativeAppointmentRect = (appointmentRect, parentAppointmentRect) => {
    var left = appointmentRect.left - parentAppointmentRect.left;
    var top = appointmentRect.top - parentAppointmentRect.top;
    var width = left < 0 ? appointmentRect.width + left : appointmentRect.width;
    var height = top < 0 ? appointmentRect.height + top : appointmentRect.height;
    return {
        left: Math.max(0, left),
        top: Math.max(0, top),
        width: width,
        height: height
    }
};
var getAppointmentCellsInfo = options => {
    var {
        appointmentSettings: appointmentSettings,
        isVerticalGroupedWorkSpace: isVerticalGroupedWorkSpace,
        DOMMetaData: DOMMetaData
    } = options;
    var DOMMetaTable = appointmentSettings.allDay && !isVerticalGroupedWorkSpace ? [DOMMetaData.allDayPanelCellsMeta] : DOMMetaData.dateTableCellsMeta;
    var {
        positionByMap: positionByMap
    } = appointmentSettings;
    var {
        height: cellHeight,
        width: cellWidth
    } = DOMMetaTable[positionByMap.rowIndex][positionByMap.columnIndex];
    var cellCountInRow = DOMMetaTable[positionByMap.rowIndex].length;
    return {
        cellWidth: cellWidth,
        cellHeight: cellHeight,
        cellCountInRow: cellCountInRow
    }
};
export var getAppointmentDateRange = options => {
    var {
        appointmentSettings: appointmentSettings
    } = options;
    var relativeAppointmentRect = getRelativeAppointmentRect(options.appointmentRect, options.parentAppointmentRect);
    var cellInfo = getAppointmentCellsInfo(options);
    var considerTime = !options.isDateAndTimeView || appointmentSettings.allDay;
    var extendedOptions = _extends({}, options, cellInfo, {
        considerTime: considerTime,
        relativeAppointmentRect: relativeAppointmentRect
    });
    return !options.rtlEnabled ? getDateRangeHorizontal(extendedOptions) : getDateRangeHorizontalRTL(extendedOptions)
};
