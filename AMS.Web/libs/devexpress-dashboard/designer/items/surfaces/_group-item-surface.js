﻿/**
* DevExpress Dashboard (_group-item-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupItemSurface = void 0;
const _shared_properties_composer_1 = require("../properties-composers/_shared-properties-composer");
const _section_descriptors_1 = require("../_section-descriptors");
const _base_item_surface_1 = require("./_base-item-surface");
class GroupItemSurface extends _base_item_surface_1.BaseItemSurface {
    constructor(dashboardItem, dashboardModel, dataSourceBrowser) {
        super();
    }
    getPropertiesComposer() {
        return new _shared_properties_composer_1.SharedPropertiesComposer(this._dashboardItemCustomization);
    }
}
exports.GroupItemSurface = GroupItemSurface;
_section_descriptors_1.surfaceItemsFactory.register('Group', GroupItemSurface);
