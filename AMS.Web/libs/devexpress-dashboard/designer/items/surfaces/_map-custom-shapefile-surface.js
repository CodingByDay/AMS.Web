﻿/**
* DevExpress Dashboard (_map-custom-shapefile-surface.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapCustomShapeFileSurface = void 0;
const ko = require("knockout");
const _map_custom_shapefile_properties_composer_1 = require("../properties-composers/_map-custom-shapefile-properties-composer");
class MapCustomShapeFileSurface {
    constructor(model, propertiesController) {
        this.model = model;
        this.propertiesController = propertiesController;
        this._disposables = [];
        this.propertiesTabs = ko.observableArray([]);
    }
    startEditing(args) {
        args.createImmediately = false;
        var composer = new _map_custom_shapefile_properties_composer_1.MapCustomShapefilePropertiesComposer();
        var tabs = composer.composeTabs(this.model);
        this.propertiesTabs(tabs);
        this.propertiesController.secondaryModel({
            displayText: 'DashboardWebStringId.Map.Area.Custom',
            data: this
        });
    }
    dispose() {
        this._disposables.forEach((d) => {
            d.dispose();
        });
    }
}
exports.MapCustomShapeFileSurface = MapCustomShapeFileSurface;
