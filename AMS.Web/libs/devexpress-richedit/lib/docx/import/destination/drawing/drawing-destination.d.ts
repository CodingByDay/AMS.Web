import { HyperlinkInfo } from '../../../../core/model/fields/field';
import { AnchorInfo } from '../../../../core/model/floating-objects/anchor-info';
import { AnchorTextBoxSize } from '../../../../core/model/floating-objects/sizes';
import { TextBoxProperties } from '../../../../core/model/floating-objects/text-box-properties';
import { NonVisualDrawingObjectInfo } from '../../../../core/model/manipulators/picture-manipulator/non-visual-drawing-object-info';
import { XmlReader } from '../../../zip/xml-reader';
import { Data } from '../../data';
import { FloatingObjectImportInfo } from '../../model/floating-object-import-info';
import { ElementDestination, ElementHandlerTable, LeafElementDestination } from '../destination';
import { BodyDestinationBase } from '../document/body-destination-base';
export declare class DrawingDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    get imageId(): number;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data);
    static onInline(data: Data, _reader: XmlReader): ElementDestination;
    static onAnchor(data: Data, _reader: XmlReader): ElementDestination;
    static getThis(data: Data): DrawingDestination;
    processElementClose(_reader: XmlReader): void;
}
export declare class DrawingInlineDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static getThis(data: Data): DrawingInlineDestination;
    static onExtent(data: Data, _reader: XmlReader): ElementDestination;
    static onGraphic(data: Data, _reader: XmlReader): ElementDestination;
    static onDocumentProperties(data: Data, _reader: XmlReader): ElementDestination;
    static onCNvGraphicFramePr(data: Data, _reader: XmlReader): ElementDestination;
}
export declare class DrawingAnchorDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    get floatingObject(): AnchorInfo;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    useSimplePosition: boolean;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static getThis(data: Data): DrawingAnchorDestination;
    static onExtent(data: Data, _reader: XmlReader): ElementDestination;
    static onGraphic(data: Data, _reader: XmlReader): ElementDestination;
    static onSimplePosition(data: Data, _reader: XmlReader): ElementDestination;
    static onAnchorHorizontalRelativeSize(data: Data, _reader: XmlReader): ElementDestination;
    static onAnchorVerticalRelativeSize(data: Data, _reader: XmlReader): ElementDestination;
    static onHorizontalPosition(data: Data, _reader: XmlReader): ElementDestination;
    static onVerticalPosition(data: Data, _reader: XmlReader): ElementDestination;
    static onWrapNone(data: Data, _reader: XmlReader): ElementDestination;
    static onWrapSquare(data: Data, _reader: XmlReader): ElementDestination;
    static onWrapThrough(data: Data, _reader: XmlReader): ElementDestination;
    static onWrapTight(data: Data, _reader: XmlReader): ElementDestination;
    static onWrapTopAndBottom(data: Data, _reader: XmlReader): ElementDestination;
    static onCNvGraphicFramePr(data: Data, _reader: XmlReader): ElementDestination;
    static onAnchorDocumentProperties(data: Data, _reader: XmlReader): ElementDestination;
    isChoiceNamespaceSupported(requeriesNamespaceUri: string): boolean;
    processElementOpen(reader: XmlReader): Promise<void>;
    convertEmuToDocumentUnits(value: number): number;
}
export declare class DrawingGraphicFramePropertyDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    size: AnchorTextBoxSize;
    constructor(data: Data, destination: DrawingAnchorDestination | DrawingInlineDestination);
    static getThis(data: Data): DrawingGraphicFramePropertyDestination;
    static onGraphicFrameLocks(data: Data, _reader: XmlReader): ElementDestination;
}
export declare class DrawingGraphicFrameLocksDestination extends LeafElementDestination {
    size: AnchorTextBoxSize;
    constructor(data: Data, anchorDestination: DrawingGraphicFramePropertyDestination);
    processElementOpen(reader: XmlReader): Promise<void>;
}
export declare class DrawingInlineExtentDestination extends LeafElementDestination {
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    processElementOpen(reader: XmlReader): Promise<void>;
}
export declare class DrawingAnchorDocumentPropertiesDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    nonVisualProperties: NonVisualDrawingObjectInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo, nonVisualProperties: NonVisualDrawingObjectInfo);
    static getThis(data: Data): DrawingAnchorDocumentPropertiesDestination;
    static onHyperlinkClick(data: Data, _reader: XmlReader): ElementDestination;
    processElementOpen(reader: XmlReader): Promise<void>;
}
export declare class HyperlinkClickDestination extends LeafElementDestination {
    hyperlinkInfo: HyperlinkInfo;
    constructor(data: Data, hyperlinkInfo: HyperlinkInfo);
    processElementOpen(reader: XmlReader): Promise<void>;
}
export declare class DrawingInlineGraphicDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static getThis(data: Data): DrawingInlineGraphicDestination;
    static onGraphicData(data: Data, _reader: XmlReader): ElementDestination;
}
export declare class DrawingInlineGraphicDataDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static getThis(data: Data): DrawingInlineGraphicDataDestination;
    static onPicture(data: Data, _reader: XmlReader): ElementDestination;
    static onWordProcessingShape(data: Data, _reader: XmlReader): ElementDestination;
    static onDrawingGroupShape(data: Data, _reader: XmlReader): ElementDestination;
}
export declare class DrawingGroupShapeDestination extends DrawingInlineGraphicDataDestination {
}
export declare class DrawingInlineGraphicDataPictureDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static getThis(data: Data): DrawingInlineGraphicDataPictureDestination;
    static onPictureNonVisualProperties(data: Data, _reader: XmlReader): ElementDestination;
    static onBlipFill(data: Data, _reader: XmlReader): ElementDestination;
    static onShapeProperties(data: Data, _reader: XmlReader): ElementDestination;
    protected static onAlternateContent(data: Data, _reader: XmlReader): ElementDestination;
    protected static onChoice(data: Data, _reader: XmlReader): ElementDestination;
    protected static onFallback(data: Data, _reader: XmlReader): ElementDestination;
}
export declare class PictureBlipFillDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static getThis(data: Data): PictureBlipFillDestination;
    static onBlip(data: Data, _reader: XmlReader): ElementDestination;
    static onSourceRect(data: Data, _reader: XmlReader): ElementDestination;
}
export declare class PictureBlipDestination extends LeafElementDestination {
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    processElementOpen(reader: XmlReader): Promise<void>;
}
export declare class SourceRectDestination extends LeafElementDestination {
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    processElementOpen(_reader: XmlReader): Promise<void>;
    getThousandthOfPercentValue(reader: XmlReader, attributeName: string, defaultValue: number): number;
    getPercentValue(value: string, defaultValue: number): number;
}
export declare class DrawingAnchorSimplePositionDestination extends LeafElementDestination {
    anchorDestination: DrawingAnchorDestination;
    constructor(data: Data, anchorDestination: DrawingAnchorDestination);
    processElementOpen(reader: XmlReader): Promise<void>;
}
export declare class WordProcessingShapeDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static getThis(data: Data): WordProcessingShapeDestination;
    static onTextBox(data: Data, _reader: XmlReader): ElementDestination;
    static onTextBoxProperties(data: Data, _reader: XmlReader): ElementDestination;
    static onNonVisualDrawingProperties(data: Data, _reader: XmlReader): ElementDestination;
    static onShapeProperties(data: Data, _reader: XmlReader): ElementDestination;
}
export declare class TextBoxDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    floatingObjectImportInfo: FloatingObjectImportInfo;
    constructor(data: Data, floatingObjectImportInfo: FloatingObjectImportInfo);
    static onTextBoxContent(data: Data, _reader: XmlReader): ElementDestination;
    processElementOpen(reader: XmlReader): Promise<void>;
    processElementClose(_reader: XmlReader): void;
    getMargins(strMargins: string): number[];
    getResizeShapeToFitText(style: string): boolean;
    getValidMarginValue(value: number, defaultValue: number): number;
    getFloatValue(numb: string): number;
}
export declare class TextBoxContentDestination extends BodyDestinationBase {
    static handlerTable: ElementHandlerTable;
    protected get elementHandlerTable(): ElementHandlerTable;
}
export declare class TextBoxPropertiesDestination extends ElementDestination {
    protected get elementHandlerTable(): ElementHandlerTable;
    static handlerTable: ElementHandlerTable;
    textBoxProperties: TextBoxProperties;
    constructor(data: Data, textBoxProperties: TextBoxProperties);
    static getThis(data: Data): TextBoxPropertiesDestination;
    static onDisableAutoFit(data: Data, _reader: XmlReader): ElementDestination;
    static onEnableAutoFit(data: Data, _reader: XmlReader): ElementDestination;
    processElementOpen(reader: XmlReader): Promise<void>;
}
export declare class GraphicFrameDestination extends LeafElementDestination {
    size: AnchorTextBoxSize;
    constructor(data: Data, size: AnchorTextBoxSize);
    processElementOpen(reader: XmlReader): Promise<void>;
}
//# sourceMappingURL=drawing-destination.d.ts.map