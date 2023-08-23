/**
 * DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/groups/dateBoxGroup.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getDateBoxGroupConfig = void 0;
var _const = require("../const");
var _dateBox = require("../dateBox");
var _timeZone = require("../timeZone");
var createDateBoxItems = function(options) {
    var colSpan = options.allowTimeZoneEditing ? 2 : 1;
    var startDateLayoutItem = (0, _dateBox.getDateBoxLayoutItemConfig)(options.startDateEditorTemplate, options.dataExpr.startDateExpr, colSpan, _const.ItemLabels.startDate);
    var startDateTimeZoneLayoutItem = (0, _timeZone.getTimeZoneLayoutItemConfig)(options.startDatetimeZoneEditorTemplate, options.dataExpr.startDateTimeZoneExpr, colSpan, 1, !!options.allowTimeZoneEditing);
    var endDateLayoutItem = (0, _dateBox.getDateBoxLayoutItemConfig)(options.endDateEditorTemplate, options.dataExpr.endDateExpr, colSpan, _const.ItemLabels.endDate);
    var endDateTimeZoneLayoutItem = (0, _timeZone.getTimeZoneLayoutItemConfig)(options.endDateTimeZoneEditorTemplate, options.dataExpr.endDateTimeZoneExpr, colSpan, 3, !!options.allowTimeZoneEditing);
    return [startDateLayoutItem, startDateTimeZoneLayoutItem, endDateLayoutItem, endDateTimeZoneLayoutItem]
};
var getDateBoxGroupConfig = function(dataExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate) {
    return {
        itemType: "group",
        colSpan: 2,
        colCountByScreen: {
            lg: 2,
            xs: 1
        },
        items: createDateBoxItems({
            dataExpr: dataExpr,
            allowTimeZoneEditing: allowTimeZoneEditing,
            startDateEditorTemplate: startDateEditorTemplate,
            endDateEditorTemplate: endDateEditorTemplate,
            startDatetimeZoneEditorTemplate: startDatetimeZoneEditorTemplate,
            endDateTimeZoneEditorTemplate: endDateTimeZoneEditorTemplate
        })
    }
};
exports.getDateBoxGroupConfig = getDateBoxGroupConfig;
