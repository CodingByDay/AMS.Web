﻿/**
* DevExpress Dashboard (_docking-layout-adapter.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DockingLayoutAdapter = void 0;
const ko = require("knockout");
const disposable_object_1 = require("../../model/disposable-object");
const _knockout_utils_1 = require("../../model/internal/_knockout-utils");
const _interfaces_1 = require("../internal/_interfaces");
const _docking_layout_controller_1 = require("./_docking-layout-controller");
class DockingLayoutAdapter extends disposable_object_1.DisposableObject {
    constructor(_dashboardControl) {
        super();
        this._dashboardControl = _dashboardControl;
        this._dockingLayoutController = ko.observable();
        this._templateName = 'dx-dashboard-resizable-layout';
        this.toDispose(this._dashboardControl.isDesignMode.subscribe(isDesignMode => {
            if (this._dockingLayoutController() && this._dockingLayoutController().rootItem) {
                this._dockingLayoutController().rootItem.isDesignMode(isDesignMode);
                this._dockingLayoutController().select(null);
            }
        }));
        this.toDispose(this._dashboardControl.dashboardContainer.subscribe(dashboardContainer => {
            if (dashboardContainer && dashboardContainer.dashboard) {
                this._dockingLayoutController(new _docking_layout_controller_1.DockingLayoutController(dashboardContainer.dashboard, this._dashboardControl._dataSourceBrowser, this._dashboardControl._dashboardContext, (name) => this._dashboardControl.findExtension(name), this._dashboardControl.option('allowMaximizeItems'), this._dashboardControl.resizeByTimer, this._dashboardControl._repaintRequest, this._dashboardControl.encodeHtml, this._dashboardControl._viewerApi));
                this._dockingLayoutController().rootItem.isDesignMode(this._dashboardControl.isDesignMode());
            }
            else {
                if (this._dockingLayoutController()) {
                    this._dockingLayoutController().dispose();
                }
                this._dockingLayoutController(null);
            }
        }));
    }
    start() {
        this._dashboardControl._layoutInfoProviderCollection.push({
            name: this._templateName,
            condition: () => true,
            getViewModel: () => this._getKoViewModel(),
            getLayoutController: () => this._dockingLayoutController,
        });
        this._dashboardControl._updateLayout();
    }
    stop() {
        this._dashboardControl._layoutInfoProviderCollection = this._dashboardControl._layoutInfoProviderCollection
            .filter(layoutInfo => layoutInfo.name !== this._templateName);
        this._dashboardControl._updateLayout();
        if (this._dockingLayoutController()) {
            this._dockingLayoutController().dispose();
        }
    }
    processKeyEvent(eventName, e) {
        if (e.keyCode === _interfaces_1.KeyCodes.Delete && this._dockingLayoutController() && this._dockingLayoutController()._selectedLayoutItem() && !this._dockingLayoutController().itemInteractionInProgress()) {
            this._dockingLayoutController()._selectedLayoutItem().delete();
            return true;
        }
    }
    dispose() {
        super.dispose();
        this.stop();
    }
    _getKoViewModel() {
        let viewModel = ko.observable(new DockingLayoutViewModel(this._dockingLayoutController()));
        this.toDispose(this._dockingLayoutController.subscribe(_ => viewModel() && viewModel().dispose(), null, 'beforeChange'));
        this.toDispose(this._dockingLayoutController.subscribe(controller => {
            viewModel(new DockingLayoutViewModel(controller));
            viewModel() && this.toDispose(viewModel());
        }));
        return viewModel;
    }
}
exports.DockingLayoutAdapter = DockingLayoutAdapter;
class DockingLayoutViewModel extends disposable_object_1.DisposableObject {
    constructor(_layoutController) {
        super();
        this._layoutController = _layoutController;
        this.componentArgs = this._initComponentArgs();
        this.cssClasses = this._initSubscriptions();
    }
    _initComponentArgs() {
        if (!this._layoutController)
            return {};
        return {
            dashboard: this._layoutController.dashboardModel,
            dataSourceBrowser: this._layoutController.dataSourceBrowser,
            encodeHtml: this._layoutController.encodeHtml,
            titleContext: this._layoutController.titleContext,
            resizeByTimer: this._layoutController.resizeByTimer,
            layout: this._layoutController.rootItem,
            headerHeight: this._layoutController.headerHeight,
            layoutMainElementEvents: this._layoutController.layoutMainElementEvents,
            repaintRequest: this._layoutController.repaintRequest,
            fullscreenItemModel: this._layoutController.fullscreenItemModel,
            scrollViewEvents: this._layoutController.scrollViewEvents
        };
    }
    _initSubscriptions() {
        if (!this._layoutController)
            return;
        const subscription = _knockout_utils_1.safeComputed({ itemInteractionInProgress: this._layoutController.itemInteractionInProgress }, args => {
            const classes = ['dx-dashboard-viewer', 'dx-dashboard-container'];
            if (args.itemInteractionInProgress)
                classes.push('dx-dashboard-in-work');
            return classes.join(' ');
        });
        this.toDispose(subscription);
        return subscription;
    }
}
