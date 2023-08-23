﻿/**
* DevExpress Dashboard (_mobile-layout.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLayoutViewModel = exports.dashboardTitleKey = exports.groupWithoutCaptionItemKey = exports.ungroupedItemKey = exports.groupLayoutItems = exports.DashboardMobileLayoutItem = exports.DashboardMobileLayoutController = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const index_internal_1 = require("../../data/index.internal");
const data_dashboard_item_1 = require("../../model/items/data-dashboard-item");
const date_filter_item_1 = require("../../model/items/filter-items/date-filter-item");
const filter_element_item_base_1 = require("../../model/items/filter-items/filter-element-item-base");
const dashboard_tab_page_1 = require("../../model/items/tab-container-item/dashboard-tab-page");
const tab_container_item_1 = require("../../model/items/tab-container-item/tab-container-item");
const dashboard_layout_group_1 = require("../../model/layout/dashboard-layout-group");
const _dashboard_title_view_constants_1 = require("../../viewer-parts/title/_dashboard-title-view-constants");
const _caption_toolbar_css_classes_1 = require("../../viewer-parts/widgets/caption-toolbar/_caption-toolbar-css-classes");
const _mobile_layout_caption_toolbar_1 = require("../../viewer-parts/widgets/caption-toolbar/_mobile-layout-caption-toolbar");
const caption_toolbar_options_1 = require("../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options");
const _docking_layout_fullscreen_item_1 = require("../docking-layout/_docking-layout-fullscreen-item");
const _viewer_interfaces_1 = require("../viewer/_viewer-interfaces");
const _dashboard_title_model_1 = require("../viewer/title/_dashboard-title-model");
const _title_component_1 = require("../viewer/title/_title-component");
const _mobile_layout_fullscreen_item_1 = require("./_mobile-layout-fullscreen-item");
const _mobile_layout_item_1 = require("./_mobile-layout-item");
const _mobile_layout_master_filters_editor_1 = require("./_mobile-layout-master-filters-editor");
class DashboardMobileLayoutController {
    constructor(dashboard, dashboardContext, findExtension, _encodeHtml = false, viewerApi) {
        this.dashboard = dashboard;
        this.dashboardContext = dashboardContext;
        this._encodeHtml = _encodeHtml;
        this.selectedDashboardItem = ko.computed(() => null);
        this.emptyItemTemplates = ko.observableArray();
        this.selectedLayoutItem = ko.computed(() => null);
        this.visibleItemsProvider = null;
        var fullScreenItemLocalContext = new _viewer_interfaces_1.DashboardItemContext({
            addContextToolbarItems: (options) => {
                var dashboardItem = this.fullscreenItemModel.dashboardItem();
                if (dashboardItem instanceof data_dashboard_item_1.DataDashboardItem)
                    this.masterFiltersEditorModel.addFilterButton(options.stateItems, dashboardItem);
                options.navigationItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.backButton,
                    type: 'button',
                    template: () => {
                        let div = document.createElement('div');
                        div.classList.add(_caption_toolbar_css_classes_1.cssClasses.flexParent, _caption_toolbar_css_classes_1.cssClasses.ellipsisText);
                        let icon = _utils_1.createSvgIconElement(_caption_toolbar_css_classes_1.cssClasses.iconBack);
                        let textDiv = document.createElement('div');
                        textDiv.classList.add(_caption_toolbar_css_classes_1.cssClasses.buttonBack, _caption_toolbar_css_classes_1.cssClasses.truncated);
                        textDiv.innerText = index_internal_1.getLocalizationById('DashboardWebStringId.MobileLayout.Back');
                        div.append(icon, textDiv);
                        return div;
                    },
                    click: () => {
                        this.fullscreenItemModel.restoreDownItem();
                    }
                });
            },
            createCaptionToolbar: (viewerItem, container, controlContainer, popupContainer, viewOptions) => {
                return new _mobile_layout_caption_toolbar_1.MobileLayoutCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, _caption_toolbar_css_classes_1.cssClasses.caption, viewOptions.captionToolbarSeparatorRequired);
            },
            viewerItemCreated: (dashboardItem, viewerItem) => _mobile_layout_item_1.customizeMobileViewerItems(viewerItem),
            beforeApplyViewerItemOptions: (item, options, isCreation) => {
                options.ParentContainer = undefined;
                _mobile_layout_item_1.setCardAutoArrangementMode(item, options);
            },
            itemCreatingType: 'secondary'
        });
        var exportExtension = findExtension('dashboardExport');
        if (exportExtension) {
            exportExtension._initializeSecondaryExportItem(fullScreenItemLocalContext);
        }
        this.fullscreenItemModel = new _docking_layout_fullscreen_item_1.FullscreenItemModel(dashboardContext, fullScreenItemLocalContext);
        this.masterFiltersEditorModel = new _mobile_layout_master_filters_editor_1.MasterFiltersEditorModel();
        this.dashboardTitleContext = new _title_component_1.DashboardTitleContext(this._encodeHtml, findExtension, false, viewerApi);
        let flatItems = this._getDashboardItemsInLayoutOrder(dashboard.layout());
        this.items = groupLayoutItems(flatItems).map(item => new DashboardMobileLayoutItem(item.itemComponentNames.map(itemName => dashboard.findItem(itemName))
            .filter(item => !(item instanceof filter_element_item_base_1.FilterElementItemBase) && !(item instanceof date_filter_item_1.DateFilterItem)), item.groupName))
            .filter(mobileLayoutItem => mobileLayoutItem.dashboardItems.length > 0);
    }
    get allowMaximizeItems() { return true; }
    set allowMaximizeItems(value) { }
    get fullscreenItemProvider() {
        return this.fullscreenItemModel;
    }
    _getDashboardItemsInLayoutOrder(layoutItem) {
        var result = [];
        if (layoutItem.dashboardItem() && !(layoutItem instanceof dashboard_layout_group_1.DashboardLayoutGroup)) {
            let parentContainer = layoutItem.item && layoutItem.item.parentContainer() ? this.dashboard.findItem(layoutItem.item.parentContainer()) : undefined;
            let groupName = this._getGroupName(parentContainer);
            result.push({
                groupName: this._getGroupName(parentContainer),
                groupComponentName: this._getGroupComponentName(parentContainer),
                itemComponentName: layoutItem.dashboardItem()
            });
        }
        if (layoutItem instanceof dashboard_layout_group_1.DashboardLayoutGroup) {
            result = result.concat(layoutItem.childNodes().reduce((acc, value) => acc.concat(this._getDashboardItemsInLayoutOrder(value)), []));
        }
        return result;
    }
    _getGroupName(parentContainer) {
        if (parentContainer) {
            let showCaption = parentContainer instanceof dashboard_tab_page_1.DashboardTabPage ? this._getParentTabContainer(parentContainer).showCaption() : parentContainer.showCaption();
            return showCaption ? parentContainer.name() : parentContainer.name() + exports.groupWithoutCaptionItemKey;
        }
        else {
            return exports.ungroupedItemKey;
        }
    }
    _getGroupComponentName(parentContainer) {
        if (parentContainer) {
            let showCaption = parentContainer instanceof dashboard_tab_page_1.DashboardTabPage ? this._getParentTabContainer(parentContainer).showCaption() : parentContainer.showCaption();
            return showCaption ? parentContainer.componentName() : parentContainer.componentName() + exports.groupWithoutCaptionItemKey;
        }
        else {
            return exports.ungroupedItemKey;
        }
    }
    _getParentTabContainer(tabPage) {
        return this.dashboard.items()
            .filter(item => item instanceof tab_container_item_1.TabContainerItem)
            .filter(tabContainer => tabContainer.tabPages().indexOf(tabPage) !== -1)[0];
    }
}
exports.DashboardMobileLayoutController = DashboardMobileLayoutController;
class DashboardMobileLayoutItem {
    constructor(dashboardItems, groupName) {
        this.dashboardItems = dashboardItems;
        this.groupName = groupName;
    }
}
exports.DashboardMobileLayoutItem = DashboardMobileLayoutItem;
function groupLayoutItems(flatItems) {
    let groupedItems = [];
    let previousGroupedItem;
    flatItems.forEach(item => {
        if (previousGroupedItem && previousGroupedItem.groupComponentName === item.groupComponentName) {
            previousGroupedItem.itemComponentNames.push(item.itemComponentName);
        }
        else {
            previousGroupedItem = {
                groupName: item.groupName,
                groupComponentName: item.groupComponentName,
                itemComponentNames: [item.itemComponentName]
            };
            groupedItems.push(previousGroupedItem);
        }
    });
    return groupedItems;
}
exports.groupLayoutItems = groupLayoutItems;
ko.components.register('dashboard-mobile-layout-widget', {
    viewModel: {
        createViewModel: function (params, componentInfo) {
            var disposables = [];
            var layoutModel = params.componentArgs;
            let dashboard = ko.unwrap(layoutModel.dashboard);
            var toolbarHeight = ko.observable(_dashboard_title_view_constants_1.titleHeight);
            var contentToolbarHeight = ko.observable(contentToolbarHeight);
            let viewModel = {};
            let element = componentInfo.element;
            let currentWidth = _jquery_helpers_1.getWidth(element);
            let currentHeight = _jquery_helpers_1.getHeight(element);
            let titleWidth = ko.observable(currentWidth);
            let repaintRequest = _jquery_helpers_1.createJQueryCallbacks();
            var layoutWidget = null;
            let getListSize = () => ({ width: _jquery_helpers_1.getWidth(element), height: _jquery_helpers_1.getHeight(element) - toolbarHeight() });
            var resizeControl = () => {
                if (_jquery_helpers_1.getWidth(element) != currentWidth || _jquery_helpers_1.getHeight(element) != currentHeight) {
                    if (layoutWidget) {
                        layoutWidget.option(getListSize());
                    }
                    repaintRequest.fire();
                    currentWidth = _jquery_helpers_1.getWidth(element);
                    currentHeight = _jquery_helpers_1.getHeight(element);
                    titleWidth(currentWidth);
                }
            };
            let resizeCallback = () => resizeControl();
            window.addEventListener('resize', resizeCallback);
            var interval = setInterval(() => resizeControl(), 300);
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                clearInterval(interval);
                window.removeEventListener('resize', resizeCallback);
            });
            var customizeToolbarOptions = (options) => {
                options.contentItems = options.contentItems.filter(item => [caption_toolbar_options_1.dashboardToolbarItemNames.titleFilterIcon, caption_toolbar_options_1.dashboardToolbarItemNames.titleFilterText].indexOf(item.name) === -1);
                layoutModel.masterFiltersEditorModel.addFilterButton(options.actionItems, layoutModel.dashboard);
            };
            let titleModel = new _dashboard_title_model_1.DashboardTitleModel(layoutModel.dashboardTitleContext, layoutModel.dashboard, customizeToolbarOptions);
            var actionToolbarViewModel = createToolbarViewModel(ko.computed(() => {
                return {
                    toolbarOptions: customizeActionToolbar(titleModel.toolbarOptions().toolbarOptions),
                    allowHideEmptyToolbar: true
                };
            }), titleWidth, toolbarHeight, layoutModel.dashboardTitleContext, _caption_toolbar_css_classes_1.cssClasses.actionToolbar);
            var contentToolbarViewModel = createToolbarViewModel(ko.computed(() => {
                return {
                    toolbarOptions: customizeContentToolbar(titleModel.toolbarOptions().toolbarOptions),
                    allowHideEmptyToolbar: true
                };
            }), titleWidth, contentToolbarHeight, layoutModel.dashboardTitleContext, _caption_toolbar_css_classes_1.cssClasses.contentToolbar);
            return {
                itemMasterFiltersViewModel: new _mobile_layout_master_filters_editor_1.ItemMasterFiltersViewModel(layoutModel.masterFiltersEditorModel, layoutModel.dashboardContext, repaintRequest),
                fullscreenItemViewModel: _mobile_layout_fullscreen_item_1.createFullscreenItemViewModel(layoutModel.fullscreenItemModel, layoutModel.masterFiltersEditorModel, repaintRequest),
                titleViewModel: actionToolbarViewModel,
                layoutViewModel: exports.createLayoutViewModel(element, getListSize(), layoutModel.dashboardContext, repaintRequest, layoutModel.items, layoutModel.fullscreenItemModel, (widget) => layoutWidget = widget, contentToolbarViewModel, layoutModel.dashboard.title.visible())
            };
        }
    },
    template: { element: 'dx-dashboard-mobile-layout-widget' }
});
exports.ungroupedItemKey = '_dx_dashboard_ungrouped_mobile_layout_item_key';
exports.groupWithoutCaptionItemKey = '_dx_dashboard_group_without_caption_mobile_layout_item_key';
exports.dashboardTitleKey = '_dx_dashboard_mobile_layout_title_key';
let mobileLayoutCssClasses = {
    ungroupedItem: 'dx-dashboard-ungrouped-item',
    dashboardDisplayNone: 'dx-dashboard-display-none',
    groupWithoutCaption: 'dx-dashboard-group-without-caption'
};
var createToolbarViewModel = (options, width, height, context, className) => {
    return {
        options: options,
        width: width,
        height: height,
        encodeHtml: context.encodeHtml,
        className: className
    };
};
var customizeActionToolbar = (options) => {
    return {
        staticItems: options.navigationItems,
        actionItems: options.actionItems,
        stateItems: options.stateItems,
        navigationItems: []
    };
};
var customizeContentToolbar = (options) => {
    return {
        staticItems: options.staticItems,
        actionItems: [],
        stateItems: [],
        navigationItems: []
    };
};
var createLayoutViewModel = (element, listSize, dashboardContext, repaintRequest, items, fullscreenItemModel, getWidgetCallback, titleViewModel, titleVisible) => {
    var title = {
        data: titleViewModel,
        name: 'dx-dashboard-mobile-title'
    };
    let layoutItems = items.map(layoutItem => {
        let items = layoutItem.dashboardItems.map(dashboardItem => {
            return {
                data: new _mobile_layout_item_1.MobileLayoutItemViewModel(dashboardContext, repaintRequest, dashboardItem, fullscreenItemModel),
                name: 'dx-dashboard-mobile-layout-item'
            };
        });
        return {
            key: layoutItem.groupName,
            items: items
        };
    });
    return Object.assign(Object.assign({ indicateLoading: false }, listSize), { activeStateEnabled: false, focusStateEnabled: false, hoverStateEnabled: false, grouped: true, dataSource: (titleVisible ? [{
                key: exports.dashboardTitleKey,
                items: [title]
            }] : []).concat(layoutItems), onContentReady: (e) => {
            getWidgetCallback(e.component);
        }, groupTemplate: (data, index, element) => {
            if (data.key === exports.ungroupedItemKey || data.key === exports.dashboardTitleKey) {
                let className = data.key === exports.dashboardTitleKey || (data.key === exports.ungroupedItemKey && (titleVisible && index === 1 || !titleVisible && index === 0)) ? mobileLayoutCssClasses.dashboardDisplayNone : mobileLayoutCssClasses.ungroupedItem;
                _jquery_helpers_1.$unwrap(element).classList.add(className);
                return document.createElement('div');
            }
            else if (data.key.search(exports.groupWithoutCaptionItemKey) !== -1) {
                _jquery_helpers_1.$unwrap(element).classList.add(mobileLayoutCssClasses.groupWithoutCaption);
                return document.createElement('div');
            }
            else {
                let div = document.createElement('div');
                div.innerText = data.key;
                return div;
            }
        } });
};
exports.createLayoutViewModel = createLayoutViewModel;
