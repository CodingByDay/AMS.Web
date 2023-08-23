﻿/**
* DevExpress Dashboard (_limit-container.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.limitContainer = exports.flowDateTimePeriodLimitProperty = exports.fixedDateTimePeriodLimitProperty = void 0;
const period_limit_1 = require("../period-limit");
exports.fixedDateTimePeriodLimitProperty = {
    propertyName: 'fixed', modelName: 'FixedDateTimePeriodLimit', type: period_limit_1.FixedDateTimePeriodLimit
};
exports.flowDateTimePeriodLimitProperty = {
    propertyName: 'flow', modelName: 'FlowDateTimePeriodLimit', type: period_limit_1.FlowDateTimePeriodLimit
};
exports.limitContainer = [exports.fixedDateTimePeriodLimitProperty, exports.flowDateTimePeriodLimitProperty];
