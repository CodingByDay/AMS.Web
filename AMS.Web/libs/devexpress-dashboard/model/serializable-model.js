﻿/**
* DevExpress Dashboard (serializable-model.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemTypesMap = exports.TypedSerializableModel = exports.SerializableModel = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
class SerializableModel {
    constructor(model, serializer, info) {
        serializer = serializer || new analytics_utils_1.ModelSerializer();
        let prevGetInfo = this.getInfo;
        if (info !== undefined)
            this.getInfo = undefined;
        serializer.deserialize(this, model || {}, info);
        if (info !== undefined)
            this.getInfo = prevGetInfo;
    }
}
exports.SerializableModel = SerializableModel;
class TypedSerializableModel extends SerializableModel {
    constructor(model, serializer, info) {
        super(model, serializer, info);
        !this.itemType() && this.itemType(this._getDefaultItemType());
    }
    _getUniqueNamePrefix() {
        return this.itemType().charAt(0).toLowerCase() + this.itemType().slice(1);
    }
}
exports.TypedSerializableModel = TypedSerializableModel;
exports.itemTypesMap = {};
