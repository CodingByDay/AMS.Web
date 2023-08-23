﻿/**
* DevExpress Dashboard (_form-adapter.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import dxForm from 'devextreme/ui/form';
import * as ko from 'knockout';
import { DashboardLocalizationId } from '../../data/localization/_default';
import { ObjectPropertiesWrapper } from './_object-properties-wrapper';
export declare let twoWayUpdateInterval: number;
export declare function updateFormItemsCore(form: dxForm, target: ObjectPropertiesWrapper, bindingContext: ko.BindingContext<any>, propertiesToForceUpdate?: string[]): void;
export declare function transformValuesDictionary(values: {
    [key: string]: DashboardLocalizationId;
}): Array<{
    value: any;
    displayValueId: DashboardLocalizationId;
}>;
