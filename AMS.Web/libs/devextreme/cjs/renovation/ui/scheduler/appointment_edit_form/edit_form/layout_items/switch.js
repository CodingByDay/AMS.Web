/**
 * DevExtreme (cjs/renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/switch.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getSwitchLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var AppointmentFormClass = "dx-appointment-form-switch";
var getSwitchLayoutItemConfig = function(editorTemplate, dataField, label) {
    return {
        dataField: dataField,
        cssClass: AppointmentFormClass,
        label: {
            text: label,
            location: "right"
        },
        template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
    }
};
exports.getSwitchLayoutItemConfig = getSwitchLayoutItemConfig;
