﻿/**
* DevExpress Dashboard (window-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WindowDefinition = void 0;
const analytics_internal_1 = require("@devexpress/analytics-core/analytics-internal");
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const ko = require("knockout");
const serializable_model_1 = require("../../serializable-model");
const measure_calc_window_definition_1 = require("./measure-calc-window-definition");
const _window_definition_1 = require("./metadata/_window-definition");
var currentwindowDefinitionInfo = (model) => {
    if (!model.windowDefinitionType)
        return [];
    return [{
            propertyName: 'windowDefinition',
            modelName: model.windowDefinitionType() || 'FakeWindowDefinitionForModelSubscriber',
            from: (json, serializer) => { return new measure_calc_window_definition_1.windowDefinitionsTypesMap[model.windowDefinitionType()](json, serializer); },
            toJsonObject: (value, serializer, refs) => {
                var result = serializer.serialize(value, null, refs);
                if (analytics_internal_1.isEmptyObject(result)) {
                    return null;
                }
                return result;
            }
        }];
};
class WindowDefinition extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.windowDefinitionType = ko.observable();
        this.windowDefinition = ko.observable();
        this.windowDefinitionType(Object.keys(measure_calc_window_definition_1.windowDefinitionsTypesMap).filter(mapItem => !!modelJson && modelJson[mapItem] !== undefined)[0]);
        if (!!this.windowDefinitionType()) {
            let type = measure_calc_window_definition_1.windowDefinitionsTypesMap[this.windowDefinitionType()];
            this.windowDefinition(new type((modelJson || {})[this.windowDefinitionType()]));
            delete this['_model'][this.windowDefinitionType()];
        }
        this.windowDefinition.subscribe(windowDefinition => {
            this.windowDefinitionType(Object.keys(measure_calc_window_definition_1.windowDefinitionsTypesMap).filter(mapItem => windowDefinition instanceof measure_calc_window_definition_1.windowDefinitionsTypesMap[mapItem])[0]);
        });
    }
    getInfo() {
        return _window_definition_1.windowDefinitionSerializationsInfo.concat(currentwindowDefinitionInfo(this));
    }
    equals(def) {
        return (this.isEmpty() && def.isEmpty()) || this.windowDefinition().equals(def.windowDefinition());
    }
    isEmpty() {
        return !this.windowDefinition();
    }
}
exports.WindowDefinition = WindowDefinition;
