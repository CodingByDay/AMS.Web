import { MapCreator } from '../../../base-utils/map-creator';
import { FieldRequestManager, ServerUpdateFieldType } from '../../../core/model/fields/field-request-manager';
import { JSONUpdateFieldCommandResult } from '../../../core/model/json/enums/json-field-enums';
import { RangeCopy } from '../../../core/model/manipulators/range/create-range-copy-operation';
import { isDefined } from '@devexpress/utils/lib/utils/common';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { CalculateDocumentVariableAsyncEventArgs, DocumentVariableData } from '../../../document-processor/docvar-args';
import { DocumentProcessorBaseApi } from '../../../document-processor/public/processor';
import { convertToIntervalApi } from '../../../model-api/interval';
import { CalculateDocumentVariableEventArgs } from '../../public/events';
export class FieldClientRequestManagerOptions {
    constructor(dataSource, useAsyncVersion, raiseCalculateDocumentVariable, raiseCalculateDocumentVariableAnync) {
        this.dataSource = dataSource;
        this.useAsyncVersion = useAsyncVersion;
        this.raiseCalculateDocumentVariable = raiseCalculateDocumentVariable;
        this.raiseCalculateDocumentVariableAnync = raiseCalculateDocumentVariableAnync;
    }
}
export class FieldClientRequestManager extends FieldRequestManager {
    constructor(options) {
        super();
        this.lastActiveRecord = -1;
        this.options = options;
    }
    forceSendDelayedRequests() { }
    sendRequest(subDocument, activeRecord, _immediateSendRequest) {
        this.activeRecord = activeRecord;
        if (this.options.useAsyncVersion())
            this.asyncUpdate(subDocument);
        else
            this.syncUpdate(subDocument);
    }
    asyncUpdate(subDocument) {
        const result = new MapCreator();
        const updateData = [];
        let numReceivedResults = 0;
        NumberMapUtils.forEach(this.getSubDocumentData(subDocument), (reqData, fieldId) => {
            switch (reqData.serverUpdateFieldType) {
                case ServerUpdateFieldType.DocVariable: {
                    const docVarData = reqData;
                    const fieldData = new DocumentVariableData((value, keepLastParagraph) => {
                        if (result.getByKey(fieldId) !== undefined)
                            return;
                        numReceivedResults++;
                        result.add(fieldId, this.getDocumentVariableUpdateResult(subDocument.documentModel, docVarData.fieldName, value, keepLastParagraph));
                        if (numReceivedResults == updateData.length)
                            subDocument.fieldsWaitingForUpdate.update(result.get());
                    }, convertToIntervalApi(docVarData.fieldInterval), docVarData.fieldName, docVarData.parameters.map(p => p.text));
                    updateData.push(fieldData);
                    break;
                }
                case ServerUpdateFieldType.MergeField: {
                    const mergeFieldData = reqData;
                    const value = this.getRecordValue(mergeFieldData.fieldName);
                    result.add(fieldId, {
                        [JSONUpdateFieldCommandResult.SimpleText]: String(value)
                    });
                    break;
                }
            }
        });
        if (updateData.length) {
            setTimeout(() => {
                const args = new CalculateDocumentVariableAsyncEventArgs(updateData);
                this.options.raiseCalculateDocumentVariableAnync(args);
            }, 0);
        }
        else
            subDocument.fieldsWaitingForUpdate.update(result.get());
    }
    syncUpdate(subDocument) {
        const result = new MapCreator();
        NumberMapUtils.forEach(this.getSubDocumentData(subDocument), (reqData, fieldId) => {
            switch (reqData.serverUpdateFieldType) {
                case ServerUpdateFieldType.DocVariable: {
                    const docVarData = reqData;
                    const eventArg = new CalculateDocumentVariableEventArgs(convertToIntervalApi(docVarData.fieldInterval), docVarData.fieldName, docVarData.parameters.map(p => p.text));
                    this.options.raiseCalculateDocumentVariable(eventArg);
                    result.add(fieldId, this.getDocumentVariableUpdateResult(subDocument.documentModel, eventArg.variableName, eventArg.value, eventArg.keepLastParagraph));
                    break;
                }
                case ServerUpdateFieldType.MergeField: {
                    const mergeFieldData = reqData;
                    const value = this.getRecordValue(mergeFieldData.fieldName);
                    result.add(fieldId, {
                        [JSONUpdateFieldCommandResult.SimpleText]: String(value)
                    });
                    break;
                }
            }
        });
        subDocument.fieldsWaitingForUpdate.update(result.get());
    }
    getDocumentVariableUpdateResult(documentModel, name, value, keepLastParagraph) {
        const docVariables = documentModel.docVariables;
        if (!isDefined(value) && docVariables.contains(name))
            value = docVariables.getValue(name);
        if (value instanceof DocumentProcessorBaseApi) {
            const documentProcessor = value._processor;
            const rangeCopy = new RangeCopy(documentProcessor.modelManager.model, !keepLastParagraph, null, null, documentProcessor.modelManager.modelManipulator.picture.loader.sizeUpdater);
            return {
                [JSONUpdateFieldCommandResult.DocumentModel]: rangeCopy
            };
        }
        else
            return {
                [JSONUpdateFieldCommandResult.SimpleText]: value
            };
    }
    getRecordValue(fieldName) {
        const record = this.getRecord();
        const keys = Object.keys(record);
        for (let i = 0, key; key = keys[i]; i++)
            if (key.toLowerCase() == fieldName.toLowerCase())
                return record[key] + '';
        return '';
    }
    getRecord() {
        if (this.lastActiveRecord != this.activeRecord) {
            this.currentRecord = this.options.dataSource.items()[this.activeRecord];
            this.lastActiveRecord = this.activeRecord;
        }
        return this.currentRecord ? this.currentRecord : {};
    }
}
