﻿/**
* DevExpress Dashboard (_combo-box-element.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comboBoxFilterElement = exports.cssComboBoxClassNames = void 0;
const string_1 = require("devextreme/core/utils/string");
const select_box_1 = require("devextreme/ui/select_box");
const tag_box_1 = require("devextreme/ui/tag_box");
const _filter_element_data_controller_1 = require("../../../data/data-controllers/_filter-element-data-controller");
const _default_1 = require("../../../data/localization/_default");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _localization_ids_1 = require("../../../data/_localization-ids");
const _localizer_1 = require("../../../data/_localizer");
const _render_helper_1 = require("../../widgets/_render-helper");
const _base_element_1 = require("./_base-element");
var MULTITAG_COUNT = 9;
exports.cssComboBoxClassNames = {
    item: 'dx-dashboard-combobox-filter-item',
    multiText: 'dx-dashboard-filter-item-multitext',
    margins: 'dx-dashboard-combobox-margins'
};
class comboBoxFilterElement extends _base_element_1.filterElementBaseItem {
    constructor(container, options) {
        super(container, options);
        this._isFixedHeight = true;
    }
    get dataController() { return this._dataController; }
    set dataController(dataController) { this._dataController = dataController; }
    get filterDataController() { return this._dataController; }
    get _shouldApplySelectionOnInitialRender() {
        return false;
    }
    _setSelectionUnsafe(values) {
        super._setSelectionUnsafe(values);
        this._lock();
        try {
            this.widget.option('value', this._getSelectedKeys());
        }
        finally {
            this._unlock();
        }
    }
    _clearSelectionUnsafe() {
        if (!!this.options.useNeutralFilterMode) {
            this._lock();
            try {
                this.widget.option('value', null);
            }
            finally {
                this._unlock();
            }
        }
    }
    get _isBottomFloatingToolbarPosition() {
        return false;
    }
    get _allowPreview() {
        return true;
    }
    _getWidgetName() {
        return this.isMultiSelectable ? 'dxTagBox' : 'dxSelectBox';
    }
    _createWidgetDiv() {
        let div = super._createWidgetDiv();
        if (this.visualMode === 'content')
            div.classList.add(exports.cssComboBoxClassNames.margins);
        return div;
    }
    _createWidget(div, opts) {
        return this.isMultiSelectable ? new tag_box_1.default(div, opts) : new select_box_1.default(div, opts);
    }
    _getMinContentHeight() {
        var element = document.createElement('div');
        this._createWidget(element, this._getOptions(false));
        return _render_helper_1.RenderHelper.getElementBox(element).height;
    }
    _generateInnerBorderClassesUnsafe(element) {
        var classes = super._generateInnerBorderClassesUnsafe(element);
        if (!this._isPaneEmpty()) {
            classes.push(exports.cssComboBoxClassNames.item);
        }
        if (element) {
            if (this._isPaneEmpty()) {
                element.classList.remove(exports.cssComboBoxClassNames.item);
            }
            else {
                element.classList.add(exports.cssComboBoxClassNames.item);
            }
        }
        return classes;
    }
    _getSelectedKeys() {
        const selection = this._dataController.selection;
        if (this.isMultiSelectable) {
            return selection.map(this._dataController.getDataSourceItemKey);
        }
        else {
            return selection && selection.length ? this._dataController.getDataSourceItemKey(selection[0]) : null;
        }
    }
    _getOptions(includeActions) {
        let itemTemplate = (item, _, element) => {
            var node = _jquery_helpers_1.$unwrap(element);
            var expr = this._getDisplayExpr();
            if (expr === 'html') {
                node.innerHTML = item[expr];
            }
            else {
                node.innerText = item[expr];
            }
        };
        let multiTagPreparingHandler = (args) => {
            if (this._dataController.dataSource.length === args.selectedItems.length)
                args.text = _localizer_1.ALL_ELEMENT.text;
            else if (args.selectedItems.length < MULTITAG_COUNT)
                args.cancel = true;
            else
                args.text = string_1.format(_default_1.getLocalizationById('DashboardWebStringId.FilterElementCheckedComboBoxSelected'), args.selectedItems.length);
        };
        let tagBoxSelectionChangedHandler = e => {
            this._raiseItemClick(e.removedItems.length > 0 ? e.removedItems : e.addedItems);
        };
        let selectBoxValueChangedHandler = e => {
            if (e.value != null) {
                const selectedItem = this._dataController.getDataSourceItemByKey(e.value);
                this._raiseItemClick([selectedItem]);
            }
        };
        let options = {
            dataSource: this.getDataSource(),
            displayExpr: this._getDisplayExpr(),
            valueExpr: _filter_element_data_controller_1.KEY_EXPR,
            value: this._getSelectedKeys(),
            placeholder: _localizer_1.localizer.getString(_localization_ids_1.localizationId.FilterElementRadioComboBoxNoDataCaption),
            encodeNoDataText: true,
            noDataText: _default_1.getLocalizationById('DashboardStringId.FilterElementNoDataToDisplay'),
            itemTemplate,
            onMultiTagPreparing: multiTagPreparingHandler,
            maxDisplayedTags: 1,
            selectAllMode: 'allPages',
            searchEnabled: this._enableSearch
        };
        let addtionalOptions = this.isMultiSelectable ?
            {
                onSelectionChanged: includeActions ? tagBoxSelectionChangedHandler : undefined,
                showSelectionControls: this.isMultiSelectable,
                showDropDownButton: true,
                multiline: false
            }
            : {
                onValueChanged: includeActions ? selectBoxValueChangedHandler : undefined
            };
        return Object.assign(Object.assign(Object.assign({}, options), addtionalOptions), { keyExpr: _filter_element_data_controller_1.KEY_EXPR, multiSelectEnabled: this.isMultiSelectable, selectAllText: _localizer_1.ALL_ELEMENT.text, pageLoadMode: 'scrollBottom', dropDownOptions: {
                container: this.controlContainer
            } });
    }
    _resizeUnsafe() {
        super._resizeUnsafe();
        this.widget.repaint();
    }
}
exports.comboBoxFilterElement = comboBoxFilterElement;
