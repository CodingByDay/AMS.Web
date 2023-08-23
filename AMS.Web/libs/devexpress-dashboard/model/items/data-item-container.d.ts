﻿/**
* DevExpress Dashboard (data-item-container.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { ISerializationInfoArray } from '@devexpress/analytics-core/analytics-utils';
import { CustomProperties } from '../custom-properties/custom-properties';
import { ICustomPropertiesProvider } from '../custom-properties/_custom-properties-utils';
import { IDashboardSerializationInfo } from '../metadata/_base-metadata';
import { TypedSerializableModel } from '../serializable-model';
import { ConstrainedBindingProperty, IBindingModelProvider } from './_binding-model';
export declare abstract class DataItemContainer extends TypedSerializableModel implements IBindingModelProvider, ICustomPropertiesProvider {
    name: ko.Observable<string>;
    customProperties: CustomProperties;
    getInfo(): ISerializationInfoArray;
    grabFrom(dataItemContainer: DataItemContainer): void;
    _getContainerType(): string;
    abstract _getBindingModel(): Array<ConstrainedBindingProperty>;
    protected abstract _getInfoCore(): Array<IDashboardSerializationInfo>;
    abstract _getDataId(): string;
}
