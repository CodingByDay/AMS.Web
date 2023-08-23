/**
* DevExpress Dashboard (_create-query-page.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { IDataSourceWizardCallbacks } from '@devexpress/analytics-core/analytics-wizard-internal';
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { Parameter } from '../../../model/parameters/parameter';
import { DashboardRequestWrapper } from '../models/_data-source-wizard-model';
export declare function createQueryPageCallback(requestWrapper: DashboardRequestWrapper, parameters: ko.Computed<Array<Parameter>>, dataSourceBrowser: DataSourceBrowser, customQueriesPreset?: any): IDataSourceWizardCallbacks;
