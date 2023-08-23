﻿/**
* DevExpress Dashboard (_layout-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutItem = exports.MinWeight = exports.SplitterSize = exports.setHoverLocation = exports._syncLayoutHelper = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _dashboard_viewer_constants_1 = require("../../../viewer-parts/viewer/_dashboard-viewer-constants");
function _syncLayoutHelper(sourceArray, destArray, addHandler) {
    if (sourceArray) {
        destArray(sourceArray.peek().map(item => addHandler(item)));
        return sourceArray.subscribe((changes) => {
            changes.sort((a, b) => a.status === 'deleted' ? -1 : 1).forEach((arrayChange) => {
                var change = arrayChange;
                if (change.status === 'added') {
                    destArray.splice(change.index, 0, addHandler(change.value));
                }
                else if (change.status === 'deleted') {
                    var itemToDelete = destArray.peek()[change.index];
                    destArray.remove(itemToDelete);
                    itemToDelete.dispose();
                }
            });
        }, null, 'arrayChange');
    }
    return undefined;
}
exports._syncLayoutHelper = _syncLayoutHelper;
function setHoverLocation(hoverLayoutItem, location = null, dropBehavior = 'InsertBesideGroup') {
    if (hoverLayoutItem) {
        if (hoverLayoutItem.viewModel.hasItem()) {
            if (dropBehavior === 'InsertIntoGroup') {
                setHoverLocationCore(hoverLayoutItem, location);
            }
            else {
                hoverLayoutItem.dragOverLocation(location);
            }
        }
        else {
            setHoverLocationCore(hoverLayoutItem, location);
        }
    }
}
exports.setHoverLocation = setHoverLocation;
function setHoverLocationCore(hoverLayoutItem, location = null) {
    var items = hoverLayoutItem.items().filter(item => item.visible());
    if (!location || hoverLayoutItem.viewModel.orientation() === 'Horizontal' && (location === 'top' || location === 'bottom') ||
        hoverLayoutItem.viewModel.orientation() === 'Vertical' && (location === 'left' || location === 'right')) {
        items.forEach(child => setHoverLocation(child, location));
    }
    else {
        var index = (location === 'top' || location === 'left') ? 0 : items.length - 1;
        setHoverLocation(items[index], location);
    }
}
exports.SplitterSize = 6;
exports.MinWeight = 0.00001;
class LayoutItem {
    constructor(viewModel, parent) {
        this.viewModel = viewModel;
        this._isUpdating = ko.observable(false);
        this._constraints = null;
        this._width = ko.observable(800);
        this._height = ko.observable(600);
        this._subscriptions = [];
        this.setConstraints = (constraints) => {
            var correctSize = function (value, addition) {
                return (Number.MAX_VALUE - value >= addition) ? value + addition : Number.MAX_VALUE;
            };
            this._constraints.min.width(correctSize(constraints.min.width, exports.SplitterSize));
            this._constraints.min.height(correctSize(constraints.min.height, exports.SplitterSize));
            this._constraints.max.width(correctSize(constraints.max.width, exports.SplitterSize));
            this._constraints.max.height(correctSize(constraints.max.height, exports.SplitterSize));
        };
        this.items = ko.observableArray([]);
        this.resizeHandles = ko.observable('none');
        this.isSelected = ko.observable(false);
        this.dragOverLocation = ko.observable();
        this.itemStyle = ko.computed(() => {
            var result = '';
            if (!!this.dragOverLocation()) {
                result += ' dx-drag-over-' + this.dragOverLocation();
            }
            if (this.isSelected()) {
                result += ' dx-layout-selected';
            }
            return result;
        });
        this.coverClickHandler = (e) => {
            this.onEvent && this.onEvent(this, 'click');
        };
        this.coverMouseOverHandler = (e) => {
            this.onEvent && this.onEvent(this, 'mouseover');
        };
        this.resizeStarted = () => {
            this.onEvent && this.onEvent(this, 'resize-started');
        };
        this.resizeCompleted = () => {
            this.onEvent && this.onEvent(this, 'resize-completed');
        };
        this.getContext = () => {
            return this.onEvent && this.onEvent(this, 'get-context');
        };
        this.getLocalContext = () => {
            return this.onEvent && this.onEvent(this, 'get-local-context');
        };
        this.getContextMenu = () => {
            const service = this.onEvent && this.onEvent(this, 'get-context-menu-service');
            return service && service(this);
        };
        this.getEmptyItemTemplates = () => {
            const service = this.onEvent && this.onEvent(this, 'get-empty-item-templates-service');
            return service && service(this);
        };
        this.getLayoutItemPlaceholder = () => {
            const service = this.onEvent && this.onEvent(this, 'get-layout-item-placeholder-service');
            return service && service(this);
        };
        this.verticalPaddings = ko.observable(0);
        this.horizontalPaddings = ko.observable(0);
        this.repaintCallbacks = _jquery_helpers_1.createJQueryCallbacks();
        var self = this;
        this._parent = ko.observable(parent);
        if (!!this._parent()) {
            this.isDesignMode = this._parent().isDesignMode;
            this.isLayoutReady = this._parent().isLayoutReady;
        }
        else {
            this.isDesignMode = ko.observable(false);
            this.isLayoutReady = ko.observable(true);
        }
        this._constraints = {
            min: {
                width: ko.observable(viewModel.hasItem() ? _dashboard_viewer_constants_1.DashboardViewerConstants.minPaneWidth : 0),
                height: ko.observable(viewModel.hasItem() ? _dashboard_viewer_constants_1.DashboardViewerConstants.minPaneHeight : 0)
            },
            max: {
                width: ko.observable(Number.MAX_VALUE),
                height: ko.observable(Number.MAX_VALUE)
            }
        };
        var visible = ko.observable(true);
        this.visible = ko.computed({
            read: () => {
                var atLeastOneChildVisible = this.items().reduce((res, item) => { return res || item.visible(); }, this.items().length === 0 || !!this.viewModel.hasItem());
                return atLeastOneChildVisible && visible();
            },
            write: (val) => {
                visible(val);
            }
        });
        this.sizeController = {
            getWidth: () => this.containerWidth(),
            getHeight: () => this.containerHeight(),
            requestRepaint: this.repaintCallbacks,
            visible: this.visible,
            setConstraints: this.setConstraints
        };
        this.minWidth = ko.computed(() => {
            var result = this._constraints.min.width();
            if (this.items().length > 0) {
                if (this.viewModel.orientation() === 'Horizontal') {
                    var minFromChildren = this.items().reduce((total, item) => total + item.minWidth(), 0);
                    result = minFromChildren > result ? minFromChildren : result;
                }
                else {
                    this.items().forEach(item => {
                        if (item.minWidth() > result) {
                            result = item.minWidth();
                        }
                    });
                }
            }
            return result + this.horizontalPaddings();
        });
        this.minHeight = ko.computed(() => {
            var result = this._constraints.min.height();
            if (this.items().length > 0) {
                if (this.viewModel.orientation() === 'Vertical') {
                    var minFromChildren = this.items().reduce((total, item) => total + item.minHeight(), 0);
                    result = Math.max(minFromChildren, result);
                }
                else {
                    this.items().forEach(item => {
                        if (item.minHeight() > result) {
                            result = item.minHeight();
                        }
                    });
                }
            }
            return result + this.verticalPaddings();
        });
        this.maxWidth = ko.computed(() => {
            return Math.min(Number.MAX_VALUE, this._constraints.max.width());
        });
        this.maxHeight = ko.computed(() => {
            var result = this._constraints.max.height();
            if (this.items().length > 0 && !this.viewModel.ignoreChildMaxHeight) {
                if (this.viewModel.orientation() === 'Vertical') {
                    if (this.items().some(item => item.maxHeight() === Number.MAX_VALUE)) {
                        result = Number.MAX_VALUE;
                    }
                    else {
                        result = this.items().reduce((total, item) => total + item.maxHeight(), 0);
                    }
                }
                else {
                    result = this.items().reduce((total, item) => Math.max(total, item.maxHeight()), 0);
                }
            }
            return Math.min(Number.MAX_VALUE, result + this.verticalPaddings());
        });
        this.width = ko.computed({
            read: () => {
                return this._width() > this.minWidth() ? this._width() : this.minWidth();
            },
            write: (val) => {
                if (this._parent()) {
                    var newWeight = this.viewModel.weight() * (val / this._width() || 1);
                    this._changeWeight(newWeight);
                }
                else {
                    this._width(val);
                }
            }
        });
        this.height = ko.computed({
            read: () => {
                return this._height() > this.minHeight() ? this._height() : this.minHeight();
            },
            write: (val) => {
                if (this._parent()) {
                    var newWeight = this.viewModel.weight() * (val / this._height() || 1);
                    this._changeWeight(newWeight);
                }
                else {
                    this._height(val);
                }
            }
        });
        this.contentWidth = ko.computed(() => this.width() - this.horizontalPaddings());
        this.contentHeight = ko.computed(() => this.height() - this.verticalPaddings());
        this.containerWidth = ko.computed(() => this.width() - exports.SplitterSize);
        this.containerHeight = ko.computed(() => this.height() - exports.SplitterSize);
        this.areChildrenSelected = ko.pureComputed(() => {
            let result = !!this.viewModel.hasItem() && !!this.visible() && this.isSelected();
            this.items().forEach((layoutItem) => {
                result = result || layoutItem.areChildrenSelected();
            });
            return result;
        });
        this._subscriptions.push(_syncLayoutHelper(viewModel.visibleItems, this.items, model => new LayoutItem(model._createViewModel(), self)));
        this._subscriptions.push(ko.computed(() => {
            if (!this._isUpdating()) {
                this._updateChildrenSize(this.items().filter(item => item.visible()));
                this._updateChildrenResizeHandles(this.items());
            }
        }));
        var fireRepaintCallback = () => {
            if (this.isLayoutReady()) {
                this.repaintCallbacks.fire();
            }
        };
        this._subscriptions.push(this.height.subscribe(() => fireRepaintCallback()));
        this._subscriptions.push(this.width.subscribe(() => fireRepaintCallback()));
        this._subscriptions.push(this.isLayoutReady.subscribe(() => fireRepaintCallback()));
        fireRepaintCallback();
        var placeholderViewModel = this.viewModel.getPlaceholder && this.viewModel.getPlaceholder();
        if (placeholderViewModel) {
            this.placeholderItem = new LayoutItem(placeholderViewModel, this);
        }
        this._subscriptions.push(this.visible, this.minWidth, this.minHeight, this.maxWidth, this.maxHeight, this.width, this.height, this.areChildrenSelected);
    }
    static findLargestItem(layoutItem) {
        if (layoutItem.viewModel.hasItem()) {
            return { maxSquare: layoutItem.width() * layoutItem.height(), item: layoutItem };
        }
        var result = { maxSquare: 0, item: null };
        layoutItem.items().forEach(item => {
            var itemMaxSquare = this.findLargestItem(item);
            if (result.maxSquare < itemMaxSquare.maxSquare) {
                result = itemMaxSquare;
            }
        });
        return result;
    }
    _changeWeight(newWeight) {
        this._parent() && this._parent()._isUpdating(true);
        try {
            this._changeWeightCore(newWeight);
        }
        finally {
            this._parent() && this._parent()._isUpdating(false);
        }
    }
    _changeWeightCore(newWeight) {
        var selfIndex = this._parent().items().indexOf(this);
        var neighbourItem = this._parent().items()[selfIndex + 1];
        var newNeighbourWeight = neighbourItem.viewModel.weight() - (newWeight - this.viewModel.weight());
        neighbourItem.viewModel.weight(this._correntWeight(newNeighbourWeight));
        this.viewModel.weight(this._correntWeight(newWeight));
    }
    _correntWeight(weight) {
        return weight < exports.MinWeight ? exports.MinWeight : weight;
    }
    _safeSetWidth(itemWidth) {
        var computedWidth = itemWidth;
        if (computedWidth < this.minWidth()) {
            computedWidth = this.minWidth();
        }
        if (computedWidth > this.maxWidth()) {
            computedWidth = this.maxWidth();
        }
        this._width(computedWidth);
    }
    _safeSetHeight(itemHeight) {
        var computedHeight = itemHeight;
        if (computedHeight < this.minHeight()) {
            computedHeight = this.minHeight();
        }
        if (computedHeight > this.maxHeight()) {
            computedHeight = this.maxHeight();
        }
        this._height(computedHeight);
    }
    _updateChildrenSize(items) {
        if (items.length > 0) {
            var totalWeight = items.reduce((total, item) => total + item.viewModel.weight(), 0);
            var undistributedDelta = 0;
            if (this.viewModel.orientation() === 'Horizontal') {
                items.forEach(item => {
                    item._height(this.contentHeight());
                    var itemDimension = this.contentWidth() * item.viewModel.weight() / totalWeight;
                    item._safeSetWidth(itemDimension);
                    undistributedDelta += item._width.peek() - itemDimension;
                });
                items.reduceRight((_, item) => {
                    if (undistributedDelta !== 0) {
                        var itemDimenstion = item._width.peek();
                        item._safeSetWidth(itemDimenstion - undistributedDelta);
                        undistributedDelta += item._width.peek() - itemDimenstion;
                    }
                }, {});
                if (undistributedDelta < 0) {
                    items[items.length - 1]._width(items[items.length - 1]._width.peek() - undistributedDelta);
                }
            }
            else {
                items.forEach(item => {
                    item._width(this.contentWidth());
                    var itemDimension = this.contentHeight() * item.viewModel.weight() / totalWeight;
                    item._safeSetHeight(itemDimension);
                    undistributedDelta += item._height.peek() - itemDimension;
                });
                items.reduceRight((_, item) => {
                    if (undistributedDelta !== 0) {
                        var itemDimenstion = item._height.peek();
                        item._safeSetHeight(itemDimenstion - undistributedDelta);
                        undistributedDelta += item._height.peek() - itemDimenstion;
                    }
                }, {});
                if (undistributedDelta < 0) {
                    items[items.length - 1]._height(items[items.length - 1]._height.peek() - undistributedDelta);
                }
            }
        }
    }
    _updateChildrenResizeHandles(items) {
        var itemsCount = items.length;
        if (itemsCount > 0) {
            var handle = this.viewModel.orientation() === 'Horizontal' ? 'e' : 's';
            items.forEach((item, index) => {
                item.resizeHandles(index < itemsCount - 1 ? handle : 'none');
            });
        }
    }
    dispose() {
        this._parent(null);
        if (this.placeholderItem) {
            this.placeholderItem.dispose();
            this.placeholderItem = null;
        }
        this.repaintCallbacks.empty();
        this.items().forEach(i => i.dispose());
        this._subscriptions.forEach(subscription => subscription && subscription.dispose());
        this._subscriptions = [];
    }
    isValidWidth(val) {
        if (this._parent()) {
            if (val < this.minWidth() || val > this.maxWidth()) {
                return false;
            }
            var selfIndex = this._parent().items().indexOf(this);
            if (selfIndex < this._parent().items().length - 1) {
                var neighbourItem = this._parent().items()[selfIndex + 1];
                var neighbourNewWidth = neighbourItem.width() - val + this.width();
                if (neighbourNewWidth < neighbourItem.minWidth() || neighbourNewWidth > neighbourItem.maxWidth()) {
                    return false;
                }
            }
        }
        return this.minWidth() !== this.maxWidth();
    }
    isValidHeight(val) {
        if (this._parent()) {
            if (val < this.minHeight() || val > this.maxHeight()) {
                return false;
            }
            var selfIndex = this._parent().items().indexOf(this);
            if (selfIndex < this._parent().items().length - 1) {
                var neighbourItem = this._parent().items()[selfIndex + 1];
                var neighbourNewHeight = neighbourItem.height() - val + this.height();
                if (neighbourNewHeight < neighbourItem.minHeight() || neighbourNewHeight > neighbourItem.maxHeight()) {
                    return false;
                }
            }
        }
        return this.minHeight() !== this.maxHeight();
    }
    getSelectionParentsList(location) {
        var current = this;
        var parent = current._parent();
        var result = [{ node: current, dropBehavior: 'InsertBesideGroup' }];
        var orientation = !!parent && parent.viewModel.orientation();
        do {
            if (!!parent && !parent.viewModel.hasItem()) {
                var items = parent.items().filter(item => item.visible());
                var itemIndex = items.indexOf(current);
                var firstItemIndex = 0;
                var lastItemIndex = items.length - 1;
                if (parent.viewModel.orientation() === 'Horizontal' && (location === 'left' || location === 'right')) {
                    if (items.length > 1 &&
                        (location === 'left' && itemIndex > firstItemIndex || location === 'right' && itemIndex < lastItemIndex
                            || location === 'left' && itemIndex === lastItemIndex || location === 'right' && itemIndex === firstItemIndex)) {
                        return result;
                    }
                    if (location === 'left' && itemIndex === firstItemIndex || location === 'right' && itemIndex === lastItemIndex) {
                        orientation = this._inverseOrientation(parent.viewModel.orientation());
                    }
                }
                if (parent.viewModel.orientation() === 'Vertical' && (location === 'top' || location === 'bottom')) {
                    if (items.length > 1 &&
                        (location === 'top' && itemIndex > firstItemIndex || location === 'bottom' && itemIndex < lastItemIndex
                            || location === 'top' && itemIndex === lastItemIndex || location === 'bottom' && itemIndex === firstItemIndex)) {
                        return result;
                    }
                    if (location === 'top' && itemIndex === firstItemIndex || location === 'bottom' && itemIndex === lastItemIndex) {
                        orientation = this._inverseOrientation(parent.viewModel.orientation());
                    }
                }
            }
            current = parent;
            parent = current && current._parent();
            if (current && parent && !current.viewModel.hasItem() && orientation === current.viewModel.orientation() && !this._checkGroupWillBeUnwrapped(current)) {
                result.push({ node: current, dropBehavior: 'InsertBesideGroup' });
            }
            if (!!current && current.viewModel.hasItem()
                && current.viewModel.orientation() !== this._getRequiredOrientationByLocation(location)) {
                result.push({ node: current, dropBehavior: 'InsertIntoGroup' });
            }
        } while (!!current && !!parent && !current.viewModel.hasItem());
        return result;
    }
    _getRequiredOrientationByLocation(location) {
        return (location === 'left' || location === 'right') ? 'Horizontal' : 'Vertical';
    }
    _inverseOrientation(orientation) {
        return orientation === 'Horizontal' ? 'Vertical' : 'Horizontal';
    }
    _checkGroupWillBeUnwrapped(group) {
        var _a;
        return group.items().filter(i => i.visible()).length === 1
            && group.items().filter(i => !i.visible()).length === 1
            && ((_a = group._parent()) === null || _a === void 0 ? void 0 : _a._parent())
            && !group.viewModel.hasItem();
    }
    findLayoutItem(criteria) {
        var result = undefined;
        if (criteria(this)) {
            result = this;
        }
        if (!result) {
            this.items.peek().forEach(item => {
                result = item.findLayoutItem(criteria) || result;
            });
        }
        return result;
    }
    findLayoutItemByItemModel(itemModel) {
        return this.findLayoutItem((item) => {
            return item.viewModel.model === itemModel.model;
        });
    }
    onEvent(item, event) {
        return this._parent() && this._parent().onEvent && this._parent().onEvent(item, event);
    }
    updateSize(width, height) {
        try {
            this.isLayoutReady(false);
            this.width(width);
            this.height(height);
        }
        finally {
            this.isLayoutReady(true);
        }
    }
    create(modelItemJson, location, insertBehavior) {
        var rootItem = this.getRoot();
        var createdItemViewModel = this.viewModel.create(modelItemJson, location, insertBehavior);
        var createdLayoutItem = rootItem.findLayoutItemByItemModel(createdItemViewModel);
        createdLayoutItem && createdLayoutItem.coverClickHandler(null);
        return createdLayoutItem;
    }
    moveTo(layoutNode, location, insertBehavior) {
        var rootItem = this.getRoot();
        this.viewModel.moveTo(layoutNode.viewModel, location, insertBehavior);
        var createdLayoutItem = rootItem.findLayoutItemByItemModel(this.viewModel);
        createdLayoutItem && createdLayoutItem.coverClickHandler(null);
        return createdLayoutItem;
    }
    delete() {
        this.viewModel.delete();
        this._parent(null);
    }
    getRoot() {
        var root = this;
        while (root._parent()) {
            root = root._parent();
        }
        return root;
    }
    canAttach(something) {
        return !!this._parent() && this.viewModel.canAttach(something);
    }
    getPlaceholder() {
        return this.placeholderItem;
    }
}
exports.LayoutItem = LayoutItem;
ko.components.register('dx-layout-item', {
    viewModel: {
        createViewModel: (params) => ({
            layoutItem: ko.computed(() => ko.unwrap(params.layoutItem))
        })
    },
    template: { element: 'dx-layout-item' }
});
