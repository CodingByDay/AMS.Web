﻿/**
* DevExpress Dashboard (_edit-card-template-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditCardTemplateSurface = void 0;
const ko = require("knockout");
const _card_layout_template_properties_composer_1 = require("../properties-composers/_card-layout-template-properties-composer");
class EditCardTemplateSurface {
    constructor(model, propertiesController, dimensionNames, applyTemplateToAllCards = (template) => { }) {
        this.model = model;
        this.propertiesController = propertiesController;
        this.dimensionNames = dimensionNames;
        this.applyTemplateToAllCards = applyTemplateToAllCards;
        this._disposables = [];
        this.propertiesTabs = ko.observableArray([]);
    }
    updatePropertiesTabs() {
        var composer = new _card_layout_template_properties_composer_1.CardTemplatePropertiesComposer();
        var tabs = composer.composeTabs(this.model, {
            dimensionNames: this.dimensionNames,
            applyTemplateToAllCards: this.applyTemplateToAllCards
        });
        this.propertiesTabs(tabs);
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
exports.EditCardTemplateSurface = EditCardTemplateSurface;
