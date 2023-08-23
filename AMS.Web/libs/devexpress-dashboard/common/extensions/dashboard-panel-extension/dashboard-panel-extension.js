﻿/**
* DevExpress Dashboard (dashboard-panel-extension.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardPanelExtension = void 0;
const devices_1 = require("devextreme/core/devices");
const string_1 = require("devextreme/core/utils/string");
const themes_1 = require("devextreme/ui/themes");
const $ = require("jquery");
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const _default_1 = require("../../../data/localization/_default");
const caption_toolbar_options_1 = require("../../../viewer-parts/widgets/caption-toolbar/caption-toolbar-options");
const _helpers_1 = require("../../_helpers");
const name = 'dashboardPanel';
const nameAlias = 'dashboard-panel';
class DashboardPanelExtension {
    constructor(dashboardControl, options = {}) {
        this.dashboardControl = dashboardControl;
        this.options = options;
        this.name = name;
        this._iconBack = 'dx-dashboard-back';
        this._flexParent = 'dx-dashboard-flex-parent';
        this._dashboardsButton = 'dx-dashboard-back-button';
        this._dashboardTruncated = 'dx-dashboard-truncated';
        this._ellipsisText = 'dx-dashboard-ellipsis';
        this._itemTemplate = ko.observable();
        this._isMobile = ko.observable(false);
        this._disposables = [];
        this.panelWidth = 250;
        this.visible = ko.observable(false);
        this.allowSwitchToDesigner = ko.observable();
        this.selectedItemKeys = ko.observableArray();
        this.availableDashboards = ko.observableArray();
        this._actualPanelWidth = ko.observable();
        this.showPanelAsync = (options) => {
            return this._showPanelAsync(options, _helpers_1.CancellationToken.None);
        };
        this._showPanelAsync = (options, cancellationToken) => {
            var def = _jquery_helpers_1.createJQueryDeferred();
            if (cancellationToken.canceled)
                def.reject();
            else {
                this.visible(true);
                this.updateDashboardsList();
                setTimeout(() => {
                    if (!cancellationToken.canceled) {
                        options.surfaceLeft = this.panelWidth;
                        def.resolve(options);
                    }
                    else {
                        def.reject();
                    }
                }, 500);
            }
            return def.promise();
        };
        this.hidePanelAsync = (options) => {
            return this._hidePanelAsync(options, _helpers_1.CancellationToken.None);
        };
        this._hidePanelAsync = (options, cancellationToken) => {
            var def = _jquery_helpers_1.createJQueryDeferred();
            if (cancellationToken.canceled)
                def.reject();
            else {
                this.visible(false);
                setTimeout(() => {
                    if (!cancellationToken.canceled) {
                        options.surfaceLeft = 0;
                        def.resolve(options);
                    }
                    else {
                        def.reject();
                    }
                }, 500);
            }
            return def.promise();
        };
        this.switchToViewer = () => {
            this.dashboardControl.switchToViewer();
        };
        this.switchToDesigner = () => {
            this.dashboardControl.switchToDesigner();
        };
        let cancelableDesignerToViewerAction = {
            orderNo: 60,
            action: this.showPanelAsync,
            cancelableAction: this._showPanelAsync
        };
        this.designerToViewerAction = cancelableDesignerToViewerAction;
        let cancelableViewerToDesignerAction = {
            orderNo: 20,
            action: this.hidePanelAsync,
            cancelableAction: this._hidePanelAsync
        };
        this.viewerToDesignerAction = cancelableViewerToDesignerAction;
    }
    get _templateName() {
        if (this._isMobile()) {
            return this.options.dashboardThumbnail ? 'dashboard-preview' : 'dashboard-card-view';
        }
        return 'dashboard-list-item';
    }
    start() {
        var mobileExtension = this.dashboardControl.findExtension('mobileLayout');
        this._isMobile(mobileExtension && mobileExtension.mobileLayoutEnabled());
        mobileExtension && mobileExtension.mobileLayoutEnabled.subscribe(() => {
            this.stop();
            this.start();
        });
        if (this._isMobile())
            this.allowSwitchToDesigner(false);
        else if (this.allowSwitchToDesigner() === undefined) {
            this.allowSwitchToDesigner(this.dashboardControl.allowSwitchToDesigner);
        }
        this.visible(this._isMobile() ? false : !this.dashboardControl.isDesignMode());
        this._itemTemplate(this._templateName);
        if (this._isMobile()) {
            this._actualPanelWidth($.fn.constructor(window).width());
            devices_1.default.on('orientationChanged', (e) => {
                this._actualPanelWidth($.fn.constructor(window).width());
            });
        }
        else {
            this._actualPanelWidth(this.panelWidth);
        }
        this._customTemplate = this._getCustomTemplate();
        this.dashboardControl.customTemplates.push(this._customTemplate);
        this._disposables.push(this.dashboardControl.dashboardContainer.subscribe(dashboardContainer => {
            if (dashboardContainer) {
                this._validateSelection(dashboardContainer, this.availableDashboards());
            }
        }));
        if (this._isMobile()) {
            var api = this.dashboardControl.findExtension('viewerApi');
            api.on('dashboardTitleToolbarUpdated', (args) => {
                args.options.navigationItems.push({
                    name: caption_toolbar_options_1.dashboardToolbarItemNames.dashboardList,
                    type: 'button',
                    template: () => {
                        return $.fn.constructor('<div/>')
                            .addClass([this._flexParent, this._ellipsisText].join(' '))
                            .append($.fn.constructor('<svg><use xlink:href="#' + this._iconBack + '" /></svg>'))
                            .append($.fn.constructor('<div/>').text(_default_1.getLocalizationById('DashboardWebStringId.Dashboards')).addClass([this._dashboardsButton, this._dashboardTruncated].join(' ')));
                    },
                    click: () => {
                        this.showPanelAsync({ surfaceLeft: this._actualPanelWidth() });
                    }
                });
            });
        }
        if (!this.dashboardControl.isDesignMode()) {
            this.dashboardControl.surfaceLeft(this._isMobile() ? 0 : this.panelWidth);
        }
        this.updateDashboardsList();
    }
    stop() {
        this.dashboardControl.surfaceLeft(0);
        this._disposables.forEach(d => d.dispose());
        this._disposables = [];
        this.dashboardControl.customTemplates.remove(this._customTemplate);
    }
    updateDashboardsList() {
        var dashboardContainer = this.dashboardControl.dashboardContainer();
        let options = this.options;
        this.dashboardControl.requestDashboardList().done((availableDashboards) => {
            this.availableDashboards(availableDashboards.map(dashboard => new PanelExtensionDashboardInfo(dashboard.id, dashboard.name, options.dashboardThumbnail ? string_1.format(options.dashboardThumbnail, dashboard.id) : undefined)));
            this._validateSelection(this.dashboardControl.dashboardContainer(), this.availableDashboards());
        });
    }
    _validateSelection(dashboardContainer, avaliableDashboards) {
        if (dashboardContainer) {
            var dashboardInfo = avaliableDashboards.filter(info => info.id === dashboardContainer.id)[0];
            if (dashboardInfo) {
                this.selectedItemKeys([dashboardInfo.id]);
            }
        }
    }
    _hidePanel() {
        if (this._isMobile()) {
            this.hidePanelAsync({ surfaceLeft: 0 });
        }
    }
    _getCustomTemplate() {
        var enableAnimation = ko.observable(!this.visible());
        let listOptions = {
            noDataText: '',
            encodeNoDataText: true,
            keyExpr: 'id',
            selectionMode: 'single',
            itemTemplate: this._itemTemplate,
            activeStateEnabled: themes_1.default.isMaterial(themes_1.default.current()),
            selectedItemKeys: this.selectedItemKeys,
            onItemClick: () => { this._hidePanel(); },
            searchEnabled: ko.computed(() => this._isMobile()),
            searchExpr: ['id', 'name'],
            hoverStateEnabled: ko.computed(() => !this._isMobile()),
            focusStateEnabled: false,
            searchEditorOptions: {
                placeholder: _default_1.getLocalizationById('DashboardWebStringId.Search')
            },
            onOptionChanged: (e) => {
                if (e.name === 'selectedItemKeys' && this.selectedItemKeys().length > 0) {
                    let selectedItem = this.availableDashboards().filter(item => item.id === this.selectedItemKeys()[0])[0];
                    e.component.scrollToItem(this.availableDashboards().indexOf(selectedItem));
                }
            },
            onSelectionChanged: (e) => {
                if (e.addedItems.length) {
                    var newDashboardId = e.addedItems[0].id;
                    if (!this.dashboardControl.dashboardContainer() || this.dashboardControl.dashboardContainer().id !== newDashboardId) {
                        this.dashboardControl.loadDashboard(newDashboardId);
                    }
                }
            },
        };
        if (this._isMobile()) {
            listOptions.dataSource = (this.availableDashboards);
        }
        else {
            listOptions.items = this.availableDashboards;
        }
        var resizeTimer;
        var prevContainerHeight;
        var getContainerHeight = (component) => _jquery_helpers_1.$unwrap(component.option('container')).clientHeight;
        return {
            name: 'dx-dashboard-working-mode-extension',
            data: {
                panelWidth: this._actualPanelWidth,
                allowSwitchToDesigner: this.allowSwitchToDesigner,
                visible: this.visible,
                isMobile: this._isMobile,
                hidePanel: () => { this._hidePanel(); },
                switchToDesigner: this.switchToDesigner,
                switchToViewer: this.switchToViewer,
                listOptions: listOptions,
                enableAnimation: enableAnimation,
                onPopupInitialized: (e) => {
                    prevContainerHeight = getContainerHeight(e.component);
                    resizeTimer = setInterval(() => {
                        if (e.component.option('visible')) {
                            var currentContainerHeight = getContainerHeight(e.component);
                            if (currentContainerHeight !== prevContainerHeight) {
                                prevContainerHeight = currentContainerHeight;
                                e.component.repaint();
                            }
                        }
                    }, 300);
                },
                onPopupDisposing: (e) => {
                    clearTimeout(resizeTimer);
                }
            }
        };
    }
}
exports.DashboardPanelExtension = DashboardPanelExtension;
class PanelExtensionDashboardInfo {
    constructor(id, name, imageUrl) {
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.hidden = ko.observable(false);
    }
    hide() {
        this.hidden(true);
    }
}
