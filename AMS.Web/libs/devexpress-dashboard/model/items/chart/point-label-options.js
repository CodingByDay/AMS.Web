﻿/**
* DevExpress Dashboard (point-label-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointLabelOptions = exports.PointLabelOptionsBase = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _point_label_options_1 = require("./metadata/_point-label-options");
class PointLabelOptionsBase extends serializable_model_1.SerializableModel {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _point_label_options_1.pointLabelOptionsBaseSerializationsInfo;
    }
    grabFrom(options) {
        this.showPointLabels(options.showPointLabels());
        this.orientation(options.orientation());
        this.overlappingMode(options.overlappingMode());
    }
}
exports.PointLabelOptionsBase = PointLabelOptionsBase;
class PointLabelOptions extends PointLabelOptionsBase {
    constructor(JSON = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(JSON, serializer);
    }
    getInfo() {
        return _point_label_options_1.pointLabelOptionsSerializationsInfo;
    }
    grabFrom(options) {
        super.grabFrom(options);
        this.showForZeroValues(options.showForZeroValues());
        this.position(options.position());
        this.contentType(options.contentType());
    }
}
exports.PointLabelOptions = PointLabelOptions;
