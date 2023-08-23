/**
 * DevExtreme (bundles/__internal/grids/grid_core/editing/m_editing_cell_based.js)
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
exports.editingCellBasedModule = void 0;
var _dom_adapter = _interopRequireDefault(require("../../../../core/dom_adapter"));
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _common = require("../../../../core/utils/common");
var _deferred = require("../../../../core/utils/deferred");
var _dom = require("../../../../core/utils/dom");
var _type = require("../../../../core/utils/type");
var _array_utils = require("../../../../data/array_utils");
var _click = require("../../../../events/click");
var _events_engine = _interopRequireDefault(require("../../../../events/core/events_engine"));
var _hold = _interopRequireDefault(require("../../../../events/hold"));
var _pointer = _interopRequireDefault(require("../../../../events/pointer"));
var _index = require("../../../../events/utils/index");
var _const = require("./const");
var _m_editing_utils = require("./m_editing_utils");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

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
        _inheritsLoose(CellBasedEditingControllerExtender, _Base);

        function CellBasedEditingControllerExtender() {
            return _Base.apply(this, arguments) || this
        }
        var _proto = CellBasedEditingControllerExtender.prototype;
        _proto.init = function() {
            var _this = this;
            var needCreateHandlers = !this._saveEditorHandler;
            _Base.prototype.init.call(this);
            if (needCreateHandlers) {
                var $pointerDownTarget;
                var isResizing;
                this._pointerUpEditorHandler = function() {
                    var _a;
                    isResizing = null === (_a = _this.getController("columnsResizer")) || void 0 === _a ? void 0 : _a.isResizing()
                };
                this._pointerDownEditorHandler = function(e) {
                    return $pointerDownTarget = (0, _renderer.default)(e.target)
                };
                this._saveEditorHandler = this.createAction((function(e) {
                    var event = e.event;
                    var $target = (0, _renderer.default)(event.target);
                    var targetComponent = event[_const.TARGET_COMPONENT_NAME];
                    var component = this.component;
                    if ((0, _m_editing_utils.isEditable)($pointerDownTarget) && !$pointerDownTarget.is($target)) {
                        return
                    }

                    function checkEditorPopup($element) {
                        if (!$element) {
                            return false
                        }
                        var $dropDownEditorOverlay = $element.closest(".".concat(_const.DROPDOWN_EDITOR_OVERLAY_CLASS));
                        var $componentElement = component.$element();
                        return $dropDownEditorOverlay.length > 0 && 0 === $componentElement.closest($dropDownEditorOverlay).length
                    }
                    if (this.isCellOrBatchEditMode() && !this._editCellInProgress) {
                        var isEditorPopup = checkEditorPopup($target) || checkEditorPopup(null === targetComponent || void 0 === targetComponent ? void 0 : targetComponent.$element());
                        var isAnotherComponent = targetComponent && !targetComponent._disposed && targetComponent !== this.component;
                        var isAddRowButton = !!$target.closest(".".concat(this.addWidgetPrefix(_const.ADD_ROW_BUTTON_CLASS))).length;
                        var isFocusOverlay = $target.hasClass(this.addWidgetPrefix(_const.FOCUS_OVERLAY_CLASS));
                        var isCellEditMode = this.isCellEditMode();
                        if (!isResizing && !isEditorPopup && !isFocusOverlay && !(isAddRowButton && isCellEditMode && this.isEditing()) && ((0, _dom.isElementInDom)($target) || isAnotherComponent)) {
                            this._closeEditItem.bind(this)($target)
                        }
                    }
                }));
                _events_engine.default.on(_dom_adapter.default.getDocument(), _pointer.default.up, this._pointerUpEditorHandler);
                _events_engine.default.on(_dom_adapter.default.getDocument(), _pointer.default.down, this._pointerDownEditorHandler);
                _events_engine.default.on(_dom_adapter.default.getDocument(), _click.name, this._saveEditorHandler)
            }
        };
        _proto.isCellEditMode = function() {
            return this.option("editing.mode") === _const.EDIT_MODE_CELL
        };
        _proto.isBatchEditMode = function() {
            return this.option("editing.mode") === _const.EDIT_MODE_BATCH
        };
        _proto.isCellOrBatchEditMode = function() {
            return this.isCellEditMode() || this.isBatchEditMode()
        };
        _proto._needToCloseEditableCell = function($targetElement) {
            var _a;
            var $element = this.component.$element();
            var result = this.isEditing();
            var isCurrentComponentElement = !$element || !!$targetElement.closest($element).length;
            if (isCurrentComponentElement) {
                var isDataRow = $targetElement.closest(".".concat(_const.DATA_ROW_CLASS)).length;
                if (isDataRow) {
                    var rowsView = this.getView("rowsView");
                    var $targetCell = $targetElement.closest(".".concat(_const.ROW_CLASS, "> td"));
                    var rowIndex = rowsView.getRowIndex($targetCell.parent());
                    var cellElements = rowsView.getCellElements(rowIndex);
                    if (null === cellElements || void 0 === cellElements ? void 0 : cellElements.length) {
                        var columnIndex = cellElements.index($targetCell);
                        var visibleColumns = this._columnsController.getVisibleColumns();
                        var allowEditing = null === (_a = visibleColumns[columnIndex]) || void 0 === _a ? void 0 : _a.allowEditing;
                        var isEditingCell = this.isEditCell(rowIndex, columnIndex);
                        result = result && !allowEditing && !isEditingCell
                    }
                }
            }
            return result || _Base.prototype._needToCloseEditableCell.call(this, $targetElement)
        };
        _proto._closeEditItem = function($targetElement) {
            if (this._needToCloseEditableCell($targetElement)) {
                this.closeEditCell()
            }
        };
        _proto._focusEditorIfNeed = function() {
            var _this2 = this;
            var _a;
            if (this._needFocusEditor && this.isCellOrBatchEditMode()) {
                var editColumnIndex = this._getVisibleEditColumnIndex();
                var $cell = null === (_a = this._rowsView) || void 0 === _a ? void 0 : _a._getCellElement(this._getVisibleEditRowIndex(), editColumnIndex);
                if ($cell && !$cell.find(":focus").length) {
                    this._focusEditingCell((function() {
                        _this2._editCellInProgress = false
                    }), $cell, true)
                } else {
                    this._editCellInProgress = false
                }
                this._needFocusEditor = false
            } else {
                _Base.prototype._focusEditorIfNeed.call(this)
            }
        };
        _proto.isEditing = function() {
            if (this.isCellOrBatchEditMode()) {
                var isEditRowKeyDefined = (0, _type.isDefined)(this.option(_const.EDITING_EDITROWKEY_OPTION_NAME));
                var isEditColumnNameDefined = (0, _type.isDefined)(this.option(_const.EDITING_EDITCOLUMNNAME_OPTION_NAME));
                return isEditRowKeyDefined && isEditColumnNameDefined
            }
            return _Base.prototype.isEditing.call(this)
        };
        _proto._handleEditColumnNameChange = function(args) {
            var oldRowIndex = this._getVisibleEditRowIndex(args.previousValue);
            if (this.isCellOrBatchEditMode() && -1 !== oldRowIndex && (0, _type.isDefined)(args.value) && args.value !== args.previousValue) {
                var columnIndex = this._columnsController.getVisibleColumnIndex(args.value);
                var oldColumnIndex = this._columnsController.getVisibleColumnIndex(args.previousValue);
                this._editCellFromOptionChanged(columnIndex, oldColumnIndex, oldRowIndex)
            }
        };
        _proto._addRow = function(parentKey) {
            var _this3 = this;
            if (this.isCellEditMode() && this.hasChanges()) {
                var deferred = new _deferred.Deferred;
                this.saveEditData().done((function() {
                    if (!_this3.hasChanges()) {
                        _this3.addRow(parentKey).done(deferred.resolve).fail(deferred.reject)
                    } else {
                        deferred.reject("cancel")
                    }
                }));
                return deferred.promise()
            }
            return _Base.prototype._addRow.call(this, parentKey)
        };
        _proto.editCell = function(rowIndex, columnIndex) {
            return this._editCell({
                rowIndex: rowIndex,
                columnIndex: columnIndex
            })
        };
        _proto._editCell = function(options) {
            var _this4 = this;
            var d = new _deferred.Deferred;
            var coreResult;
            this.executeOperation(d, (function() {
                coreResult = _this4._editCellCore(options);
                (0, _deferred.when)(coreResult).done(d.resolve).fail(d.reject)
            }));
            return void 0 !== coreResult ? coreResult : d.promise()
        };
        _proto._editCellCore = function(options) {
            var _this5 = this;
            var dataController = this._dataController;
            var isEditByOptionChanged = (0, _type.isDefined)(options.oldColumnIndex) || (0, _type.isDefined)(options.oldRowIndex);
            var _this$_getNormalizedE = this._getNormalizedEditCellOptions(options),
                columnIndex = _this$_getNormalizedE.columnIndex,
                rowIndex = _this$_getNormalizedE.rowIndex,
                column = _this$_getNormalizedE.column,
                item = _this$_getNormalizedE.item;
            var params = {
                data: null === item || void 0 === item ? void 0 : item.data,
                cancel: false,
                column: column
            };
            if (void 0 === item.key) {
                this._dataController.fireError("E1043");
                return
            }
            if (column && ("data" === item.rowType || "detailAdaptive" === item.rowType) && !item.removed && this.isCellOrBatchEditMode()) {
                if (!isEditByOptionChanged && this.isEditCell(rowIndex, columnIndex)) {
                    return true
                }
                var editRowIndex = rowIndex + dataController.getRowIndexOffset();
                return (0, _deferred.when)(this._beforeEditCell(rowIndex, columnIndex, item)).done((function(cancel) {
                    if (cancel) {
                        return
                    }
                    if (!_this5._prepareEditCell(params, item, columnIndex, editRowIndex)) {
                        _this5._processCanceledEditingCell()
                    }
                }))
            }
            return false
        };
        _proto._beforeEditCell = function(rowIndex, columnIndex, item) {
            var _this6 = this;
            if (this.isCellEditMode() && !item.isNewRow && this.hasChanges()) {
                var d = new _deferred.Deferred;
                this.saveEditData().always((function() {
                    d.resolve(_this6.hasChanges())
                }));
                return d
            }
        };
        _proto.publicMethods = function() {
            var publicMethods = _Base.prototype.publicMethods.call(this);
            return publicMethods.concat(["editCell", "closeEditCell"])
        };
        _proto._getNormalizedEditCellOptions = function(_ref) {
            var oldColumnIndex = _ref.oldColumnIndex,
                oldRowIndex = _ref.oldRowIndex,
                columnIndex = _ref.columnIndex,
                rowIndex = _ref.rowIndex;
            var columnsController = this._columnsController;
            var visibleColumns = columnsController.getVisibleColumns();
            var items = this._dataController.items();
            var item = items[rowIndex];
            var oldColumn;
            if ((0, _type.isDefined)(oldColumnIndex)) {
                oldColumn = visibleColumns[oldColumnIndex]
            } else {
                oldColumn = this._getEditColumn()
            }
            if (!(0, _type.isDefined)(oldRowIndex)) {
                oldRowIndex = this._getVisibleEditRowIndex()
            }
            if ((0, _type.isString)(columnIndex)) {
                columnIndex = columnsController.columnOption(columnIndex, "index");
                columnIndex = columnsController.getVisibleIndex(columnIndex)
            }
            var column = visibleColumns[columnIndex];
            return {
                oldColumn: oldColumn,
                columnIndex: columnIndex,
                oldRowIndex: oldRowIndex,
                rowIndex: rowIndex,
                column: column,
                item: item
            }
        };
        _proto._prepareEditCell = function(params, item, editColumnIndex, editRowIndex) {
            var _a;
            if (!item.isNewRow) {
                params.key = item.key
            }
            if (this._isEditingStart(params)) {
                return false
            }
            this._pageIndex = this._dataController.pageIndex();
            this._setEditRowKey(item.key);
            this._setEditColumnNameByIndex(editColumnIndex);
            if (!params.column.showEditorAlways) {
                this._addInternalData({
                    key: item.key,
                    oldData: null !== (_a = item.oldData) && void 0 !== _a ? _a : item.data
                })
            }
            return true
        };
        _proto.closeEditCell = function(isError, withoutSaveEditData) {
            var _this7 = this;
            var result = (0, _deferred.when)();
            var oldEditRowIndex = this._getVisibleEditRowIndex();
            if (this.isCellOrBatchEditMode()) {
                var deferred = new _deferred.Deferred;
                result = new _deferred.Deferred;
                this.executeOperation(deferred, (function() {
                    _this7._closeEditCellCore(isError, oldEditRowIndex, withoutSaveEditData).always(result.resolve)
                }))
            }
            return result.promise()
        };
        _proto._closeEditCellCore = function(isError, oldEditRowIndex, withoutSaveEditData) {
            var _this8 = this;
            var dataController = this._dataController;
            var deferred = new _deferred.Deferred;
            var promise = deferred.promise();
            if (this.isCellEditMode() && this.hasChanges()) {
                if (!withoutSaveEditData) {
                    this.saveEditData().done((function(error) {
                        if (!_this8.hasChanges()) {
                            _this8.closeEditCell(!!error).always(deferred.resolve);
                            return
                        }
                        deferred.resolve()
                    }));
                    return promise
                }
            } else {
                this._resetEditRowKey();
                this._resetEditColumnName();
                if (oldEditRowIndex >= 0) {
                    var rowIndices = [oldEditRowIndex];
                    this._beforeCloseEditCellInBatchMode(rowIndices);
                    if (!isError) {
                        dataController.updateItems({
                            changeType: "update",
                            rowIndices: rowIndices
                        })
                    }
                }
            }
            deferred.resolve();
            return promise
        };
        _proto._resetModifiedClassCells = function(changes) {
            var _this9 = this;
            if (this.isBatchEditMode()) {
                var columnsCount = this._columnsController.getVisibleColumns().length;
                changes.forEach((function(_ref2) {
                    var key = _ref2.key;
                    var rowIndex = _this9._dataController.getRowIndexByKey(key);
                    for (var columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
                        var cellElement = _this9._rowsView._getCellElement(rowIndex, columnIndex);
                        null === cellElement || void 0 === cellElement ? void 0 : cellElement.removeClass(_const.CELL_MODIFIED_CLASS)
                    }
                }))
            }
        };
        _proto._prepareChange = function(options, value, text) {
            var $cellElement = (0, _renderer.default)(options.cellElement);
            if (this.isBatchEditMode() && void 0 !== options.key) {
                this._applyModified($cellElement, options)
            }
            return _Base.prototype._prepareChange.call(this, options, value, text)
        };
        _proto._cancelSaving = function(result) {
            var dataController = this._dataController;
            if (this.isCellOrBatchEditMode()) {
                if (this.isBatchEditMode()) {
                    this._resetEditIndices()
                }
                dataController.updateItems()
            }
            _Base.prototype._cancelSaving.call(this, result)
        };
        _proto.optionChanged = function(args) {
            var fullName = args.fullName;
            if ("editing" === args.name && fullName === _const.EDITING_EDITCOLUMNNAME_OPTION_NAME) {
                this._handleEditColumnNameChange(args);
                args.handled = true
            } else {
                _Base.prototype.optionChanged.call(this, args)
            }
        };
        _proto._editCellFromOptionChanged = function(columnIndex, oldColumnIndex, oldRowIndex) {
            var _this10 = this;
            var columns = this._columnsController.getVisibleColumns();
            if (columnIndex > -1) {
                (0, _common.deferRender)((function() {
                    _this10._repaintEditCell(columns[columnIndex], columns[oldColumnIndex], oldRowIndex)
                }))
            }
        };
        _proto._handleEditRowKeyChange = function(args) {
            var _a;
            if (this.isCellOrBatchEditMode()) {
                var columnIndex = this._getVisibleEditColumnIndex();
                var oldRowIndexCorrection = this._getEditRowIndexCorrection();
                var oldRowIndex = this._dataController.getRowIndexByKey(args.previousValue) + oldRowIndexCorrection;
                if ((0, _type.isDefined)(args.value) && args.value !== args.previousValue) {
                    null === (_a = this._editCellFromOptionChanged) || void 0 === _a ? void 0 : _a.call(this, columnIndex, columnIndex, oldRowIndex)
                }
            } else {
                _Base.prototype._handleEditRowKeyChange.call(this, args)
            }
        };
        _proto.deleteRow = function(rowIndex) {
            var _this11 = this;
            if (this.isCellEditMode() && this.isEditing()) {
                var isNewRow = this._dataController.items()[rowIndex].isNewRow;
                var rowKey = this._dataController.getKeyByRowIndex(rowIndex);
                this.closeEditCell(null, isNewRow).always((function() {
                    rowIndex = _this11._dataController.getRowIndexByKey(rowKey);
                    _this11._checkAndDeleteRow(rowIndex)
                }))
            } else {
                _Base.prototype.deleteRow.call(this, rowIndex)
            }
        };
        _proto._checkAndDeleteRow = function(rowIndex) {
            if (this.isBatchEditMode()) {
                this._deleteRowCore(rowIndex)
            } else {
                _Base.prototype._checkAndDeleteRow.call(this, rowIndex)
            }
        };
        _proto._refreshCore = function(params) {
            var _ref3 = null !== params && void 0 !== params ? params : {},
                isPageChanged = _ref3.isPageChanged;
            var needResetIndexes = this.isBatchEditMode() || isPageChanged && "virtual" !== this.option("scrolling.mode");
            if (this.isCellOrBatchEditMode()) {
                if (needResetIndexes) {
                    this._resetEditColumnName();
                    this._resetEditRowKey()
                }
            } else {
                _Base.prototype._refreshCore.call(this, params)
            }
        };
        _proto._allowRowAdding = function(params) {
            if (this.isBatchEditMode()) {
                return true
            }
            return _Base.prototype._allowRowAdding.call(this, params)
        };
        _proto._afterDeleteRow = function(rowIndex, oldEditRowIndex) {
            var dataController = this._dataController;
            if (this.isBatchEditMode()) {
                dataController.updateItems({
                    changeType: "update",
                    rowIndices: [oldEditRowIndex, rowIndex]
                });
                return (new _deferred.Deferred).resolve()
            }
            return _Base.prototype._afterDeleteRow.call(this, rowIndex, oldEditRowIndex)
        };
        _proto._updateEditRow = function(row, forceUpdateRow, isCustomSetCellValue) {
            if (this.isCellOrBatchEditMode()) {
                this._updateRowImmediately(row, forceUpdateRow, isCustomSetCellValue)
            } else {
                _Base.prototype._updateEditRow.call(this, row, forceUpdateRow, isCustomSetCellValue)
            }
        };
        _proto._isDefaultButtonVisible = function(button, options) {
            if (this.isCellOrBatchEditMode()) {
                var isBatchMode = this.isBatchEditMode();
                switch (button.name) {
                    case "save":
                    case "cancel":
                    case "edit":
                        return false;
                    case "delete":
                        return _Base.prototype._isDefaultButtonVisible.call(this, button, options) && (!isBatchMode || !options.row.removed);
                    case "undelete":
                        return isBatchMode && this.allowDeleting(options) && options.row.removed;
                    default:
                        return _Base.prototype._isDefaultButtonVisible.call(this, button, options)
                }
            }
            return _Base.prototype._isDefaultButtonVisible.call(this, button, options)
        };
        _proto._isRowDeleteAllowed = function() {
            var callBaseResult = _Base.prototype._isRowDeleteAllowed.call(this);
            return callBaseResult || this.isBatchEditMode()
        };
        _proto._beforeEndSaving = function(changes) {
            var _a;
            if (this.isCellEditMode()) {
                if ("update" !== (null === (_a = changes[0]) || void 0 === _a ? void 0 : _a.type)) {
                    _Base.prototype._beforeEndSaving.call(this, changes)
                }
            } else {
                if (this.isBatchEditMode()) {
                    this._resetModifiedClassCells(changes)
                }
                _Base.prototype._beforeEndSaving.call(this, changes)
            }
        };
        _proto.prepareEditButtons = function(headerPanel) {
            var _a;
            var editingOptions = null !== (_a = this.option("editing")) && void 0 !== _a ? _a : {};
            var buttonItems = _Base.prototype.prepareEditButtons.call(this, headerPanel);
            var needEditingButtons = editingOptions.allowUpdating || editingOptions.allowAdding || editingOptions.allowDeleting;
            if (needEditingButtons && this.isBatchEditMode()) {
                buttonItems.push(this.prepareButtonItem(headerPanel, "save", "saveEditData", 21));
                buttonItems.push(this.prepareButtonItem(headerPanel, "revert", "cancelEditData", 22))
            }
            return buttonItems
        };
        _proto._saveEditDataInner = function() {
            var editRow = this._dataController.getVisibleRows()[this.getEditRowIndex()];
            var editColumn = this._getEditColumn();
            var showEditorAlways = null === editColumn || void 0 === editColumn ? void 0 : editColumn.showEditorAlways;
            var isUpdateInCellMode = this.isCellEditMode() && !(null === editRow || void 0 === editRow ? void 0 : editRow.isNewRow);
            var deferred;
            if (isUpdateInCellMode && showEditorAlways) {
                deferred = new _deferred.Deferred;
                this.addDeferred(deferred)
            }
            return _Base.prototype._saveEditDataInner.call(this).always(null === deferred || void 0 === deferred ? void 0 : deferred.resolve)
        };
        _proto._applyChange = function(options, params, forceUpdateRow) {
            var isUpdateInCellMode = this.isCellEditMode() && options.row && !options.row.isNewRow;
            var showEditorAlways = options.column.showEditorAlways;
            var isCustomSetCellValue = options.column.setCellValue !== options.column.defaultSetCellValue;
            var focusPreviousEditingCell = showEditorAlways && !forceUpdateRow && isUpdateInCellMode && this.hasEditData() && !this.isEditCell(options.rowIndex, options.columnIndex);
            if (focusPreviousEditingCell) {
                this._focusEditingCell();
                this._updateEditRow(options.row, true, isCustomSetCellValue);
                return
            }
            return _Base.prototype._applyChange.call(this, options, params, forceUpdateRow)
        };
        _proto._applyChangeCore = function(options, forceUpdateRow) {
            var showEditorAlways = options.column.showEditorAlways;
            var isUpdateInCellMode = this.isCellEditMode() && options.row && !options.row.isNewRow;
            if (showEditorAlways && !forceUpdateRow) {
                if (isUpdateInCellMode) {
                    this._setEditRowKey(options.row.key, true);
                    this._setEditColumnNameByIndex(options.columnIndex, true);
                    return this.saveEditData()
                }
                if (this.isBatchEditMode()) {
                    forceUpdateRow = this._needUpdateRow(options.column);
                    return _Base.prototype._applyChangeCore.call(this, options, forceUpdateRow)
                }
            }
            return _Base.prototype._applyChangeCore.call(this, options, forceUpdateRow)
        };
        _proto._processDataItemCore = function(item, change, key, columns, generateDataValues) {
            var data = change.data,
                type = change.type;
            if (this.isBatchEditMode() && type === _const.DATA_EDIT_DATA_REMOVE_TYPE) {
                item.data = (0, _array_utils.createObjectWithChanges)(item.data, data)
            }
            _Base.prototype._processDataItemCore.call(this, item, change, key, columns, generateDataValues)
        };
        _proto._processRemoveCore = function(changes, editIndex, processIfBatch) {
            if (this.isBatchEditMode() && !processIfBatch) {
                return
            }
            return _Base.prototype._processRemoveCore.call(this, changes, editIndex, processIfBatch)
        };
        _proto._processRemoveIfError = function(changes, editIndex) {
            if (this.isBatchEditMode()) {
                return
            }
            return _Base.prototype._processRemoveIfError.call(this, changes, editIndex)
        };
        _proto._beforeFocusElementInRow = function(rowIndex) {
            _Base.prototype._beforeFocusElementInRow.call(this, rowIndex);
            var editRowIndex = rowIndex >= 0 ? rowIndex : 0;
            var columnIndex = this.getFirstEditableColumnIndex();
            columnIndex >= 0 && this.editCell(editRowIndex, columnIndex)
        };
        return CellBasedEditingControllerExtender
    }(Base)
};
var editingCellBasedModule = {
    extenders: {
        controllers: {
            editing: editingControllerExtender
        },
        views: {
            rowsView: {
                _createTable: function() {
                    var $table = this.callBase.apply(this, arguments);
                    var editingController = this._editingController;
                    if (editingController.isCellOrBatchEditMode() && this.option("editing.allowUpdating")) {
                        _events_engine.default.on($table, (0, _index.addNamespace)(_hold.default.name, "dxDataGridRowsView"), "td:not(.".concat(_const.EDITOR_CELL_CLASS, ")"), this.createAction((function() {
                            if (editingController.isEditing()) {
                                editingController.closeEditCell()
                            }
                        })))
                    }
                    return $table
                },
                _createRow: function(row) {
                    var $row = this.callBase.apply(this, arguments);
                    if (row) {
                        var editingController = this._editingController;
                        var isRowRemoved = !!row.removed;
                        if (editingController.isBatchEditMode()) {
                            isRowRemoved && $row.addClass(_const.ROW_REMOVED)
                        }
                    }
                    return $row
                }
            },
            headerPanel: {
                isVisible: function() {
                    var editingOptions = this.getController("editing").option("editing");
                    return this.callBase() || editingOptions && (editingOptions.allowUpdating || editingOptions.allowDeleting) && editingOptions.mode === _const.EDIT_MODE_BATCH
                }
            }
        }
    }
};
exports.editingCellBasedModule = editingCellBasedModule;
