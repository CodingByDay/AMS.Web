/**
 * DevExtreme (esm/__internal/grids/grid_core/editing/m_editing_utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    isObject
} from "../../../../core/utils/type";
export var createFailureHandler = function(deferred) {
    return function(arg) {
        var error = arg instanceof Error ? arg : new Error(arg && String(arg) || "Unknown error");
        deferred.reject(error)
    }
};
export var isEditingCell = function(isEditRow, cellOptions) {
    return cellOptions.isEditing || isEditRow && cellOptions.column.allowEditing
};
export var isEditingOrShowEditorAlwaysDataCell = function(isEditRow, cellOptions) {
    var isCommandCell = !!cellOptions.column.command;
    var isEditing = isEditingCell(isEditRow, cellOptions);
    var isEditorCell = !isCommandCell && (isEditing || cellOptions.column.showEditorAlways);
    return "data" === cellOptions.rowType && isEditorCell
};
export var getEditingTexts = options => {
    var editingTexts = options.component.option("editing.texts") || {};
    return {
        save: editingTexts.saveRowChanges,
        cancel: editingTexts.cancelRowChanges,
        edit: editingTexts.editRow,
        undelete: editingTexts.undeleteRow,
        delete: editingTexts.deleteRow,
        add: editingTexts.addRowToNode
    }
};
export var getButtonIndex = (buttons, name) => {
    var result = -1;
    buttons.some((button, index) => {
        if (getButtonName(button) === name) {
            result = index;
            return true
        }
    });
    return result
};
export function getButtonName(button) {
    return isObject(button) ? button.name : button
}
export function isEditable($element) {
    return $element && ($element.is("input") || $element.is("textarea"))
}
export var getEditorType = item => {
    var _a;
    var {
        column: column
    } = item;
    return item.isCustomEditorType ? item.editorType : null === (_a = column.formItem) || void 0 === _a ? void 0 : _a.editorType
};
export var forEachFormItems = (items, callBack) => {
    items.forEach(item => {
        if (item.items || item.tabs) {
            forEachFormItems(item.items || item.tabs, callBack)
        } else {
            callBack(item)
        }
    })
};
