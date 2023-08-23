﻿/**
* DevExpress Dashboard (delta-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeltaOptions = exports.CardDeltaOptions = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _delta_options_1 = require("./metadata/_delta-options");
class CardDeltaOptions extends serializable_model_1.SerializableModel {
    constructor(modelJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJSON, serializer);
    }
    getInfo() {
        return _delta_options_1.cardDeltaOptionsSerializationsInfo;
    }
}
exports.CardDeltaOptions = CardDeltaOptions;
class DeltaOptions extends CardDeltaOptions {
    constructor(modelJSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJSON, serializer);
    }
    getInfo() {
        return _delta_options_1.deltaOptionsSerializationsInfo;
    }
}
exports.DeltaOptions = DeltaOptions;
