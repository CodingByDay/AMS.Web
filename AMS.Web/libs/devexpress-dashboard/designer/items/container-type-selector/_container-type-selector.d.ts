﻿/**
* DevExpress Dashboard (_container-type-selector.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
export declare type ContainerTypeMap = {
    [key: string]: {
        icon: string;
        displayName?: string;
        group?: string;
    };
};
export interface ContainerTypeSelectorOptions {
    containersMap: ContainerTypeMap;
    containerGroupLocalization?: {
        [groupName: string]: string;
    };
    highlightedTypes?: string[];
}
export declare class ContainerTypeSelector {
    private _containersMap;
    containerType: ko.Observable<string>;
    private _containerGroupLocalization?;
    private _highlightedTypes?;
    constructor(_containersMap: ContainerTypeMap, containerType: ko.Observable<string>, _containerGroupLocalization?: {
        [groupName: string]: string;
    }, _highlightedTypes?: string[]);
    get shortAvailableContainerTypes(): any[];
    get hasFullList(): boolean;
    get availableContainerTypes(): any[];
    get availableContainerTypeGroups(): {
        name: string;
        displayName: string;
    }[];
    headerClick: (data: any, event: any) => boolean;
    itemClick: (data: any, event: any) => boolean;
}
