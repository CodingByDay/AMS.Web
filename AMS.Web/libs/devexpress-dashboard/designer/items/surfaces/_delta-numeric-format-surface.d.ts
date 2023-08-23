﻿/**
* DevExpress Dashboard (_delta-numeric-format-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { DataItemNumericFormat } from '../../../model/data-item/data-item-format';
import { IDisposable } from '../../../model/disposable-object';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IPropertiesHolder, PropertiesController } from '../../properties-controller/_properties-controller';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
export declare class DeltaNumericFormatSurface implements IDisposable, IPropertiesHolder {
    model: {
        title: string;
        numericFormat: DataItemNumericFormat;
    };
    propertiesController: PropertiesController;
    private _disposables;
    constructor(model: {
        title: string;
        numericFormat: DataItemNumericFormat;
    }, propertiesController: PropertiesController);
    propertiesTabs: ko.ObservableArray<AccordionTab<any>>;
    updatePropertiesTabs(): void;
    startEditing(args: CollectionEditorEditItemArguments): void;
    dispose(): void;
}
