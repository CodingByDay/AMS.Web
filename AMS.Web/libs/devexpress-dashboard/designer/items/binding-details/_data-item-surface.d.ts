﻿/**
* DevExpress Dashboard (_data-item-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
import * as ko from 'knockout';
import { DataSourceBrowser, IFieldConstraint } from '../../../common/_data-source-browser';
import { IDisposable } from '../../../model';
import { DataItemLink } from '../../../model/data-item/data-item';
import { IDataField } from '../../../model/data-sources/_data-field';
import { IBindingProperty } from '../../../model/items/binding-property';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IPropertiesHolder, PropertiesController } from '../../properties-controller/_properties-controller';
export declare class DataItemSurface implements IDisposable, IPropertiesHolder {
    model: DataItemLink;
    binding: IBindingProperty;
    propertiesController: PropertiesController;
    private unwrappedDataItem;
    fieldConstraint?: IFieldConstraint;
    extendTabsHandler?: (tabs: AccordionTab[], model: any) => void;
    private _disposables;
    private _changeNewField;
    private _changeExistingField;
    get commonDataItemTypeConstraint(): IFieldConstraint;
    get fullConstraint(): (field: IDataField) => boolean;
    constructor(model: DataItemLink, binding: IBindingProperty, container: DataDashboardItem, dataSourceBrowser: DataSourceBrowser, propertiesController: PropertiesController, unwrappedDataItem: boolean, fieldConstraint?: IFieldConstraint, extendTabsHandler?: (tabs: AccordionTab[], model: any) => void);
    propertiesTabs: ko.ObservableArray<AccordionTab<any>>;
    choosenField: ko.Observable<IDataField>;
    newItemCreated: JQuery.Callbacks<Function>;
    itemSelected: JQuery.Callbacks<Function>;
    dispose(): void;
}
