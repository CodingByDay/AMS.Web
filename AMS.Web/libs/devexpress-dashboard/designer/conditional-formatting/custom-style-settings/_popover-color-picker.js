﻿/**
* DevExpress Dashboard (_popover-color-picker.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PopoverColorPicker = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
class PopoverColorPicker {
    constructor(setColor) {
        this.setColor = setColor;
        this.color = ko.observable('');
        this.visible = ko.observable(false);
        this.buttonItems = ko.observableArray([
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: _default_1.getLocalizationById('DashboardWebStringId.ButtonConfirm'), onClick: () => {
                        this.setColor(this.color());
                        this.visible(false);
                    } } },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: _default_1.getLocalizationById('DashboardStringId.ButtonCancel'), onClick: () => this.visible(false) } }
        ]);
    }
    show(color) {
        this.color(color);
        this.visible(true);
    }
}
exports.PopoverColorPicker = PopoverColorPicker;
