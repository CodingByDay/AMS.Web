﻿/**
* DevExpress Dashboard (_dimension-definition.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionDefinition = void 0;
const serializable_model_1 = require("../serializable-model");
const _color_scheme_entry_1 = require("./metadata/_color-scheme-entry");
class DimensionDefinition extends serializable_model_1.SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, _color_scheme_entry_1.definitionInfo);
    }
    getInfo() {
        return _color_scheme_entry_1.definitionInfo;
    }
}
exports.DimensionDefinition = DimensionDefinition;
