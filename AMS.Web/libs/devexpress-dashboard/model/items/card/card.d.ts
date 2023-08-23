﻿/**
* DevExpress Dashboard (card.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { DataDashboardItem } from '../..';
import { IDashboardSerializationInfoArray } from '../../metadata/_base-metadata';
import { KpiElement } from '../kpi/kpi-element';
import { CardDeltaOptions } from '../options/delta-options';
import { SparklineOptions } from '../options/sparkline-options';
import { ConstrainedBindingProperty } from '../_binding-model';
import { CardLayoutTemplate } from './card-layout-template';
export declare class Card extends KpiElement {
    private static templateTypes;
    private static _createTemplate;
    type: ko.Observable<string>;
    cardDeltaOptions: CardDeltaOptions;
    sparklineOptions: SparklineOptions;
    showSparkline: ko.Observable<boolean>;
    layoutTemplate: ko.Observable<CardLayoutTemplate>;
    constructor(dataItemProvider: DataDashboardItem, modelJson?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfoArray;
    _isTypeEmpty(): boolean;
    _setTemplateSwitchingOptions(newTemplate: any): void;
    private _switchToCardDeltaOptions;
    private _switchToKpiDeltaOptions;
    protected _getDefaultItemType(): string;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
}
