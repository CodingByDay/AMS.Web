import { DocumentExporterOptions } from '../../core/formats/options';
export class RtfDocumentExporterOptions extends DocumentExporterOptions {
    constructor() {
        super();
        this.exportTheme = true;
        this.listExportFormat = RtfNumberingListExportFormat.RtfFormat;
        this.exportFinalParagraphMark = ExportFinalParagraphMark.Always;
        this.compatibility = new RtfDocumentExporterCompatibilityOptions();
        this.compatibility.backColorExportMode = RtfRunBackColorExportMode.Default;
        this.compatibility.duplicateObjectAsMetafile = false;
    }
}
export class RtfDocumentExporterCompatibilityOptions {
}
export var RtfNumberingListExportFormat;
(function (RtfNumberingListExportFormat) {
    RtfNumberingListExportFormat[RtfNumberingListExportFormat["PlainTextFormat"] = 0] = "PlainTextFormat";
    RtfNumberingListExportFormat[RtfNumberingListExportFormat["RtfFormat"] = 1] = "RtfFormat";
})(RtfNumberingListExportFormat || (RtfNumberingListExportFormat = {}));
export var ExportFinalParagraphMark;
(function (ExportFinalParagraphMark) {
    ExportFinalParagraphMark[ExportFinalParagraphMark["Always"] = 0] = "Always";
    ExportFinalParagraphMark[ExportFinalParagraphMark["Never"] = 1] = "Never";
    ExportFinalParagraphMark[ExportFinalParagraphMark["SelectedOnly"] = 2] = "SelectedOnly";
})(ExportFinalParagraphMark || (ExportFinalParagraphMark = {}));
export var RtfRunBackColorExportMode;
(function (RtfRunBackColorExportMode) {
    RtfRunBackColorExportMode[RtfRunBackColorExportMode["Default"] = 0] = "Default";
    RtfRunBackColorExportMode[RtfRunBackColorExportMode["Chcbpat"] = 1] = "Chcbpat";
    RtfRunBackColorExportMode[RtfRunBackColorExportMode["Highlight"] = 2] = "Highlight";
    RtfRunBackColorExportMode[RtfRunBackColorExportMode["Both"] = 3] = "Both";
})(RtfRunBackColorExportMode || (RtfRunBackColorExportMode = {}));
export var DocumentPropertyNames;
(function (DocumentPropertyNames) {
    DocumentPropertyNames[DocumentPropertyNames["None"] = 0] = "None";
    DocumentPropertyNames[DocumentPropertyNames["Category"] = 1] = "Category";
    DocumentPropertyNames[DocumentPropertyNames["ContentStatus"] = 2] = "ContentStatus";
    DocumentPropertyNames[DocumentPropertyNames["ContentType"] = 4] = "ContentType";
    DocumentPropertyNames[DocumentPropertyNames["Created"] = 8] = "Created";
    DocumentPropertyNames[DocumentPropertyNames["Creator"] = 16] = "Creator";
    DocumentPropertyNames[DocumentPropertyNames["Description"] = 32] = "Description";
    DocumentPropertyNames[DocumentPropertyNames["Identifier"] = 64] = "Identifier";
    DocumentPropertyNames[DocumentPropertyNames["Keywords"] = 128] = "Keywords";
    DocumentPropertyNames[DocumentPropertyNames["Language"] = 256] = "Language";
    DocumentPropertyNames[DocumentPropertyNames["LastModifiedBy"] = 512] = "LastModifiedBy";
    DocumentPropertyNames[DocumentPropertyNames["LastPrinted"] = 1024] = "LastPrinted";
    DocumentPropertyNames[DocumentPropertyNames["Modified"] = 2048] = "Modified";
    DocumentPropertyNames[DocumentPropertyNames["Revision"] = 4096] = "Revision";
    DocumentPropertyNames[DocumentPropertyNames["Subject"] = 8192] = "Subject";
    DocumentPropertyNames[DocumentPropertyNames["Title"] = 16384] = "Title";
    DocumentPropertyNames[DocumentPropertyNames["Version"] = 32768] = "Version";
    DocumentPropertyNames[DocumentPropertyNames["BuiltinProperties"] = 65535] = "BuiltinProperties";
    DocumentPropertyNames[DocumentPropertyNames["CustomProperties"] = 983040] = "CustomProperties";
    DocumentPropertyNames[DocumentPropertyNames["All"] = 1048575] = "All";
})(DocumentPropertyNames || (DocumentPropertyNames = {}));
