import { FileNameHelper } from '../core/formats/file-name-helper';
import { FontCorrector } from '../core/model/creator/font-corrector';
import { updateFieldSequenceInfo } from '../core/model/fields/update-sequence-info';
import { CommandType } from '../core/model/json/command-type';
import { JSONDocumentModelProperty } from '../core/model/json/enums/json-document-enums';
import { JSONCheckSpellingCommand } from '../core/model/json/enums/json-general-enums';
import { JSONCachesDataProperty, JSONInitSessionProperty } from '../core/model/json/enums/json-top-level-enums';
import { JSONExporter } from '../core/model/json/exporters/json-exporter';
import { JSONNumberingListExporter } from '../core/model/json/exporters/json-numbering-list-exporter';
import { JSONFontInfoConverter } from '../core/model/json/importers/json-font-info-converter';
import { JSONImporter } from '../core/model/json/importers/json-importer';
import { JSONMaskedCharacterPropertiesConverter } from '../core/model/json/importers/json-masked-character-properties-converter';
import { JSONMaskedParagraphPropertiesConverter } from '../core/model/json/importers/json-masked-paragraph-properties-converter';
import { JSONStylesExporter } from '../core/model/json/importers/json-styles-exporter';
import { JSONListLevelPropertiesConverter } from '../core/model/json/importers/numbering-list/json-list-level-properties-converter';
import { ServerModelInserter } from '../core/model/json/importers/server-model-inserter';
import { JSONTableCellPropertiesConverter } from '../core/model/json/importers/table/json-table-cell-properties-converter';
import { JSONTableRowPropertiesConverter } from '../core/model/json/importers/table/json-table-row-properties-converter';
import { WebCachesExporter } from '../core/model/json/web-caches-exporter';
import { Base64Utils } from '@devexpress/utils/lib/utils/base64';
import { FileUtils } from '@devexpress/utils/lib/utils/file';
import { RichEditClientCommand } from './commands/client-command';
import { DownloadRequestType } from './commands/document/print-document-command';
import { DocumentInfo } from './rich-edit-core';
export class ServerDispatcherResponseProcessor {
    static processCommandResponce(dispatcher, commandType, isNewWorkSession, jsonServerParams, jsonCacheData) {
        var _a;
        const control = dispatcher.control;
        if (isNewWorkSession)
            ServerDispatcherResponseProcessor.processNewWorkSessionResponse(dispatcher, jsonServerParams);
        const model = control.modelManager.model;
        const docIsLoaded = model.isLoaded();
        const cachesExporter = new WebCachesExporter(model.cache, jsonCacheData, model);
        const isNewDocument = isNewWorkSession ? jsonServerParams[JSONInitSessionProperty.IsNewDocument] : false;
        switch (commandType) {
            case CommandType.StartCommand:
                JSONImporter.importOptions(model.options, jsonServerParams[JSONInitSessionProperty.Options]);
                break;
            case CommandType.SaveAsDocument:
            case CommandType.SaveDocument:
                dispatcher.processSaveResponse(jsonServerParams[JSONInitSessionProperty.HistoryId]);
                break;
            case CommandType.DelayedPrint:
                control.owner.sendDownloadRequest(DownloadRequestType.PrintCurrentDocument);
                break;
            case CommandType.LoadPicturesInfo:
                control.modelManager.modelManipulator.picture.loader.applyRequest(jsonServerParams);
                break;
            case CommandType.FieldUpdate:
                control.modelManager.modelManipulator.field.continueUpdateFields(control.modelManager.model, jsonServerParams);
                break;
            case CommandType.LoadFontInfo: {
                const newFontInfo = control.modelManager.modelManipulator.font.applyFontInfoLoadedOnPaste(control.measurer, jsonServerParams, jsonCacheData[JSONCachesDataProperty.FontInfoCache]);
                if (newFontInfo) {
                    const ribbonBar = control.barHolder.ribbon;
                    if (ribbonBar) {
                        const fontRibbonItem = (_a = ribbonBar.getItem) === null || _a === void 0 ? void 0 : _a.call(ribbonBar, RichEditClientCommand.ChangeFontName);
                        if (fontRibbonItem) {
                            const fontComboBox = fontRibbonItem.getEditor();
                            if (fontComboBox && !fontComboBox.FindItemByValue(newFontInfo.name))
                                fontComboBox.AddItem(newFontInfo.name, newFontInfo.name);
                        }
                    }
                }
                break;
            }
            case CommandType.CheckSpelling:
                control.spellChecker.processResponse(jsonServerParams[JSONCheckSpellingCommand.CheckedIntervals]);
                break;
            case CommandType.InsertRtf:
                control.commandManager.getCommand(RichEditClientCommand.InsertRtf).handleResponce(jsonServerParams);
                break;
            case CommandType.GetRtf:
                control.commandManager.getCommand(RichEditClientCommand.GetRtf).handleResponce(jsonServerParams);
                break;
            case CommandType.RequestModelAfterHibernation:
                ServerDispatcherResponseProcessor.processAfterHibernationResponce(dispatcher, cachesExporter);
                break;
            case CommandType.ForceSyncWithServer:
                control.commandManager.forceSyncWithServerCallbackManager.handleResponce(jsonServerParams);
                break;
            case CommandType.InsertContentFromServer:
                control.commandManager.insertContentFromServerRequestManager.handleResponce(control, jsonServerParams);
                break;
            case CommandType.DownloadMergedDocument:
                const base64 = jsonServerParams[JSONInitSessionProperty.Document];
                const format = jsonServerParams[JSONInitSessionProperty.DocumentFormat];
                FileUtils.startDownloadFileLocal(Base64Utils.getFileFromBase64(base64, '', {}), `MergedDocument${FileNameHelper.convertToString(format)}`);
                break;
        }
        if (isNewDocument) {
            ServerModelInserter.processNewDocumentResponse(model, null, jsonServerParams[JSONInitSessionProperty.Document]);
            model.stylesManager.initCharacterAndParagraphStyleGalleryItems();
        }
        cachesExporter.importSubDocuments(control.modelManager.modelManipulator.modelManager.richOptions.documentProtection, null);
        if (isNewDocument) {
            control.selection.beginUpdate();
            const selectionUpdated = control.selection.changeState((newState) => newState.setPosition(0).resetKeepX().setEndOfLine(false)
                .setPageIndex(-1).setSubDocument(control.modelManager.model.mainSubDocument));
            control.layoutFormatterManager.openDocument();
            control.layout.pageColor = model.getActualPageBackgroundColor();
            control.layoutFormatterManager.forceFormatPage(0);
            control.inputPosition.reset();
            control.barHolder.setEnabled(true);
            control.horizontalRulerControl.setEnable(true);
            control.selection.endUpdate();
            control.barHolder.forceUpdate();
            if (!selectionUpdated)
                control.selection.raiseSelectionChanged();
            control.spellChecker.check();
        }
        control.layoutFormatterManager.runFormattingAsync();
        if (!model.isLoaded()) {
        }
        else {
            if (docIsLoaded !== model.isLoaded()) {
                control.barHolder.updateItemsState();
                this.processDocumentLoaded(control);
            }
        }
        if (isNewDocument && !!jsonServerParams[JSONInitSessionProperty.InvalidDocument])
            control.commandManager.getCommand(RichEditClientCommand.ShowErrorInvalidDocumentFormat).execute(control.commandManager.isPublicApiCall);
        cachesExporter.dispose();
    }
    static processDocumentLoaded(control) {
        updateFieldSequenceInfo(control.modelManager, control.layoutFormatterManager, control.createFieldRequestManager());
        new FontCorrector(control.modelManager.modelManipulator, control.modelManager.model, control.modelManager.richOptions.fonts).correct();
        control.globalEventDispatcher.NotifyDocumentLoaded();
    }
    static processNewWorkSessionResponse(dispatcher, obj) {
        const sessionGuid = obj[JSONInitSessionProperty.SessionGuid];
        const format = obj[JSONInitSessionProperty.DocumentFormat];
        const documentInfo = new DocumentInfo(obj[JSONInitSessionProperty.FileName], obj[JSONInitSessionProperty.DocumentHasSource], format);
        if (!!obj[JSONInitSessionProperty.IsNewDocument])
            dispatcher.control.initialize(sessionGuid, documentInfo, obj[JSONInitSessionProperty.SubDocumentsCounter], null);
        else
            dispatcher.control.setWorkSession(sessionGuid, documentInfo, obj[JSONInitSessionProperty.LastExecutedEditCommandId]);
        dispatcher.editRequestID = obj[JSONInitSessionProperty.LastExecutedEditCommandId];
        dispatcher.wasModifiedOnServer = !!obj[JSONInitSessionProperty.IsModified];
    }
    static processAfterHibernationResponce(dispatcher, cachesExporter) {
        const control = dispatcher.control;
        let result = {};
        let jsonModel = {};
        jsonModel[JSONDocumentModelProperty.DocumentProperties] = JSONExporter.exportDocumentProperties(control.modelManager.model);
        jsonModel[JSONDocumentModelProperty.Styles] = JSONStylesExporter.exportStyles(control.modelManager.model);
        jsonModel[JSONDocumentModelProperty.Sections] = JSONExporter.exportSections(control.modelManager.model);
        jsonModel[JSONDocumentModelProperty.AbstractNumberingLists] =
            JSONNumberingListExporter.exportAbstractNumberingLists(control.modelManager.model);
        jsonModel[JSONDocumentModelProperty.NumberingLists] =
            JSONNumberingListExporter.exportNumberingLists(control.modelManager.model);
        jsonModel[JSONDocumentModelProperty.Headers] = JSONExporter.exportModelHeaderFooter(control.modelManager.model.headers);
        jsonModel[JSONDocumentModelProperty.Footers] = JSONExporter.exportModelHeaderFooter(control.modelManager.model.footers);
        jsonModel[JSONDocumentModelProperty.AbstractNumberingListTemplates] =
            JSONNumberingListExporter.exportAbstractNumberingListTemplates(control.modelManager.model);
        let jsonCaches = {};
        jsonCaches[JSONCachesDataProperty.CharacterPropertiesCache] =
            control.modelManager.model.cache.maskedCharacterPropertiesCache.convertToJSON(JSONMaskedCharacterPropertiesConverter.convertToJSON);
        jsonCaches[JSONCachesDataProperty.ParagraphPropertiesCache] =
            control.modelManager.model.cache.maskedParagraphPropertiesCache.convertToJSON(JSONMaskedParagraphPropertiesConverter.convertToJSON);
        jsonCaches[JSONCachesDataProperty.ListLevelPropertiesCache] =
            control.modelManager.model.cache.listLevelPropertiesCache.convertToJSON(JSONListLevelPropertiesConverter.convertToJSON);
        jsonCaches[JSONCachesDataProperty.TableRowPropertiesCache] =
            control.modelManager.model.cache.tableRowPropertiesCache.convertToJSON(JSONTableRowPropertiesConverter.convertToJSON);
        jsonCaches[JSONCachesDataProperty.TableCellPropertiesCache] =
            control.modelManager.model.cache.tableCellPropertiesCache.convertToJSON(JSONTableCellPropertiesConverter.convertToJSON);
        jsonCaches[JSONCachesDataProperty.SubDocuments] = cachesExporter.exportSubDocuments();
        jsonCaches[JSONCachesDataProperty.FontInfoCache] =
            control.modelManager.model.cache.fontInfoCache.convertToJSON(JSONFontInfoConverter.convertToJSON);
        result[JSONInitSessionProperty.Document] = jsonModel;
        result[JSONInitSessionProperty.Caches] = jsonCaches;
        result[JSONInitSessionProperty.Options] = JSONExporter.exportOptions(control.modelManager.richOptions.control);
        return result;
    }
}
