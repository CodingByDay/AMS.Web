/**
* DevExpress Dashboard (_choose-json-schema-page.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PageFactory } from '@devexpress/analytics-core/analytics-wizard';
import { Parameter } from '../../../model/parameters/parameter';
import { DashboardRequestWrapper } from '../models/_data-source-wizard-model';
export declare let JsonDataSourceWizardSettings: {
    allowObjectPropertiesAsRoot: boolean;
};
export declare function _registerChooseJsonSchemaPage(factory: PageFactory, requestWrapper: DashboardRequestWrapper, parameters: ko.Computed<Parameter[]>): void;
