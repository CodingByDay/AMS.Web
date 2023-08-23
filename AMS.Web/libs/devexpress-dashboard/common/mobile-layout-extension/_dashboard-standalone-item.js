﻿/**
* DevExpress Dashboard (_dashboard-standalone-item.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const _interfaces_1 = require("../internal/_interfaces");
ko.components.register('dashboard-standalone-item', {
    viewModel: {
        createViewModel: (params, componentInfo) => {
            let element = componentInfo.element;
            return {
                dashboardItem: ko.unwrap(params.dashboardItem),
                dashboardContext: ko.unwrap(params.dashboardContext),
                localContext: ko.unwrap(params.localContext),
                sizeController: new _interfaces_1.SingleItemSizeController(element.parentElement, ko.unwrap(params.repaintRequest)),
                isStandalone: false
            };
        }
    },
    template: { element: 'dx-dashboard-standalone-item' }
});
