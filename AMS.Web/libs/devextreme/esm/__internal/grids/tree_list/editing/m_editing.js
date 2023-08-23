/**
 * DevExtreme (esm/__internal/grids/tree_list/editing/m_editing.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import "../module_not_extended/editor_factory";
import $ from "../../../../core/renderer";
import {
    Deferred
} from "../../../../core/utils/deferred";
import {
    extend
} from "../../../../core/utils/extend";
import {
    isDefined
} from "../../../../core/utils/type";
import messageLocalization from "../../../../localization/message";
import errors from "../../../../ui/widget/ui.errors";
import {
    editingModule
} from "../../../grids/grid_core/editing/m_editing";
import gridCoreUtils from "../../../grids/grid_core/m_utils";
import treeListCore from "../m_core";
var TREELIST_EXPAND_ICON_CONTAINER_CLASS = "dx-treelist-icon-container";
var SELECT_CHECKBOX_CLASS = "dx-select-checkbox";
var DATA_EDIT_DATA_INSERT_TYPE = "insert";
var EditingController = editingModule.controllers.editing.inherit({
    _generateNewItem(key) {
        var item = this.callBase(key);
        item.data = {
            key: key
        };
        item.children = [];
        item.level = 0;
        item.parentKey = this.option("rootValue");
        return item
    },
    _isProcessedItem: () => true,
    _setInsertAfterOrBeforeKey(change, parentKey) {
        if (void 0 !== parentKey && parentKey !== this.option("rootValue")) {
            change.insertAfterKey = parentKey
        } else {
            this.callBase.apply(this, arguments)
        }
    },
    _getLoadedRowIndex(items, change) {
        var dataController = this.getController("data");
        var dataSourceAdapter = dataController.dataSource();
        var parentKey = null === dataSourceAdapter || void 0 === dataSourceAdapter ? void 0 : dataSourceAdapter.parentKeyOf(change.data);
        if (void 0 !== parentKey && parentKey !== this.option("rootValue")) {
            var rowIndex = gridCoreUtils.getIndexByKey(parentKey, items);
            if (rowIndex >= 0 && this._dataController.isRowExpanded(parentKey)) {
                return rowIndex + 1
            }
            return -1
        }
        return this.callBase.apply(this, arguments)
    },
    _isEditColumnVisible() {
        var result = this.callBase.apply(this, arguments);
        var editingOptions = this.option("editing");
        return result || editingOptions.allowAdding
    },
    _isDefaultButtonVisible(button, options) {
        var result = this.callBase.apply(this, arguments);
        var {
            row: row
        } = options;
        if ("add" === button.name) {
            return this.allowAdding(options) && row.rowIndex !== this._getVisibleEditRowIndex() && !(row.removed || row.isNewRow)
        }
        return result
    },
    _getEditingButtons(options) {
        var buttons = this.callBase.apply(this, arguments);
        if (!options.column.buttons) {
            buttons.unshift(this._getButtonConfig("add", options))
        }
        return buttons
    },
    _beforeSaveEditData(change) {
        var dataController = this._dataController;
        var result = this.callBase.apply(this, arguments);
        if (change && change.type !== DATA_EDIT_DATA_INSERT_TYPE) {
            var store = null === dataController || void 0 === dataController ? void 0 : dataController.store();
            var key = null === store || void 0 === store ? void 0 : store.key();
            if (!isDefined(key)) {
                throw errors.Error("E1045")
            }
        }
        return result
    },
    addRowByRowIndex(rowIndex) {
        var dataController = this.getController("data");
        var row = dataController.getVisibleRows()[rowIndex];
        return this.addRow(row ? row.key : void 0)
    },
    addRow(key) {
        if (void 0 === key) {
            key = this.option("rootValue")
        }
        return this.callBase.call(this, key)
    },
    _addRowCore(data, parentKey, oldEditRowIndex) {
        var {
            callBase: callBase
        } = this;
        var rootValue = this.option("rootValue");
        var dataController = this.getController("data");
        var dataSourceAdapter = dataController.dataSource();
        var parentKeyGetter = dataSourceAdapter.createParentIdGetter();
        parentKey = parentKeyGetter(data);
        if (void 0 !== parentKey && parentKey !== rootValue && !dataController.isRowExpanded(parentKey)) {
            var deferred = new Deferred;
            dataController.expandRow(parentKey).done(() => {
                setTimeout(() => {
                    callBase.call(this, data, parentKey, oldEditRowIndex).done(deferred.resolve).fail(deferred.reject)
                })
            }).fail(deferred.reject);
            return deferred.promise()
        }
        return callBase.call(this, data, parentKey, oldEditRowIndex)
    },
    _initNewRow(options, parentKey) {
        var dataController = this.getController("data");
        var dataSourceAdapter = dataController.dataSource();
        var parentIdSetter = dataSourceAdapter.createParentIdSetter();
        parentIdSetter(options.data, parentKey);
        return this.callBase.apply(this, arguments)
    },
    allowAdding(options) {
        return this._allowEditAction("allowAdding", options)
    },
    _needToCloseEditableCell($targetElement) {
        return this.callBase.apply(this, arguments) || $targetElement.closest(".".concat(TREELIST_EXPAND_ICON_CONTAINER_CLASS)).length && this.isEditing()
    },
    getButtonLocalizationNames() {
        var names = this.callBase.apply(this);
        names.add = "dxTreeList-editingAddRowToNode";
        return names
    }
});
var originalRowClick = editingModule.extenders.views.rowsView._rowClick;
var originalRowDblClick = editingModule.extenders.views.rowsView._rowDblClick;
var validateClick = function(e) {
    var $targetElement = $(e.event.target);
    var originalClickHandler = "dxdblclick" === e.event.type ? originalRowDblClick : originalRowClick;
    if ($targetElement.closest(".".concat(SELECT_CHECKBOX_CLASS)).length) {
        return false
    }
    return !needToCallOriginalClickHandler.call(this, e, originalClickHandler)
};

function needToCallOriginalClickHandler(e, originalClickHandler) {
    var $targetElement = $(e.event.target);
    if (!$targetElement.closest(".".concat(TREELIST_EXPAND_ICON_CONTAINER_CLASS)).length) {
        originalClickHandler.call(this, e);
        return true
    }
    return false
}
var RowsViewExtender = extend({}, editingModule.extenders.views.rowsView, {
    _renderCellCommandContent($container, options) {
        var editingController = this._editingController;
        var isEditRow = options.row && editingController.isEditRow(options.row.rowIndex);
        var isEditing = options.isEditing || isEditRow;
        if (!isEditing) {
            return this.callBase.apply(this, arguments)
        }
        return false
    },
    _rowClick(e) {
        if (validateClick.call(this, e)) {
            this.callBase.apply(this, arguments)
        }
    },
    _rowDblClick(e) {
        if (validateClick.call(this, e)) {
            this.callBase.apply(this, arguments)
        }
    }
});
treeListCore.registerModule("editing", {
    defaultOptions: () => extend(true, editingModule.defaultOptions(), {
        editing: {
            texts: {
                addRowToNode: messageLocalization.format("dxTreeList-editingAddRowToNode")
            }
        }
    }),
    controllers: {
        editing: EditingController
    },
    extenders: {
        controllers: extend(true, {}, editingModule.extenders.controllers, {
            data: {
                changeRowExpand() {
                    this._editingController.refresh();
                    return this.callBase.apply(this, arguments)
                }
            }
        }),
        views: {
            rowsView: RowsViewExtender,
            headerPanel: editingModule.extenders.views.headerPanel
        }
    }
});
