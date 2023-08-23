﻿/**
* DevExpress Dashboard (_viewer-interfaces.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardItemContext = void 0;
const _jquery_helpers_1 = require("../../data/_jquery-helpers");
class DashboardItemContext {
    constructor(options = {}) {
        this.addContextToolbarItems = _jquery_helpers_1.createJQueryCallbacks();
        this.viewerItemCreated = _jquery_helpers_1.createJQueryCallbacks();
        this.viewerItemDispose = _jquery_helpers_1.createJQueryCallbacks();
        this.beforeApplyViewerItemOptions = _jquery_helpers_1.createJQueryCallbacks();
        this.captionToolbarCreated = _jquery_helpers_1.createJQueryCallbacks();
        options.addContextToolbarItems && this.addContextToolbarItems.add(options.addContextToolbarItems);
        options.viewerItemCreated && this.viewerItemCreated.add(options.viewerItemCreated);
        options.viewerItemDispose && this.viewerItemDispose.add(options.viewerItemDispose);
        options.beforeApplyViewerItemOptions && this.beforeApplyViewerItemOptions.add(options.beforeApplyViewerItemOptions);
        this.createCaptionToolbar = options.createCaptionToolbar;
        this.itemFactory = options.itemFactory;
        this.ignoreDesignMode = options.ignoreDesignMode;
        this.disabled = options.disabled;
        this.visualMode = options.visualMode;
        this.boundaryContainer = options.boundaryContainer;
        this.itemCreatingType = options.itemCreatingType;
    }
}
exports.DashboardItemContext = DashboardItemContext;
