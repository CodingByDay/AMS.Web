﻿/**
* DevExpress Dashboard (_rich-edit-bindings.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const devexpress_richedit_1 = require("devexpress-richedit");
const ko = require("knockout");
const _default_1 = require("../../data/localization/_default");
ko.bindingHandlers['dx-dashboard-rich-edit'] = {
    init: function (element, valueAccessor, _, __, bindingContext) {
        var options = ko.unwrap(valueAccessor());
        const richEditOptions = devexpress_richedit_1.createOptions();
        richEditOptions.width = '100%';
        richEditOptions.height = '100%';
        richEditOptions.view.viewType = devexpress_richedit_1.ViewType.Simple;
        richEditOptions.view.simpleViewSettings.paddings = { bottom: 7, left: 7, right: 7, top: 7 };
        if (options.dashboardItemWidth && options.dashboardItemWidth > 0) {
            richEditOptions.view.simpleViewSettings.fixedWidth = options.dashboardItemWidth;
        }
        richEditOptions.events.saving = (s, e) => {
            var document = atob(e.base64);
            options.onSaving(document);
            e.handled = true;
        };
        richEditOptions.events.documentLoaded = (s, e) => {
            var document = s.document;
            document.fields.updateAllFields();
            const charProps = document.getDefaultCharacterProperties();
            charProps.fontName = 'Segoe UI';
            document.setDefaultCharacterProperties(charProps);
            document.modified = false;
        };
        richEditOptions.events.calculateDocumentVariable = function (s, e) {
            var docVariable = options.docVariables.filter(v => v.id === e.variableName)[0];
            if (docVariable) {
                e.value = docVariable.displayName;
            }
        };
        const dashboardCmdPrefix = 'insertDashboardVariable';
        var fileTab = richEditOptions.ribbon.getTab(devexpress_richedit_1.RibbonTabType.File);
        fileTab.removeItem(devexpress_richedit_1.FileTabItemId.CreateNewDocument);
        fileTab.removeItem(devexpress_richedit_1.FileTabItemId.PrintDocument);
        var insertTab = richEditOptions.ribbon.getTab(devexpress_richedit_1.RibbonTabType.Insert);
        var mailMergeTab = richEditOptions.ribbon.getTab(devexpress_richedit_1.RibbonTabType.MailMerge);
        [devexpress_richedit_1.InsertTabItemId.ShowBookmarkDialog, devexpress_richedit_1.InsertTabItemId.InsertHeader, devexpress_richedit_1.InsertTabItemId.InsertFooter,
            devexpress_richedit_1.InsertTabItemId.InsertPageCountField, devexpress_richedit_1.InsertTabItemId.InsertPageNumberField, devexpress_richedit_1.InsertTabItemId.InsertFloatingTextBox].forEach(id => insertTab.removeItem(id));
        var dashboardFieldsMenuItems = options.docVariables.length ?
            options.docVariables.map(docVariable => { return new devexpress_richedit_1.RibbonSubMenuItem(dashboardCmdPrefix + docVariable.id, docVariable.displayName); })
            :
                [new devexpress_richedit_1.RibbonSubMenuItem('dummyCommand', _default_1.getLocalizationById('DashboardWebStringId.TextBoxItemEditor.NoFields'))];
        [devexpress_richedit_1.MailMergeTabItemId.ShowAllFieldCodes, devexpress_richedit_1.MailMergeTabItemId.ShowAllFieldResults, devexpress_richedit_1.MailMergeTabItemId.UpdateAllFields]
            .map(id => mailMergeTab.getItem(id))
            .forEach((item, i) => insertTab.insertItem(item, i));
        insertTab.insertItem(new devexpress_richedit_1.RibbonMenuItem(dashboardCmdPrefix, _default_1.getLocalizationById('DashboardWebStringId.TextBoxItemEditor.InsertField'), dashboardFieldsMenuItems, {
            icon: 'dxre-icon-InsertDataField',
            showText: true
        }), 0);
        insertTab.getItem(devexpress_richedit_1.InsertTabItemId.ShowInsertTableDialog).beginGroup = true;
        richEditOptions.ribbon.removeTab(devexpress_richedit_1.RibbonTabType.PageLayout);
        richEditOptions.ribbon.removeTab(devexpress_richedit_1.RibbonTabType.References);
        richEditOptions.ribbon.removeTab(devexpress_richedit_1.RibbonTabType.View);
        richEditOptions.ribbon.removeTab(devexpress_richedit_1.RibbonTabType.MailMerge);
        richEditOptions.events.customCommandExecuted = (richEdit, e) => {
            var docVariable = options.docVariables.filter(v => (dashboardCmdPrefix + v.id) === e.commandName)[0];
            if (docVariable) {
                var field = richEdit.document.fields.create(richEdit.selection.active, 'docvariable ' + docVariable.id);
                richEdit.document.insertText(field.resultInterval.start, docVariable.displayName);
                field.update();
            }
        };
        var richEdit = devexpress_richedit_1.create(element, richEditOptions);
        if (options.initialDocument) {
            richEdit.openDocument(btoa(unescape(encodeURIComponent(options.initialDocument))), '', devexpress_richedit_1.DocumentFormat.Rtf);
        }
        richEdit.documentSaveFormat = devexpress_richedit_1.DocumentFormat.Rtf;
        options.forceSave = () => {
            richEdit.hasUnsavedChanges = true;
            richEdit.saveDocument(devexpress_richedit_1.DocumentFormat.Rtf);
        };
        options.documentModified = () => richEdit.document.modified;
        ko.utils.domNodeDisposal.addDisposeCallback(element, function () {
            richEdit.dispose();
        });
        return { controlsDescendantBindings: true };
    }
};
