/**
* DevExpress Dashboard (_map-custom-shapefile-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CustomShapefile } from '../../../model/items/map/custom-shape-file';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IDetailsPropertiesComposer } from './_base-properties-composer';
export declare class MapCustomShapefilePropertiesComposer implements IDetailsPropertiesComposer<CustomShapefile> {
    composeTabs(model: CustomShapefile): AccordionTab[];
    private fillLayoutsTab;
}
