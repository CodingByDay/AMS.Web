﻿/**
* DevExpress Analytics (core\tools\_actionList.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../serializer/utils';
import { KeyboardHelper } from './_keyboardHelper';
import { CopyPasteHandler } from './_copyPaste';
import { ActionId } from './actionId';
import { getLocalization } from '../../property-grid/localization/localization_utils';
import { deleteSelection } from '../selection/_selectionHelpers';
import { parseZoom } from '../utils/_utils';
export class ActionListsBase extends Disposable {
    constructor(enabled) {
        super();
        this.toolbarItems = [];
        this.enabled = enabled || ko.observable(true);
    }
    processShortcut(actions, e) {
        for (var i = 0; i < actions.length; i++) {
            if (actions[i].hotKey && (actions[i].disabled && !actions[i].disabled() || !actions[i].disabled) && ($.isFunction(actions[i].visible) ? actions[i].visible() : actions[i].visible)) {
                if (actions[i].hotKey.ctrlKey === e.ctrlKey && actions[i].hotKey.keyCode === e.keyCode) {
                    actions[i].clickAction();
                    e.preventDefault();
                }
            }
        }
    }
    shouldIgnoreProcessing(e) {
        if (e.altKey || !this.enabled.peek())
            return true;
        var activeElement = $.fn.constructor(document.activeElement);
        if (activeElement.is('textarea') || activeElement.is(':input') && (['password', 'text', 'number'].indexOf(activeElement.attr('type')) != -1)) {
            return true;
        }
        return false;
    }
}
export class ActionLists extends ActionListsBase {
    constructor(surfaceContext, selection, undoEngine, customizeActions, enabled, copyPasteStrategy, zoomStep = ko.observable(0.01), isLocked = (item) => false) {
        super(enabled);
        this.menuItems = [];
        var copyPasteHandler = new CopyPasteHandler(selection, copyPasteStrategy), actions = [];
        if (selection) {
            var selectionControlsLocked = ko.computed(() => {
                return selection.selectedItems.some(item => item.locked || isLocked(item));
            });
            this._disposables.push(selectionControlsLocked);
            this._keyboardHelper = new KeyboardHelper(selection, undoEngine);
            actions.push({
                id: ActionId.Cut,
                text: 'Cut',
                displayText: () => getLocalization('Cut', 'AnalyticsCoreStringId.EditCut'),
                imageClassName: 'dxrd-image-cut',
                imageTemplateName: 'dxrd-svg-toolbar-cut',
                disabled: ko.pureComputed(() => {
                    return !surfaceContext() || !copyPasteHandler.canCopy() || selectionControlsLocked();
                }),
                visible: true,
                clickAction: () => {
                    undoEngine().start();
                    copyPasteHandler.cut();
                    undoEngine().end();
                },
                hotKey: { ctrlKey: true, keyCode: 'X'.charCodeAt(0) }
            });
            actions.push({
                id: ActionId.Copy,
                text: 'Copy',
                displayText: () => getLocalization('Copy', 'AnalyticsCoreStringId.Cmd_Copy'),
                imageClassName: 'dxrd-image-copy',
                imageTemplateName: 'dxrd-svg-toolbar-copy',
                disabled: ko.pureComputed(() => {
                    return !surfaceContext() || !copyPasteHandler.canCopy() || selectionControlsLocked();
                }),
                visible: true,
                clickAction: () => {
                    copyPasteHandler.copy();
                },
                hotKey: { ctrlKey: true, keyCode: 'C'.charCodeAt(0) }
            });
            actions.push({
                id: ActionId.Paste,
                text: 'Paste',
                displayText: () => getLocalization('Paste', 'AnalyticsCoreStringId.Cmd_Paste'),
                imageClassName: 'dxrd-image-paste',
                imageTemplateName: 'dxrd-svg-toolbar-paste',
                disabled: ko.pureComputed(() => {
                    return !surfaceContext() || !copyPasteHandler.canPaste() || selectionControlsLocked();
                }),
                visible: true,
                clickAction: () => {
                    undoEngine().start();
                    copyPasteHandler.paste();
                    undoEngine().end();
                },
                hotKey: { ctrlKey: true, keyCode: 'V'.charCodeAt(0) }
            });
            actions.push({
                id: ActionId.Delete,
                text: 'Delete',
                displayText: () => getLocalization('Delete', 'AnalyticsCoreStringId.Cmd_Delete'),
                imageClassName: 'dxrd-image-delete',
                imageTemplateName: 'dxrd-svg-toolbar-delete',
                disabled: ko.pureComputed(() => {
                    if (selection.focused()) {
                        return selection.focused().getControlModel().getMetaData().isDeleteDeny || selectionControlsLocked();
                    }
                    else {
                        return true;
                    }
                }),
                visible: true,
                hotKey: { ctrlKey: false, keyCode: 46 },
                clickAction: () => {
                    undoEngine().start();
                    deleteSelection(selection);
                    undoEngine().end();
                }
            });
        }
        actions.push({
            id: ActionId.Undo,
            text: 'Undo',
            displayText: () => getLocalization('Undo', 'AnalyticsCoreStringId.Undo'),
            imageClassName: 'dxrd-image-undo',
            imageTemplateName: 'dxrd-svg-toolbar-undo',
            disabled: ko.pureComputed(() => { return !surfaceContext() || !undoEngine() || (undoEngine() && !undoEngine().undoEnabled()); }),
            visible: true,
            clickAction: () => {
                undoEngine().undo();
            },
            hotKey: { ctrlKey: true, keyCode: 'Z'.charCodeAt(0) },
            hasSeparator: true
        });
        actions.push({
            id: ActionId.Redo,
            text: 'Redo',
            displayText: () => getLocalization('Redo', 'AnalyticsCoreStringId.Redo'),
            imageClassName: 'dxrd-image-redo',
            imageTemplateName: 'dxrd-svg-toolbar-redo',
            disabled: ko.pureComputed(() => { return !surfaceContext() || !undoEngine() || (undoEngine() && !undoEngine().redoEnabled()); }),
            visible: true,
            clickAction: () => {
                undoEngine().redo();
            },
            hotKey: { ctrlKey: true, keyCode: 'Y'.charCodeAt(0) }
        });
        actions.push({
            id: ActionId.ZoomOut,
            text: 'Zoom Out',
            displayText: () => getLocalization('Zoom Out', 'AnalyticsCoreStringId.ZoomOut'),
            imageClassName: 'dxrd-image-zoomout',
            imageTemplateName: 'dxrd-svg-toolbar-zoomout',
            disabled: ko.pureComputed(() => {
                return !surfaceContext();
            }),
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 109 },
            zoomStep: zoomStep,
            clickAction: () => {
                surfaceContext().zoom(Math.max(surfaceContext().zoom() - zoomStep(), 0.01));
            },
            hasSeparator: true
        });
        actions.push({
            id: ActionId.ZoomSelector,
            text: 'Zoom 100%',
            displayText: () => getLocalization('Zoom 100%'),
            imageClassName: 'dxrd-image-zoom',
            disabled: ko.pureComputed(() => {
                return !surfaceContext();
            }),
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 187 },
            clickAction: () => {
                surfaceContext().zoom(1);
            },
            templateName: 'dxrd-zoom-select-template',
            zoomLevels: ko.observableArray([5, 2, 1.5, 1, 0.75, 0.5, 0.25]),
            zoom: ko.pureComputed({
                read: () => { return surfaceContext() && surfaceContext().zoom(); },
                write: (val) => { surfaceContext().zoom(val); }
            }),
            onCustomItemCreating: (e) => {
                e.customItem = parseZoom(e.text);
            }
        });
        actions.push({
            id: ActionId.ZoomIn,
            text: 'Zoom In',
            displayText: () => getLocalization('Zoom In', 'AnalyticsCoreStringId.ZoomIn'),
            imageClassName: 'dxrd-image-zoomin',
            imageTemplateName: 'dxrd-svg-toolbar-zoomin',
            disabled: ko.pureComputed(() => {
                return !surfaceContext();
            }),
            visible: true,
            hotKey: { ctrlKey: true, keyCode: 107 },
            zoomStep: zoomStep,
            clickAction: () => {
                surfaceContext().zoom(surfaceContext().zoom() + zoomStep());
            }
        });
        if (customizeActions) {
            customizeActions(actions);
        }
        actions.forEach((action) => {
            Object.keys(action).forEach((name) => {
                if (ko.isComputed(action[name])) {
                    this._disposables.push(action[name]);
                }
            });
            this._registerAction(action['container'] === 'menu' ? this.menuItems : ko.unwrap(this.toolbarItems), action);
        });
    }
    _registerAction(container, action) {
        if (action['index']) {
            container.splice(action['index'], 0, action);
        }
        else {
            container.push(action);
        }
    }
    processShortcut(actions, e) {
        if (this.shouldIgnoreProcessing(e)) {
            return;
        }
        if (!this._keyboardHelper.processShortcut(e)) {
            super.processShortcut(actions, e);
        }
        else {
            e.preventDefault();
        }
    }
}
