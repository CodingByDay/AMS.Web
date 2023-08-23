/**
* DevExpress Dashboard (_data-source-wizard-page-iterator.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { PageIterator } from '@devexpress/analytics-core/analytics-wizard';
export declare abstract class DataSourceWizardPageIteratorBase extends PageIterator {
    getInitialPage(): string;
    getNextPageId(pageId: string): string;
    getConfigureQueryPage(): string;
    getConfigureSqlParametersPage(): string;
    getConfigureObjectParametersPage(): string;
}
