/**
 * DevExtreme (esm/renovation/ui/scheduler/appointment_edit_form/edit_form/utils/renderTemplate.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    renderTemplate
} from "@devextreme/runtime/inferno";
export var getRenderEditorTemplate = editorTemplate => (item, container) => {
    renderTemplate(() => editorTemplate, {
        item: item,
        container: container
    }, null)
};
