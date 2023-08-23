export var IsModified;
(function (IsModified) {
    IsModified[IsModified["False"] = 0] = "False";
    IsModified[IsModified["True"] = 1] = "True";
    IsModified[IsModified["SaveInProgress"] = 2] = "SaveInProgress";
})(IsModified || (IsModified = {}));
export var JSONResponseError;
(function (JSONResponseError) {
    JSONResponseError[JSONResponseError["NoErrors"] = 0] = "NoErrors";
    JSONResponseError[JSONResponseError["ModelIsChanged"] = 1] = "ModelIsChanged";
    JSONResponseError[JSONResponseError["InnerException"] = 2] = "InnerException";
    JSONResponseError[JSONResponseError["AuthException"] = 3] = "AuthException";
    JSONResponseError[JSONResponseError["CantSaveToAlreadyOpenedFile"] = 4] = "CantSaveToAlreadyOpenedFile";
    JSONResponseError[JSONResponseError["CantSaveDocument"] = 5] = "CantSaveDocument";
    JSONResponseError[JSONResponseError["CantOpenDocument"] = 6] = "CantOpenDocument";
    JSONResponseError[JSONResponseError["CalculateDocumentVariableException"] = 7] = "CalculateDocumentVariableException";
    JSONResponseError[JSONResponseError["PathTooLongException"] = 8] = "PathTooLongException";
    JSONResponseError[JSONResponseError["CantSaveToEmptyPath"] = 9] = "CantSaveToEmptyPath";
    JSONResponseError[JSONResponseError["InsertContentFromServerException"] = 10] = "InsertContentFromServerException";
    JSONResponseError[JSONResponseError["LoadPictureException"] = 11] = "LoadPictureException";
    JSONResponseError[JSONResponseError["SessionHasExpired"] = 12] = "SessionHasExpired";
})(JSONResponseError || (JSONResponseError = {}));
export var JSONCommandParametersProperty;
(function (JSONCommandParametersProperty) {
    JSONCommandParametersProperty[JSONCommandParametersProperty["CommandType"] = 0] = "CommandType";
    JSONCommandParametersProperty[JSONCommandParametersProperty["IncId"] = 1] = "IncId";
    JSONCommandParametersProperty[JSONCommandParametersProperty["ServerParams"] = 2] = "ServerParams";
    JSONCommandParametersProperty[JSONCommandParametersProperty["EditIncId"] = 3] = "EditIncId";
    JSONCommandParametersProperty[JSONCommandParametersProperty["SubDocumentId"] = 5] = "SubDocumentId";
    JSONCommandParametersProperty[JSONCommandParametersProperty["Caches"] = 6] = "Caches";
    JSONCommandParametersProperty[JSONCommandParametersProperty["IsNewWorkSession"] = 7] = "IsNewWorkSession";
})(JSONCommandParametersProperty || (JSONCommandParametersProperty = {}));
export var JSONPropertyStateBasedCommand;
(function (JSONPropertyStateBasedCommand) {
    JSONPropertyStateBasedCommand[JSONPropertyStateBasedCommand["State"] = 0] = "State";
    JSONPropertyStateBasedCommand[JSONPropertyStateBasedCommand["Property"] = 1] = "Property";
})(JSONPropertyStateBasedCommand || (JSONPropertyStateBasedCommand = {}));
export var JSONInitSessionProperty;
(function (JSONInitSessionProperty) {
    JSONInitSessionProperty[JSONInitSessionProperty["IsNewDocument"] = 0] = "IsNewDocument";
    JSONInitSessionProperty[JSONInitSessionProperty["SessionGuid"] = 1] = "SessionGuid";
    JSONInitSessionProperty[JSONInitSessionProperty["FileName"] = 2] = "FileName";
    JSONInitSessionProperty[JSONInitSessionProperty["LastExecutedEditCommandId"] = 3] = "LastExecutedEditCommandId";
    JSONInitSessionProperty[JSONInitSessionProperty["SubDocumentsCounter"] = 5] = "SubDocumentsCounter";
    JSONInitSessionProperty[JSONInitSessionProperty["IsModified"] = 6] = "IsModified";
    JSONInitSessionProperty[JSONInitSessionProperty["InvalidDocument"] = 7] = "InvalidDocument";
    JSONInitSessionProperty[JSONInitSessionProperty["Document"] = 8] = "Document";
    JSONInitSessionProperty[JSONInitSessionProperty["Caches"] = 9] = "Caches";
    JSONInitSessionProperty[JSONInitSessionProperty["Options"] = 10] = "Options";
    JSONInitSessionProperty[JSONInitSessionProperty["HistoryId"] = 11] = "HistoryId";
    JSONInitSessionProperty[JSONInitSessionProperty["Src"] = 12] = "Src";
    JSONInitSessionProperty[JSONInitSessionProperty["FolderPath"] = 13] = "FolderPath";
    JSONInitSessionProperty[JSONInitSessionProperty["DocumentFormat"] = 14] = "DocumentFormat";
    JSONInitSessionProperty[JSONInitSessionProperty["FirstRecordIndex"] = 15] = "FirstRecordIndex";
    JSONInitSessionProperty[JSONInitSessionProperty["LastRecordIndex"] = 16] = "LastRecordIndex";
    JSONInitSessionProperty[JSONInitSessionProperty["MergeMode"] = 17] = "MergeMode";
    JSONInitSessionProperty[JSONInitSessionProperty["DocumentHasSource"] = 18] = "DocumentHasSource";
})(JSONInitSessionProperty || (JSONInitSessionProperty = {}));
export var JSONResponceLevelProperty;
(function (JSONResponceLevelProperty) {
    JSONResponceLevelProperty[JSONResponceLevelProperty["ErrorCode"] = 0] = "ErrorCode";
    JSONResponceLevelProperty[JSONResponceLevelProperty["CommandsResults"] = 1] = "CommandsResults";
})(JSONResponceLevelProperty || (JSONResponceLevelProperty = {}));
export var JSONCachesDataProperty;
(function (JSONCachesDataProperty) {
    JSONCachesDataProperty[JSONCachesDataProperty["CharacterPropertiesCache"] = 0] = "CharacterPropertiesCache";
    JSONCachesDataProperty[JSONCachesDataProperty["ParagraphPropertiesCache"] = 1] = "ParagraphPropertiesCache";
    JSONCachesDataProperty[JSONCachesDataProperty["ListLevelPropertiesCache"] = 2] = "ListLevelPropertiesCache";
    JSONCachesDataProperty[JSONCachesDataProperty["TableRowPropertiesCache"] = 3] = "TableRowPropertiesCache";
    JSONCachesDataProperty[JSONCachesDataProperty["TableCellPropertiesCache"] = 4] = "TableCellPropertiesCache";
    JSONCachesDataProperty[JSONCachesDataProperty["SubDocuments"] = 5] = "SubDocuments";
    JSONCachesDataProperty[JSONCachesDataProperty["FontInfoCache"] = 6] = "FontInfoCache";
    JSONCachesDataProperty[JSONCachesDataProperty["ColorModelInfoCache"] = 7] = "ColorModelInfoCache";
    JSONCachesDataProperty[JSONCachesDataProperty["ShadingInfoCache"] = 8] = "ShadingInfoCache";
})(JSONCachesDataProperty || (JSONCachesDataProperty = {}));
export var JSONGetRtfCommand;
(function (JSONGetRtfCommand) {
    JSONGetRtfCommand[JSONGetRtfCommand["Position"] = 0] = "Position";
    JSONGetRtfCommand[JSONGetRtfCommand["Length"] = 1] = "Length";
    JSONGetRtfCommand[JSONGetRtfCommand["SubDocumentId"] = 2] = "SubDocumentId";
    JSONGetRtfCommand[JSONGetRtfCommand["ResultRtf"] = 3] = "ResultRtf";
    JSONGetRtfCommand[JSONGetRtfCommand["Id"] = 4] = "Id";
})(JSONGetRtfCommand || (JSONGetRtfCommand = {}));
export var JSONInsertRtfCommand;
(function (JSONInsertRtfCommand) {
    JSONInsertRtfCommand[JSONInsertRtfCommand["RtfText"] = 0] = "RtfText";
    JSONInsertRtfCommand[JSONInsertRtfCommand["Result"] = 1] = "Result";
    JSONInsertRtfCommand[JSONInsertRtfCommand["Id"] = 2] = "Id";
})(JSONInsertRtfCommand || (JSONInsertRtfCommand = {}));
