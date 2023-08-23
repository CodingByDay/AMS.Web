import { DocumentFormat } from '../../../core/document-format';
import { FileNameHelper } from '../../../core/formats/file-name-helper';
import { EditCommandRequest, LoadCommandRequest, RequestParams } from '../../../core/model/json/command-request';
import { CommandType } from '../../../core/model/json/command-type';
import { JSONInitSessionProperty } from '../../../core/model/json/enums/json-top-level-enums';
import { ControlOptions, DocumentCapability } from '../../../core/model/options/control';
import { DocumentInfo } from '../../rich-edit-core';
import { RichEditClientCommand } from '../client-command';
import { CommandSimpleOptions } from '../command-base';
import { SimpleCommandState } from '../command-states';
import { MailMergeExportRange } from './dialog-finish-and-merge-command';
import { DialogParametersBase, ShowDialogCommandBase } from './show-dialog-command-base';
export class DialogSaveFileCommand extends ShowDialogCommandBase {
    getState() {
        var state = new SimpleCommandState(this.isEnabled());
        state.visible = this.control.modelManager.richOptions.control.saveAs !== DocumentCapability.Hidden;
        return state;
    }
    createParameters(_options) {
        const documentInfo = this.control.documentInfo;
        const fileNameHelper = new FileNameHelper(documentInfo.fileName, false, documentInfo.documentFormat);
        var saveFileDialogParameters = new SaveFileDialogParameters();
        saveFileDialogParameters.fileName = fileNameHelper.name !== "" ? fileNameHelper.name : DocumentInfo.defaultDocumentName;
        saveFileDialogParameters.documentFormat = fileNameHelper.documentFormat != DocumentFormat.Undefined ?
            fileNameHelper.documentFormat : DocumentFormat.OpenXml;
        saveFileDialogParameters.folderPath = "";
        saveFileDialogParameters.fileSavedToServer = true;
        return saveFileDialogParameters;
    }
    executeCore(state, parameter) {
        if (this.control.owner.hasWorkDirectory)
            return super.executeCore(state, parameter);
        else
            return this.executeShowErrorMessageCommand();
    }
    applyParameters(_state, params) {
        if (params.fileSavedToServer) {
            const reqParams = {};
            reqParams[JSONInitSessionProperty.FileName] = params.fileName;
            reqParams[JSONInitSessionProperty.FolderPath] = params.folderPath;
            reqParams[JSONInitSessionProperty.DocumentFormat] = params.documentFormat;
            reqParams[JSONInitSessionProperty.HistoryId] = this.history.getCurrentItemId();
            this.control.serverDispatcher.pushRequest(new LoadCommandRequest(CommandType.SaveAsDocument, -1, reqParams), new RequestParams(true, true, true));
        }
        else
            return this.control.commandManager.getCommand(RichEditClientCommand.Download)
                .execute(this.control.commandManager.isPublicApiCall, new CommandSimpleOptions(this.control, params));
        return true;
    }
    getDialogName() {
        return "FileSaveAs";
    }
    executeShowErrorMessageCommand() {
        return this.control.commandManager.getCommand(RichEditClientCommand.ShowErrorOpeningAndOverstoreImpossibleMessageCommand).execute(this.control.commandManager.isPublicApiCall);
    }
    isEnabled() {
        return super.isEnabled() && ControlOptions.isEnabled(this.control.modelManager.richOptions.control.saveAs) &&
            this.control.modelManager.model.isLoaded();
    }
    isEnabledInReadOnlyMode() {
        return true;
    }
}
export class SaveFileDialogParameters extends DialogParametersBase {
    constructor() {
        super(...arguments);
        this.fileName = "";
        this.folderPath = "";
        this.documentFormat = DocumentFormat.Undefined;
        this.fileSavedToServer = true;
    }
    copyFrom(obj) {
        super.copyFrom(obj);
        this.fileName = obj.fileName;
        this.folderPath = obj.folderPath;
        this.documentFormat = obj.documentFormat;
        this.fileSavedToServer = obj.fileSavedToServer;
    }
    clone() {
        const newInstance = new SaveFileDialogParameters();
        newInstance.copyFrom(this);
        return newInstance;
    }
    applyConverter(_converter) {
        return this;
    }
}
export class DialogSaveMergedDocumentCommand extends DialogSaveFileCommand {
    createParameters(options) {
        const parameters = options.param;
        var saveFileDialogParameters = new SaveMergedDocumentDialogParameters();
        saveFileDialogParameters.fileName = "result";
        saveFileDialogParameters.documentFormat = DocumentFormat.OpenXml;
        saveFileDialogParameters.folderPath = "";
        saveFileDialogParameters.fileSavedToServer = true;
        saveFileDialogParameters.mergeMode = parameters.mergeMode;
        switch (parameters.range) {
            case MailMergeExportRange.AllRecords:
                saveFileDialogParameters.firstRecordIndex = 0;
                saveFileDialogParameters.lastRecordIndex = this.control.modelManager.richOptions.mailMerge.recordCount - 1;
                break;
            case MailMergeExportRange.CurrentRecord:
                saveFileDialogParameters.firstRecordIndex = this.control.modelManager.richOptions.mailMerge.activeRecordIndex;
                saveFileDialogParameters.lastRecordIndex = this.control.modelManager.richOptions.mailMerge.activeRecordIndex;
                break;
            case MailMergeExportRange.Range:
                saveFileDialogParameters.firstRecordIndex = parameters.exportFrom - 1;
                saveFileDialogParameters.lastRecordIndex = parameters.exportFrom + parameters.exportRecordsCount - 2;
                break;
        }
        return saveFileDialogParameters;
    }
    applyParameters(_state, params) {
        if (params.fileSavedToServer) {
            const reqParams = {};
            reqParams[JSONInitSessionProperty.FileName] = params.fileName;
            reqParams[JSONInitSessionProperty.FolderPath] = params.folderPath;
            reqParams[JSONInitSessionProperty.DocumentFormat] = params.documentFormat;
            reqParams[JSONInitSessionProperty.FirstRecordIndex] = params.firstRecordIndex;
            reqParams[JSONInitSessionProperty.LastRecordIndex] = params.lastRecordIndex;
            reqParams[JSONInitSessionProperty.MergeMode] = params.mergeMode;
            reqParams[JSONInitSessionProperty.HistoryId] = this.history.getCurrentItemId();
            this.control.serverDispatcher.pushRequest(new EditCommandRequest(CommandType.SaveMergedDocument, -1, reqParams), new RequestParams(true, true, true));
        }
        else {
            const request = new LoadCommandRequest(CommandType.DownloadMergedDocument, this.control.modelManager.model.mainSubDocument.id, {
                [JSONInitSessionProperty.DocumentFormat]: params.documentFormat,
                [JSONInitSessionProperty.FirstRecordIndex]: params.firstRecordIndex,
                [JSONInitSessionProperty.LastRecordIndex]: params.lastRecordIndex,
                [JSONInitSessionProperty.MergeMode]: params.mergeMode,
            });
            this.control.serverDispatcher.pushRequest(request, new RequestParams(false, true, true));
        }
        return true;
    }
}
export class SaveMergedDocumentDialogParameters extends SaveFileDialogParameters {
    copyFrom(obj) {
        super.copyFrom(obj);
        this.firstRecordIndex = obj.firstRecordIndex;
        this.lastRecordIndex = obj.lastRecordIndex;
        this.mergeMode = obj.mergeMode;
    }
    clone() {
        const newInstance = new SaveMergedDocumentDialogParameters();
        newInstance.copyFrom(this);
        return newInstance;
    }
    applyConverter(converter) {
        super.applyConverter(converter);
        return this;
    }
}
