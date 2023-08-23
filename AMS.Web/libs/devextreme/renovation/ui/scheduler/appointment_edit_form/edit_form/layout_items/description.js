/**
 * DevExtreme (renovation/ui/scheduler/appointment_edit_form/edit_form/layout_items/description.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.getDescriptionLayoutItemConfig = void 0;
var _renderTemplate = require("../utils/renderTemplate");
var getDescriptionLayoutItemConfig = function(editorTemplate, dataField, label) {
    return {
        dataField: dataField,
        colSpan: 2,
        label: {
            text: label
        },
        template: (0, _renderTemplate.getRenderEditorTemplate)(editorTemplate)
    }
};
exports.getDescriptionLayoutItemConfig = getDescriptionLayoutItemConfig;
