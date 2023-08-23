﻿/**
* DevExpress Dashboard (_interactivity-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { AccordionTab } from '../properties-controller/_accordion-tab';
import { PropertiesController } from '../properties-controller/_properties-controller';
import { IDetailsPropertiesComposer } from './properties-composers/_base-properties-composer';
export declare class InteractivityPropertiesComposer implements IDetailsPropertiesComposer<any> {
    propertiesController: PropertiesController;
    constructor(propertiesController: PropertiesController);
    composeTabs(model: any): Array<AccordionTab>;
}
