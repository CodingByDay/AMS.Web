/**
 * DevExtreme (bundles/__internal/grids/grid_core/editing/m_editing_row_based.js)
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
exports.editingRowBasedModule = void 0;
var _common = require("../../../../core/utils/common");
var _const = require("./const");

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}
var editingControllerExtender = function(Base) {
    return function(_Base) {
        _inheritsLoose(RowBasedEditingControllerExtender, _Base);

        function RowBasedEditingControllerExtender() {
            return _Base.apply(this, arguments) || this
        }
        var _proto = RowBasedEditingControllerExtender.prototype;
        _proto.isRowEditMode = function() {
            return this.getEditMode() === _const.EDIT_MODE_ROW
        };
        _proto._afterCancelEditData = function(rowIndex) {
            var dataController = this._dataController;
            if (this.isRowBasedEditMode() && rowIndex >= 0) {
                dataController.updateItems({
                    changeType: "update",
                    rowIndices: [rowIndex, rowIndex + 1]
                })
            } else {
                _Base.prototype._afterCancelEditData.call(this, rowIndex)
            }
        };
        _proto._isDefaultButtonVisible = function(button, options) {
            var isRowMode = this.isRowBasedEditMode();
            var isEditRow = options.row && (0, _common.equalByValue)(options.row.key, this.option(_const.EDITING_EDITROWKEY_OPTION_NAME));
            if (isRowMode) {
                switch (button.name) {
                    case "edit":
                        return !isEditRow && this.allowUpdating(options);
                    case "delete":
                        return _Base.prototype._isDefaultButtonVisible.call(this, button, options) && !isEditRow;
                    case "save":
                    case "cancel":
                        return isEditRow;
                    default:
                        return _Base.prototype._isDefaultButtonVisible.call(this, button, options)
                }
            }
            return _Base.prototype._isDefaultButtonVisible.call(this, button, options)
        };
        _proto.isEditRow = function(rowIndex) {
            return this.isRowBasedEditMode() && this.isEditRowByIndex(rowIndex)
        };
        _proto._cancelSaving = function(result) {
            if (this.isRowBasedEditMode()) {
                if (!this.hasChanges()) {
                    this._cancelEditDataCore()
                }
            }
            _Base.prototype._cancelSaving.call(this, result)
        };
        _proto._refreshCore = function(params) {
            var _ref = null !== params && void 0 !== params ? params : {},
                allowCancelEditing = _ref.allowCancelEditing;
            if (this.isRowBasedEditMode()) {
                var hasUpdateChanges = this.getChanges().filter((function(it) {
                    return "update" === it.type
                })).length > 0;
                this.init();
                allowCancelEditing && hasUpdateChanges && this._cancelEditDataCore()
            }
            _Base.prototype._refreshCore.call(this, params)
        };
        _proto._isEditColumnVisible = function() {
            var result = _Base.prototype._isEditColumnVisible.call(this);
            var editingOptions = this.option("editing");
            var isRowEditMode = this.isRowEditMode();
            var isVisibleInRowEditMode = editingOptions.allowUpdating || editingOptions.allowAdding;
            return result || isRowEditMode && isVisibleInRowEditMode
        };
        _proto._focusEditorIfNeed = function() {
            var _this = this;
            var editMode = this.getEditMode();
            if (this._needFocusEditor) {
                if (_const.MODES_WITH_DELAYED_FOCUS.includes(editMode)) {
                    var $editingCell = this.getFocusedCellInRow(this._getVisibleEditRowIndex());
                    this._delayedInputFocus($editingCell, (function() {
                        $editingCell && _this.component.focus($editingCell)
                    }))
                }
                this._needFocusEditor = false
            }
        };
        return RowBasedEditingControllerExtender
    }(Base)
};
var editingRowBasedModule = {
    extenders: {
        controllers: {
            editing: editingControllerExtender,
            data: {
                _getChangedColumnIndices: function(oldItem, newItem, rowIndex, isLiveUpdate) {
                    var editingController = this.getController("editing");
                    if (editingController.isRowBasedEditMode() && oldItem.isEditing !== newItem.isEditing) {
                        return
                    }
                    return this.callBase.apply(this, arguments)
                }
            }
        },
        views: {
            rowsView: {
                _createRow: function(row) {
                    var $row = this.callBase.apply(this, arguments);
                    if (row) {
                        var editingController = this._editingController;
                        var isEditRow = editingController.isEditRow(row.rowIndex);
                        if (isEditRow) {
                            $row.addClass(_const.EDIT_ROW);
                            $row.removeClass(_const.ROW_SELECTED_CLASS);
                            if ("detail" === row.rowType) {
                                $row.addClass(this.addWidgetPrefix(_const.EDIT_FORM_CLASS))
                            }
                        }
                    }
                    return $row
                },
                _update: function(change) {
                    this.callBase(change);
                    if ("updateSelection" === change.changeType) {
                        this.getTableElements().children("tbody").children(".".concat(_const.EDIT_ROW)).removeClass(_const.ROW_SELECTED_CLASS)
                    }
                }
            }
        }
    }
};
exports.editingRowBasedModule = editingRowBasedModule;
