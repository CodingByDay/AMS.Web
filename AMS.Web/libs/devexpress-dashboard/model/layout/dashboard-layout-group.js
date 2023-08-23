﻿/**
* DevExpress Dashboard (dashboard-layout-group.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardLayoutRootGroup = exports.DashboardLayoutGroup = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const dashboard_layout_node_1 = require("./dashboard-layout-node");
const _layout_item_placeholder_1 = require("./_layout-item-placeholder");
const _layout_utils_1 = require("./_layout-utils");
class DashboardLayoutGroup extends dashboard_layout_node_1.DashboardLayoutNode {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.childNodes = ko.observableArray([]);
        this.childNodes(analytics_utils_1.deserializeArray(modelJson.LayoutItems || {}, modelJson => _layout_utils_1.deserializeDashboardLayoutNode(modelJson, serializer))());
        this.childNodes().forEach(childNode => childNode.parentNode(this));
        this.parentNode.subscribe(newParentNode => {
            this.childNodes().forEach(childNode => childNode.parentNode(this));
        });
        this.childNodes.subscribe((arrayChanges) => {
            arrayChanges.forEach(arrayChange => {
                if (arrayChange.status === 'added') {
                    var addedLayoutItem = arrayChange.value;
                    addedLayoutItem.parentNode(this);
                }
                if (arrayChange.status === 'deleted') {
                    var removedLayoutItem = arrayChange.value;
                    if (removedLayoutItem.parentNode() === this) {
                        arrayChange.value.parentNode(null);
                    }
                }
            });
        }, null, 'arrayChange');
    }
    get _template() { return 'dx-dashboard-group'; }
    get _createPlaceholderFunc() { return () => new _layout_item_placeholder_1.DashboardLayoutItemPlaceholder(this)._createViewModel(); }
    get _visibleItems() { return this.childNodes; }
    get _childItems() { return this.childNodes; }
    get _orientation() { return this.orientation; }
    findLayoutItem(dashboardItem) {
        var result = super.findLayoutItem(dashboardItem);
        if (!result) {
            for (let childLayoutItem of this.childNodes()) {
                result = childLayoutItem.findLayoutItem(dashboardItem);
                if (!!result) {
                    break;
                }
            }
        }
        return result;
    }
    getNodesRecursive() {
        return this.childNodes().reduce((acc, layoutItem) => {
            acc.push(layoutItem);
            if (layoutItem instanceof DashboardLayoutGroup) {
                acc = acc.concat(layoutItem.getNodesRecursive());
            }
            return acc;
        }, []);
    }
    getItemsRecursive() {
        return this.getNodesRecursive().filter(node => node.dashboardItem());
    }
    _attachToGroupWithInversedOrientation(target, itemToAttach, position) {
        var owner = this;
        var newGroupItemModel = new DashboardLayoutGroup();
        newGroupItemModel.orientation(owner.orientation());
        owner.childNodes().slice(0).forEach(node => {
            owner._detachChild(node);
            newGroupItemModel.childNodes.push(node);
        });
        owner.orientation(newGroupItemModel.orientation() === 'Horizontal' ? 'Vertical' : 'Horizontal');
        owner.childNodes.push(newGroupItemModel);
        owner._attachChild(target, itemToAttach, position);
    }
    _attachChild(target, itemToAttach, position) {
        var attachBefore = true;
        var owner = this;
        if (this.orientation() === 'Horizontal') {
            switch (position) {
                case 'left':
                    break;
                case 'right':
                    attachBefore = false;
                    break;
                case 'top':
                    owner = this._wrapChildWithGroup(target, 'Vertical');
                    break;
                case 'bottom':
                    attachBefore = false;
                    owner = this._wrapChildWithGroup(target, 'Vertical');
                    break;
            }
        }
        else {
            switch (position) {
                case 'left':
                    owner = this._wrapChildWithGroup(target, 'Horizontal');
                    break;
                case 'right':
                    attachBefore = false;
                    owner = this._wrapChildWithGroup(target, 'Horizontal');
                    break;
                case 'top':
                    break;
                case 'bottom':
                    attachBefore = false;
                    break;
            }
        }
        if (!this.parentNode() && owner === this) {
            owner = this._wrapChildWithGroup(target, 'Horizontal');
        }
        _attachChildCore(owner, target, itemToAttach, attachBefore);
    }
    _detachChild(removedChildLayoutNode) {
        this.childNodes.splice(this.childNodes().indexOf(removedChildLayoutNode), 1);
        if (this.childNodes().length === 0 && !this.item) {
            this.remove();
        }
        this._ensureGroupIsNeeded();
    }
    _ensureGroupIsNeeded() {
        if (this.childNodes().length === 1 && !this.item && this.parentNode() && this.parentNode().parentNode()) {
            var childToUnwrap = this.childNodes()[0];
            var parentNode = this.parentNode();
            childToUnwrap.weight(this.weight());
            this.childNodes.remove(childToUnwrap);
            parentNode.childNodes.splice(parentNode.childNodes().indexOf(this), 1, childToUnwrap);
            parentNode._ensureGroupIsNeeded();
        }
    }
    _wrapChildWithGroup(childLayoutNode, orientation) {
        var newGroupItemModel = new DashboardLayoutGroup();
        newGroupItemModel.weight(childLayoutNode.weight());
        newGroupItemModel.orientation(orientation);
        _attachChildCore(this, childLayoutNode, newGroupItemModel, true);
        this._detachChild(childLayoutNode);
        newGroupItemModel.childNodes.push(childLayoutNode);
        return newGroupItemModel;
    }
    _getOrientationByInsertPosition(position) {
        return (position === 'left' || position === 'right') ? 'Horizontal' : 'Vertical';
    }
    _insertItemCore(layoutNodeToInsert, position, insertionBehavior) {
        if (this.parentNode()) {
            if (insertionBehavior === 'InsertIntoGroup' && this._getOrientationByInsertPosition(position) !== this.orientation()) {
                this._attachToGroupWithInversedOrientation(this, layoutNodeToInsert, position);
            }
            else {
                super._insertItemCore(layoutNodeToInsert, position);
            }
        }
        else {
            this._addItem(layoutNodeToInsert);
        }
    }
    _addItem(layoutNodeToInsert) {
        this.childNodes.push(layoutNodeToInsert);
    }
    _getDefaultItemType() { return 'LayoutGroup'; }
    _deleteDashbordItem() {
        super._deleteDashbordItem();
        if (this._dashboard()) {
            this._dashboard().items.remove(item => item.parentContainer() === this.item.componentName());
            this._dashboard().groups.remove(this.item);
        }
    }
}
exports.DashboardLayoutGroup = DashboardLayoutGroup;
function _attachChildCore(owner, target, sibling, before = true) {
    var index = owner.childNodes().indexOf(target);
    if (index == -1)
        index = 0;
    owner.childNodes.splice(before ? index : index + 1, 0, sibling);
}
_layout_utils_1._layoutItemTypeMap['LayoutGroup'] = DashboardLayoutGroup;
class DashboardLayoutRootGroup extends DashboardLayoutGroup {
    constructor(dashboard, modelJson, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this._dashboard(dashboard);
        this.weight(undefined);
    }
    _getDefaultItemType() { return ''; }
    _addItem(layoutNodeToInsert) {
        if (this.childNodes().length == 0) {
            var targetLayoutItem = new DashboardLayoutGroup();
            targetLayoutItem.childNodes.push(layoutNodeToInsert);
            this.childNodes.push(targetLayoutItem);
        }
        else if (this.childNodes().length == 1 && this.childNodes()[0] instanceof DashboardLayoutGroup) {
            this.childNodes()[0].childNodes.push(layoutNodeToInsert);
        }
        else if (this.childNodes().length > 1) {
            throw new Error('Root layout item has more than one child.');
        }
    }
}
exports.DashboardLayoutRootGroup = DashboardLayoutRootGroup;
