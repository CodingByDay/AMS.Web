﻿/**
* DevExpress Dashboard (_tree-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeViewFilterElement = exports.cssTreeViewClassNames = void 0;
const tree_list_1 = require("devextreme/ui/tree_list");
const tree_view_1 = require("devextreme/ui/tree_view");
const _filter_element_data_controller_1 = require("../../../data/data-controllers/_filter-element-data-controller");
const _default_1 = require("../../../data/localization/_default");
const special_values_1 = require("../../../data/special-values");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _utils_1 = require("../../../data/_utils");
const legacy_settings_1 = require("../../legacy-settings");
const _base_element_1 = require("./_base-element");
exports.cssTreeViewClassNames = {
    borderVisible: 'dx-treeview-border-visible',
    topBorder: 'dx-dashboard-top-border',
    item: 'dx-dashboard-tree-item'
};
class treeViewFilterElement extends _base_element_1.filterElementBaseItem {
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    get filterDataController() { return this._dataController; }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        var selection = this._dataController.selection;
        if (!legacy_settings_1.LegacySettings.useLegacyTreeView && this.widget != null && this.widget.getSelectedRowKeys('leavesOnly').sort().toString() !== selection.sort().toString()) {
            this._lock();
            this.widget.selectRows(selection).always(() => this._unlock());
        }
    }
    _generateInnerBorderClassesUnsafe(element) {
        var classes = super._generateInnerBorderClassesUnsafe(element);
        if (!this._isPaneEmpty()) {
            classes.push(exports.cssTreeViewClassNames.item);
        }
        if (element) {
            if (this._isPaneEmpty()) {
                element.classList.remove(exports.cssTreeViewClassNames.item);
            }
            else {
                element.classList.add(exports.cssTreeViewClassNames.item);
            }
        }
        return classes;
    }
    _clearSelectionUnsafe() {
        if (!!this.options.useNeutralFilterMode) {
            this._lock();
            this.widget.selectRows([]).always(() => this._unlock());
        }
    }
    renderContentUnsafe(element, changeExisting, afterRenderCallback) {
        super.renderContentUnsafe(element, changeExisting, afterRenderCallback);
        var widgetElement = _jquery_helpers_1.$unwrap(this.widget.element());
        if (legacy_settings_1.LegacySettings.useLegacyTreeView && this._isPaneEmpty() && this.visualMode !== 'content') {
            widgetElement.classList.add(exports.cssTreeViewClassNames.borderVisible);
        }
        else {
            widgetElement.classList.remove(exports.cssTreeViewClassNames.borderVisible);
        }
        return false;
    }
    _getWidgetName() {
        return legacy_settings_1.LegacySettings.useLegacyTreeView ? 'dxTreeView' : 'dxTreeList';
    }
    _createWidget(div, opts) {
        return legacy_settings_1.LegacySettings.useLegacyTreeView ? new tree_view_1.default(div, opts) : new tree_list_1.default(div, opts);
    }
    _getOptions(includeActions) {
        var that = this;
        return legacy_settings_1.LegacySettings.useLegacyTreeView ?
            {
                items: that._dataController.dataSource,
                width: '100%',
                height: '100%',
                keyExpr: 'key',
                hoverStateEnabled: false,
                scrollDirection: 'both',
                showCheckBoxesMode: 'selectAll',
                rootValue: null,
                selectAllText: _localizer_1.ALL_ELEMENT.text,
                selectNodesRecursive: true,
                onSelectionChanged: includeActions ? e => that._raiseItemClick(e.component.getNodes()) : undefined,
                encodeNoDataText: true,
                noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
            } :
            {
                dataSource: that._dataController.dataSource,
                itemsExpr: 'items',
                dataStructure: 'tree',
                columns: [{
                        caption: _localizer_1.ALL_ELEMENT.text,
                        dataField: 'text',
                        encodeHtml: that._isEncodeHtml()
                    }],
                selection: {
                    allowSelectAll: true,
                    mode: 'multiple',
                    recursive: true
                },
                scrolling: {
                    mode: 'virtual'
                },
                sorting: {
                    mode: 'none'
                },
                searchPanel: {
                    placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.SearchNullValuePrompt),
                    visible: this._enableSearch,
                    width: '100%',
                    searchVisibleColumnsOnly: true
                },
                autoExpandAll: that.options.ViewModel.AutoExpandNodes,
                expandNodesOnFiltering: true,
                showRowLines: false,
                showBorders: that.hasParentContainer() && this.visualMode !== 'content',
                width: '100%',
                height: '100%',
                keyExpr: _filter_element_data_controller_1.KEY_EXPR,
                hoverStateEnabled: false,
                rootValue: null,
                noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
                onContentReady: (e) => {
                    let scrollable = e.component.getScrollable();
                    if (scrollable) {
                        scrollable.off('scroll', this._onScrollChanged);
                        scrollable.on('scroll', this._onScrollChanged);
                    }
                },
                onEditorPrepared: (e) => {
                    _jquery_helpers_1.$unwrap(e.editorElement).classList.remove('dx-treelist-checkbox-size');
                },
                onSelectionChanged: includeActions ? e => {
                    if (!this._isLocked()) {
                        if (e.currentSelectedRowKeys.length > 0 && e.currentDeselectedRowKeys.length > 0)
                            throw new Error('TREEVIEW has an incorrect selection');
                        this._raiseItemClick(this._getSelectedBranches(e.currentSelectedRowKeys.length > 0 ? e.currentSelectedRowKeys : e.currentDeselectedRowKeys, e.currentSelectedRowKeys.length > 0));
                    }
                } : undefined
            };
    }
    _fillChildren(node, branch, isSelected, branches, hash) {
        node.children && node.children.forEach(childNode => {
            const childNodeBranch = branch.slice();
            childNodeBranch.push(childNode.data.value);
            this._fillChildren(childNode, childNodeBranch, isSelected, branches, hash);
        });
        if (!node.children || !node.children.length) {
            const nullValueItemsCount = this.dataController.multiData ? this.dataController.multiData.getDimensions().length - branch.length : 0;
            for (let i = 0; i < nullValueItemsCount; i++) {
                branch.push(special_values_1.specialValues.olapNullValueGuid);
            }
            if ((isSelected && !!hash[branch]) || (!isSelected && !hash[branch]))
                return true;
            branches[branch] = branch;
        }
    }
    _getSelectedBranches(keys, isSelected = false) {
        const branches = {};
        const hash = _utils_1.wrapHash(this._getSelectedValues());
        for (let i = 0; i < keys.length; i++) {
            let treeList = this.widget;
            const node = treeList.getNodeByKey(keys[i]);
            const branch = [node.data.value];
            let curNode = node;
            while (curNode.parent && curNode.level > 0) {
                branch.unshift(curNode.parent.data.value);
                curNode = curNode.parent;
            }
            this._fillChildren(node, branch, isSelected, branches, hash);
        }
        return Object.keys(branches).map(key => branches[key]);
    }
    _onScrollChanged(e) {
        if (e.scrollOffset.top !== 0) {
            _jquery_helpers_1.$unwrap(e.element).classList.add(exports.cssTreeViewClassNames.topBorder);
        }
        else {
            _jquery_helpers_1.$unwrap(e.element).classList.remove(exports.cssTreeViewClassNames.topBorder);
        }
    }
}
exports.treeViewFilterElement = treeViewFilterElement;
