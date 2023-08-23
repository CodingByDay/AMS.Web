﻿/**
* DevExpress Dashboard (chorolpeth-map.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { AbsoluteVariationNumericFormat, PercentOfTargetNumericFormat, PercentVariationNumericFormat } from '../../data-item/data-item-format';
import { Measure } from '../../data-item/measure';
import { DataDashboardItem } from '../../items/data-dashboard-item';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { DataItemContainer } from '../data-item-container';
import { DeltaOptions } from '../options/delta-options';
import { ConstrainedBindingProperty, IDataItemProvider } from '../_binding-model';
export declare abstract class ChoroplethMap extends DataItemContainer {
    _displayNameSeparator: string;
    constructor(modelJson?: any, serializer?: ModelSerializer);
}
export declare class ValueMap extends ChoroplethMap {
    private __value;
    value: ko.Observable<Measure>;
    valueName: ko.Observable<string>;
    constructor(dataItemProvider: DataDashboardItem, modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getDataId(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    protected _getDefaultItemType(): string;
}
export declare class DeltaMap extends ChoroplethMap {
    private __actualValue;
    private __targetValue;
    actualValue: ko.Observable<Measure>;
    targetValue: ko.Observable<Measure>;
    deltaOptions: DeltaOptions;
    absoluteVariationNumericFormat: AbsoluteVariationNumericFormat;
    percentVariationNumericFormat: PercentVariationNumericFormat;
    percentOfTargetNumericFormat: PercentOfTargetNumericFormat;
    actualValueName: ko.Observable<string>;
    deltaName: ko.Observable<string>;
    constructor(dataItemProvider: IDataItemProvider, modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getDataId(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    protected _getDefaultItemType(): string;
}
