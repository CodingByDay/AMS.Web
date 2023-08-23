﻿/**
* DevExpress Dashboard (combo-box-item.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ModelSerializer } from '@devexpress/analytics-core/analytics-utils';
import * as ko from 'knockout';
import { ComboBoxDashboardItemType } from '../../enums';
import { IDashboardSerializationInfo } from '../../metadata/_base-metadata';
import { FilterElementItemBase } from './filter-element-item-base';
export declare class ComboBoxItem extends FilterElementItemBase {
    comboBoxType: ko.Observable<ComboBoxDashboardItemType>;
    showAllValue: ko.Observable<boolean>;
    constructor(dashboardItemJSON?: any, serializer?: ModelSerializer);
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
    protected _allowAllValue(): boolean;
    protected _isMultiselectable(): boolean;
}
