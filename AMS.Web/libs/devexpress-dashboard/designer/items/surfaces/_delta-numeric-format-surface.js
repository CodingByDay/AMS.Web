﻿/**
* DevExpress Dashboard (_delta-numeric-format-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaNumericFormatSurface = void 0;
const ko = require("knockout");
const _accordion_tab_1 = require("../../properties-controller/_accordion-tab");
const _shared_composers_1 = require("../properties-composers/_shared-composers");
class DeltaNumericFormatSurface {
    constructor(model, propertiesController) {
        this.model = model;
        this.propertiesController = propertiesController;
        this._disposables = [];
        this.propertiesTabs = ko.observableArray([]);
    }
    updatePropertiesTabs() {
        this.propertiesTabs([new _accordion_tab_1.AccordionTab(_accordion_tab_1.KnownTabs.NumericFormat, this.model.title, _shared_composers_1.SharedComposers.getNumericFormatWrapper(this.model.numericFormat))
        ]);
        this.propertiesController.secondaryModel({
            displayText: this.model.title,
            data: this
        });
    }
    startEditing(args) {
        args.createImmediately = false;
        this.updatePropertiesTabs();
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
exports.DeltaNumericFormatSurface = DeltaNumericFormatSurface;
