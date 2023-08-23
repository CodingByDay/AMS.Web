﻿/**
* DevExpress Dashboard (_inspected-data-colum-generator.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortedColumns = exports.getMeasureColumns = exports.getSortedAxes = void 0;
function getSortedAxes(itemData, skipSparklineAxis = false) {
    return itemData.getAxisNames()
        .filter(axisName => {
        let axis = itemData.getAxis(axisName);
        return axis.getRootPoint().getChildren().length > 0 && axis.getDimensions().length > 0 && (!skipSparklineAxis || axisName !== 'Sparkline');
    })
        .sort((axisName1, axisName2) => {
        return axisName1 == 'Argument' || axisName1 == 'Row' || axisName1 == 'Default' ? -1 : 1;
    });
}
exports.getSortedAxes = getSortedAxes;
function getMeasureColumns(itemData) {
    return itemData.getMeasures().filter(measure => !!measure.dataMember);
}
exports.getMeasureColumns = getMeasureColumns;
function getSortedColumns(itemData) {
    return getSortedAxes(itemData)
        .reduce((acc, axis) => acc.concat(itemData.getDimensions(axis).map(d => d.dataMember)), [])
        .concat(getMeasureColumns(itemData).map(d => d.dataMember));
}
exports.getSortedColumns = getSortedColumns;
