import { MapCreator } from '../../base-utils/map-creator';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
export var DocxNsType;
(function (DocxNsType) {
    DocxNsType[DocxNsType["DrawingMLPicture"] = 0] = "DrawingMLPicture";
    DocxNsType[DocxNsType["WordProcessing"] = 1] = "WordProcessing";
    DocxNsType[DocxNsType["Wps"] = 2] = "Wps";
    DocxNsType[DocxNsType["MC"] = 3] = "MC";
    DocxNsType[DocxNsType["W10ML"] = 4] = "W10ML";
    DocxNsType[DocxNsType["DrawingML"] = 5] = "DrawingML";
    DocxNsType[DocxNsType["Rels"] = 6] = "Rels";
    DocxNsType[DocxNsType["VML"] = 7] = "VML";
    DocxNsType[DocxNsType["WordProcessingDrawing"] = 8] = "WordProcessingDrawing";
    DocxNsType[DocxNsType["WordProcessingDrawing14"] = 9] = "WordProcessingDrawing14";
    DocxNsType[DocxNsType["Wpg"] = 10] = "Wpg";
    DocxNsType[DocxNsType["Wpc"] = 11] = "Wpc";
    DocxNsType[DocxNsType["CP"] = 12] = "CP";
    DocxNsType[DocxNsType["DC"] = 13] = "DC";
    DocxNsType[DocxNsType["DcTerms"] = 14] = "DcTerms";
    DocxNsType[DocxNsType["DcmiType"] = 15] = "DcmiType";
    DocxNsType[DocxNsType["VT"] = 16] = "VT";
    DocxNsType[DocxNsType["Xsi"] = 17] = "Xsi";
    DocxNsType[DocxNsType["Wp14"] = 18] = "Wp14";
    DocxNsType[DocxNsType["w14"] = 19] = "w14";
    DocxNsType[DocxNsType["w15"] = 20] = "w15";
    DocxNsType[DocxNsType["ContentTypes"] = 21] = "ContentTypes";
    DocxNsType[DocxNsType["Office"] = 22] = "Office";
    DocxNsType[DocxNsType["Xml"] = 23] = "Xml";
})(DocxNsType || (DocxNsType = {}));
export class NamespaceInfo {
    constructor(prefix, namespace) {
        this.prefix = prefix;
        this.namespace = namespace;
    }
}
export class DocxConstants {
    constructor() {
        this.namespaces = new MapCreator()
            .add(DocxNsType.DrawingMLPicture, new NamespaceInfo(DocxConstants.drawingMLPicturePrefix, DocxConstants.drawingMLPictureNamespace))
            .add(DocxNsType.WordProcessing, new NamespaceInfo(DocxConstants.wordProcessingPrefix, DocxConstants.wordProcessingNamespaceConst))
            .add(DocxNsType.Wps, new NamespaceInfo(DocxConstants.wpsPrefix, DocxConstants.wpsNamespace))
            .add(DocxNsType.MC, new NamespaceInfo(DocxConstants.mcPrefix, DocxConstants.mcNamespace))
            .add(DocxNsType.W10ML, new NamespaceInfo(DocxConstants.w10MLPrefix, DocxConstants.w10MLNamespace))
            .add(DocxNsType.DrawingML, new NamespaceInfo(DocxConstants.drawingMLPrefix, DocxConstants.drawingMLNamespace))
            .add(DocxNsType.Rels, new NamespaceInfo(DocxConstants.relsPrefix, DocxConstants.relationsNamespaceConst))
            .add(DocxNsType.VML, new NamespaceInfo(DocxConstants.vmlPrefix, DocxConstants.vmlNamespace))
            .add(DocxNsType.WordProcessingDrawing, new NamespaceInfo(DocxConstants.wordProcessingDrawingPrefix, DocxConstants.wordProcessingDrawingNamespaceConst))
            .add(DocxNsType.WordProcessingDrawing14, new NamespaceInfo(DocxConstants.wordProcessingDrawingPrefix14, DocxConstants.wordProcessingDrawing14Namespace))
            .add(DocxNsType.Wpg, new NamespaceInfo(DocxConstants.wpgPrefix, DocxConstants.wpgNamespace))
            .add(DocxNsType.Wpc, new NamespaceInfo(DocxConstants.wpcPrefix, DocxConstants.wpcNamespace))
            .add(DocxNsType.CP, new NamespaceInfo(DocxConstants.cpPrefix, DocxConstants.cpNamespace))
            .add(DocxNsType.DC, new NamespaceInfo(DocxConstants.dcPrefix, DocxConstants.dcNamespace))
            .add(DocxNsType.DcTerms, new NamespaceInfo(DocxConstants.dcTermsPrefix, DocxConstants.dcTermsNamespace))
            .add(DocxNsType.DcmiType, new NamespaceInfo(DocxConstants.dcmiTypePrefix, DocxConstants.dcmiTypeNamespace))
            .add(DocxNsType.VT, new NamespaceInfo(DocxConstants.vtPrefix, DocxConstants.vtNamespace))
            .add(DocxNsType.Xsi, new NamespaceInfo(DocxConstants.xsiPrefix, DocxConstants.xsiNamespace))
            .add(DocxNsType.Wp14, new NamespaceInfo(DocxConstants.wp14Prefix, DocxConstants.wp14Namespace))
            .add(DocxNsType.w14, new NamespaceInfo(DocxConstants.w14Prefix, DocxConstants.w14NamespaceConst))
            .add(DocxNsType.w15, new NamespaceInfo(DocxConstants.w15Prefix, DocxConstants.w15NamespaceConst))
            .add(DocxNsType.ContentTypes, new NamespaceInfo(DocxConstants.contentTypesPrefix, DocxConstants.contentTypesNamespace))
            .add(DocxNsType.Office, new NamespaceInfo(DocxConstants.officeNamespacePrefix, DocxConstants.officeNamespace))
            .add(DocxNsType.Xml, new NamespaceInfo(DocxConstants.xmlPrefix, DocxConstants.xmlNamespace))
            .get();
        this.strictMode = false;
        this.rels = new DocxRelationsConstants(DocxConstants.openXMLOfficeDocumentPrefix);
        this.fillMaps();
    }
    get wordProcessingNamespaceConst() { return this.namespaces[DocxNsType.WordProcessing].namespace; }
    get relsNamespaceConst() { return this.namespaces[DocxNsType.Rels].namespace; }
    get officeNamespace() { return this.namespaces[DocxNsType.Office].namespace; }
    get w14NamespaceConst() { return this.namespaces[DocxNsType.w14].namespace; }
    get w15NamespaceConst() { return this.namespaces[DocxNsType.w15].namespace; }
    get drawingMLNamespaceConst() { return this.namespaces[DocxNsType.DrawingML].namespace; }
    getNamespace(type) {
        return this.namespaces[type].namespace;
    }
    setStrictOpenXml() {
        this.strictMode = true;
        NumberMapUtils.forEach(this.namespaces, info => info.namespace = this.translateToStrict(info.namespace));
        this.namespaces[DocxNsType.WordProcessing].namespace = 'http://purl.oclc.org/ooxml/wordprocessingml/main';
        this.namespaces[DocxNsType.WordProcessingDrawing].namespace = 'http://purl.oclc.org/ooxml/drawingml/wordprocessingDrawing';
        this.namespaces[DocxNsType.Rels].namespace = 'http://purl.oclc.org/ooxml/officeDocument/relationships';
        this.rels = new DocxRelationsConstants(DocxConstants.strictOpenXMLOfficeDocumentPrefix);
        this.fillMaps();
    }
    translateToStrict(namespace) {
        return namespace.replace(DocxConstants.openXMLOfficeDocumentPrefix, DocxConstants.strictOpenXMLOfficeDocumentPrefix);
    }
    lookupNamespaceByPrefix(prefix) {
        const elem = this.mapPrefixToNamespace[prefix];
        return elem ? elem : null;
    }
    fillMaps() {
        this.mapNamespaceToPrefix = {};
        this.mapPrefixToNamespace = {};
        NumberMapUtils.forEach(this.namespaces, (nsInfo) => {
            this.mapNamespaceToPrefix[nsInfo.namespace] = nsInfo.prefix;
            this.mapPrefixToNamespace[nsInfo.prefix] = nsInfo.namespace;
        });
    }
}
DocxConstants.wordNamespace = 'http://schemas.microsoft.com/office/word';
DocxConstants.openXMLOfficeDocumentPrefix = 'http://schemas.openxmlformats.org/officeDocument/2006';
DocxConstants.strictOpenXMLOfficeDocumentPrefix = 'http://purl.oclc.org/ooxml/officeDocument';
DocxConstants.drawingMLPicturePrefix = 'pic';
DocxConstants.drawingMLPictureNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/picture';
DocxConstants.wordProcessingPrefix = 'w';
DocxConstants.wordProcessingNamespaceConst = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
DocxConstants.wpsPrefix = 'wps';
DocxConstants.wpsNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingShape';
DocxConstants.mcPrefix = 'mc';
DocxConstants.mcNamespace = 'http://schemas.openxmlformats.org/markup-compatibility/2006';
DocxConstants.w10MLPrefix = 'w10';
DocxConstants.w10MLNamespace = 'urn:schemas-microsoft-com:office:word';
DocxConstants.drawingMLPrefix = 'a';
DocxConstants.drawingMLNamespace = 'http://schemas.openxmlformats.org/drawingml/2006/main';
DocxConstants.relsPrefix = 'r';
DocxConstants.relationsNamespaceConst = DocxConstants.openXMLOfficeDocumentPrefix + '/relationships';
DocxConstants.vmlPrefix = 'v';
DocxConstants.vmlNamespace = 'urn:schemas-microsoft-com:vml';
DocxConstants.wordProcessingDrawingPrefix = 'wp';
DocxConstants.wordProcessingDrawingNamespaceConst = 'http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing';
DocxConstants.wordProcessingDrawingPrefix14 = 'wp14';
DocxConstants.wordProcessingDrawing14Namespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing';
DocxConstants.wpgPrefix = 'wpg';
DocxConstants.wpgNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingGroup';
DocxConstants.wpcPrefix = 'wpc';
DocxConstants.wpcNamespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingCanvas';
DocxConstants.cpPrefix = 'cp';
DocxConstants.cpNamespace = 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties';
DocxConstants.dcPrefix = 'dc';
DocxConstants.dcNamespace = 'http://purl.org/dc/elements/1.1/';
DocxConstants.dcTermsPrefix = 'dcterms';
DocxConstants.dcTermsNamespace = 'http://purl.org/dc/terms/';
DocxConstants.dcmiTypePrefix = 'dcmitype';
DocxConstants.dcmiTypeNamespace = 'http://purl.org/dc/dcmitype/';
DocxConstants.vtPrefix = 'vt';
DocxConstants.vtNamespace = DocxConstants.openXMLOfficeDocumentPrefix + '/docPropsVTypes';
DocxConstants.xsiPrefix = 'xsi';
DocxConstants.xsiNamespace = 'http://www.w3.org/2001/XMLSchema-instance';
DocxConstants.wp14Prefix = 'wp14';
DocxConstants.wp14Namespace = 'http://schemas.microsoft.com/office/word/2010/wordprocessingDrawing';
DocxConstants.w14Prefix = 'w14';
DocxConstants.w14NamespaceConst = 'http://schemas.microsoft.com/office/word/2010/wordml';
DocxConstants.w15Prefix = 'w15';
DocxConstants.w15NamespaceConst = 'http://schemas.microsoft.com/office/word/2012/wordml';
DocxConstants.contentTypesPrefix = '';
DocxConstants.contentTypesNamespace = 'http://schemas.openxmlformats.org/package/2006/content-types';
DocxConstants.officeNamespacePrefix = '';
DocxConstants.officeNamespace = 'urn:schemas-microsoft-com:office:office';
DocxConstants.xmlPrefix = 'xml';
DocxConstants.xmlNamespace = 'http://www.w3.org/XML/1998/namespace';
export class DocxRelationsConstants {
    constructor(docPrefix) {
        const officeDocumentRelationships = docPrefix + '/relationships/';
        this.customPropertiesNamespace = officeDocumentRelationships + 'custom-properties';
        this.officeDocumentType = officeDocumentRelationships + 'officeDocument';
        this.officeStylesType = officeDocumentRelationships + 'styles';
        this.officeWebSettingsType = officeDocumentRelationships + 'webSettings';
        this.officeNumberingType = officeDocumentRelationships + 'numbering';
        this.officeDocumentSettings = officeDocumentRelationships + 'settings';
        this.officeHyperlinkType = officeDocumentRelationships + 'hyperlink';
        this.officeFootNoteType = officeDocumentRelationships + 'footnotes';
        this.officeEndNoteType = officeDocumentRelationships + 'endnotes';
        this.officeCommentType = officeDocumentRelationships + 'comments';
        this.officeThemesType = officeDocumentRelationships + 'theme';
        this.relsImage = officeDocumentRelationships + 'image';
        this.relsHeader = officeDocumentRelationships + 'header';
        this.relsFooter = officeDocumentRelationships + 'footer';
        this.relsFootNote = officeDocumentRelationships + 'footnotes';
        this.relsEndNote = officeDocumentRelationships + 'endnotes';
        this.relsComment = officeDocumentRelationships + 'comments';
        this.propertiesNamespace = docPrefix + '/custom-properties';
        this.relsCommentsExtended = 'http://schemas.microsoft.com/office/2011/relationships/commentsExtended';
        this.officeCommentsExtendedType = 'http://schemas.microsoft.com/office/2011/relationships/commentsExtended';
        this.packageRelsNamespace = 'http://schemas.openxmlformats.org/package/2006/relationships';
        this.corePropertiesNamespace = 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties';
    }
}
export class ContentType {
}
ContentType.xml = 'application/xml';
ContentType.relations = 'application/vnd.openxmlformats-package.relationships+xml';
ContentType.theme = 'application/vnd.openxmlformats-officedocument.theme+xml';
ContentType.header = 'application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml';
ContentType.footer = 'application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml';
ContentType.coreProperties = 'application/vnd.openxmlformats-package.core-properties+xml';
ContentType.customProperties = 'application/vnd.openxmlformats-officedocument.custom-properties+xml';
ContentType.document = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
ContentType.mainDocument = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml';
ContentType.numbering = 'application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml';
ContentType.styles = 'application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml';
ContentType.settings = 'application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml';
