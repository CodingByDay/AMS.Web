/**
 * DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/switch.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getRenderEditorTemplate
} from "../utils/renderTemplate";
var AppointmentFormClass = "dx-appointment-form-switch";
export var getSwitchLayoutItemConfig = (editorTemplate, dataField, label) => ({
    dataField: dataField,
    cssClass: AppointmentFormClass,
    label: {
        text: label,
        location: "right"
    },
    template: getRenderEditorTemplate(editorTemplate)
});
