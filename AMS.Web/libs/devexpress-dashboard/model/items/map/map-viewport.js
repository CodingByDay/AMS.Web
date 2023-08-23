﻿/**
* DevExpress Dashboard (map-viewport.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapViewport = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _undo_engine_helper_1 = require("../../internal/_undo-engine-helper");
const serializable_model_1 = require("../../serializable-model");
const _map_viewport_1 = require("./metadata/_map-viewport");
class MapViewport extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
    }
    getInfo() {
        return _map_viewport_1.mapViewportSerializationsInfo;
    }
    _set(viewport, paddings = true) {
        if (!!viewport) {
            this.topLatitude(viewport.TopLatitude);
            this.bottomLatitude(viewport.BottomLatitude);
            this.leftLongitude(viewport.LeftLongitude);
            this.rightLongitude(viewport.RightLongitude);
            this.centerPointLatitude(viewport.CenterPointLatitude);
            this.centerPointLongitude(viewport.CenterPointLongitude);
            this.createViewerPaddings(paddings);
        }
    }
    _createViewModel() {
        return {
            TopLatitude: this.topLatitude(),
            BottomLatitude: this.bottomLatitude(),
            CenterPointLatitude: this.centerPointLatitude(),
            CenterPointLongitude: this.centerPointLongitude(),
            LeftLongitude: this.leftLongitude(),
            RightLongitude: this.rightLongitude(),
            CreateViewerPaddings: this.createViewerPaddings()
        };
    }
}
__decorate([
    _undo_engine_helper_1.wrapWithUndoRedo
], MapViewport.prototype, "_set", null);
exports.MapViewport = MapViewport;
