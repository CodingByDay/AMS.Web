﻿/**
* DevExpress Dashboard (_choropleth-map-element-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { ChoroplethMap } from '../../../model/items/map/chorolpeth-map';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { ContainerTypeSelector } from '../container-type-selector/_container-type-selector';
import { CustomizeDataItemContainerTabs, DataItemContainerPropertiesComposer, IDataItemContainerComposeTabsArgs } from './_base-properties-composer';
export declare class ChoroplethMapElementPropertiesComposer extends DataItemContainerPropertiesComposer<ChoroplethMap> {
    private editDeltaFormatHandler;
    constructor(customizeHandler: CustomizeDataItemContainerTabs, editDeltaFormatHandler?: (model: any) => void);
    protected _composeTabsCore(model: ChoroplethMap, args: IDataItemContainerComposeTabsArgs): AccordionTab<any>[];
    getMapTypeWrapper(model: any, containerType: ko.Observable<string>): ContainerTypeSelector;
}
