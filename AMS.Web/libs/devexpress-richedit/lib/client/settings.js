import { formatMessage } from 'devextreme/localization';
import { RichEditUnit } from '../base-utils/unit-converter';
import { convertToFunction } from '../base-utils/utils';
import { AutoCorrectReplaceInfo, AutoCorrectSettings } from '../core/model/options/auto-correct';
import { BookmarksSettings, BookmarksVisibility } from '../core/model/options/bookmarks';
import { FieldsSettings } from '../core/model/options/fields';
import { FontsSettings } from '../core/model/options/fonts';
import { MailMergeOptions } from '../core/model/options/mail-merge';
import { PdfSettings } from '../core/model/options/pdf';
import { SearchSettings } from '../core/model/options/search';
import { PrintingSettings } from '../core/model/options/printing';
import { DocumentProtectionSettings } from '../core/model/options/protection';
import { SpellCheckerSettings } from '../core/model/options/spell-checker';
import { ViewSettings } from '../core/view-settings/views-settings';
import { isDefined } from '@devexpress/utils/lib/utils/common';
import { ContextMenuSettings } from './context-menu/settings';
import { DataSourceHelper } from './data-source-helper';
import { addContextTabCategories, addTabs } from './public/ribbon/creator';
import { Ribbon } from './public/ribbon/ribbon';
import { PrintMode } from './public/rich-edit';
import { IntervalApi } from '../model-api/interval';
export class Settings {
    constructor() {
        this.width = "100%";
        this.height = "500px";
        this.readOnly = false;
        this.unit = RichEditUnit.Inch;
        this.exportUrl = "";
        this.dataSource = null;
        this.rawDataSource = null;
        this.autoCorrect = new AutoCorrectSettings();
        this.bookmarks = new BookmarksSettings();
        this.documentProtection = new DocumentProtectionSettings();
        this.fields = new FieldsSettings();
        this.mailMerge = new MailMergeOptions();
        this.printing = new PrintingSettings();
        this.ribbon = new Ribbon();
        this.view = new ViewSettings();
        this.pdf = new PdfSettings();
        this.search = new SearchSettings();
        this.fonts = new FontsSettings();
        this.spellCheck = new SpellCheckerSettings();
        this.confirmOnLosingChanges = new ConfirmOnLosingChangesSettings();
        this.contextMenuSettings = new ContextMenuSettings();
    }
    static parse(settings, subDocumentCreator) {
        const result = new Settings();
        if (!settings)
            settings = {};
        this.parseCommonSettings(settings, result);
        this.parseAutoCorrectSettings(settings, result);
        this.parseBookmarksSettings(settings, result);
        this.parseDocumentProtectionSettings(settings, result);
        this.parseFieldsSettings(settings, result);
        this.parsePrintingSettings(settings, result);
        this.parseRibbonSettings(settings, result);
        this.parseViewsSettings(settings, result);
        this.parsePdfSettings(settings, result);
        result.fonts.init(settings.fonts);
        this.parseConfirmOnLosingChangesSettings(settings, result);
        this.parseMailMergeSettings(settings, result);
        this.parseSpellCheckSettings(settings, result);
        this.parseEventHandlers(settings.events, result);
        this.parseContextMenuSettings(settings, result);
        this.parseSearchSettings(settings, result, subDocumentCreator);
        if (result.onSaved && result.exportUrl !== "")
            console.log('The Saved event does nothing. To learn more, follow ' +
                'https://docs.devexpress.com/AspNetCore/400972/office-inspired-controls/controls/rich-edit/document-management#save-a-document');
        return result;
    }
    static parseCommonSettings(settings, result) {
        if (isDefined(settings.width))
            result.width = settings.width;
        if (isDefined(settings.height))
            result.height = settings.height;
        if (isDefined(settings.readOnly))
            result.readOnly = settings.readOnly;
        if (isDefined(settings.unit))
            result.unit = settings.unit;
        if (isDefined(settings.exportUrl))
            result.exportUrl = settings.exportUrl;
        if (isDefined(settings.nonce))
            result.nonce = settings.nonce;
    }
    static parseAutoCorrectSettings(settings, result) {
        const autoCorrect = settings.autoCorrect;
        if (isDefined(autoCorrect)) {
            if (isDefined(autoCorrect.correctTwoInitialCapitals))
                result.autoCorrect.correctTwoInitialCapitals = autoCorrect.correctTwoInitialCapitals;
            if (isDefined(autoCorrect.detectUrls))
                result.autoCorrect.detectUrls = autoCorrect.detectUrls;
            if (isDefined(autoCorrect.enableAutomaticNumbering))
                result.autoCorrect.enableAutomaticNumbering = autoCorrect.enableAutomaticNumbering;
            if (isDefined(autoCorrect.replaceTextAsYouType))
                result.autoCorrect.replaceTextAsYouType = autoCorrect.replaceTextAsYouType;
            if (isDefined(autoCorrect.caseSensitiveReplacement))
                result.autoCorrect.caseSensitiveReplacement = autoCorrect.caseSensitiveReplacement;
            if (isDefined(autoCorrect.replaceInfoCollection) && Array.isArray(autoCorrect.replaceInfoCollection)) {
                for (let info of autoCorrect.replaceInfoCollection)
                    if (isDefined(info.replace) && isDefined(info.with))
                        result.autoCorrect.replaceInfoCollection.push(new AutoCorrectReplaceInfo(info.replace, info.with));
            }
        }
    }
    static parseBookmarksSettings(settings, result) {
        if (isDefined(settings.bookmarks)) {
            if (isDefined(settings.bookmarks.color))
                result.bookmarks.color = settings.bookmarks.color;
            if (isDefined(settings.bookmarks.visibility))
                result.bookmarks.visibility = settings.bookmarks.visibility ? BookmarksVisibility.Visible : BookmarksVisibility.Hidden;
        }
    }
    static parseDocumentProtectionSettings(settings, result) {
        const authentication = settings.authentication;
        if (isDefined(authentication)) {
            if (isDefined(authentication.userName))
                result.documentProtection.authenticationUserName = authentication.userName;
            if (isDefined(authentication.group))
                result.documentProtection.authenticationGroup = authentication.group;
        }
        const rangePermissions = settings.rangePermissions;
        if (isDefined(rangePermissions)) {
            if (isDefined(rangePermissions.bracketsColor))
                result.documentProtection.rangeHighlightBracketsColor = rangePermissions.bracketsColor;
            if (isDefined(rangePermissions.highlightColor))
                result.documentProtection.rangeHighlightColor = rangePermissions.highlightColor;
            if (isDefined(rangePermissions.highlightRanges))
                result.documentProtection.highlightRanges = rangePermissions.highlightRanges;
            if (isDefined(rangePermissions.showBrackets))
                result.documentProtection.showBrackets = rangePermissions.showBrackets;
        }
    }
    static parseFieldsSettings(settings, result) {
        if (isDefined(settings.fields)) {
            if (isDefined(settings.fields.updateFieldsBeforePrint))
                result.fields.updateFieldsBeforePrint = settings.fields.updateFieldsBeforePrint;
            if (isDefined(settings.fields.updateFieldsOnPaste))
                result.fields.updateFieldsOnPaste = settings.fields.updateFieldsOnPaste;
            if (isDefined(settings.fields.defaultTimeFormat))
                result.fields.defaultTimeFormat = settings.fields.defaultTimeFormat;
            if (isDefined(settings.fields.defaultDateFormat))
                result.fields.defaultDateFormat = settings.fields.defaultDateFormat;
            if (isDefined(settings.fields.openHyperlinkOnClick))
                result.fields.openHyperlinkOnClick = settings.fields.openHyperlinkOnClick;
            if (isDefined(settings.fields.createHyperlinkTooltip))
                result.fields.createHyperlinkTooltip = this.parseEventHandler(settings.fields.createHyperlinkTooltip);
            if (isDefined(settings.fields.keepHyperlinkResultForInvalidReference))
                result.fields.keepHyperlinkResultForInvalidReference = settings.fields.keepHyperlinkResultForInvalidReference;
        }
    }
    static parsePrintingSettings(settings, result) {
        var _a, _b, _c, _d;
        result.printing.mode = ((_b = (_a = settings === null || settings === void 0 ? void 0 : settings.printing) === null || _a === void 0 ? void 0 : _a.mode) !== null && _b !== void 0 ? _b : PrintMode.Html);
        result.printing.closePrintDialogWithHtmlPreview = (_d = (_c = settings === null || settings === void 0 ? void 0 : settings.printing) === null || _c === void 0 ? void 0 : _c.closePrintDialogWithHtmlPreview) !== null && _d !== void 0 ? _d : true;
    }
    static parseRibbonSettings(settings, result) {
        if (isDefined(settings.ribbon)) {
            if (settings.ribbon instanceof Ribbon) {
                result.ribbon = settings.ribbon;
            }
            else {
                const serverRibbonSettings = settings.ribbon;
                const ribbon = result.ribbon = new Ribbon();
                if (isDefined(serverRibbonSettings.visible))
                    ribbon.visible = settings.ribbon.visible;
                if (isDefined(serverRibbonSettings.activeTabIndex))
                    ribbon.activeTabIndex = settings.ribbon.activeTabIndex;
                if (isDefined(serverRibbonSettings.tabs))
                    addTabs(ribbon, serverRibbonSettings.tabs);
                if (isDefined(serverRibbonSettings.contextTabCategories))
                    addContextTabCategories(ribbon, serverRibbonSettings.contextTabCategories);
                if (!(isDefined(serverRibbonSettings.tabs) && serverRibbonSettings.tabs.length) &&
                    !(isDefined(serverRibbonSettings.contextTabCategories) && serverRibbonSettings.tabs.length))
                    ribbon.visible = false;
            }
        }
        else
            result.ribbon.visible = false;
    }
    static parseViewsSettings(settings, result) {
        if (isDefined(settings.view)) {
            if (isDefined(settings.view.viewType))
                result.view.viewType = settings.view.viewType;
            if (isDefined(settings.view.simpleViewSettings)) {
                const paddings = settings.view.simpleViewSettings.paddings;
                if (isDefined(paddings)) {
                    if (isDefined(paddings.left))
                        result.view.paddings.left = paddings.left;
                    if (isDefined(paddings.right))
                        result.view.paddings.right = paddings.right;
                    if (isDefined(paddings.top))
                        result.view.paddings.top = paddings.top;
                    if (isDefined(paddings.bottom))
                        result.view.paddings.bottom = paddings.bottom;
                }
                const fixedWidth = settings.view.simpleViewSettings.fixedWidth;
                if (isDefined(fixedWidth))
                    result.view.fixedWidth = fixedWidth;
            }
            const printLayoutViewSettings = settings.view.printLayoutViewSettings;
            if (isDefined(printLayoutViewSettings)) {
                if (isDefined(printLayoutViewSettings.showHorizontalRuler))
                    result.view.showHorizontalRuler = printLayoutViewSettings.showHorizontalRuler;
            }
        }
    }
    static parsePdfSettings(settings, result) {
        if (isDefined(settings.pdf)) {
            if (isDefined(settings.pdf.pdfDocument))
                result.pdf.pdfDocument = this.parseEventHandler(settings.pdf.pdfDocument);
            if (isDefined(settings.pdf.blobStream))
                result.pdf.blobStream = this.parseEventHandler(settings.pdf.blobStream);
            if (isDefined(settings.pdf.exportUrl))
                result.pdf.exportUrl = settings.pdf.exportUrl;
            if (isDefined(settings.pdf.pdfKitScriptUrl))
                result.pdf.pdfKitScriptUrl = settings.pdf.pdfKitScriptUrl;
            if (settings.pdf.convertImageToCompatibleFormat)
                result.pdf.convertImageToCompatibleFormat = convertToFunction(settings.pdf.convertImageToCompatibleFormat);
        }
    }
    static parseSearchSettings(settings, result, subDocumentCreator) {
        if (isDefined(settings.search)) {
            if (settings.search.filterInterval) {
                const func = convertToFunction(settings.search.filterInterval);
                result.search.filterInterval =
                    (subDocumentId, interval) => func(subDocumentCreator(subDocumentId), new IntervalApi(interval.start, interval.length));
            }
        }
    }
    static parseConfirmOnLosingChangesSettings(settings, result) {
        if (isDefined(settings.confirmOnLosingChanges)) {
            if (isDefined(settings.confirmOnLosingChanges.enabled))
                result.confirmOnLosingChanges.enabled = settings.confirmOnLosingChanges.enabled;
            if (isDefined(settings.confirmOnLosingChanges.message))
                result.confirmOnLosingChanges.message = settings.confirmOnLosingChanges.message;
        }
    }
    static parseContextMenuSettings(settings, result) {
        if (isDefined(settings.contextMenu)) {
            if (isDefined(settings.contextMenu.enabled))
                result.contextMenuSettings.enabled = settings.contextMenu.enabled;
            if (isDefined(settings.contextMenu.items))
                result.contextMenuSettings.items = settings.contextMenu.items;
        }
    }
    static parseMailMergeSettings(settings, result) {
        if (isDefined(settings.mailMerge)) {
            if (isDefined(settings.mailMerge.viewMergedData))
                result.mailMerge.viewMergedData = settings.mailMerge.viewMergedData;
            if (isDefined(settings.mailMerge.activeRecord))
                result.mailMerge.activeRecordIndex = settings.mailMerge.activeRecord;
            if (isDefined(settings.mailMerge.dataSource)) {
                const dataSource = DataSourceHelper.getDxDataSource(settings.mailMerge.dataSource);
                result.rawDataSource = settings.mailMerge.dataSource;
                result.dataSource = dataSource;
                dataSource.paginate(false);
                dataSource.requireTotalCount(true);
                dataSource.load()
                    .then(() => {
                    result.mailMerge.isEnabled = true;
                    result.mailMerge.allowInsertFields = true;
                    result.mailMerge.recordCount = result.dataSource.totalCount();
                })
                    .catch((e) => {
                    console.error(e.message);
                });
            }
        }
    }
    static parseSpellCheckSettings(settings, result) {
        if (isDefined(settings.spellCheck)) {
            if (isDefined(settings.spellCheck.enabled))
                result.spellCheck.isEnabled = settings.spellCheck.enabled;
            if (isDefined(settings.spellCheck.suggestionCount))
                result.spellCheck.suggestionCount = settings.spellCheck.suggestionCount;
            if (isDefined(settings.spellCheck.checkWordSpelling))
                result.spellCheck.checkWordSpelling = this.parseEventHandler(settings.spellCheck.checkWordSpelling);
            if (isDefined(settings.spellCheck.addWordToDictionary)) {
                result.spellCheck.addWordToDictionary = this.parseEventHandler(settings.spellCheck.addWordToDictionary);
                result.spellCheck.canAddWord = true;
            }
            else {
                result.spellCheck.canAddWord = false;
            }
        }
    }
    static parseEventHandlers(settings, result) {
        if (!settings)
            return;
        if (settings.selectionChanged)
            result.onSelectionChanged = this.parseEventHandler(settings.selectionChanged);
        if (settings.documentLoaded)
            result.onDocumentLoaded = this.parseEventHandler(settings.documentLoaded);
        if (settings.documentFormatted)
            result.onDocumentFormatted = this.parseEventHandler(settings.documentFormatted);
        if (settings.documentChanged)
            result.onDocumentChanged = this.parseEventHandler(settings.documentChanged);
        if (settings.activeSubDocumentChanged)
            result.onActiveSubDocumentChanged = this.parseEventHandler(settings.activeSubDocumentChanged);
        if (settings.gotFocus)
            result.onGotFocus = this.parseEventHandler(settings.gotFocus);
        if (settings.lostFocus)
            result.onLostFocus = this.parseEventHandler(settings.lostFocus);
        if (settings.hyperlinkClick)
            result.onHyperlinkClick = this.parseEventHandler(settings.hyperlinkClick);
        if (settings.pointerDown)
            result.onPointerDown = this.parseEventHandler(settings.pointerDown);
        if (settings.pointerUp)
            result.onPointerUp = this.parseEventHandler(settings.pointerUp);
        if (settings.keyDown)
            result.onKeyDown = this.parseEventHandler(settings.keyDown);
        if (settings.keyUp)
            result.onKeyUp = this.parseEventHandler(settings.keyUp);
        if (settings.calculateDocumentVariable)
            result.onCalculateDocumentVariable = this.parseEventHandler(settings.calculateDocumentVariable);
        if (settings.contentInserted)
            result.onContentInserted = this.parseEventHandler(settings.contentInserted);
        if (settings.contentRemoved)
            result.onContentRemoved = this.parseEventHandler(settings.contentRemoved);
        if (settings.characterPropertiesChanged)
            result.onCharacterPropertiesChanged = this.parseEventHandler(settings.characterPropertiesChanged);
        if (settings.paragraphPropertiesChanged)
            result.onParagraphPropertiesChanged = this.parseEventHandler(settings.paragraphPropertiesChanged);
        if (settings.autoCorrect)
            result.onAutoCorrect = this.parseEventHandler(settings.autoCorrect);
        if (settings.saving)
            result.onSaving = this.parseEventHandler(settings.saving);
        if (settings.saved)
            result.onSaved = this.parseEventHandler(settings.saved);
        if (settings.customCommandExecuted)
            result.onCustomCommandExecuted = this.parseEventHandler(settings.customCommandExecuted);
        if (settings.pdfExported)
            result.onPdfExported = this.parseEventHandler(settings.pdfExported);
        if (settings.pdfExporting)
            result.onPdfExporting = this.parseEventHandler(settings.pdfExporting);
        if (settings.commandStateChanged)
            result.onCommandStateChanged = this.parseEventHandler(settings.commandStateChanged);
        if (settings.calculateDocumentVariableAsync)
            result.onCalculateDocumentVariableAsync = this.parseEventHandler(settings.calculateDocumentVariableAsync);
        if (settings.contextMenuShowing)
            result.onContextMenuShowing = this.parseEventHandler(settings.contextMenuShowing);
    }
    static parseEventHandler(func) {
        return convertToFunction(func);
    }
}
export class ConfirmOnLosingChangesSettings {
    constructor() {
        this.enabled = true;
        this.message = formatMessage('ASPxRichEditStringId.ConfirmOnLosingChanges');
    }
}
