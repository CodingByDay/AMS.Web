﻿/**
* DevExpress Dashboard (custom-shape-file-data.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomShapefileData = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../../serializable-model");
const _custom_shape_file_data_1 = require("./metadata/_custom-shape-file-data");
class CustomShapefileData extends serializable_model_1.SerializableModel {
    constructor(modelJson = {}, serializer = new analytics_utils_1.ModelSerializer()) {
        super(modelJson, serializer);
        this.shapeData.subscribe(newData => !newData && this.attributeData(_custom_shape_file_data_1.attributeData.defaultVal));
    }
    getInfo() {
        return _custom_shape_file_data_1.customShapefileDataSerializationsInfo;
    }
}
exports.CustomShapefileData = CustomShapefileData;
