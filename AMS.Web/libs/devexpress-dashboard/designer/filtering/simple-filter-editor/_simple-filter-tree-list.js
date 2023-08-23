﻿/**
* DevExpress Dashboard (_simple-filter-tree-list.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SimpleFilterTreeList = void 0;
const array_store_1 = require("devextreme/data/array_store");
const custom_store_1 = require("devextreme/data/custom_store");
const check_box_1 = require("devextreme/ui/check_box");
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _utils_1 = require("../../../data/_utils");
const model_1 = require("../../../model");
const treeRootValue = '0';
class SimpleFilterTreeList extends model_1.DisposableObject {
    constructor(dashboardItem, dataSourceBrowser) {
        super();
        this.dashboardItem = dashboardItem;
        this.dataSourceBrowser = dataSourceBrowser;
        this._dataCache = [];
        this.template = {
            name: 'dx-simple-filter-tree-list',
            data: {
                editorOptions: ko.observable(undefined),
                visible: ko.observable(false)
            }
        };
    }
    reload(field) {
        this._dataCache = [];
        this.template.data.editorOptions(this._getTreeListOptions(this._getStore(field), field && !field.isGroup()));
    }
    show(field) {
        this.template.data.visible(true);
        this.reload(field);
    }
    hide() {
        this.template.data.visible(false);
        this.template.data.editorOptions(undefined);
    }
    getTreeListItems() {
        return this._dataCache;
    }
    dispose() {
        this.dispose();
        this._dataCache = [];
    }
    _getBranchIndexes(filterItems, initialParentId) {
        let branchIndexes = [];
        let parentId = initialParentId;
        while (parentId !== treeRootValue) {
            var index = _utils_1.findIndex(filterItems, filterItem => filterItem.id == parentId);
            branchIndexes.push(index);
            parentId = filterItems[index].parentId;
        }
        return branchIndexes.reverse();
    }
    _getStore(selectedField) {
        return new custom_store_1.default({
            load: (options) => {
                if (!selectedField) {
                    return undefined;
                }
                let result = _jquery_helpers_1.createJQueryDeferred();
                if (options.filter) {
                    new array_store_1.default({ data: this._dataCache })
                        .load({ filter: options.filter })
                        .then((data) => {
                        if (data && data.length) {
                            result.resolve(data);
                        }
                        else if (options.filter[0] === 'parentId') {
                            let parentId = (options.filter && options.filter[0] === 'parentId') ? options.filter[2] : treeRootValue;
                            let pathComponents = !!parentId ? parentId.split('.') : undefined;
                            let filterItemsState = this.getTreeListItems();
                            let branch = this._getBranchIndexes(filterItemsState, parentId);
                            this.dataSourceBrowser.getDimensionFilterItems(this.dashboardItem, selectedField.dataMember(), filterItemsState.map(i => i.data), branch).done(expandedItems => {
                                let items = expandedItems.map((item, index) => {
                                    return {
                                        id: parentId + '.' + index,
                                        parentId: parentId,
                                        displayName: item.IsBlank ? '(Blank)' : item.Text,
                                        hasItems: selectedField.hasItems(pathComponents),
                                        data: item
                                    };
                                });
                                var parentIndex = _utils_1.findIndex(this._dataCache, item => item.id === parentId);
                                this._dataCache.splice(parentIndex + 1, 0, ...items);
                                result.resolve(items);
                            });
                        }
                        else {
                            result.resolve([]);
                        }
                    });
                }
                return _jquery_helpers_1.$promiseAdapter(result.promise());
            }
        });
    }
    _getTreeListOptions(store, searchEnabled) {
        return {
            dataSource: { store: store },
            noDataText: '',
            encodeNoDataText: true,
            rootValue: treeRootValue,
            dataStructure: 'plain',
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            hasItemsExpr: 'hasItems',
            columns: [{
                    caption: _default_1.getLocalizationById('DashboardStringId.FilterElementShowAllItem'),
                    dataField: 'displayName',
                }],
            selection: {
                allowSelectAll: true,
                mode: 'multiple',
                recursive: true
            },
            scrolling: {
                mode: 'virtual'
            },
            searchPanel: {
                placeholder: _default_1.getLocalizationById('DashboardStringId.SearchNullValuePrompt'),
                visible: searchEnabled,
                width: '100%',
                searchVisibleColumnsOnly: true
            },
            remoteOperations: {
                filtering: true
            },
            showRowLines: false,
            onEditorPrepared: (e) => {
                _jquery_helpers_1.$unwrap(e.editorElement).classList.remove('dx-treelist-checkbox-size');
            },
            onSelectionChanged: (e) => {
                e.component.forEachNode(node => {
                    node.data.data.IsChecked = e.component.isRowSelected(node.key);
                });
            },
            onCellPrepared: (e) => {
                if (e.rowType === 'data' && (e.data.data.IsChecked === null || e.data.data.IsChecked === undefined)) {
                    let editor = check_box_1.default.getInstance(_jquery_helpers_1.$unwrap(e.cellElement).querySelector('.dx-select-checkbox'));
                    if (editor) {
                        editor.option('value', undefined);
                    }
                }
            },
            onNodesInitialized: (e) => {
                let selectedKeys = [];
                e.component.forEachNode(node => {
                    if (node.data.data.IsChecked) {
                        selectedKeys.push(node.key);
                    }
                });
                e.component.selectRows(selectedKeys, false);
            },
            onInitialized: (e) => {
                this.treeList = e.component;
            },
        };
    }
}
exports.SimpleFilterTreeList = SimpleFilterTreeList;
