﻿/**
* DevExpress Dashboard (_condition-type-editor.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { Color } from '../../model/color';
import { FormatConditionRangeGradientPredefinedType, FormatConditionRangeSetPredefinedType } from '../../model/format-rules/conditions/range/range-converter';
import { ISlidableListsNavigable } from '../ui-widgets/_ui-widgets';
export declare type RangeStyleType = 'None' | 'Color' | 'Icon' | 'Gradient' | 'ColorBar' | 'GradientBar';
export interface DisplayValue<T> {
    value: T;
    displayText: string;
    constraint?: (dataType: any) => boolean;
}
export declare type ConditionTypePropertyName = 'conditionValue' | 'conditionTopBottom' | 'conditionAverage' | 'conditionDateOccuring' | 'conditionExpression' | 'conditionRangeSet' | 'conditionRangeGradient' | 'conditionBar' | 'conditionColorRangeBar' | 'conditionGradientRangeBar';
export interface ConditionTypesFilters {
    conditionTypeFilter?: (conditionTypePropertyName: ConditionTypePropertyName, subType: string) => boolean;
    rangeGradientPredefinedTypeFilter?: (type: FormatConditionRangeGradientPredefinedType) => boolean;
    rangeSetPredefinedTypeFilter?: (type: FormatConditionRangeSetPredefinedType) => boolean;
}
export interface FormatConditionTypeEditorOptions {
    dataType: ko.Observable<string>;
    conditionType: ko.Observable<string>;
    specificType: ko.Observable<string | FormatConditionRangeGradientPredefinedType | FormatConditionRangeSetPredefinedType>;
    filters: ConditionTypesFilters;
}
export declare class FormatConditionTypeEditorSurface implements ISlidableListsNavigable {
    displayMode: ko.Observable<"specificTypes" | "conditionTypes">;
    availableConditionTypes: ko.Computed<Array<{
        value: string;
        displayText: string;
        hasSpecificTypes: boolean;
    }>>;
    availableSpecificTypes: ko.Computed<Array<any>>;
    selectedSpecificTypes: ko.Computed<Array<any>>;
    ancestors: ko.Observable<any[]>;
    dataType: ko.Observable<string>;
    conditionType: ko.Observable<string>;
    specificType: ko.Observable<string | FormatConditionRangeGradientPredefinedType | FormatConditionRangeSetPredefinedType>;
    backClick: () => void;
    updateItemAppearance: (e: any) => void;
    constructor(options: FormatConditionTypeEditorOptions);
    getStyleList(rangeStyleType: FormatConditionRangeSetPredefinedType): Array<string | object>;
    getGradientColorsList(type: FormatConditionRangeGradientPredefinedType): Array<Color>;
}
