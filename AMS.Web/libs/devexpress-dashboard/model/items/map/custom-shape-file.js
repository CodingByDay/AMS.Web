﻿/**
* DevExpress Dashboard (custom-shape-file.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomShapefile = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _custom_shape_file_1 = require("./metadata/_custom-shape-file");
const _custom_shape_file_data_1 = require("./metadata/_custom-shape-file-data");
class CustomShapefile extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.url.subscribe(newUrl => !!newUrl && this.data.shapeData(_custom_shape_file_data_1.shapeData.defaultVal));
        this.data.shapeData.subscribe(newData => !!newData && this.url(undefined));
    }
    getInfo() {
        return _custom_shape_file_1.customShapefileSerializationsInfo;
    }
}
exports.CustomShapefile = CustomShapefile;
