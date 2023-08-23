/**
 * DevExtreme (esm/__internal/grids/tree_list/selection/m_selection.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../../../core/renderer";
import {
    equalByValue,
    noop
} from "../../../../core/utils/common";
import {
    extend
} from "../../../../core/utils/extend";
import {
    isDefined
} from "../../../../core/utils/type";
import {
    selectionModule
} from "../../../grids/grid_core/selection/m_selection";
import treeListCore from "../m_core";
var TREELIST_SELECT_ALL_CLASS = "dx-treelist-select-all";
var CELL_FOCUS_DISABLED_CLASS = "dx-cell-focus-disabled";
var SELECT_CHECKBOX_CLASS = "dx-select-checkbox";
var originalRowClick = selectionModule.extenders.views.rowsView._rowClick;
var originalHandleDataChanged = selectionModule.extenders.controllers.data._handleDataChanged;
var nodeExists = function(array, currentKey) {
    return !!array.filter(key => key === currentKey).length
};
treeListCore.registerModule("selection", extend(true, {}, selectionModule, {
    defaultOptions: () => extend(true, selectionModule.defaultOptions(), {
        selection: {
            showCheckBoxesMode: "always",
            recursive: false
        }
    }),
    extenders: {
        controllers: {
            data: {
                _handleDataChanged(e) {
                    var selectionController = this.getController("selection");
                    var isRecursiveSelection = selectionController.isRecursiveSelection();
                    if (isRecursiveSelection && (!e || "updateSelectionState" !== e.changeType)) {
                        selectionController.updateSelectionState({
                            selectedItemKeys: this.option("selectedRowKeys")
                        })
                    }
                    originalHandleDataChanged.apply(this, arguments)
                },
                loadDescendants() {
                    var that = this;
                    var d = that.callBase.apply(that, arguments);
                    var selectionController = that.getController("selection");
                    var isRecursiveSelection = selectionController.isRecursiveSelection();
                    if (isRecursiveSelection) {
                        d.done(() => {
                            selectionController.updateSelectionState({
                                selectedItemKeys: that.option("selectedRowKeys")
                            })
                        })
                    }
                    return d
                }
            },
            selection: {
                init() {
                    this.callBase.apply(this, arguments);
                    this._selectionStateByKey = {}
                },
                _getSelectionConfig() {
                    var config = this.callBase.apply(this, arguments);
                    var {
                        plainItems: plainItems
                    } = config;
                    config.plainItems = cached => {
                        var result;
                        if (cached) {
                            result = this._dataController.getCachedStoreData()
                        }
                        result || (result = plainItems.apply(this, arguments).map(item => item.data));
                        return result || []
                    };
                    config.isItemSelected = item => {
                        var key = this._dataController.keyOf(item);
                        return this.isRowSelected(key)
                    };
                    config.isSelectableItem = item => !!item;
                    config.getItemData = item => item;
                    config.allowLoadByRange = () => false;
                    return config
                },
                renderSelectCheckBoxContainer($container, model) {
                    var rowsView = this.component.getView("rowsView");
                    $container.addClass(CELL_FOCUS_DISABLED_CLASS);
                    var $checkbox = rowsView._renderSelectCheckBox($container, {
                        value: model.row.isSelected,
                        row: model.row,
                        column: model.column
                    });
                    rowsView._attachCheckBoxClickEvent($checkbox)
                },
                _updateSelectColumn: noop,
                _getSelectAllNodeKeys() {
                    var {
                        component: component
                    } = this;
                    var root = component.getRootNode();
                    var cache = {};
                    var keys = [];
                    var isRecursiveSelection = this.isRecursiveSelection();
                    root && treeListCore.foreachNodes(root.children, node => {
                        if (void 0 !== node.key && (node.visible || isRecursiveSelection)) {
                            keys.push(node.key)
                        }
                        if (!node.visible) {
                            return true
                        }
                        return isRecursiveSelection ? false : component.isRowExpanded(node.key, cache)
                    });
                    return keys
                },
                isSelectAll() {
                    var selectedRowKeys = this.option("selectedRowKeys") || [];
                    if (0 === selectedRowKeys.length) {
                        return false
                    }
                    var {
                        component: component
                    } = this;
                    var visibleKeys = this._getSelectAllNodeKeys();
                    var isRecursiveSelection = this.isRecursiveSelection();
                    var hasIndeterminateState = false;
                    var selectedVisibleKeys = visibleKeys.filter(key => {
                        var isRowSelected = component.isRowSelected(key, isRecursiveSelection);
                        if (void 0 === isRowSelected) {
                            hasIndeterminateState = true
                        }
                        return isRowSelected
                    });
                    if (!selectedVisibleKeys.length) {
                        return hasIndeterminateState ? void 0 : false
                    }
                    if (selectedVisibleKeys.length === visibleKeys.length) {
                        return true
                    }
                    return
                },
                selectAll() {
                    var visibleKeys = this._getSelectAllNodeKeys().filter(key => !this.isRowSelected(key));
                    this.focusedItemIndex(-1);
                    return this.selectRows(visibleKeys, true)
                },
                deselectAll() {
                    var visibleKeys = this._getSelectAllNodeKeys();
                    this.focusedItemIndex(-1);
                    return this.deselectRows(visibleKeys)
                },
                selectedItemKeys(value, preserve, isDeselect, isSelectAll) {
                    var that = this;
                    var selectedRowKeys = that.option("selectedRowKeys");
                    var isRecursiveSelection = this.isRecursiveSelection();
                    var normalizedArgs = isRecursiveSelection && that._normalizeSelectionArgs({
                        keys: isDefined(value) ? value : []
                    }, preserve, !isDeselect);
                    if (normalizedArgs && !equalByValue(normalizedArgs.selectedRowKeys, selectedRowKeys)) {
                        that._isSelectionNormalizing = true;
                        return this.callBase(normalizedArgs.selectedRowKeys, false, false, false).always(() => {
                            that._isSelectionNormalizing = false
                        }).done(items => {
                            normalizedArgs.selectedRowsData = items;
                            that._fireSelectionChanged(normalizedArgs)
                        })
                    }
                    return this.callBase(value, preserve, isDeselect, isSelectAll)
                },
                changeItemSelection(itemIndex, keyboardKeys) {
                    var isRecursiveSelection = this.isRecursiveSelection();
                    if (isRecursiveSelection && !keyboardKeys.shift) {
                        var key = this._dataController.getKeyByRowIndex(itemIndex);
                        return this.selectedItemKeys(key, true, this.isRowSelected(key)).done(() => {
                            this.isRowSelected(key) && this.callBase(itemIndex, keyboardKeys, true)
                        })
                    }
                    return this.callBase.apply(this, arguments)
                },
                _updateParentSelectionState(node, isSelected) {
                    var that = this;
                    var state = isSelected;
                    var parentNode = node.parent;
                    if (parentNode) {
                        if (parentNode.children.length > 1) {
                            if (false === isSelected) {
                                var hasSelectedState = parentNode.children.some(childNode => that._selectionStateByKey[childNode.key]);
                                state = hasSelectedState ? void 0 : false
                            } else if (true === isSelected) {
                                var hasNonSelectedState = parentNode.children.some(childNode => !that._selectionStateByKey[childNode.key]);
                                state = hasNonSelectedState ? void 0 : true
                            }
                        }
                        this._selectionStateByKey[parentNode.key] = state;
                        if (parentNode.parent && parentNode.parent.level >= 0) {
                            this._updateParentSelectionState(parentNode, state)
                        }
                    }
                },
                _updateChildrenSelectionState(node, isSelected) {
                    var that = this;
                    var {
                        children: children
                    } = node;
                    children && children.forEach(childNode => {
                        that._selectionStateByKey[childNode.key] = isSelected;
                        if (childNode.children.length > 0) {
                            that._updateChildrenSelectionState(childNode, isSelected)
                        }
                    })
                },
                _updateSelectionStateCore(keys, isSelected) {
                    var dataController = this._dataController;
                    for (var i = 0; i < keys.length; i++) {
                        this._selectionStateByKey[keys[i]] = isSelected;
                        var node = dataController.getNodeByKey(keys[i]);
                        if (node) {
                            this._updateParentSelectionState(node, isSelected);
                            this._updateChildrenSelectionState(node, isSelected)
                        }
                    }
                },
                _getSelectedParentKeys(key, selectedItemKeys, useCash) {
                    var selectedParentNode;
                    var node = this._dataController.getNodeByKey(key);
                    var parentNode = node && node.parent;
                    var result = [];
                    while (parentNode && parentNode.level >= 0) {
                        result.unshift(parentNode.key);
                        var isSelected = useCash ? !nodeExists(selectedItemKeys, parentNode.key) && this.isRowSelected(parentNode.key) : selectedItemKeys.indexOf(parentNode.key) >= 0;
                        if (isSelected) {
                            selectedParentNode = parentNode;
                            result = this._getSelectedParentKeys(selectedParentNode.key, selectedItemKeys, useCash).concat(result);
                            break
                        } else if (useCash) {
                            break
                        }
                        parentNode = parentNode.parent
                    }
                    return selectedParentNode && result || []
                },
                _getSelectedChildKeys(key, keysToIgnore) {
                    var childKeys = [];
                    var node = this._dataController.getNodeByKey(key);
                    node && treeListCore.foreachNodes(node.children, childNode => {
                        var ignoreKeyIndex = keysToIgnore.indexOf(childNode.key);
                        if (ignoreKeyIndex < 0) {
                            childKeys.push(childNode.key)
                        }
                        return ignoreKeyIndex > 0 || ignoreKeyIndex < 0 && void 0 === this._selectionStateByKey[childNode.key]
                    });
                    return childKeys
                },
                _normalizeParentKeys(key, args) {
                    var keysToIgnore = [key];
                    var parentNodeKeys = this._getSelectedParentKeys(key, args.selectedRowKeys);
                    if (parentNodeKeys.length) {
                        keysToIgnore = keysToIgnore.concat(parentNodeKeys);
                        keysToIgnore.forEach(key => {
                            var index = args.selectedRowKeys.indexOf(key);
                            if (index >= 0) {
                                args.selectedRowKeys.splice(index, 1)
                            }
                        });
                        var childKeys = this._getSelectedChildKeys(parentNodeKeys[0], keysToIgnore);
                        args.selectedRowKeys = args.selectedRowKeys.concat(childKeys)
                    }
                },
                _normalizeChildrenKeys(key, args) {
                    var node = this._dataController.getNodeByKey(key);
                    node && node.children.forEach(childNode => {
                        var index = args.selectedRowKeys.indexOf(childNode.key);
                        if (index >= 0) {
                            args.selectedRowKeys.splice(index, 1)
                        }
                        this._normalizeChildrenKeys(childNode.key, args)
                    })
                },
                _normalizeSelectedRowKeysCore(keys, args, preserve, isSelect) {
                    var that = this;
                    keys.forEach(key => {
                        if (preserve && that.isRowSelected(key) === isSelect) {
                            return
                        }
                        that._normalizeChildrenKeys(key, args);
                        var index = args.selectedRowKeys.indexOf(key);
                        if (isSelect) {
                            if (index < 0) {
                                args.selectedRowKeys.push(key)
                            }
                            args.currentSelectedRowKeys.push(key)
                        } else {
                            if (index >= 0) {
                                args.selectedRowKeys.splice(index, 1)
                            }
                            args.currentDeselectedRowKeys.push(key);
                            that._normalizeParentKeys(key, args)
                        }
                    })
                },
                _normalizeSelectionArgs(args, preserve, isSelect) {
                    var result;
                    var keys = Array.isArray(args.keys) ? args.keys : [args.keys];
                    var selectedRowKeys = this.option("selectedRowKeys") || [];
                    if (keys.length) {
                        result = {
                            currentSelectedRowKeys: [],
                            currentDeselectedRowKeys: [],
                            selectedRowKeys: preserve ? selectedRowKeys.slice(0) : []
                        };
                        this._normalizeSelectedRowKeysCore(keys, result, preserve, isSelect)
                    }
                    return result
                },
                _updateSelectedItems(args) {
                    this.updateSelectionState(args);
                    this.callBase(args)
                },
                _fireSelectionChanged() {
                    if (!this._isSelectionNormalizing) {
                        this.callBase.apply(this, arguments)
                    }
                },
                _isModeLeavesOnly: mode => "leavesOnly" === mode,
                _removeDuplicatedKeys(keys) {
                    var result = [];
                    var processedKeys = {};
                    keys.forEach(key => {
                        if (!processedKeys[key]) {
                            processedKeys[key] = true;
                            result.push(key)
                        }
                    });
                    return result
                },
                _getAllChildKeys(key) {
                    var childKeys = [];
                    var node = this._dataController.getNodeByKey(key);
                    node && treeListCore.foreachNodes(node.children, childNode => {
                        childKeys.push(childNode.key)
                    }, true);
                    return childKeys
                },
                _getAllSelectedRowKeys(keys) {
                    var result = [];
                    keys.forEach(key => {
                        var parentKeys = this._getSelectedParentKeys(key, [], true);
                        var childKeys = this._getAllChildKeys(key);
                        result.push.apply(result, parentKeys.concat([key], childKeys))
                    });
                    result = this._removeDuplicatedKeys(result);
                    return result
                },
                _getParentSelectedRowKeys(keys) {
                    var that = this;
                    var result = [];
                    keys.forEach(key => {
                        var parentKeys = that._getSelectedParentKeys(key, keys);
                        !parentKeys.length && result.push(key)
                    });
                    return result
                },
                _getLeafSelectedRowKeys(keys) {
                    var result = [];
                    var dataController = this._dataController;
                    keys.forEach(key => {
                        var node = dataController.getNodeByKey(key);
                        node && !node.hasChildren && result.push(key)
                    });
                    return result
                },
                isRecursiveSelection() {
                    var selectionMode = this.option("selection.mode");
                    var isRecursive = this.option("selection.recursive");
                    return "multiple" === selectionMode && isRecursive
                },
                updateSelectionState(options) {
                    var removedItemKeys = options.removedItemKeys || [];
                    var selectedItemKeys = options.selectedItemKeys || [];
                    if (this.isRecursiveSelection()) {
                        this._updateSelectionStateCore(removedItemKeys, false);
                        this._updateSelectionStateCore(selectedItemKeys, true)
                    }
                },
                isRowSelected(key, isRecursiveSelection) {
                    var result = this.callBase.apply(this, arguments);
                    isRecursiveSelection = null !== isRecursiveSelection && void 0 !== isRecursiveSelection ? isRecursiveSelection : this.isRecursiveSelection();
                    if (!result && isRecursiveSelection) {
                        if (key in this._selectionStateByKey) {
                            return this._selectionStateByKey[key]
                        }
                        return false
                    }
                    return result
                },
                getSelectedRowKeys(mode) {
                    if (!this._dataController) {
                        return []
                    }
                    var selectedRowKeys = this.callBase.apply(this, arguments);
                    if (mode) {
                        if (this.isRecursiveSelection()) {
                            selectedRowKeys = this._getAllSelectedRowKeys(selectedRowKeys)
                        }
                        if ("all" !== mode) {
                            if ("excludeRecursive" === mode) {
                                selectedRowKeys = this._getParentSelectedRowKeys(selectedRowKeys)
                            } else if (this._isModeLeavesOnly(mode)) {
                                selectedRowKeys = this._getLeafSelectedRowKeys(selectedRowKeys)
                            }
                        }
                    }
                    return selectedRowKeys
                },
                getSelectedRowsData(mode) {
                    var dataController = this._dataController;
                    var selectedKeys = this.getSelectedRowKeys(mode) || [];
                    var selectedRowsData = [];
                    selectedKeys.forEach(key => {
                        var node = dataController.getNodeByKey(key);
                        node && selectedRowsData.push(node.data)
                    });
                    return selectedRowsData
                },
                refresh() {
                    this._selectionStateByKey = {};
                    return this.callBase.apply(this, arguments)
                }
            }
        },
        views: {
            columnHeadersView: {
                _processTemplate(template, options) {
                    var that = this;
                    var resultTemplate;
                    var renderingTemplate = this.callBase(template, options);
                    var firstDataColumnIndex = that._columnsController.getFirstDataColumnIndex();
                    if (renderingTemplate && "header" === options.rowType && options.column.index === firstDataColumnIndex) {
                        resultTemplate = {
                            render(options) {
                                if ("multiple" === that.option("selection.mode")) {
                                    that.renderSelectAll(options.container, options.model)
                                }
                                renderingTemplate.render(options)
                            }
                        }
                    } else {
                        resultTemplate = renderingTemplate
                    }
                    return resultTemplate
                },
                renderSelectAll($cell, options) {
                    $cell.addClass(TREELIST_SELECT_ALL_CLASS);
                    this._renderSelectAllCheckBox($cell)
                },
                _isSortableElement($target) {
                    return this.callBase($target) && !$target.closest(".".concat(SELECT_CHECKBOX_CLASS)).length
                }
            },
            rowsView: {
                _renderIcons($iconContainer, options) {
                    this.callBase.apply(this, arguments);
                    if (!options.row.isNewRow && "multiple" === this.option("selection.mode")) {
                        this.getController("selection").renderSelectCheckBoxContainer($iconContainer, options)
                    }
                    return $iconContainer
                },
                _rowClick(e) {
                    var $targetElement = $(e.event.target);
                    if (this.isExpandIcon($targetElement)) {
                        this.callBase.apply(this, arguments)
                    } else {
                        originalRowClick.apply(this, arguments)
                    }
                }
            }
        }
    }
}));
