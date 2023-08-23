/**
 * DevExtreme (bundles/__internal/grids/grid_core/editing/m_editing_utils.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getButtonIndex = exports.forEachFormItems = exports.createFailureHandler = void 0;
exports.getButtonName = getButtonName;
exports.getEditorType = exports.getEditingTexts = void 0;
exports.isEditable = isEditable;
exports.isEditingOrShowEditorAlwaysDataCell = exports.isEditingCell = void 0;
var _type = require("../../../../core/utils/type");
var createFailureHandler = function(deferred) {
    return function(arg) {
        var error = arg instanceof Error ? arg : new Error(arg && String(arg) || "Unknown error");
        deferred.reject(error)
    }
};
exports.createFailureHandler = createFailureHandler;
var isEditingCell = function(isEditRow, cellOptions) {
    return cellOptions.isEditing || isEditRow && cellOptions.column.allowEditing
};
exports.isEditingCell = isEditingCell;
var isEditingOrShowEditorAlwaysDataCell = function(isEditRow, cellOptions) {
    var isCommandCell = !!cellOptions.column.command;
    var isEditing = isEditingCell(isEditRow, cellOptions);
    var isEditorCell = !isCommandCell && (isEditing || cellOptions.column.showEditorAlways);
    return "data" === cellOptions.rowType && isEditorCell
};
exports.isEditingOrShowEditorAlwaysDataCell = isEditingOrShowEditorAlwaysDataCell;
var getEditingTexts = function(options) {
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
exports.getEditingTexts = getEditingTexts;
var getButtonIndex = function(buttons, name) {
    var result = -1;
    buttons.some((function(button, index) {
        if (getButtonName(button) === name) {
            result = index;
            return true
        }
    }));
    return result
};
exports.getButtonIndex = getButtonIndex;

function getButtonName(button) {
    return (0, _type.isObject)(button) ? button.name : button
}

function isEditable($element) {
    return $element && ($element.is("input") || $element.is("textarea"))
}
var getEditorType = function(item) {
    var _a;
    var column = item.column;
    return item.isCustomEditorType ? item.editorType : null === (_a = column.formItem) || void 0 === _a ? void 0 : _a.editorType
};
exports.getEditorType = getEditorType;
var forEachFormItems = function forEachFormItems(items, callBack) {
    items.forEach((function(item) {
        if (item.items || item.tabs) {
            forEachFormItems(item.items || item.tabs, callBack)
        } else {
            callBack(item)
        }
    }))
};
exports.forEachFormItems = forEachFormItems;
