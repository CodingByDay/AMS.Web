/**
* DevExpress Dashboard (_factory.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { dataControllerBase } from './data-controllers/_data-controller-base';
export declare class DataControllerFactory {
    createDataController(type: string, options: DataControllerOptions): dataControllerBase;
}
export interface DataControllerOptions {
    multiData: any;
    viewModel: any;
    cfModel: any;
    useNeutralFilterMode: boolean;
    drillDownState: any;
}
export declare let defaultDataControllerFactory: DataControllerFactory;
