export declare enum DocxNsType {
    DrawingMLPicture = 0,
    WordProcessing = 1,
    Wps = 2,
    MC = 3,
    W10ML = 4,
    DrawingML = 5,
    Rels = 6,
    VML = 7,
    WordProcessingDrawing = 8,
    WordProcessingDrawing14 = 9,
    Wpg = 10,
    Wpc = 11,
    CP = 12,
    DC = 13,
    DcTerms = 14,
    DcmiType = 15,
    VT = 16,
    Xsi = 17,
    Wp14 = 18,
    w14 = 19,
    w15 = 20,
    ContentTypes = 21,
    Office = 22,
    Xml = 23
}
export declare class NamespaceInfo {
    readonly prefix: string;
    namespace: string;
    constructor(prefix: string, namespace: string);
}
export declare class DocxConstants {
    static readonly wordNamespace = "http://schemas.microsoft.com/office/word";
    get wordProcessingNamespaceConst(): string;
    get relsNamespaceConst(): string;
    get officeNamespace(): string;
    get w14NamespaceConst(): string;
    get w15NamespaceConst(): string;
    get drawingMLNamespaceConst(): string;
    static readonly openXMLOfficeDocumentPrefix: string;
    static readonly strictOpenXMLOfficeDocumentPrefix: string;
    private static readonly drawingMLPicturePrefix;
    private static readonly drawingMLPictureNamespace;
    private static readonly wordProcessingPrefix;
    private static readonly wordProcessingNamespaceConst;
    private static readonly wpsPrefix;
    private static readonly wpsNamespace;
    private static readonly mcPrefix;
    private static readonly mcNamespace;
    private static readonly w10MLPrefix;
    private static readonly w10MLNamespace;
    private static readonly drawingMLPrefix;
    private static readonly drawingMLNamespace;
    private static readonly relsPrefix;
    private static readonly relationsNamespaceConst;
    private static readonly vmlPrefix;
    private static readonly vmlNamespace;
    private static readonly wordProcessingDrawingPrefix;
    private static readonly wordProcessingDrawingNamespaceConst;
    private static readonly wordProcessingDrawingPrefix14;
    private static readonly wordProcessingDrawing14Namespace;
    private static readonly wpgPrefix;
    private static readonly wpgNamespace;
    private static readonly wpcPrefix;
    private static readonly wpcNamespace;
    private static readonly cpPrefix;
    private static readonly cpNamespace;
    private static readonly dcPrefix;
    private static readonly dcNamespace;
    private static readonly dcTermsPrefix;
    private static readonly dcTermsNamespace;
    private static readonly dcmiTypePrefix;
    private static readonly dcmiTypeNamespace;
    private static readonly vtPrefix;
    private static readonly vtNamespace;
    private static readonly xsiPrefix;
    private static readonly xsiNamespace;
    private static readonly wp14Prefix;
    private static readonly wp14Namespace;
    private static readonly w14Prefix;
    private static readonly w14NamespaceConst;
    private static readonly w15Prefix;
    private static readonly w15NamespaceConst;
    private static readonly contentTypesPrefix;
    private static readonly contentTypesNamespace;
    private static readonly officeNamespacePrefix;
    private static readonly officeNamespace;
    private static readonly xmlPrefix;
    private static readonly xmlNamespace;
    readonly namespaces: Record<number, NamespaceInfo>;
    rels: DocxRelationsConstants;
    mapPrefixToNamespace: Record<string, string>;
    mapNamespaceToPrefix: Record<string, string>;
    strictMode: boolean;
    constructor();
    getNamespace(type: DocxNsType): string;
    setStrictOpenXml(): void;
    translateToStrict(namespace: string): string;
    lookupNamespaceByPrefix(prefix: string): string | null;
    private fillMaps;
}
export declare class DocxRelationsConstants {
    readonly customPropertiesNamespace: any;
    readonly officeDocumentType: any;
    readonly officeStylesType: any;
    readonly officeWebSettingsType: any;
    readonly officeNumberingType: any;
    readonly officeDocumentSettings: any;
    readonly officeHyperlinkType: any;
    readonly officeFootNoteType: any;
    readonly officeEndNoteType: any;
    readonly officeCommentType: any;
    readonly officeThemesType: any;
    readonly relsImage: any;
    readonly relsHeader: any;
    readonly relsFooter: any;
    readonly relsFootNote: any;
    readonly relsEndNote: any;
    readonly relsComment: any;
    readonly propertiesNamespace: any;
    readonly relsCommentsExtended: any;
    readonly officeCommentsExtendedType: any;
    readonly packageRelsNamespace: any;
    readonly corePropertiesNamespace: any;
    constructor(docPrefix: string);
}
export declare class ContentType {
    static readonly xml = "application/xml";
    static readonly relations = "application/vnd.openxmlformats-package.relationships+xml";
    static readonly theme = "application/vnd.openxmlformats-officedocument.theme+xml";
    static readonly header = "application/vnd.openxmlformats-officedocument.wordprocessingml.header+xml";
    static readonly footer = "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml";
    static readonly coreProperties = "application/vnd.openxmlformats-package.core-properties+xml";
    static readonly customProperties = "application/vnd.openxmlformats-officedocument.custom-properties+xml";
    static readonly document = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
    static readonly mainDocument = "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml";
    static readonly numbering = "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml";
    static readonly styles = "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml";
    static readonly settings = "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml";
}
//# sourceMappingURL=constants.d.ts.map