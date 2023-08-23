import { formatMessage } from 'devextreme/localization';
import dxList from 'devextreme/ui/list';
import { DialogFindReplaceCommand } from '../../base/commands/dialogs/dialog-find-replace-command';
import { ReadOnlyMode } from '../../base/interfaces/i-rich-edit-core';
import { DialogBase } from './dialog-base';
export class FindReplaceDialog extends DialogBase {
    dispose() {
        super.dispose();
        clearTimeout(this.searchTimerId);
    }
    getTitle() {
        return formatMessage('ASPxRichEditStringId.FindReplaceTitle');
    }
    get showCloseButton() {
        return true;
    }
    getFormOptions() {
        this.controller = this.parameters.controller;
        return {
            colCount: 2,
            items: [
                {
                    colSpan: 2,
                    label: { text: formatMessage('ASPxRichEditStringId.FindReplace_Find'), location: 'left' },
                    editorType: 'dxTextBox',
                    editorOptions: {
                        onInitialized: (e) => { this.findTextBox = e.component; },
                        onInput: (e) => {
                            clearTimeout(this.searchTimerId);
                            if (e.component.option('text'))
                                this.searchTimerId = setTimeout(() => {
                                    this.findAll();
                                }, 700);
                            else {
                                this.controller.resetSearch();
                                this.clearResults();
                            }
                        }
                    }
                },
                {
                    colSpan: 2,
                    label: { text: formatMessage('ASPxRichEditStringId.FindReplace_ReplaceWith'), location: 'left' },
                    editorType: 'dxTextBox',
                    editorOptions: {
                        onInitialized: (e) => { this.replaceTextBox = e.component; }
                    }
                },
                {
                    colSpan: 2,
                    label: { text: formatMessage('ASPxRichEditStringId.FindReplace_Results'), location: 'top' },
                    template: () => {
                        const element = document.createElement('div');
                        this.resultList = new dxList(element, {
                            height: 200,
                            noDataText: '',
                            selectionMode: 'single',
                            keyExpr: 'index',
                            onSelectionChanged: () => { this.goTo(); }
                        });
                        return element;
                    }
                },
                {
                    label: { visible: false },
                    editorType: 'dxCheckBox',
                    editorOptions: {
                        onValueChanged: () => { this.findAll(); },
                        onInitialized: (e) => { this.matchCaseCheckBox = e.component; },
                        text: formatMessage('ASPxRichEditStringId.FindReplace_MatchCase')
                    }
                },
                {
                    label: { visible: false },
                    template: () => {
                        this.resultLabel = document.createElement('div');
                        this.resultLabel.style.textAlign = 'right';
                        return this.resultLabel;
                    }
                }
            ]
        };
    }
    afterShowing() {
        this.controller.onChanged.add(this);
        this.richedit.owner.hideQuickSearchPanel();
        if (this.controller.whatFind) {
            this.findTextBox.option('value', this.controller.whatFind);
            if (this.controller.foundIntervals.length)
                this.fillResults(this.controller.foundIntervals);
            else
                this.findAll();
        }
    }
    NotifySearchReset() {
        this.clearResults();
    }
    getToolbarItems() {
        return [
            {
                widget: 'dxButton',
                location: 'before',
                toolbar: 'bottom',
                options: {
                    text: formatMessage('ASPxRichEditStringId.FindReplace_ReplaceAll'),
                    onClick: () => { this.replaceAll(); },
                    onInitialized: (e) => { this.replaceAllBtn = e.component; }
                }
            },
            {
                widget: 'dxButton',
                location: 'before',
                toolbar: 'bottom',
                options: {
                    text: formatMessage('ASPxRichEditStringId.FindReplace_Replace'),
                    onClick: () => { this.replace(); },
                    onInitialized: (e) => { this.replaceBtn = e.component; }
                }
            },
            {
                widget: 'dxButton',
                location: 'after',
                toolbar: 'bottom',
                options: {
                    text: formatMessage('ASPxRichEditStringId.FindReplace_Previous'),
                    onClick: () => { this.findPrev(); },
                    onInitialized: (e) => { this.prevBtn = e.component; }
                }
            },
            {
                widget: 'dxButton',
                location: 'after',
                toolbar: 'bottom',
                options: {
                    text: formatMessage('ASPxRichEditStringId.FindReplace_Next'),
                    onClick: () => { this.findNext(); },
                    onInitialized: (e) => { this.nextBtn = e.component; }
                }
            }
        ];
    }
    findNext() {
        const index = this.controller.findNextIntervalIndex();
        if (index !== null) {
            this.controller.selectIntervalByIndex(index);
            this.selectResult(index);
        }
    }
    findPrev() {
        const index = this.controller.findPrevIntervalIndex();
        if (index !== null) {
            this.controller.selectIntervalByIndex(index);
            this.selectResult(index);
        }
    }
    findAll() {
        const findText = this.findTextBox.option('text');
        if (findText) {
            this.controller.findAll(findText, this.matchCaseCheckBox.option('value'));
            this.fillResults(this.controller.foundIntervals);
            var index = this.controller.findNextIntervalIndex();
            if (index !== null)
                this.controller.scrollToIntervalByIndex(index);
        }
    }
    replace() {
        const replaceWith = this.replaceTextBox.option('text') || "";
        if (this.controller.replace(this.findTextBox.option('text'), replaceWith, this.matchCaseCheckBox.option('value')))
            this.findAll();
        this.findNext();
    }
    replaceAll() {
        const replaceWith = this.replaceTextBox.option('text') || "";
        this.controller.replaceAll(this.findTextBox.option('text'), replaceWith, this.matchCaseCheckBox.option('value'));
        this.findAll();
    }
    goTo() {
        const selectedKeys = this.resultList.option('selectedItemKeys');
        if (selectedKeys.length) {
            const index = selectedKeys[0];
            this.controller.selectIntervalByIndex(index);
            this.updateResultLabel(index);
        }
    }
    setEnabledForButton(enabled) {
        const readOnly = this.richedit.readOnly === ReadOnlyMode.Persistent;
        this.replaceAllBtn.option('disabled', !enabled || readOnly);
        this.replaceBtn.option('disabled', !enabled || readOnly);
        this.nextBtn.option('disabled', !enabled);
        this.prevBtn.option('disabled', !enabled);
    }
    fillResults(foundIntervals) {
        this.clearResults();
        if (foundIntervals.length) {
            if (foundIntervals.length < 300) {
                const sorce = foundIntervals.map((interval, index) => {
                    return this.createListItem(DialogFindReplaceCommand.getTextForResult(this.richedit, this.richedit.selection.activeSubDocument, interval), index);
                });
                this.resultList.option('items', sorce);
                this.resultList.option('disabled', false);
            }
            else {
                this.resultList.option('items', [this.createListItem(formatMessage('ASPxRichEditStringId.FindReplace_TooLongResult'), 0)]);
                this.resultList.option('disabled', true);
            }
            this.setEnabledForButton(true);
        }
        else {
            if (this.findTextBox.option('text'))
                this.resultList.option('items', [this.createListItem(formatMessage('ASPxRichEditStringId.FindReplace_NoResult'), 0)]);
            this.resultList.option('disabled', true);
        }
        this.updateResultLabel(-1);
    }
    createListItem(text, index) {
        return { html: text, index: index };
    }
    clearResults() {
        this.resultList.option('items');
        this.setEnabledForButton(false);
        this.updateResultLabel(-1);
    }
    selectResult(index) {
        if (!this.resultList.option('disabled'))
            this.resultList.option('selectedItemKeys', [index]);
        this.updateResultLabel(index);
    }
    updateResultLabel(index) {
        if (this.controller.foundIntervals.length) {
            var resultText = index >= 0 ?
                `${index + 1} of ${this.controller.foundIntervals.length}` :
                formatMessage('ASPxRichEditStringId.FindReplace_Items') + ": " + this.controller.foundIntervals.length;
            this.resultLabel.innerHTML = resultText;
        }
        else
            this.resultLabel.innerHTML = '';
    }
    updateParameters(_parameters, _data) { }
}
