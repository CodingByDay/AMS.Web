﻿/**
* DevExpress Dashboard (_properties-controller.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDisposable } from '../../model/disposable-object';
import { AccordionTab } from './_accordion-tab';
export interface IPropertiesHolder {
    model: any;
    propertiesTabs: ko.ObservableArray<AccordionTab>;
}
export declare class PropertiesController implements IDisposable {
    private _disposables;
    constructor();
    mainModel: ko.Observable<{
        containingCollection?: ko.ObservableArray<any>;
        data: IPropertiesHolder;
    }>;
    secondaryModel: ko.Observable<{
        containingCollection?: ko.ObservableArray<any>;
        displayText: string | ko.Subscribable<string>;
        data: IPropertiesHolder;
    }>;
    private currentTab;
    accordionDataSource: ko.Observable<Array<AccordionTab>>;
    secondaryAccordionDataSource: ko.Observable<Array<AccordionTab>>;
    computator: ko.Computed<void>;
    selectedIndex: ko.Computed<number>;
    secondarySelectedIndex: ko.Observable<number>;
    processDataItemClick: (data: any) => void;
    dispose(): void;
}
