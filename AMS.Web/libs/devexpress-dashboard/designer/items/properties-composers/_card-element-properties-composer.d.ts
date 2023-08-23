﻿/**
* DevExpress Dashboard (_card-element-properties-composer.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataSourceBrowser } from '../../../common/_data-source-browser';
import { CardItemFormatRuleBase } from '../../../model/format-rules/card-item-format-rule-base';
import { Card } from '../../../model/items/card/card';
import { CardItem } from '../../../model/items/card/card-item';
import { CardLayoutTemplate } from '../../../model/items/card/card-layout-template';
import { DataDashboardItem } from '../../../model/items/data-dashboard-item';
import { ObjectPropertiesWrapper } from '../../form-adapter/_object-properties-wrapper';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
import { CustomizeDataItemContainerTabs, DataItemContainerPropertiesComposer, IDataItemContainerComposeTabsArgs } from './_base-properties-composer';
export declare class CardElementPropertiesComposer extends DataItemContainerPropertiesComposer<Card> {
    private editTemplateHandler;
    private editFormat;
    private applyTemplateToAllCards;
    editRuleHandler: (selection: CardItemFormatRuleBase, args: CollectionEditorEditItemArguments, container: ko.Observable<CardItemFormatRuleBase>) => void;
    constructor(customizeHandler: CustomizeDataItemContainerTabs, editTemplateHandler?: (model: any) => void, editFormat?: (model: any) => void, applyTemplateToAllCards?: (template: CardLayoutTemplate) => void, editRuleHandler?: (selection: CardItemFormatRuleBase, args: CollectionEditorEditItemArguments, container: ko.Observable<CardItemFormatRuleBase>) => void);
    protected _composeTabsCore(model: Card, args: IDataItemContainerComposeTabsArgs): AccordionTab<any>[];
    getCommonWrapper(model: Card, dashboardItem: DataDashboardItem, dataSourceBrowser: DataSourceBrowser): ObjectPropertiesWrapper<Card>;
    getSparklineWrapper(model: Card): ObjectPropertiesWrapper<Card>;
    fillTemplatesTab(tab: AccordionTab, card: Card): void;
    switchTemplate(card: Card, newTemplate: CardLayoutTemplate): void;
    getAvailableTemplates(card: Card): any[];
    getFormatRulesWrapper(model: Card, dashboardItem: CardItem): ObjectPropertiesWrapper<CardItem>;
}
