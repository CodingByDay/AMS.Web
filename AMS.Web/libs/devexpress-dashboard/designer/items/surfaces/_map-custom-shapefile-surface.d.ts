﻿/**
* DevExpress Dashboard (_map-custom-shapefile-surface.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { IDisposable } from '../../../model/disposable-object';
import { CustomShapefile } from '../../../model/items/map/custom-shape-file';
import { AccordionTab } from '../../properties-controller/_accordion-tab';
import { IPropertiesHolder, PropertiesController } from '../../properties-controller/_properties-controller';
import { CollectionEditorEditItemArguments } from '../../ui-widgets/collection-editor/_collection-editor-viewmodel';
export declare class MapCustomShapeFileSurface implements IDisposable, IPropertiesHolder {
    model: CustomShapefile;
    propertiesController: PropertiesController;
    private _disposables;
    constructor(model: CustomShapefile, propertiesController: PropertiesController);
    propertiesTabs: ko.ObservableArray<AccordionTab<any>>;
    startEditing(args: CollectionEditorEditItemArguments): void;
    dispose(): void;
}
