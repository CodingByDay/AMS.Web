﻿/**
* DevExpress Dashboard (_card-layout-template-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { CardLayoutTemplate } from '../../../model/items/card/card-layout-template';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IComposeTabsArgs, IDetailsPropertiesComposerBase } from './_base-properties-composer';
export declare class CardTemplatePropertiesComposer implements IDetailsPropertiesComposerBase<CardLayoutTemplate, ICardLayoutTemplateComposeTabsArgs> {
    composeTabs(model: CardLayoutTemplate, args: ICardLayoutTemplateComposeTabsArgs): AccordionTab[];
    private fillLayoutsTab;
    resetTemplate(template: CardLayoutTemplate): void;
}
export interface ICardLayoutTemplateComposeTabsArgs extends IComposeTabsArgs {
    dimensionNames: string[];
    applyTemplateToAllCards: (template: CardLayoutTemplate) => void;
}
