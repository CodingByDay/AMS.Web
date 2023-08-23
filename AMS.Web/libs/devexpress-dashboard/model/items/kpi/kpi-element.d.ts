﻿/**
* DevExpress Dashboard (kpi-element.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataItemLink } from '../../data-item/data-item';
import { AbsoluteVariationNumericFormat, PercentOfTargetNumericFormat, PercentVariationNumericFormat } from '../../data-item/data-item-format';
import { Measure } from '../../data-item/measure';
import { DataDashboardItem } from '../../items/data-dashboard-item';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { DataItemContainer } from '../data-item-container';
import { DeltaOptions } from '../options/delta-options';
import { ConstrainedBindingProperty } from '../_binding-model';
export declare abstract class KpiElement extends DataItemContainer {
    protected __actualValue: DataItemLink;
    protected __targetValue: DataItemLink;
    actualValue: ko.Observable<Measure>;
    targetValue: ko.Observable<Measure>;
    deltaOptions: DeltaOptions;
    absoluteVariationNumericFormat: AbsoluteVariationNumericFormat;
    percentVariationNumericFormat: PercentVariationNumericFormat;
    percentOfTargetNumericFormat: PercentOfTargetNumericFormat;
    _getDataId(): string;
    _displayNameSeparator: string;
    constructor(dataItemProvider: DataDashboardItem, modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
}
