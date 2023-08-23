/**
* DevExpress Dashboard (layout-options.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LayoutOptions = void 0;
const serializable_model_1 = require("../serializable-model");
const _layout_options_1 = require("./metadata/_layout-options");
class LayoutOptions extends serializable_model_1.SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, info);
    }
    getInfo() {
        return _layout_options_1.layoutOptionsSerializationInfo;
    }
}
exports.LayoutOptions = LayoutOptions;
