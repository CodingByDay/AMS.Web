﻿/**
* DevExpress Dashboard (_range-filter-item-helper.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._subscribeToDimension = void 0;
const _knockout_utils_1 = require("../../internal/_knockout-utils");
const _subscribeToDimension = (dimension, dateTimePeriods, dataManager) => {
    _knockout_utils_1.safeSubscribe({
        dimension,
        dateTimePeriods,
        dataManager
    }, (args) => {
        setPeriodFirstDayOfWeek(args.dimension, args.dateTimePeriods, args.dataManager);
        const subscriptions = args.dimension ?
            args.dateTimePeriods.map(curPeriod => curPeriod._subscribeToGroupInterval(args.dimension)) : [];
        return { dispose: () => { subscriptions.forEach(s => s.dispose()); } };
    });
};
exports._subscribeToDimension = _subscribeToDimension;
const setPeriodFirstDayOfWeek = (dimension, dateTimePeriods, dataManager) => {
    const metaData = dataManager && dataManager.getMetaData();
    const dimensionUniqueName = dimension && dimension.uniqueName();
    const dimensionFormat = metaData && metaData.getDimensionFormat(dimensionUniqueName);
    const firstDayOfWeek = dimensionFormat && dimensionFormat.DateTimeFormat && dimensionFormat.DateTimeFormat.FirstDayOfWeek;
    if (firstDayOfWeek) {
        dateTimePeriods.forEach(period => period._firstDayOfWeek(firstDayOfWeek));
    }
};
