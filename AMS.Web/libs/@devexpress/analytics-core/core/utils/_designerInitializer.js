﻿/**
* DevExpress Analytics (core\utils\_designerInitializer.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { availableFonts } from '../../property-grid/widgets/fonteditor/_fonts';
import { DragDropHandler } from '../dragDrop/_dragDropHandler';
import { DragHelperContent } from '../dragDrop/_dragHelperContent';
import { SelectionDragDropHandler } from '../dragDrop/_selectionDragDropHandler';
import { ToolboxDragDropHandler } from '../dragDrop/_toolboxDragDropHandler';
import { InlineTextEdit } from '../internal/_inlineTextEdit';
import { getToolboxItems } from '../internal/_utils';
import { CombinedObject } from '../selection/_combinedObj';
import { SurfaceSelection } from '../selection/_selection';
import { SnapLinesCollector } from '../snapLines/_snapLinesCollector';
import { SnapLinesHelper } from '../snapLines/_snapLinesHelper';
import { TabInfo } from '../tools/tabInfo';
import { CommonDesignerGenerator, DesignerContextGenerator } from './_designerCreator';
export function createDesigner(model, surface, controlsFactory, groups = {}, editors = [], parts, rtl, selection, designControlsHelper, undoEngine, customMerge, snapLinesCollector, groupLocalizationIDs) {
    var context = new DesignerContextGenerator(rtl)
        .addModel(model)
        .addSurface(surface)
        .addUndoEngine(undoEngine)
        .getContext();
    var designerGenerator = new CommonDesignerGenerator(context, rtl);
    return designerGenerator
        .addDisposableContainer()
        .mapOnContext()
        .addSelection((settings) => {
        settings.selection = selection || new SurfaceSelection();
        settings.snapHelper = new SnapLinesHelper(surface, SnapLinesHelper.snapTolerance, snapLinesCollector || new SnapLinesCollector());
        settings.editableObject = CombinedObject.getEditableObject(settings.selection, context.undoEngine, customMerge).extend({ throttle: 1 });
        settings.addDragDrop((dragDropSettings) => {
            dragDropSettings.dragHelperContent = new DragHelperContent(settings.selection);
            dragDropSettings.dragDropStarted = DragDropHandler.started;
            dragDropSettings.addDragDropHandler('dragHandler', new SelectionDragDropHandler(context.surface, settings.selection, context.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent));
            dragDropSettings.addDragDropHandler('toolboxDragHandler', new ToolboxDragDropHandler(context.surface, settings.selection, context.undoEngine, settings.snapHelper, dragDropSettings.dragHelperContent, controlsFactory));
        });
        settings.addResize((resizeSettings) => {
            resizeSettings.handler = {
                starting: () => {
                    selection.expectClick = true;
                    context.undoEngine().start();
                },
                stopped: () => {
                    context.undoEngine().end();
                    setTimeout(() => { selection.expectClick = false; }, 100);
                },
                disabled: DragDropHandler.started,
                snapHelper: settings.snapHelper
            };
        });
    })
        .addToolboxItems(() => getToolboxItems(controlsFactory.controlsMap))
        .addIsLoading()
        .addControlProperties(editors, groups)
        .addPopularProperties(controlsFactory)
        .addControlsHelper((settings) => {
        settings
            .addControlsHelper(designControlsHelper)
            .addControlsStore();
    })
        .addTabPanel(undefined, () => {
        return [
            new TabInfo({
                text: 'Properties',
                template: 'dxrd-propertiestab',
                model: designerGenerator.getModel().propertyGrid,
                localizationId: 'AnalyticsCoreStringId.Cmd_Properties',
                visible: ko.pureComputed(() => { return !!model(); }),
                disabled: ko.pureComputed(() => { return designerGenerator.getModel().propertyGrid.focusedItem() instanceof Array; }).extend({ throttle: 100 })
            })
        ];
    })
        .addContextActions((settings) => {
        settings.actionProviders = [];
        settings.createDefaultActions(designerGenerator.getModel().editableObject, designerGenerator.getModel().undoEngine);
    })
        .addMenu((settings) => {
        settings.appMenuVisible = ko.observable(false);
        settings.toggleAppMenu = function () {
            settings.appMenuVisible(!settings.appMenuVisible());
        };
        settings.getMenuPopupContainer = (el) => $.fn.constructor(el).closest('.dxrd-menu-button').prev('.dxrd-menu-container');
        settings.getMenuPopupTarget = (el) => $.fn.constructor(el).closest('.dxrd-menu-button').find('.dxrd-menu-place');
    })
        .addElement('inlineTextEdit', () => new InlineTextEdit(designerGenerator.getModel().selection))
        .addElement('actionsGroupTitle', () => () => getLocalization('Actions', 'AnalyticsCoreStringId.Actions'))
        .addElement('updateFont', () => (values) => {
        availableFonts(Object.assign(Object.assign({}, availableFonts()), values));
    })
        .addElement('sortFont', () => () => {
        var sortedObj = {};
        var fonts = availableFonts.peek();
        Object.keys(fonts).sort((a, b) => { return a.localeCompare(b); }).forEach(key => sortedObj[key] = fonts[key]);
        availableFonts(sortedObj);
    })
        .addElement('surfaceSize', () => ko.observable(0))
        .addElement('popularVisible', () => ko.pureComputed(() => {
        return designerGenerator.getModel().popularProperties._editors().some((x) => { return x.visible(); }) ||
            designerGenerator.getModel().contextActions && designerGenerator.getModel().contextActions().length > 0;
    }))
        .addActionList()
        .addParts()
        .getModel();
}
