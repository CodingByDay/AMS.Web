﻿/**
* DevExpress Dashboard (_dashboard-tabs-view-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTabsViewModel = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const disposable_object_1 = require("../../../model/disposable-object");
const _knockout_utils_1 = require("../../../model/internal/_knockout-utils");
const _tab_header_calculator_1 = require("../../../viewer-parts/layout/_tab-header-calculator");
const _base_item_1 = require("../../../viewer-parts/viewer-items/_base-item");
const _popup_menu_creator_1 = require("../../../viewer-parts/widgets/caption-toolbar/_popup-menu-creator");
const _interfaces_1 = require("../../internal/_interfaces");
const _dashboard_item_bindings_1 = require("../../viewer/_dashboard-item-bindings");
const _element_size_utils_1 = require("../../viewer/_element-size-utils");
class DashboardTabsViewModel extends disposable_object_1.DisposableObject {
    constructor(layoutItem, headerHeight, element) {
        super();
        this.layoutItem = layoutItem;
        this.headerHeight = headerHeight;
        this.element = element;
        this.showMenu = ko.observable(false);
        this.tabPageBindings = ko.observableArray([]).extend({ deferred: true });
        this.selectedItemKeys = ko.observableArray([]);
        this.showAddButton = ko.computed(() => {
            return this.layoutItem.isDesignMode() && this.showCaption;
        });
        this._defaultButtonWidth = 34;
        this._tabsInfoCache = {};
        this._toolbarCache = {};
        if (this.viewModel.item()) {
            this.toDispose(_knockout_utils_1.subscribeAndPerform(this.viewModel.item().showCaption, (newValue) => {
                headerHeight(newValue ? _dashboard_item_bindings_1.DashboardItemHeaderHeight : 0);
            }));
        }
        this._initialize();
    }
    get viewModel() {
        return this.layoutItem.viewModel;
    }
    get showCaption() {
        return this.viewModel.item() ? this.viewModel.item().showCaption() : true;
    }
    get _containerSizeController() {
        return this.layoutItem.sizeController;
    }
    toggleMenu(bindings, args) {
        let menu = this._createMenuToolbarItem(this.headersViewModel.leftVisibleIndex, this.headersViewModel.rightVisibleIndex);
        let boundaryContainer = _base_item_1.getControlContainer(this.element);
        let container = this.element.firstElementChild;
        _popup_menu_creator_1.PopupMenuCreator.toggleMenu(args.currentTarget, menu, container, boundaryContainer);
    }
    createTabPage() {
        this.viewModel.createTabPage();
    }
    onSelectionChanged(e) {
        if (e.addedItems.length > 0) {
            var tabPageBinding = this.tabPageBindings().filter(tabPageBinding => tabPageBinding.id === e.addedItems[0].id)[0];
            if (tabPageBinding && tabPageBinding.pageDashboardItem !== this.viewModel.activeTabPage()) {
                this.viewModel.activeTabPage(tabPageBinding.pageDashboardItem);
            }
        }
    }
    _syncTabPageBindings(childItems) {
        let subscriptions = [];
        const createTabPageBindings = (pageViewModels) => {
            let tabPageBindings = pageViewModels
                .filter(pageViewModel => pageViewModel.hasItem())
                .map(pageViewModel => this._createPageBinding(pageViewModel.item, pageViewModel.model));
            this.tabPageBindings(tabPageBindings);
        };
        this.toDispose(_knockout_utils_1.safeSubscribe({ childItems }, (args) => {
            let pageViewModels = args.childItems.map(pageLayoutItem => pageLayoutItem._createViewModel());
            subscriptions.forEach(d => d.dispose());
            subscriptions = pageViewModels.map(pageViewModel => pageViewModel.item.subscribe(() => createTabPageBindings(pageViewModels)));
            createTabPageBindings(pageViewModels);
            return {
                dispose: () => subscriptions.forEach(d => d.dispose())
            };
        }));
    }
    _initialize() {
        this.element.setAttribute('data-layout-item-name', this.viewModel.dashboardItem());
        _element_size_utils_1.setElementSize(this.element, this._containerSizeController);
        this._syncTabPageBindings(this.viewModel.childItems);
        this.tabPageBindings.subscribe(() => this._updateTabHeaders());
        this._containerSizeController.requestRepaint.add(() => this._onContainerRepaint());
        this.toDispose(this.layoutItem.isDesignMode.subscribe(newValue => {
            this._updateTabHeaders();
        }));
        this.toDispose(_knockout_utils_1.safeSubscribe({
            activeTabPage: this.viewModel.activeTabPage,
            tabPageBindings: this.tabPageBindings
        }, (args) => {
            this.selectedItemKeys(this._getSelectedKeys(args.activeTabPage));
            args.tabPageBindings.forEach((page) => {
                if (this._toolbarCache[page.dashboardItem.componentName()] && args.activeTabPage) {
                    this._toolbarCache[page.dashboardItem.componentName()].disabled = page.id !== args.activeTabPage.componentName();
                }
            });
        }));
    }
    _createMenuToolbarItem(leftVisibleIndex, rightVisibleIndex) {
        let hiddenTabs = [];
        this.viewModel.childItems().forEach((layoutPageItem, i) => {
            let layoutViewModel = layoutPageItem._createViewModel();
            if (layoutViewModel.hasItem()) {
                hiddenTabs.push({
                    name: layoutViewModel.item().name() ? layoutViewModel.item().name() : '',
                    page: layoutPageItem.item
                });
            }
        });
        hiddenTabs.splice(leftVisibleIndex, rightVisibleIndex - leftVisibleIndex + 1);
        return {
            type: 'list',
            items: hiddenTabs.map(tab => tab.name),
            itemClick: (itemData, itemElement, menuItemIndex) => {
                this.viewModel.activeTabPage(hiddenTabs[menuItemIndex].page);
                this._updateTabHeaders();
            }
        };
    }
    _getSelectedKeys(activePage) {
        return activePage ? [activePage.componentName()] : [];
    }
    _createPageBinding(toolbarHolder, pageLayoutItem) {
        return {
            dashboardItem: toolbarHolder(),
            id: pageLayoutItem.dashboardItem(),
            pageDashboardItem: pageLayoutItem.item,
            sizeController: new _interfaces_1.SingleTabItemSizeController(this.layoutItem.sizeController.requestRepaint, ko.observable(0), ko.observable(0)),
            context: this.layoutItem.getContext(),
            localContext: this._prepareLocalContext(this.layoutItem.getLocalContext()),
            ignoreBorder: ko.observable(false)
        };
    }
    _prepareLocalContext(localContext) {
        localContext.viewerItemCreated.add((item, viewerItem) => {
            viewerItem.deferredToolbarRenderingPromise = (itemName, width, height) => {
                var def = _jquery_helpers_1.createJQueryDeferred();
                this._onToolbarUpdated(itemName, width, height, def);
                return def.promise();
            };
        });
        localContext.beforeApplyViewerItemOptions.add((item, options, isCreation) => {
            if (this.viewModel.item()) {
                options.CaptionViewModel.ShowCaption = this.showCaption;
            }
        });
        localContext.boundaryContainer = this.element;
        localContext.createCaptionToolbar = (viewerItem, container, controlContainer, popupContainer, viewOptions) => {
            let toolbar = _base_item_1.createDefaultToolbar(viewerItem, container, controlContainer, popupContainer, viewOptions);
            if (container) {
                this._toolbarCache[viewerItem.options.Name] = toolbar;
                let binding = this.tabPageBindings().filter(binding => binding.dashboardItem.componentName() === viewerItem.options.Name)[0];
                toolbar.disabled = !this.viewModel.activeTabPage() || binding.id !== this.viewModel.activeTabPage().componentName();
            }
            return toolbar;
        };
        localContext.viewerItemDispose.add((item, viewerItem) => {
            delete this._tabsInfoCache[item.componentName()];
            delete this._toolbarCache[item.componentName()];
        });
        return localContext;
    }
    _onContainerRepaint() {
        _element_size_utils_1.setElementSize(this.element, this._containerSizeController);
        this._updateTabHeaders();
    }
    _onToolbarUpdated(itemName, width, height, def) {
        let page = this.tabPageBindings().filter(page => page.dashboardItem.componentName() === itemName)[0];
        this.headerHeight(Math.max(this.headerHeight(), height));
        if (page)
            this._tabsInfoCache[page.id] = {
                width: width,
                deferredRender: def
            };
        this._updateTabHeaders();
    }
    _updateTabHeaders() {
        let tabHeadersWidth = this.tabPageBindings().map((page) => this._tabsInfoCache[page.id] ? this._tabsInfoCache[page.id].width : 100);
        let tabHeadersDeferredRender = this.tabPageBindings().map((page) => this._tabsInfoCache[page.id] ? this._tabsInfoCache[page.id].deferredRender : _jquery_helpers_1.createJQueryDeferred());
        if (tabHeadersWidth.length > 0) {
            let buttonsWidth = this.showAddButton() ? this._defaultButtonWidth : 0;
            let activeTabIndex = Math.max(0, this.viewModel.activeTabIndex());
            this.headersViewModel = _tab_header_calculator_1.calcTabHeadersWidth(tabHeadersWidth, this._containerSizeController.getWidth() - buttonsWidth, activeTabIndex, this.showCaption);
            this.showMenu(this.showCaption && this.headersViewModel.widths.some(width => width === 0));
            if (this.showMenu()) {
                buttonsWidth += this._defaultButtonWidth;
                this.headersViewModel = _tab_header_calculator_1.calcTabHeadersWidth(tabHeadersWidth, this._containerSizeController.getWidth() - buttonsWidth, activeTabIndex, this.showCaption);
            }
            this.tabPageBindings().forEach((page, index) => page.ignoreBorder(index === this.headersViewModel.rightVisibleIndex && buttonsWidth === 0));
            this.headersViewModel.widths.forEach((width, i) => {
                this.tabPageBindings()[i].sizeController.width(width);
                this.tabPageBindings()[i].sizeController.height(this.headerHeight());
                if (i >= this.headersViewModel.leftVisibleIndex && i <= this.headersViewModel.rightVisibleIndex) {
                    tabHeadersDeferredRender[i].resolve();
                }
            });
        }
    }
}
exports.DashboardTabsViewModel = DashboardTabsViewModel;
