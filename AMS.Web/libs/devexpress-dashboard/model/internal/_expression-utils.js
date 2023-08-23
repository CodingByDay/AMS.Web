﻿/**
* DevExpress Dashboard (_expression-utils.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensionExpressionInserter = exports.insertDimensionsExpressionsIntoFilterExpression = exports.getFilterCriteria = void 0;
const analytics_criteria_utils_1 = require("@devexpress/analytics-core/analytics-criteria-utils");
const analytics_widgets_internal_1 = require("@devexpress/analytics-core/analytics-widgets-internal");
function getFilterCriteria(filterString) {
    let criteriaSerializer = new analytics_widgets_internal_1.FilterEditorSerializer();
    return criteriaSerializer.deserialize(filterString);
}
exports.getFilterCriteria = getFilterCriteria;
function insertDimensionsExpressionsIntoFilterExpression(filterString, dimensionsExpressions) {
    let criteriaSerializer = new analytics_widgets_internal_1.FilterEditorSerializer();
    let filterCriteria = criteriaSerializer.deserialize(filterString);
    let dimensionsCriteria = {};
    for (let dimensionName in dimensionsExpressions)
        dimensionsCriteria[dimensionName] = analytics_criteria_utils_1.CriteriaOperatorStateMachine.parse(dimensionsExpressions[dimensionName]);
    let patched = DimensionExpressionInserter.patch(filterCriteria, dimensionsCriteria);
    return criteriaSerializer.serialize(patched);
}
exports.insertDimensionsExpressionsIntoFilterExpression = insertDimensionsExpressionsIntoFilterExpression;
class DimensionExpressionInserter {
    constructor(dimensionsCriteria) {
        this._dimensionsCriteria = dimensionsCriteria;
    }
    static patch(criteria, dimensionsCriteria) {
        let patcher = new DimensionExpressionInserter(dimensionsCriteria);
        return criteria.accept(patcher);
    }
    visitOperandProperty(element) {
        return this._dimensionsCriteria[element.propertyName];
    }
}
exports.DimensionExpressionInserter = DimensionExpressionInserter;
