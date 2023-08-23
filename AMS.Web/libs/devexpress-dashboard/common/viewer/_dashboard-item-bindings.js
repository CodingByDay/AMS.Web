﻿/**
* DevExpress Dashboard (_dashboard-item-bindings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardUIItemStateController = exports.DashboardItemHeaderHeight = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const ko = require("knockout");
const disposable_object_1 = require("../../model/disposable-object");
const _dashboard_item_helper_1 = require("../../model/internal/_dashboard-item_helper");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _element_size_utils_1 = require("./_element-size-utils");
exports.DashboardItemHeaderHeight = 34;
function createViewerItemAdapter(element, dashboardItem, dashboardContext, localContext, sizeController) {
    var _disposables = [];
    let beforeRender = (viewerItem) => {
        let updateConstraintsHandler = (viewerItem) => {
            if (viewerItem && sizeController.setConstraints) {
                sizeController.setConstraints(viewerItem.getConstraints(true));
            }
        };
        updateConstraintsHandler(viewerItem);
        _disposables.push(dashboardItem.showCaption.subscribe(() => {
            setTimeout(() => updateConstraintsHandler(viewerItem), 100);
        }));
        viewerItem.constraintsUpdated.add(() => {
            updateConstraintsHandler(viewerItem);
        });
        _element_size_utils_1.setElementSize(element, sizeController);
        _disposables.push(_element_size_utils_1.createItemSizeUpdater(viewerItem, sizeController));
        if (sizeController.visible) {
            _disposables.push(sizeController.visible.subscribe(isVisible => {
                if (!isVisible) {
                    let castedItem = viewerItem;
                    if (castedItem.chartViewer) {
                        castedItem.chartViewer.hideTooltip();
                    }
                }
            }));
        }
    };
    var itemViewerAdapter = dashboardContext.viewerItemsManager.create(dashboardItem, element, dashboardContext, localContext, beforeRender);
    itemViewerAdapter.itemUpdated = (viewerItem) => { updateLayoutItemBackbound(element, viewerItem._isTransparentBackground()); };
    itemViewerAdapter.initialize();
    _disposables.push(itemViewerAdapter);
    return { dispose: () => { _disposables.forEach(disposable => disposable.dispose()); } };
}
function renderItemViewer(element, dashboardItem, dashboardContext, localContext, sizeController) {
    var perViewerItemDisposable;
    var subscription = null;
    if (localContext && localContext.visualMode) {
        subscription = _knockout_utils_1.subscribeAndPerform(localContext.visualMode, _ => {
            perViewerItemDisposable && perViewerItemDisposable.dispose();
            perViewerItemDisposable = createViewerItemAdapter(element, dashboardItem, dashboardContext, localContext, sizeController);
        });
    }
    else {
        subscription = createViewerItemAdapter(element, dashboardItem, dashboardContext, localContext, sizeController);
    }
    return {
        dispose: () => {
            perViewerItemDisposable && perViewerItemDisposable.dispose();
            subscription && subscription.dispose();
        }
    };
}
function getUiStateTemplate(dashboardItem, sizeController, additionalClasses = []) {
    var sizeObservable = ko.observable();
    var getFullClassList = (className) => [className].concat(additionalClasses).join(' ');
    var setSizeClass = (sizeController) => {
        var height = sizeController.getHeight();
        if (height > 120) {
            sizeObservable(getFullClassList('dx-dashboard-layout-state-large'));
        }
        else if (height > 80) {
            sizeObservable(getFullClassList('dx-dashboard-layout-state-medium'));
        }
        else {
            sizeObservable(getFullClassList('dx-dashboard-layout-state-small'));
        }
    };
    setSizeClass(sizeController);
    var resizeHandler = () => setSizeClass(sizeController);
    sizeController.requestRepaint.add(resizeHandler);
    var disposable = {
        dispose: () => {
            sizeController.requestRepaint.remove(resizeHandler);
        }
    };
    if (dashboardItem._uiState() === 'loading') {
        return { template: { name: 'dx-dashboard-item-state-loading' }, disposable: disposable };
    }
    else if (dashboardItem._uiState() === 'error') {
        return {
            template: {
                name: 'dx-dashboard-item-state-error',
                data: {
                    icon: _dashboard_item_helper_1.getItemIconName(dashboardItem),
                    title: _dashboard_item_helper_1.getItemTitle(dashboardItem),
                    errorState: dashboardItem._errorState,
                    sizeClass: sizeObservable
                }
            },
            disposable: disposable
        };
    }
    else if (dashboardItem._uiState() === 'empty') {
        return {
            template: {
                name: 'dx-dashboard-item-state-empty',
                data: {
                    icon: _dashboard_item_helper_1.getItemIconName(dashboardItem),
                    title: _dashboard_item_helper_1.getItemTitle(dashboardItem),
                    sizeClass: sizeObservable
                }
            },
            disposable: disposable
        };
    }
}
function updateLayoutItemBackbound(element, isTransparent) {
    if (isTransparent) {
        element.classList.add('dx-layout-item-container-transparent');
    }
    else {
        element.classList.remove('dx-layout-item-container-transparent');
    }
}
var resolver = new analytics_internal_1.CodeResolver();
ko.bindingHandlers['dx-dashboard-item-binding'] = {
    init: function (element, valueAccessor, _, __, bindingContext) {
        var params = ko.unwrap(valueAccessor());
        var dashboardItem = params.dashboardItem;
        let sizeController = params.sizeController;
        _element_size_utils_1.setElementSize(element, sizeController);
        element.classList.add('dx-dashboard-item-container');
        var uiStateController = new DashboardUIItemStateController(element, params.dashboardItem, params.sizeController, bindingContext, () => {
            return renderItemViewer(element, dashboardItem, params.dashboardContext, params.localContext, params.sizeController);
        });
        resolver.execute(() => uiStateController.render(), 1);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            uiStateController.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
ko.bindingHandlers['dx-dashboard-layout-group-binding'] = {
    init: function (element, valueAccessor) {
        var _disposables = [];
        var params = ko.unwrap(valueAccessor());
        element.classList.add('dx-dashboard-item-container');
        let sizeController = params.sizeController;
        _element_size_utils_1.setElementSize(element, sizeController);
        var itemViewerAdapter = params.dashboardContext.viewerItemsManager.create(params.dashboardItem, element, params.dashboardContext, params.localContext, viewerItem => {
            _disposables.push(ko.computed(() => {
                params.headerHeight(params.dashboardItem.showCaption() ? exports.DashboardItemHeaderHeight : 0);
            }));
            _element_size_utils_1.setElementSize(element, sizeController);
            _disposables.push(_element_size_utils_1.createItemSizeUpdater(viewerItem, params.sizeController));
        });
        itemViewerAdapter.initialize();
        _disposables.push(itemViewerAdapter);
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            _disposables.forEach(d => d.dispose());
        });
        return { controlsDescendantBindings: true };
    }
};
class DashboardUIItemStateController extends disposable_object_1.DisposableObject {
    constructor(_element, _dashboardItem, _sizeController, _bindingContext, _renderDashboardItem, _additionalClasses = []) {
        super();
        this._element = _element;
        this._dashboardItem = _dashboardItem;
        this._sizeController = _sizeController;
        this._bindingContext = _bindingContext;
        this._renderDashboardItem = _renderDashboardItem;
        this._additionalClasses = _additionalClasses;
        this._perUiStateSubscriptions = [];
        this._renderDashboardItemState = () => {
            this._perUiStateSubscriptions.forEach(d => d.dispose());
            this._perUiStateSubscriptions = [];
            if (this._dashboardItem._uiState() === 'live') {
                this._perUiStateSubscriptions.push(this._renderDashboardItem());
            }
            else {
                var { template, disposable } = getUiStateTemplate(this._dashboardItem, this._sizeController, this._additionalClasses);
                this._perUiStateSubscriptions.push(disposable);
                this._perUiStateSubscriptions.push(_element_size_utils_1.createElementSizeUpdater(this._element, this._sizeController));
                ko.applyBindingsToNode(this._element, { template: template }, this._bindingContext);
            }
        };
    }
    render() {
        this._renderDashboardItemState();
        this.toDispose(this._dashboardItem._uiState.subscribe(() => this._renderDashboardItemState()));
    }
    dispose() {
        this._perUiStateSubscriptions.forEach(d => d.dispose());
        this._perUiStateSubscriptions = [];
        super.dispose();
    }
}
exports.DashboardUIItemStateController = DashboardUIItemStateController;
