﻿/**
* DevExpress Dashboard (_docking-layout-controller.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockingLayoutController = void 0;
const events_1 = require("devextreme/events");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const _default_1 = require("../../data/localization/_default");
const disposable_object_1 = require("../../model/disposable-object");
const _dashboard_item_helper_1 = require("../../model/internal/_dashboard-item_helper");
const combo_box_item_1 = require("../../model/items/filter-items/combo-box-item");
const date_filter_item_1 = require("../../model/items/filter-items/date-filter-item");
const group_item_1 = require("../../model/items/group/group-item");
const dashboard_tab_page_1 = require("../../model/items/tab-container-item/dashboard-tab-page");
const tab_container_item_1 = require("../../model/items/tab-container-item/tab-container-item");
const _dashboard_title_view_constants_1 = require("../../viewer-parts/title/_dashboard-title-view-constants");
const caption_toolbar_options_1 = require("../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options");
const _viewer_interfaces_1 = require("../viewer/_viewer-interfaces");
const _title_component_1 = require("../viewer/title/_title-component");
const _docking_layout_fullscreen_item_1 = require("./_docking-layout-fullscreen-item");
const _layout_item_1 = require("./core/_layout-item");
const _drag_controller_1 = require("./drag-and-drop/_drag-controller");
class DockingLayoutController extends disposable_object_1.DisposableObject {
    constructor(dashboardModel, dataSourceBrowser, context, findExtension, allowMaximizeItems, resizeByTimer, repaintRequest, encodeHtml = true, viewerApi) {
        super();
        this.dashboardModel = dashboardModel;
        this.dataSourceBrowser = dataSourceBrowser;
        this.context = context;
        this.findExtension = findExtension;
        this.allowMaximizeItems = allowMaximizeItems;
        this.resizeByTimer = resizeByTimer;
        this.repaintRequest = repaintRequest;
        this.encodeHtml = encodeHtml;
        this.selectedLayoutItem = ko.pureComputed(() => this._selectedLayoutItem().sizeController);
        this.dragController = new _drag_controller_1.LayoutDragController();
        this._scrollSubscriptions = [];
        this.scrollViewEvents = {
            onInitialized: (e) => {
                this.dragController.initScrollAnimator({
                    getBoundingClientRect: () => _jquery_helpers_1.$unwrap(e.component.element()).getBoundingClientRect(),
                    getScrollOffset: () => e.component.scrollOffset(),
                    setScrollOffset: (offset) => e.component.scrollTo(offset)
                });
            },
            onScroll: () => {
                this._scrollSubscriptions.forEach(action => action());
            },
            onDisposing: (e) => {
                this.dragController.cleanScrollAnimator();
            }
        };
        this.layoutMainElementEvents = {
            onInitialize: (args) => {
                this.dragController.initLayoutMainElement(args.element);
            },
            onDisposing: (args) => {
                this.dragController.cleanLayoutMainElement(args.element);
            }
        };
        this.itemInteractionInProgress = ko.observable(false);
        this._selectedLayoutItem = ko.observable();
        this.selectedDashboardItem = ko.computed(() => {
            return this._selectedLayoutItem() && this._selectedLayoutItem().viewModel.item() || null;
        });
        this.emptyItemTemplates = ko.observableArray();
        this.emptyItemTemplatesService = (layoutItem) => {
            return {
                data: this.emptyItemTemplates,
                name: 'dx-dashboard-empty-item-templates'
            };
        };
        this.addDashboardItem = (data) => {
            var { item } = _layout_item_1.LayoutItem.findLargestItem(this.rootItem);
            if (!item) {
                item = this.rootItem;
            }
            var itemJson = _dashboard_item_helper_1.getItemJson(data.type);
            var location = item._parent() && item._parent().viewModel && item._parent().viewModel.orientation() === 'Horizontal' ? 'bottom' : 'right';
            item.create(itemJson, location);
        };
        this.width = ko.observable(0);
        this.height = ko.observable(0);
        this.headerHeight = ko.observable(_dashboard_title_view_constants_1.titleHeight);
        this.visibleItemsProvider = undefined;
        this.rootItem = new _layout_item_1.LayoutItem(dashboardModel.layout()._createViewModel(), null);
        var fullScreenItemLocalContext = new _viewer_interfaces_1.DashboardItemContext({
            ignoreDesignMode: true,
            beforeApplyViewerItemOptions: (item, options) => {
                options.ParentContainer = undefined;
            },
            addContextToolbarItems: (options) => {
                options.actionItems.push({
                    hint: _default_1.getLocalizationById('DashboardStringId.ActionRestoreDashboardItem'),
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.restoreItem,
                    icon: 'dx-dashboard-restore-item',
                    type: 'button',
                    click: () => {
                        this.fullscreenItemModel.restoreDownItem();
                    }
                });
            },
            itemCreatingType: 'secondary'
        });
        var exportExtension = this.findExtension('dashboardExport');
        if (exportExtension) {
            exportExtension._initializeSecondaryExportItem(fullScreenItemLocalContext);
        }
        this.fullscreenItemModel = new _docking_layout_fullscreen_item_1.FullscreenItemModel(context, fullScreenItemLocalContext);
        var getVisibleItems = (layoutItemViewModel) => {
            var res = [];
            if (layoutItemViewModel.item())
                res.push(layoutItemViewModel.item());
            if (layoutItemViewModel.item() instanceof tab_container_item_1.TabContainerItem) {
                res.push(...layoutItemViewModel.childItems().map(ci => ci._createViewModel().item()));
            }
            layoutItemViewModel.visibleItems().forEach(childItem => {
                res.push(...getVisibleItems(childItem._createViewModel()));
            });
            return res;
        };
        this.visibleItemsProvider = {
            visibleItems: ko.pureComputed(() => {
                return getVisibleItems(this.rootItem.viewModel);
            })
        };
        this.rootItem.onEvent = (layoutItem, event) => {
            if (event === 'click') {
                this.select(layoutItem);
            }
            else if (event === 'unselect') {
                this.select(null);
            }
            else if (event === 'resize-started') {
                setTimeout(() => this.itemInteractionInProgress(true), 1);
            }
            else if (event === 'resize-completed') {
                setTimeout(() => this.itemInteractionInProgress(false), 1);
            }
            else if (event === 'get-context') {
                return context;
            }
            else if (event === 'get-local-context') {
                var itemModel = layoutItem.viewModel.item;
                var localContext = new _viewer_interfaces_1.DashboardItemContext({
                    disabled: ko.computed(() => itemModel() && this.fullscreenItemModel.maximizedItemName === itemModel().componentName()),
                    addContextToolbarItems: (options, item) => {
                        if (this.allowMaximizeItems
                            && !(item instanceof combo_box_item_1.ComboBoxItem)
                            && !(item instanceof date_filter_item_1.DateFilterItem)
                            && !(item instanceof group_item_1.GroupItem)
                            && !(item instanceof tab_container_item_1.TabContainerItem)
                            && !(item instanceof dashboard_tab_page_1.DashboardTabPage)) {
                            options.actionItems.push({
                                hint: _default_1.getLocalizationById('DashboardStringId.ActionMaximizeDashboardItem'),
                                icon: 'dx-dashboard-maximize-item',
                                name: caption_toolbar_options_1.dashboardToolbarItemNames.maximizeItem,
                                type: 'button',
                                click: () => {
                                    this.select(null);
                                    this.fullscreenItemModel.maximizeItem(item);
                                }
                            });
                        }
                    },
                    visualMode: ko.computed(() => {
                        if (itemModel()) {
                            if (itemModel() instanceof tab_container_item_1.TabContainerItem) {
                                return 'caption';
                            }
                            let parent = dashboardModel.findItem(itemModel().parentContainer());
                            if (parent instanceof dashboard_tab_page_1.DashboardTabPage
                                && dashboardModel._getDisplayDashboardItem(parent) !== parent) {
                                return 'content';
                            }
                        }
                        return 'full';
                    }),
                    itemCreatingType: 'primary'
                });
                var exportExtension = this.findExtension('dashboardExport');
                if (exportExtension) {
                    exportExtension._initializePrimaryExportItem(localContext);
                }
                return localContext;
            }
            else if (event === 'get-context-menu-service') {
                return this.contextMenu;
            }
            else if (event === 'get-empty-item-templates-service') {
                return this.emptyItemTemplatesService;
            }
            else if (event === 'get-layout-item-placeholder-service') {
                return this.layoutItemPlaceholderService;
            }
        };
        events_1.on(document, 'pointerdown.dxlayout', (e) => {
            if (!this._selectedLayoutItem()) {
                return;
            }
            var target = _jquery_helpers_1.$unwrap(e.target), validParents = ['.dx-layout-root',
                '.dx-accordion-item',
                '.dx-treeview-node',
                '.dx-dashboard-context-menu-panel',
                'dx-field-chooser',
                '.dx-dashboard-toolbar',
                '.dx-overlay-content',
                '.dx-overlay-shader',
                '.ace_editor',
                '.dx-scrollable-scrollbar'
            ];
            var found = false;
            if (_utils_1.type.isDefined(target.classList) && target.classList.contains('dx-calendar-cell')) {
                found = true;
            }
            else if (!target.parentNode) {
                found = true;
            }
            else {
                found = found || validParents.some((validParent) => !!_jquery_helpers_1.closest(target, validParent));
            }
            if (found)
                return;
            if (target.tagName && target.tagName.toLowerCase() === 'body')
                return;
            if (document.activeElement && document.activeElement.blur) {
                document.activeElement.blur();
            }
            this.select(null);
        });
        this.titleContext = new _title_component_1.DashboardTitleContext(this.encodeHtml, this.findExtension, true, viewerApi);
        this.toDispose(this.titleContext);
        this.toDispose(ko.computed(() => {
            if (this.width() > 0) {
                this.rootItem.width(this.width());
            }
            if (this.height() > 0) {
                this.rootItem.height(this.height() - this.headerHeight());
            }
        }));
    }
    get fullscreenItemProvider() {
        return this.fullscreenItemModel;
    }
    select(item) {
        var oldSelectedItem = this._selectedLayoutItem.peek();
        if (oldSelectedItem) {
            oldSelectedItem.isSelected(false);
        }
        this._selectedLayoutItem(item);
        if (!!item) {
            item.isSelected(true);
        }
    }
    subscribeOnScroll(handler) {
        this._scrollSubscriptions.push(handler);
    }
    unsubscribeOnScroll(handler) {
        this._scrollSubscriptions.splice(this._scrollSubscriptions.indexOf(handler), 1);
    }
    dispose() {
        this.dragController.dispose();
        this._scrollSubscriptions = [];
        events_1.off(document, '.dxlayout');
        super.dispose();
    }
}
exports.DockingLayoutController = DockingLayoutController;
