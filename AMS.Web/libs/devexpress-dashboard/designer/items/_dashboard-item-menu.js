﻿/**
* DevExpress Dashboard (_dashboard-item-menu.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemMenuPositionCalculator = exports.DashboardItemMenu = exports.createContextPopupMenuViewModel = exports.DashboardItemMenuSizes = void 0;
const events_1 = require("devextreme/events");
const themes_1 = require("devextreme/ui/themes");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
const _utils_1 = require("../../data/_utils");
const disposable_object_1 = require("../../model/disposable-object");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _properties_controller_1 = require("../properties-controller/_properties-controller");
const _dashboard_item_menu_popover_1 = require("./_dashboard-item-menu-popover");
const _section_descriptors_1 = require("./_section-descriptors");
exports.DashboardItemMenuSizes = {
    BindingPanelPanelWidth: (collapsed = false) => {
        if (collapsed) {
            return themes_1.default.isMaterial(themes_1.default.current()) ? 300 : 220;
        }
        return themes_1.default.isMaterial(themes_1.default.current()) ? 600 : 495;
    },
    OptionsPanelWidth: (content = false) => {
        if (themes_1.default.isMaterial(themes_1.default.current())) {
            return content ? 300 : 298;
        }
        return 274;
    }
};
const createContextPopupMenuViewModel = (menuItem, dashboardItemMenu) => {
    return {
        menuButton: {
            icon: menuItem.icon,
            hint: _default_1.getLocalizationById(menuItem.hint || menuItem.title),
            cssClass: _knockout_utils_1.safeComputed({ detailVisible: menuItem.detailVisible }, args => {
                const classes = ['dx-dashboard-' + menuItem.menuItemId + '-options-button'];
                if (args.detailVisible)
                    classes.push('dx-state-selected');
                return classes.join(' ');
            }),
            clickHandler: () => dashboardItemMenu.menuItemClick(menuItem && menuItem.menuItemId),
        },
        menuPropertiesPanel: {
            title: _default_1.getLocalizationById(menuItem.title),
            panelContent: {
                view: menuItem.templateName,
                viewModel: {
                    title: _default_1.getLocalizationById(menuItem.title || menuItem.hint),
                    data: menuItem.customData,
                    isSecondaryPanelVisible: dashboardItemMenu.isSecondaryPanelVisible,
                    hideBindingPanel: dashboardItemMenu.hideBindingPanel,
                    hideBindingProperties: dashboardItemMenu.hideBindingProperties,
                    detailVisible: menuItem.detailVisible
                }
            },
            cssClasses: ko.pureComputed(() => {
                return dashboardItemMenu.selectedItemSurface
                    && dashboardItemMenu.selectedItemSurface.propertiesController.mainModel() ? 'dx-visible-properties' : '';
            }),
            style: dashboardItemMenu.propertiesPanelStyle,
            detailVisible: menuItem.detailVisible,
            hidePanelAction: dashboardItemMenu.hideBindingPanel,
        },
        getPopoverOptions: _dashboard_item_menu_popover_1.createPopoverOptionsGetterFunction(menuItem, dashboardItemMenu)
    };
};
exports.createContextPopupMenuViewModel = createContextPopupMenuViewModel;
class DashboardItemMenu extends disposable_object_1.DisposableObject {
    constructor(layoutController, layoutItem, _positionCalculator, propertiesController, itemSurface) {
        super();
        this.layoutController = layoutController;
        this.layoutItem = layoutItem;
        this._positionCalculator = _positionCalculator;
        this.propertiesController = propertiesController;
        this.menuItemClick = (menuItemId) => {
            this.contextMenuItems().forEach(contextMenuItem => {
                if (contextMenuItem.menuItemId !== menuItemId) {
                    contextMenuItem.detailVisible(false);
                }
                else {
                    this.propertiesController.mainModel(null);
                    if (contextMenuItem.detailVisible.peek()) {
                        contextMenuItem.detailVisible(false);
                    }
                    else {
                        contextMenuItem.showMenu && contextMenuItem.showMenu();
                        contextMenuItem.detailVisible(true);
                    }
                }
            });
        };
        this.contextMenuItems = ko.observableArray();
        this.contextMenuItemViewModels = _knockout_utils_1.safeComputed({ contextMenuItems: this.contextMenuItems }, (args) => args.contextMenuItems
            .sort((a, b) => (a.index || Number.MAX_VALUE) - (b.index || Number.MAX_VALUE))
            .map(item => exports.createContextPopupMenuViewModel(item, this)));
        this.menuItemDetailVisible = ko.pureComputed(() => this.contextMenuItems().some(contextMenuItem => contextMenuItem.detailVisible()));
        this.verticalPosition = ko.observable();
        this.isLeft = ko.observable();
        this.isCollapsed = ko.observable(false);
        this.isCollapsedStateToggleVisible = ko.observable(false);
        this._recalculatePosition = () => {
            this.verticalPosition(this._positionCalculator.calculateVPosition());
            this.isLeft(this._positionCalculator.calculateIsLeft());
        };
        this._recalculatePositionDebounced = _utils_1.debounce(this._recalculatePosition, 1);
        this.hideBindingProperties = () => {
            if (this.propertiesController.secondaryModel() && this.isSecondaryPanelVisible()) {
                this.isSecondaryPanelVisible(false);
            }
            else {
                this.propertiesController.mainModel(null);
                if (this.contextMenuItems().filter(mi => mi.detailVisible() && mi.menuItemId !== 'item-binding-panel')[0]) {
                    this.hideBindingPanel();
                }
            }
        };
        this.hideBindingPanel = () => {
            this.propertiesController.secondaryModel(null);
            this.propertiesController.mainModel(null);
            this.menuItemClick(null);
        };
        this.isSecondaryPanelVisible = ko.observable(false);
        this.__secondaryPanelVisibleTimeout = 0;
        this._repaintHandlers = [];
        this.selectedItemSurface = itemSurface;
        ko.computed(() => {
            layoutController.itemInteractionInProgress(this.menuItemDetailVisible());
        });
        this.isSecondaryPanelVisible.subscribe((visibility) => {
            if (!visibility) {
                this.__secondaryPanelVisibleTimeout = window.setTimeout(() => {
                    this.propertiesController.secondaryModel(undefined);
                    this.__secondaryPanelVisibleTimeout = 0;
                }, 350);
            }
        });
        this.propertiesController.secondaryModel.subscribe((model) => {
            this.isSecondaryPanelVisible(!!model);
            if (this.__secondaryPanelVisibleTimeout)
                clearTimeout(this.__secondaryPanelVisibleTimeout);
        });
        this.propertiesPanelStyle = ko.computed(() => {
            var visiblePanel = this.contextMenuItems().filter(contextMenuItem => contextMenuItem.detailVisible())[0], mainModel = this.propertiesController.mainModel();
            if (visiblePanel) {
                if (visiblePanel.menuItemId === 'item-binding-panel') {
                    return { width: exports.DashboardItemMenuSizes.BindingPanelPanelWidth(!mainModel).toString() + 'px', marginLeft: '' };
                }
            }
            return { width: exports.DashboardItemMenuSizes.OptionsPanelWidth(true).toString() + 'px', marginLeft: '0px' };
        });
        this.subscribeLayoutItemRepaintRequest(this._recalculatePositionDebounced);
        this.toDispose(this.contextMenuItemViewModels.subscribe(() => this._recalculatePositionDebounced()));
        this.toDispose(this.layoutItem.isSelected.subscribe(() => this._recalculatePositionDebounced()));
        this.toDispose(this.isCollapsed.subscribe(() => this._recalculatePositionDebounced()));
        this.isLeft(this._positionCalculator.calculateIsLeft());
    }
    createViewModel() {
        return {
            isCollapsedStateToggleVisible: _knockout_utils_1.safeComputed({ isLeft: this.isLeft }, args => args.isLeft && this._positionCalculator.calculateIsLeftAndInside()),
            isCollapsed: this.isCollapsed,
            collapsedStateToggle: () => this.isCollapsed(!this.isCollapsed()),
            menuContainerCssClasses: _knockout_utils_1.safeComputed({
                isLeft: this.isLeft,
                isSelected: this.layoutItem.isSelected,
                verticalPosition: this.verticalPosition,
                isCollapsed: this.isCollapsed,
            }, args => {
                const classes = [];
                const isInnerMenu = args.isLeft && this._positionCalculator.calculateIsLeftAndInside();
                if (isInnerMenu) {
                    classes.push('dx-position-left-inside');
                }
                else if (args.isLeft) {
                    classes.push('dx-position-left');
                }
                args.isSelected && classes.push('dx-state-selected');
                args.verticalPosition === 'top' && classes.push('dx-dashboard-item-top');
                if (args.verticalPosition === 'bottom') {
                    args.isCollapsed && isInnerMenu ? classes.push('dx-dashboard-item-top') : classes.push('dx-dashboard-item-bottom');
                }
                return classes.join(' ');
            }),
            menuItemDetailVisible: this.menuItemDetailVisible,
            contextMenuItemViewModels: this.contextMenuItemViewModels,
            deleteCurrentItemAction: () => this.layoutController._selectedLayoutItem().delete(),
            deleteCurrentItemActionCaption: _default_1.getLocalizationById('DashboardWebStringId.Remove'),
        };
    }
    subscribeLayoutItemRepaintRequest(handler) {
        this.layoutItem.repaintCallbacks.add(handler);
        this._repaintHandlers.push(handler);
    }
    unsubscribeLayoutItemRepaintRequest(handler) {
        this.layoutItem.repaintCallbacks.remove(handler);
        this._repaintHandlers.splice(this._repaintHandlers.indexOf(handler), 1);
    }
    dispose() {
        super.dispose();
        this._repaintHandlers.forEach(handler => this.layoutItem.repaintCallbacks.remove(handler));
        this._repaintHandlers = [];
        this.selectedItemSurface && this.selectedItemSurface.dispose();
    }
}
exports.DashboardItemMenu = DashboardItemMenu;
ko.components.register('dx-dashboard-item-menu', {
    viewModel: {
        createViewModel: function ({ layoutController, layoutItem, itemMenuViewModelContainer, notificationController }, componentInfo) {
            let positionCalculator = new ItemMenuPositionCalculator(componentInfo.element);
            let itemSurface = _section_descriptors_1.surfaceItemsFactory.createSurfaceItem(layoutItem.viewModel.item(), layoutController.dashboardModel, layoutController.dataSourceBrowser, notificationController, layoutController.findExtension);
            let propertiesController = new _properties_controller_1.PropertiesController();
            itemSurface.propertiesController = propertiesController;
            let itemMenu = new DashboardItemMenu(layoutController, layoutItem, positionCalculator, propertiesController, itemSurface);
            itemMenuViewModelContainer(itemMenu);
            ko.utils.domNodeDisposal.addDisposeCallback(componentInfo.element, function () {
                itemMenu.dispose();
                propertiesController.dispose();
                itemMenuViewModelContainer(undefined);
            });
            return itemMenu.createViewModel();
        }
    },
    template: { element: 'dx-dashboard-item-menu' }
});
class ItemMenuPositionCalculator {
    constructor(element) {
        this.element = element;
        this.layoutContainer = _jquery_helpers_1.closest(this.element, '.dx-dashboard-layout-container');
    }
    _isValidElement() {
        return this.element.parentElement && this.layoutContainer;
    }
    calculateIsLeft() {
        if (!this._isValidElement()) {
            return false;
        }
        var elementParentBounds = this.element.parentElement.getBoundingClientRect();
        var rootBounds = this.layoutContainer.getBoundingClientRect();
        var left = elementParentBounds.left, right = elementParentBounds.right, rootLeft = rootBounds.left, rootRight = rootBounds.right;
        return (rootRight - right < exports.DashboardItemMenuSizes.BindingPanelPanelWidth() &&
            left - rootLeft > exports.DashboardItemMenuSizes.BindingPanelPanelWidth()) || (rootRight - right < 50);
    }
    calculateVPosition() {
        let itemMenuElement = this.element.querySelector('.dx-dashboard-item-menu');
        let layoutItem = _jquery_helpers_1.closest(this.element, '.dx-layout-item-wrapper');
        if (!this._isValidElement() || !layoutItem || !itemMenuElement) {
            return 'center';
        }
        var layoutItemBounds = layoutItem.getBoundingClientRect();
        var layoutRootBounds = this.layoutContainer.getBoundingClientRect();
        var itemMenuBounds = itemMenuElement.getBoundingClientRect();
        if (itemMenuBounds.height <= layoutItemBounds.height) {
            return 'center';
        }
        else {
            if (layoutItemBounds.top + layoutItemBounds.height - itemMenuBounds.height < layoutRootBounds.top) {
                return 'top';
            }
            else {
                return 'bottom';
            }
        }
    }
    calculateIsLeftAndInside() {
        if (!this._isValidElement()) {
            return false;
        }
        const elementParentBounds = this.element.parentElement.getBoundingClientRect();
        const layoutRootBounds = this.layoutContainer.getBoundingClientRect();
        return elementParentBounds.left - 50 < layoutRootBounds.left;
    }
}
exports.ItemMenuPositionCalculator = ItemMenuPositionCalculator;
var DISAPPEARING_EVENT_NAMESPACE = '.disappearing';
var findContainer = (element) => {
    return _jquery_helpers_1.closest(element, '.dx-layout-item-wrapper').querySelector('.dx-layout-item-container');
};
ko.bindingHandlers['menuVisibilitySubscription'] = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            events_1.off(findContainer(element), DISAPPEARING_EVENT_NAMESPACE);
        });
    },
    update: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        let toggleClass = (state) => {
            const cssClass = 'dx-target-widget-hovered';
            let nodes = document.querySelectorAll('.dx-disappearing-overlay>.dx-overlay-content');
            for (let i = 0; i < nodes.length; i++) {
                if (state) {
                    nodes[i].classList.add(cssClass);
                }
                else {
                    nodes[i].classList.remove(cssClass);
                }
            }
        };
        valueAccessor().visible.subscribe((val) => {
            let container = findContainer(element);
            if (val) {
                events_1.on(container, 'mouseenter' + DISAPPEARING_EVENT_NAMESPACE, () => { toggleClass(true); });
                events_1.on(container, 'mouseleave' + DISAPPEARING_EVENT_NAMESPACE, () => { toggleClass(false); });
            }
            else {
                events_1.off(container, DISAPPEARING_EVENT_NAMESPACE);
                toggleClass(false);
            }
        });
    }
};
