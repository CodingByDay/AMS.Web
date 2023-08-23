﻿/**
* DevExpress Dashboard (_tab-container-item-bindings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabContainerViewModel = void 0;
const ko = require("knockout");
const _utils_1 = require("../../../data/_utils");
const _dashboard_item_bindings_1 = require("../../viewer/_dashboard-item-bindings");
const _element_size_utils_1 = require("../../viewer/_element-size-utils");
const _group_item_bindings_1 = require("../group-item/_group-item-bindings");
const _dashboard_tabs_view_model_1 = require("./_dashboard-tabs-view-model");
ko.bindingHandlers['dx-dashboard-layout-tab-binding'] = {
    init: function (element, valueAccessor, _, __, bindingContext) {
        var _disposables = [];
        var params = ko.unwrap(valueAccessor());
        element.classList.add('dx-dashboard-item-container');
        if (params.ignoreBorder())
            element.classList.add('dx-dashboard-ignore-border');
        let sizeController = params.sizeController;
        _element_size_utils_1.setElementSize(element, sizeController);
        _disposables.push(params.sizeController.width.subscribe(newValue => { _element_size_utils_1.setElementSize(element, sizeController); }));
        _disposables.push(params.sizeController.height.subscribe(newValue => { _element_size_utils_1.setElementSize(element, sizeController); }));
        _disposables.push(params.ignoreBorder.subscribe(newValue => {
            if (newValue) {
                element.classList.add('dx-dashboard-ignore-border');
            }
            else {
                element.classList.remove('dx-dashboard-ignore-border');
            }
        }));
        var uiStateController = new _dashboard_item_bindings_1.DashboardUIItemStateController(element, params.dashboardItem, params.sizeController, bindingContext, () => {
            var itemViewerAdapter = params.dashboardContext.viewerItemsManager.create(params.dashboardItem, element, params.dashboardContext, params.localContext, viewerItem => {
                _element_size_utils_1.setElementSize(element, sizeController);
                _disposables.push(_element_size_utils_1.createItemSizeUpdater(viewerItem, params.sizeController));
            });
            itemViewerAdapter.initialize();
            return itemViewerAdapter;
        }, ['dx-layout-item-empty-inside-tab']);
        uiStateController.render();
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            _disposables.forEach(d => d.dispose());
            uiStateController.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
class TabContainerViewModel extends _group_item_bindings_1.GroupViewModel {
    constructor(params) {
        super(params);
        this.activeItems = ko.observableArray();
        this._activeItemsUpdateDebounced = _utils_1.debounce(() => {
            this._updateActiveItems();
        }, 1);
        this._updateActiveItems();
        let isItemShownInsteadTabPage = ko.computed(() => {
            let activeLayoutItem = this.layoutItem().items().length > 0 ? this.layoutItem().items()[0] : undefined;
            if (!activeLayoutItem)
                return false;
            return !!activeLayoutItem._parent().viewModel.activeTabPage()
                && activeLayoutItem._parent().viewModel.activeTabPage() !== activeLayoutItem.viewModel.item();
        });
        ko.computed(() => {
            let newPadding = this.defaultPadding;
            if (isItemShownInsteadTabPage()) {
                newPadding = this.layoutItem().isDesignMode() ? 2 : 0;
            }
            this.padding(newPadding);
        });
        this.toDispose(this.layoutItem().items.subscribe(newValue => {
            this.activeItems.removeAll();
            this._activeItemsUpdateDebounced();
        }));
    }
    _updateActiveItems() {
        this.layoutItem().items().forEach(item => {
            this.activeItems.push(item);
        });
    }
}
exports.TabContainerViewModel = TabContainerViewModel;
ko.components.register('dx-dashboard-layout-tab-container', {
    viewModel: TabContainerViewModel,
    template: { element: 'dx-dashboard-layout-tab-container' }
});
ko.components.register('dashboard-layout-tabs', {
    viewModel: {
        createViewModel: function (params, componentInfo) {
            return new _dashboard_tabs_view_model_1.DashboardTabsViewModel(params.layoutItem, params.headerHeight, componentInfo.element);
        }
    },
    template: { element: 'dx-dashboard-layout-tabs' }
});
