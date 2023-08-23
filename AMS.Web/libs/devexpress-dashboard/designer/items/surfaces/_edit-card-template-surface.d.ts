﻿/**
* DevExpress Dashboard (_edit-card-template-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDisposable } from '../../../model/disposable-object';
import { CardLayoutTemplate } from '../../../model/items/card/card-layout-template';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IPropertiesHolder, PropertiesController } from '../../properties-controller/_properties-controller';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
export declare class EditCardTemplateSurface implements IDisposable, IPropertiesHolder {
    model: CardLayoutTemplate;
    propertiesController: PropertiesController;
    private dimensionNames;
    private applyTemplateToAllCards;
    private _disposables;
    constructor(model: CardLayoutTemplate, propertiesController: PropertiesController, dimensionNames: string[], applyTemplateToAllCards?: (template: CardLayoutTemplate) => void);
    propertiesTabs: ko.ObservableArray<AccordionTab<any>>;
    updatePropertiesTabs(): void;
    startEditing(args: CollectionEditorEditItemArguments): void;
    dispose(): void;
}
