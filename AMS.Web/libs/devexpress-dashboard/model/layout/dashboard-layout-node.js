﻿/**
* DevExpress Dashboard (dashboard-layout-node.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutNode = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const _knockout_utils_1 = require("../internal/_knockout-utils");
const _undo_engine_helper_1 = require("../internal/_undo-engine-helper");
const dashboard_item_1 = require("../items/dashboard-item");
const group_item_1 = require("../items/group/group-item");
const dashboard_tab_page_1 = require("../items/tab-container-item/dashboard-tab-page");
const tab_container_item_1 = require("../items/tab-container-item/tab-container-item");
const serializable_model_1 = require("../serializable-model");
const _dashboard_layout_node_1 = require("./metadata/_dashboard-layout-node");
class DashboardLayoutNode extends serializable_model_1.TypedSerializableModel {
    constructor(dashboardLayoutItemJSON, serializer = new analytics_utils_1.ModelSerializer()) {
        super(dashboardLayoutItemJSON, serializer);
        this.parentNode = ko.observable();
        this._dashboard = ko.observable();
        this._item = ko.observable();
        this._relativeWidth = ko.computed(() => {
            if (!this.parentNode()) {
                return 1;
            }
            else if (this.parentNode().orientation() === 'Horizontal')
                return this.parentNode()._relativeWidth() * (this.weight() / this.parentNode().childNodes().reduce((acc, item) => acc + item.weight(), 0));
            else
                return this.parentNode()._relativeWidth();
        });
        this._relativeHeight = ko.computed(() => {
            if (!this.parentNode()) {
                return 1;
            }
            else if (this.parentNode().orientation() === 'Vertical')
                return this.parentNode()._relativeHeight() * (this.weight() / this.parentNode().childNodes().reduce((acc, item) => acc + item.weight(), 0));
            else
                return this.parentNode()._relativeHeight();
        });
        this._relativeArea = ko.computed(() => {
            return this._relativeWidth() * this._relativeHeight();
        });
        this._activeTabPage = ko.observable(undefined);
        this._activeTabIndex = ko.observable(0);
        _knockout_utils_1.safeSubscribe({
            dashboard: this._dashboard
        }, args => {
            if (args.dashboard) {
                return _knockout_utils_1.safeSubscribe({
                    allItems: args.dashboard._allItems,
                    componentName: this.dashboardItem
                }, innerArgs => {
                    let dashboardItem = innerArgs.allItems.filter(item => item.componentName() === innerArgs.componentName)[0] || null;
                    if (dashboardItem !== this._item()) {
                        this._item(dashboardItem);
                    }
                });
            }
            else {
                this._item(null);
            }
        });
        ko.computed(() => {
            this._dashboard(this.parentNode() && this.parentNode()._dashboard() || null);
        });
        this.parentNode.subscribe(_ => this._ensureItemParentContainer());
        this._item.subscribe(_ => this._ensureItemParentContainer());
        if (!this.weight()) {
            this.weight(1);
        }
    }
    static _canAttach(parent, dashboardLayoutNode) {
        if (dashboardLayoutNode) {
            var containsParent = (predicate) => {
                var container = parent;
                while (!!container) {
                    if (predicate(container)) {
                        return true;
                    }
                    container = container.parentNode();
                }
                return false;
            };
            var itemType = dashboardLayoutNode instanceof DashboardLayoutNode ? dashboardLayoutNode._getDefaultItemType() : dashboardLayoutNode['@ItemType'];
            if (itemType === 'TabContainer' || itemType === 'LayoutTabContainer') {
                return !containsParent(container => container.item instanceof group_item_1.GroupItem) &&
                    !containsParent(container => container.item instanceof tab_container_item_1.TabContainerItem);
            }
            var isVisbleGroup = (node) => {
                if (node instanceof DashboardLayoutNode) {
                    return !!node.dashboardItem();
                }
                else {
                    return true;
                }
            };
            if ((itemType === 'Group' || itemType === 'LayoutGroup') && isVisbleGroup(dashboardLayoutNode)) {
                return !containsParent(container => container.item instanceof group_item_1.GroupItem);
            }
        }
        return true;
    }
    get item() {
        return this._item();
    }
    set item(newItem) {
        if (this.item !== newItem) {
            this._setItemCore(newItem);
        }
    }
    getInfo() {
        return _dashboard_layout_node_1.layoutItemSerializationsInfo;
    }
    findLayoutItem(dashboardItem) {
        return this.item === dashboardItem ? this : undefined;
    }
    insert(itemToInsert, position) {
        var layoutNodeToInsert = null;
        if (itemToInsert instanceof dashboard_item_1.DashboardItem)
            layoutNodeToInsert = this._dashboard() && this._dashboard()._createDashboardLayoutNode(itemToInsert) || null;
        else
            layoutNodeToInsert = itemToInsert;
        if (!layoutNodeToInsert || !this._canAttach(layoutNodeToInsert)) {
            return;
        }
        this._insertItemCore(layoutNodeToInsert, position);
    }
    moveTo(targetItem, position) {
        this._moveTo(targetItem, position);
    }
    _moveTo(targetItem, position, insertionBehavior) {
        this.remove();
        targetItem._insertItemCore(this, position, insertionBehavior);
    }
    remove() {
        if (this.parentNode()) {
            this.parentNode()._detachChild(this);
            this.parentNode(null);
        }
    }
    _create(modelItemJson, position, insertionBehavior) {
        var newItemModel = this._dashboard()._createDashboardLayoutItem(modelItemJson);
        if (!!this.weight()) {
            newItemModel.weight(this.weight());
        }
        this._insertItemCore(newItemModel, position, insertionBehavior);
        return newItemModel;
    }
    _validateParentNode(newParentNode) {
        this.parentNode(newParentNode);
    }
    _canAttach(itemToAttach) {
        return DashboardLayoutNode._canAttach(this.parentNode(), itemToAttach);
    }
    _createViewModel() {
        if (!this._viewModel) {
            this._viewModel = {
                model: this,
                dashboardItem: this.dashboardItem,
                template: this._template,
                hasItem: ko.computed(() => !!this.item),
                item: ko.computed(() => {
                    if (this.item instanceof dashboard_tab_page_1.DashboardTabPage) {
                        return this._dashboard()._getDisplayDashboardItem(this.item);
                    }
                    return this.item;
                }),
                create: (modelItemJson, location, insertionBehavior) => {
                    let layoutItemModel = this._create(modelItemJson, location, insertionBehavior);
                    return layoutItemModel && layoutItemModel._createViewModel() || null;
                },
                createTabPage: () => this._createTabPage(),
                moveTo: (itemViewModel, location, insertionBehavior) => {
                    this._moveTo(itemViewModel.model, location, insertionBehavior);
                    return itemViewModel.model._createViewModel();
                },
                delete: () => this._delete(),
                canAttach: (something) => this._canAttach(something.model ? something.model : something),
                ignoreChildMaxHeight: this._ignoreChildMaxHeight,
                orientation: this._orientation,
                getPlaceholder: this._createPlaceholderFunc,
                weight: this.weight,
                visibleItems: this._visibleItems,
                childItems: this._childItems,
                activeTabPage: this._activeTabPage,
                activeTabIndex: this._activeTabIndex,
                dragOverInnerElementController: this._dragOverInnerElementController
            };
        }
        return this._viewModel;
    }
    get _template() { return ''; }
    get _ignoreChildMaxHeight() { return false; }
    get _visibleItems() { return ko.observableArray([]); }
    get _childItems() { return ko.observableArray([]); }
    get _orientation() { return ko.observable('Horizontal'); }
    get _createPlaceholderFunc() { return null; }
    get _dragOverInnerElementController() { return null; }
    _delete() {
        this._deleteDashbordItem();
        this.remove();
    }
    _insertItemCore(layoutNodeToInsert, position, insertionBehavior) {
        if (this.parentNode()) {
            this.parentNode()._attachChild(this, layoutNodeToInsert, position);
        }
    }
    _setItemCore(newItem) {
        this.dashboardItem(newItem.componentName());
    }
    _createTabPage() {
    }
    _ensureItemParentContainer() {
        if (!!this._item()) {
            var current = this.parentNode();
            while (!!current && !(current._item() instanceof group_item_1.GroupItem || current._item() instanceof dashboard_tab_page_1.DashboardTabPage)) {
                current = current.parentNode();
            }
            if (!!current && (current._item() instanceof group_item_1.GroupItem || current._item() instanceof dashboard_tab_page_1.DashboardTabPage)) {
                this._item().parentContainer(current._item().componentName());
            }
            else {
                this._item().parentContainer(undefined);
            }
        }
    }
    _deleteDashbordItem() {
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DashboardLayoutNode.prototype, "insert", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DashboardLayoutNode.prototype, "_moveTo", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DashboardLayoutNode.prototype, "remove", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DashboardLayoutNode.prototype, "_create", null);
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], DashboardLayoutNode.prototype, "_delete", null);
exports.DashboardLayoutNode = DashboardLayoutNode;
