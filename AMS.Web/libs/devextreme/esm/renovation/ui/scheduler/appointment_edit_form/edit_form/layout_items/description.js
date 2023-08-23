/**
 * DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/description.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getRenderEditorTemplate
} from "../utils/renderTemplate";
export var getDescriptionLayoutItemConfig = (editorTemplate, dataField, label) => ({
    dataField: dataField,
    colSpan: 2,
    label: {
        text: label
    },
    template: getRenderEditorTemplate(editorTemplate)
});
