﻿/**
* DevExpress Dashboard (_group-item-bindings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupViewModel = void 0;
const ko = require("knockout");
const disposable_object_1 = require("../../../model/disposable-object");
const _dashboard_item_bindings_1 = require("../../viewer/_dashboard-item-bindings");
const _layout_item_1 = require("../core/_layout-item");
class GroupViewModel extends disposable_object_1.DisposableObject {
    constructor(params) {
        super();
        this.defaultPadding = _layout_item_1.SplitterSize * 2;
        this.padding = ko.observable(this.defaultPadding);
        this.headerHeight = ko.observable(_dashboard_item_bindings_1.DashboardItemHeaderHeight);
        this.layoutItem = ko.computed(() => ko.unwrap(params.layoutItem));
        ko.computed(() => {
            this.layoutItem().verticalPaddings(this.padding() * 2 + this.headerHeight());
            this.layoutItem().horizontalPaddings(this.padding() * 2);
        }).extend({ deferred: true });
        ko.computed(() => {
            this.layoutItem().setConstraints({
                min: {
                    width: this.layoutItem().items().length === 0 ? 100 : 0,
                    height: this.layoutItem().items().length === 0 ? 100 : 0
                },
                max: {
                    width: Number.MAX_VALUE,
                    height: Number.MAX_VALUE
                }
            });
        });
    }
}
exports.GroupViewModel = GroupViewModel;
ko.components.register('dx-dashboard-layout-group', {
    viewModel: GroupViewModel,
    template: { element: 'dx-dashboard-layout-group' }
});
