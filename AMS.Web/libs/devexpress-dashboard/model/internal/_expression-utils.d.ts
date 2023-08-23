﻿/**
* DevExpress Dashboard (_expression-utils.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CriteriaOperator, OperandProperty } from '@devexpress/analytics-core/analytics-criteria';
import { ICriteriaOperatorVisitor } from '@devexpress/analytics-core/analytics-criteria-utils';
export declare function getFilterCriteria(filterString: string): CriteriaOperator;
export declare function insertDimensionsExpressionsIntoFilterExpression(filterString: string, dimensionsExpressions: {
    [dimensionName: string]: string;
}): string;
export declare class DimensionExpressionInserter implements ICriteriaOperatorVisitor {
    static patch(criteria: CriteriaOperator, dimensionsCriteria: {
        [dimensionName: string]: CriteriaOperator;
    }): CriteriaOperator;
    private _dimensionsCriteria;
    constructor(dimensionsCriteria: {
        [dimensionName: string]: CriteriaOperator;
    });
    visitOperandProperty(element: OperandProperty): CriteriaOperator;
}
