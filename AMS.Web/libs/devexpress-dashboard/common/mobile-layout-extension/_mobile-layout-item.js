﻿/**
* DevExpress Dashboard (_mobile-layout-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customizeMobileViewerItems = exports.setCardAutoArrangementMode = exports.MobileLayoutItemViewModel = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const card_item_1 = require("../../model/items/card/card-item");
const _data_grid_item_1 = require("../../viewer-parts/viewer-items/data-grid-item/_data-grid-item");
const _date_filter_element_1 = require("../../viewer-parts/viewer-items/filter-items/_date-filter-element");
const _cards_item_1 = require("../../viewer-parts/viewer-items/_cards-item");
const _caption_toolbar_css_classes_1 = require("../../viewer-parts/widgets/caption-toolbar/_caption-toolbar-css-classes");
const _hidden_caption_toolbar_1 = require("../../viewer-parts/widgets/caption-toolbar/_hidden-caption-toolbar");
const _static_toolbar_1 = require("../../viewer-parts/widgets/caption-toolbar/_static-toolbar");
const _viewer_interfaces_1 = require("../viewer/_viewer-interfaces");
class MobileLayoutItemViewModel {
    constructor(dashboardContext, repaintRequest, dashboardItem, _fullscreenItemModel) {
        this.dashboardContext = dashboardContext;
        this.repaintRequest = repaintRequest;
        this.dashboardItem = dashboardItem;
        this._fullscreenItemModel = _fullscreenItemModel;
        this._cachedItemWidth = 0;
        this._swipeToActionCoef = 100;
        this.itemOffsetInPixels = ko.observable(0);
        this.actionReadyCoef = ko.computed(() => {
            var offsetInPixels = this.itemOffsetInPixels();
            if (offsetInPixels > 0) {
                var coef = Math.abs(offsetInPixels / this._swipeToActionCoef);
                if (coef > 1)
                    coef = 1;
                return coef;
            }
            else {
                return 0;
            }
        });
        this.isReadyForAction = ko.computed(() => {
            return this.actionReadyCoef() >= 1;
        });
        this.maximizeIconOpacity = ko.computed(() => {
            return this.actionReadyCoef();
        });
        this.click = (data, args) => {
            this._performShowFullscreenItem();
            this.unselectItem(data, args);
        };
        this.selectItem = (data, args) => {
            if (this.canMaximizeItem) {
                args.target.classList.add('dx-dashboard-mobile-layout-item-selected');
            }
        };
        this.unselectItem = (data, args) => {
            args.target.classList.remove('dx-dashboard-mobile-layout-item-selected');
        };
        this.swipestart = (data, args) => {
            this._cachedItemWidth = _jquery_helpers_1.getWidth(this._getStandaloneItemElement(args.target));
        };
        this.swipeupdate = (data, args) => {
            if (args.offset > 0) {
                this.itemOffsetInPixels(args.offset * this._cachedItemWidth);
            }
            else {
                this._reset();
            }
        };
        this.swipeend = (data, args) => {
            if (this.isReadyForAction()) {
                this._performShowFullscreenItem();
            }
            this._reset();
        };
        this.localContext = new _viewer_interfaces_1.DashboardItemContext({
            addContextToolbarItems: (options) => {
                options.stateItems = [];
                options.actionItems = [];
                options.navigationItems = [];
            },
            createCaptionToolbar: (viewerItem, container, controlContainer, popupContainer, viewOptions) => {
                return viewOptions.hasCaption ? new _static_toolbar_1.StaticCaptionToolbar(container, controlContainer, popupContainer, viewOptions.encodeHtml, _caption_toolbar_css_classes_1.cssClasses.caption, viewOptions.captionToolbarSeparatorRequired, true) :
                    new _hidden_caption_toolbar_1.HiddenCaptionToolbar();
            },
            viewerItemCreated: (dashboardItem, viewerItem) => customizeMobileViewerItems(viewerItem),
            beforeApplyViewerItemOptions: (item, options, isCreation) => {
                options.ParentContainer = undefined;
                setCardAutoArrangementMode(item, options);
            },
            itemCreatingType: 'secondary'
        });
    }
    get canMaximizeItem() {
        return this.dashboardItem._uiState() === 'live';
    }
    _reset() {
        this.itemOffsetInPixels(0);
    }
    _performShowFullscreenItem() {
        if (this.canMaximizeItem) {
            this._fullscreenItemModel.maximizeItem(this.dashboardItem);
        }
    }
    _getStandaloneItemElement(element) {
        return element.parentElement.querySelector('dashboard-standalone-item');
    }
}
exports.MobileLayoutItemViewModel = MobileLayoutItemViewModel;
function setCardAutoArrangementMode(item, options) {
    if (item instanceof card_item_1.CardItem) {
        options.ViewModel.ContentDescription.ArrangementMode = 'Auto';
    }
}
exports.setCardAutoArrangementMode = setCardAutoArrangementMode;
function customizeMobileViewerItems(viewerItem) {
    if (viewerItem instanceof _data_grid_item_1.dataGridItem) {
        viewerItem._customizeViewOptions = (options) => {
            options.columnHidingEnabled = true;
            options.allowColumnResizing = false;
        };
        viewerItem._getColumnWidthProperty = () => {
            return 'width';
        };
        viewerItem._getColumnWidthMode = () => {
            return 'AutoFitToContents';
        };
        viewerItem._getDefaultBestCharacterCount = (index) => {
            return 10;
        };
    }
    if (viewerItem instanceof _cards_item_1.cardsItem) {
        viewerItem._getIgnorePadding = () => {
            return false;
        };
    }
    if (viewerItem instanceof _date_filter_element_1.dateFilterElement) {
        viewerItem._mobileLayout = () => {
            return true;
        };
    }
}
exports.customizeMobileViewerItems = customizeMobileViewerItems;
