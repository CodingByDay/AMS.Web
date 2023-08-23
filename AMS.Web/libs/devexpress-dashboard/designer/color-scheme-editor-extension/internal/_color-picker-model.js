﻿/**
* DevExpress Dashboard (_color-picker-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorPickerModel = void 0;
const ko = require("knockout");
const _default_1 = require("../../../data/localization/_default");
const color_1 = require("../../../model/color");
const color_scheme_entry_1 = require("../../../model/colorization/color-scheme-entry");
class ColorPickerModel {
    constructor(colorSchemeModel, colorPalette) {
        this.colorSchemeModel = colorSchemeModel;
        this.colorPalette = colorPalette;
        this.target = ko.observable();
        this.visible = ko.observable();
        this.colorCss = ko.observable('');
        this.confirm = () => {
            this.entry.paletteIndex(null);
            this.entry.color(color_1.Color.fromRgbaString(this.colorCss()));
            if (this.entry instanceof color_scheme_entry_1.AutoColorSchemeEntry) {
                var newEntry = this.entry.clone();
                this.colorSchemeModel.updateEntry(this.entry, newEntry);
            }
            this.visible(false);
        };
        this.buttonItems = ko.observableArray([
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: _default_1.getLocalizationById('DashboardWebStringId.ButtonConfirm'), onClick: this.confirm } },
            { toolbar: 'bottom', location: 'after', widget: 'dxButton', options: { text: _default_1.getLocalizationById('DashboardStringId.ButtonCancel'), onClick: () => this.visible(false) } }
        ]);
    }
    init(entry, target) {
        this.entry = entry;
        let color = entry.paletteIndex() === null ? entry.color() : this.colorPalette()[entry.paletteIndex()];
        this.colorCss(color ? color.css : '');
        this.target(target);
        this.visible(true);
    }
}
exports.ColorPickerModel = ColorPickerModel;
