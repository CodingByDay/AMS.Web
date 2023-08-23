﻿/**
* DevExpress Dashboard (_date-time-period.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mode = exports.dateTimePeriodSerializationsInfo = exports.endLimit = exports.startLimit = void 0;
const analytics_utils_1 = require("@devexpress/analytics-core/analytics-utils");
const _base_metadata_1 = require("../../../metadata/_base-metadata");
const limit_container_1 = require("../limit-container");
function limitContainerFromJson(json, serializer = new analytics_utils_1.ModelSerializer()) {
    return new limit_container_1.LimitContainer(json, serializer);
}
function limitContainerToJson(limitContainer, serializer = new analytics_utils_1.ModelSerializer()) {
    var limitContainerJson = serializer.serialize(limitContainer);
    if (!limitContainer.fixed.isEmpty() && !limitContainerJson.hasOwnProperty('FixedDateTimePeriodLimit')) {
        limitContainerJson.FixedDateTimePeriodLimit = null;
    }
    if (!limitContainer.flow.isEmpty() && !limitContainerJson.hasOwnProperty('FlowDateTimePeriodLimit')) {
        limitContainerJson.FlowDateTimePeriodLimit = null;
    }
    return limitContainerJson;
}
exports.startLimit = { propertyName: 'start', modelName: 'StartLimit', type: limit_container_1.LimitContainer, from: limitContainerFromJson, toJsonObject: limitContainerToJson };
exports.endLimit = { propertyName: 'end', modelName: 'EndLimit', type: limit_container_1.LimitContainer, from: limitContainerFromJson, toJsonObject: limitContainerToJson };
exports.dateTimePeriodSerializationsInfo = [_base_metadata_1.itemType, _base_metadata_1.name, exports.startLimit, exports.endLimit];
exports.mode = {
    propertyName: 'mode', defaultVal: 'None', simpleFormAdapterItem: 'buttonGroupEditor', values: {
        'None': 'DashboardWebStringId.RangeFilter.None',
        'Fixed': 'DashboardWebStringId.RangeFilter.Fixed',
        'Flow': 'DashboardWebStringId.RangeFilter.Flow'
    }
};
