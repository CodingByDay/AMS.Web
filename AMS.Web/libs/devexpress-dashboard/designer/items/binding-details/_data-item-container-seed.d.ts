﻿/**
* DevExpress Dashboard (_data-item-container-seed.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IFieldConstraint } from '../../../common/_data-source-browser';
import { DataItemLink, DataItemType } from '../../../model';
import { DataField } from '../../../model/data-sources/_data-field';
import { DataItemContainer } from '../../../model/items/data-item-container';
import { ConstrainedBindingProperty, ICollectionBindingProperty, IDataItemProvider } from '../../../model/items/_binding-model';
import { IDashboardSerializationInfo } from '../../../model/metadata/_base-metadata';
export declare class DataItemContainerSeed extends DataItemContainer {
    dataItemType?: DataItemType;
    private _fieldConstraint?;
    _getDataId(): string;
    constructor(dataItemProvider: IDataItemProvider, dataItemType?: DataItemType, _fieldConstraint?: IFieldConstraint);
    name: ko.Observable<string>;
    _getContainerType(): string;
    dataLink: DataItemLink;
    _getBindingModel(): Array<ConstrainedBindingProperty>;
    grow(dataItemProvider: IDataItemProvider, bindingProperty: ICollectionBindingProperty, dataField: DataField): Array<DataItemContainer>;
    protected _getInfoCore(): IDashboardSerializationInfo[];
    protected _getDefaultItemType(): string;
}
