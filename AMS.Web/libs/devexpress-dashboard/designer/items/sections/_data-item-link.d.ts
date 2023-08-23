﻿/**
* DevExpress Dashboard (_data-item-link.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
import { DockingLayoutController } from '../../../common/docking-layout/_docking-layout-controller';
import { PropertiesController } from '../../properties-controller/_properties-controller';
import { SurfaceItemsFactory } from '../_section-descriptors';
export declare class DataItemLinkComponent {
    surface: DockingLayoutController;
    $element: JQuery;
    propertiesController: PropertiesController;
    surfaceItemsFactory: SurfaceItemsFactory;
    constructor(surface: DockingLayoutController, $element: JQuery, propertiesController: PropertiesController, surfaceItemsFactory: SurfaceItemsFactory);
}
