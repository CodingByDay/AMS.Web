﻿/**
* DevExpress Dashboard (_mobile-layout-master-filters-editor.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemMasterFiltersViewModel = exports.ItemMasterFilterInfo = exports.MasterFiltersEditorModel = void 0;
const ko = require("knockout");
const _formatter_1 = require("../../data/_formatter");
const caption_toolbar_options_1 = require("../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options");
const _caption_toolbar_css_classes_1 = require("../../viewer-parts/widgets/caption-toolbar/_caption-toolbar-css-classes");
const _mobile_layout_caption_toolbar_1 = require("../../viewer-parts/widgets/caption-toolbar/_mobile-layout-caption-toolbar");
const _dashboard_title_model_1 = require("../viewer/title/_dashboard-title-model");
const _viewer_interfaces_1 = require("../viewer/_viewer-interfaces");
const _mobile_layout_fullscreen_item_1 = require("./_mobile-layout-fullscreen-item");
const _mobile_layout_item_1 = require("./_mobile-layout-item");
class MasterFiltersEditorModel {
    constructor() {
        this._target = ko.observable(null);
        this._visible = ko.observable(false);
        this.visible = ko.computed(() => this._visible());
        this.masterItems = ko.computed(() => {
            if (this._target()) {
                return this._target()._masterFilterItems();
            }
            else {
                return [];
            }
        });
    }
    addFilterButton(toolbarItems, filterableItem) {
        if (filterableItem._masterFilterItems().length) {
            toolbarItems.push({
                name: caption_toolbar_options_1.dashboardToolbarItemNames.dashboardFilters,
                type: 'button',
                icon: 'dx-dashboard-filters',
                click: () => {
                    this.show(filterableItem);
                }
            });
        }
    }
    show(target) {
        this._target(target);
        this._visible(true);
    }
    hide() {
        this._visible(false);
    }
}
exports.MasterFiltersEditorModel = MasterFiltersEditorModel;
class ItemMasterFilterInfo {
    constructor(dashboardItem, click) {
        this.dashboardItem = dashboardItem;
        this.click = click;
        this.name = ko.computed(() => dashboardItem.name());
        this.filterValues = ko.computed(() => {
            return dashboardItem
                ._getDisplayFilterValues(_dashboard_title_model_1.maxFilterValuesCount)
                .filter(value => value.Values[0] && !!value.Values[0].Format)
                .map(value => {
                return {
                    name: value.Name,
                    valuesString: value
                        .Values
                        .map(filterValue => _formatter_1.formatFilterValue(filterValue))
                        .concat(value.Truncated ? ['…'] : [])
                        .join(', ')
                };
            });
        });
    }
}
exports.ItemMasterFilterInfo = ItemMasterFilterInfo;
class ItemMasterFilterPopupViewModel {
    constructor(heightOffset, visible, repaintRequest) {
        this.width = '100vw';
        this.height = `calc(100vh - ${heightOffset}px)`;
        this.visible = visible;
        var popupResizeController = new _mobile_layout_fullscreen_item_1.PopupResizeController(repaintRequest);
        this.onInitializing = popupResizeController.onInitialized;
        this.onDisposing = popupResizeController.onDisposing;
    }
}
class ItemMasterFiltersViewModel {
    constructor(model, dashboardContext, repaintRequest) {
        this.model = model;
        this.masterFilterItem = ko.observable(null);
        this.showMasterFilterItem = (dashboardItem, dashboardContext, repaintRequest) => {
            this.maximizeFiltersPopup(true);
            this.masterFilterItem({
                dashboardItem: dashboardItem,
                dashboardContext: dashboardContext,
                repaintRequest: repaintRequest,
                localContext: new _viewer_interfaces_1.DashboardItemContext({
                    itemFactory: new _mobile_layout_fullscreen_item_1.MobileItemViewerFactory(),
                    addContextToolbarItems: (options) => {
                        options.actionItems = options.actionItems.filter(item => item.name !== caption_toolbar_options_1.dashboardToolbarItemNames.exportMenu);
                    },
                    viewerItemCreated: (dashboardItem, viewerItem) => _mobile_layout_item_1.customizeMobileViewerItems(viewerItem),
                    createCaptionToolbar: (viewerItem, container, controlContainer, popupContainer, viewOptions) => {
                        return new _mobile_layout_caption_toolbar_1.MobileLayoutCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, _caption_toolbar_css_classes_1.cssClasses.caption, viewOptions.captionToolbarSeparatorRequired);
                    },
                    beforeApplyViewerItemOptions: (item, options, isCreation) => {
                        options.ParentContainer = undefined;
                        _mobile_layout_item_1.setCardAutoArrangementMode(item, options);
                    },
                    itemCreatingType: 'primary'
                })
            });
        };
        this.closeMasterFilterItemPopup = () => {
            this.maximizeFiltersPopup(false);
            this.masterFilterItem(null);
        };
        this.closeMasterFiltersPopup = () => {
            this.closeMasterFilterItemPopup();
            this.model.hide();
        };
        this.maximizeFiltersPopup = ko.observable(false);
        this.masterItems = ko.computed(() => model.masterItems().map(mi => new ItemMasterFilterInfo(mi, () => this.showMasterFilterItem(mi, dashboardContext, repaintRequest))));
        var masterFiltersVisible = ko.computed(() => this.model.visible());
        var masterFilterItemVisible = ko.computed(() => !!this.masterFilterItem());
        this.masterFiltersPopup = new ItemMasterFilterPopupViewModel(50, masterFiltersVisible, repaintRequest);
        this.masterFilterMaximizedItemPopup = new ItemMasterFilterPopupViewModel(100, masterFilterItemVisible, repaintRequest);
        this.maximizeFiltersPopup = ko.observable(masterFiltersVisible());
    }
}
exports.ItemMasterFiltersViewModel = ItemMasterFiltersViewModel;
