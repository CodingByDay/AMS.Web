﻿/**
* DevExpress Dashboard (_button-group.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
ko.components.register('dx-dashboard-button-group', {
    viewModel: {
        createViewModel: function (params, componentInfo) {
            var options = {
                keyExpr: 'value',
                width: '100%',
                items: ko.unwrap(params.values).map(function (val) { return { value: val.value, text: _default_1.getLocalizationById(val.displayValue) }; }),
                onItemClick: function (e) { params.value(e.itemData.value); },
                disabled: params.disabled,
                selectedItemKeys: [ko.unwrap(params.value.peek())]
            };
            return options;
        }
    },
    template: { element: 'dx-dashboard-button-group-template' }
});
ko.components.register('dx-dashboard-checked-button', {
    viewModel: {
        createViewModel: function (params, componentInfo) {
            let key = 'key';
            var options = {
                elementAttr: { class: params.icon ? 'dx-dashboard-button-with-icon' : undefined },
                keyExpr: 'key',
                width: '100%',
                items: ko.computed(() => {
                    var template = ko.unwrap(params.template);
                    var icon = ko.unwrap(params.icon);
                    if (!template && icon) {
                        template = '<svg><use xlink:href=#' + icon + '></use></svg>';
                    }
                    return [{
                            key: key,
                            disabled: ko.unwrap(params.disabled),
                            hint: ko.unwrap(params.hint),
                            text: ko.unwrap(params.text),
                            template: template
                        }];
                }),
                onItemClick: params.click,
                disabled: params.disabled,
                selectedItemKeys: ko.computed(() => ko.unwrap(params.isSelected) ? [key] : []),
            };
            if (params.isSelected === false) {
                options.onSelectionChanged = (e) => {
                    e.component.option('selectedItemKeys', []);
                };
            }
            return options;
        }
    },
    template: { element: 'dx-dashboard-button-group-template' }
});
