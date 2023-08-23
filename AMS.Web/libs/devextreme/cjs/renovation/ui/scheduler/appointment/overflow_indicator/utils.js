/**
 * DevExtreme (cjs/renovation/ui/scheduler/appointment/overflow_indicator/utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getOverflowIndicatorStyles = exports.getOverflowIndicatorColor = exports.getIndicatorColor = void 0;
var _utils = require("../../workspaces/utils");
var _utils2 = require("../../resources/utils");
var getOverflowIndicatorStyles = function(viewModel) {
    var _viewModel$geometry = viewModel.geometry,
        height = _viewModel$geometry.height,
        left = _viewModel$geometry.left,
        top = _viewModel$geometry.top,
        width = _viewModel$geometry.width;
    var result = (0, _utils.addToStyles)([{
        attr: "left",
        value: "".concat(left, "px")
    }, {
        attr: "top",
        value: "".concat(top, "px")
    }, {
        attr: "width",
        value: "".concat(width, "px")
    }, {
        attr: "height",
        value: "".concat(height, "px")
    }, {
        attr: "boxShadow",
        value: "inset ".concat(width, "px 0 0 0 rgba(0, 0, 0, 0.3)")
    }]);
    return result
};
exports.getOverflowIndicatorStyles = getOverflowIndicatorStyles;
var getOverflowIndicatorColor = function(color, colors) {
    return !colors.length || 0 === colors.filter((function(item) {
        return item !== color
    })).length ? color : void 0
};
exports.getOverflowIndicatorColor = getOverflowIndicatorColor;
var getIndicatorColor = function(appointmentContext, viewModel, groups) {
    var _viewModel$groupIndex;
    var groupIndex = null !== (_viewModel$groupIndex = viewModel.groupIndex) && void 0 !== _viewModel$groupIndex ? _viewModel$groupIndex : 0;
    var appointment = viewModel.items.settings[0].appointment;
    return (0, _utils2.getAppointmentColor)({
        resources: appointmentContext.resources,
        resourceLoaderMap: appointmentContext.resourceLoaderMap,
        resourcesDataAccessors: appointmentContext.dataAccessors.resources,
        loadedResources: appointmentContext.loadedResources
    }, {
        itemData: appointment,
        groupIndex: groupIndex,
        groups: groups
    })
};
exports.getIndicatorColor = getIndicatorColor;
