/**
* DevExpress Dashboard (connection.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SqlConnection = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const serializable_model_1 = require("../serializable-model");
const _connection_1 = require("./metadata/_connection");
class SqlConnection extends serializable_model_1.SerializableModel {
    constructor(connectionJSON, serializer = new analytics_utils_1.ModelSerializer()) {
        super(connectionJSON, serializer);
    }
    getInfo() {
        return _connection_1.connectionSerializationsInfo;
    }
}
exports.SqlConnection = SqlConnection;
