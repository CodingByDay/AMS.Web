﻿/**
* DevExpress Dashboard (_title-component.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardTitleComponent = exports.DashboardTitleContext = void 0;
const ko = require("knockout");
const _jquery_helpers_1 = require("../../../data/_jquery-helpers");
const disposable_object_1 = require("../../../model/disposable-object");
const _title_toolbar_1 = require("../../../viewer-parts/widgets/caption-toolbar/_title-toolbar");
class DashboardTitleContext extends disposable_object_1.DisposableObject {
    constructor(encodeHtml, findExtension, allowExport = true, viewerApi) {
        super();
        this.parametersExtension = ko.pureComputed(() => findExtension('dashboardParameterDialog'));
        this.exportExtension = ko.pureComputed(() => allowExport ? findExtension('dashboardExport') : null);
        this.viewerApi = viewerApi;
        this.toDispose(this.exportExtension);
        this.toDispose(this.parametersExtension);
    }
}
exports.DashboardTitleContext = DashboardTitleContext;
class DashboardTitleComponent extends disposable_object_1.DisposableObject {
    constructor(params, container, controlContainer) {
        super();
        this.params = params;
        this.container = container;
        this.controlContainer = controlContainer;
    }
    initialize() {
        let toolbar = new _title_toolbar_1.DashboardTitleToolbar(this.container, this.controlContainer, this.container, this.params.encodeHtml, this.params.options().allowHideEmptyToolbar, this.params.className);
        toolbar.update(this.params.options().toolbarOptions, this.params.options().centerAligned);
        this.params.height(toolbar.calcHeight(this.params.options().toolbarOptions));
        this.toDispose(toolbar);
        this.toDispose(this.params.options.subscribe(newOptions => {
            if (newOptions) {
                toolbar.update(newOptions.toolbarOptions, newOptions.centerAligned);
                this.params.height(toolbar.calcHeight(newOptions.toolbarOptions));
            }
        }));
        this.toDispose(this.params.width.subscribe(newValue => toolbar.onResize()));
    }
}
exports.DashboardTitleComponent = DashboardTitleComponent;
ko.components.register('dashboard-title', {
    viewModel: {
        createViewModel: function ({ componentArgs }, componentInfo) {
            let element = componentInfo.element;
            let titleComponent = new DashboardTitleComponent(componentArgs, element.querySelector('.dx-dashboard-title'), _jquery_helpers_1.closest(element, '.dx-dashboard-widget-container'));
            titleComponent.initialize();
            ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
                titleComponent.dispose();
            });
        }
    },
    template: "<div class='dx-dashboard-title'></div>"
});
