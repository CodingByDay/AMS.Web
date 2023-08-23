/**
* DevExpress Dashboard (_edit-json-data-source-wizard.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { PageFactory, PageIterator, PopupWizard, StateManager } from '@devexpress/analytics-core/analytics-wizard';
import { Parameter } from '../../../model/parameters/parameter';
import { DashboardRequestWrapper } from '../models/_data-source-wizard-model';
export declare class EditJsonDataSourceWizardIterator extends PageIterator {
    constructor(factory: PageFactory, stateManager: StateManager);
    getNextPageId(pageId: string): string;
}
export declare class EditJsonDataSourceWizard extends PopupWizard {
    title: any;
    _container: (element: any) => JQuery<HTMLElement>;
    _extendCssClass: string;
}
export declare function createEditJsonDataSourceWizard(requestWrapper: DashboardRequestWrapper, parameters: ko.Computed<Parameter[]>): EditJsonDataSourceWizard;
