﻿/**
* DevExpress Analytics (core\internal\_inlineTextEdit.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import * as ko from 'knockout';
import * as $ from 'jquery';
import { Disposable } from '../../serializer/utils';
import { KeyboardEnum } from '../../property-grid/widgets/internal/_utils';
export function processTextEditorHotKeys(event, delegates) {
    if (!event || !delegates)
        return;
    if (event.key === KeyboardEnum.Esc && !!delegates['esc']) {
        delegates['esc']();
    }
    if (event.key === KeyboardEnum.Enter && event.ctrlKey && !!delegates['ctrlEnter']) {
        delegates['ctrlEnter']();
    }
}
export class InlineTextEdit extends Disposable {
    constructor(selection) {
        super();
        this._showInline = ko.observable(false);
        this.text = ko.observable();
        var _controlText;
        this._disposables.push(selection.focused.subscribe(() => {
            if (this._showInline() && _controlText) {
                _controlText(this.text());
                this._showInline(false);
            }
            var controlModel = selection.focused() && selection.focused().getControlModel();
            _controlText = controlModel && (controlModel.textEditableProperty || controlModel.text || controlModel.alias);
        }));
        this._disposables.push(this.visible = ko.pureComputed({
            read: () => {
                return this._showInline();
            },
            write: (val) => {
                this._showInline(val);
            }
        }));
        this.show = (element) => {
            if (this._showInline()) {
                return;
            }
            var isSingleControlSelected = !!selection.selectedItems ? selection.selectedItems.length === 1 : !!selection.focused();
            if (isSingleControlSelected && _controlText && !selection.focused().locked) {
                this.text(_controlText());
                this._showInline(true);
                if (element) {
                    var textarea = $.fn.constructor(element).find('textarea')[0];
                    textarea && textarea['select']();
                }
            }
            else {
                this._showInline(false);
            }
        };
        this.keypressAction = (args) => {
            processTextEditorHotKeys(args.event, {
                esc: () => { this._showInline(false); },
                ctrlEnter: () => {
                    _controlText(this.text());
                    this._showInline(false);
                }
            });
        };
    }
}
