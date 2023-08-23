import { MapCreator } from '../../../../base-utils/map-creator';
import { DocxNsType } from '../../../utils/constants';
import { RunPropertiesDestination } from '../character-properties/run-properties-destination';
import { ElementDestination } from '../destination';
import { DrawingDestination } from '../drawing/drawing-destination';
import { FieldCharDestination } from '../field/field-char-destination';
import { RangePermissionEndElementDestination } from '../range-permission/range-permission-end-element-destination';
import { RangePermissionStartElementDestination } from '../range-permission/range-permission-start-element-destination';
import { CarriageReturnDestination } from './carriage-return-destination';
import { CustomRunDestination } from './custom-run-destination';
import { DataContainerRunDestination } from './data-container-run-destination';
import { DeletedTextDestination } from './deleted-text-destination';
import { InlineObjectDestination } from './inline-object-destination';
import { InlinePictureDestination } from './inline-picture-destination';
import { RunBreakDestination } from './run-break-destination';
import { RunTabDestination } from './run-tab-destination';
import { SeparatorDestination } from './separator-destination';
import { SymbolDestination } from './symbol-destination';
import { TextDestination } from './text-destination';
export class RunDestination extends ElementDestination {
    constructor(data) {
        super(data);
        this.resetProperties();
    }
    resetProperties() {
        this.data.subDocumentInfo.characterImporter
            .resetProperties()
            .resetStyle();
    }
    get elementHandlerTable() {
        return RunDestination.handlerTable;
    }
    isChoiceNamespaceSupported(requeriesNamespaceUri) {
        const requeriesNamespaceUriLowerCase = requeriesNamespaceUri.toLowerCase();
        return requeriesNamespaceUriLowerCase == this.data.constants.namespaces[DocxNsType.Wps].namespace.toLowerCase() ||
            requeriesNamespaceUriLowerCase == this.data.constants.namespaces[DocxNsType.DrawingMLPicture].prefix.toLowerCase() ||
            requeriesNamespaceUriLowerCase == this.data.constants.namespaces[DocxNsType.Wpg].namespace.toLowerCase() ||
            requeriesNamespaceUriLowerCase == this.data.constants.namespaces[DocxNsType.Wpc].namespace.toLowerCase() ||
            super.isChoiceNamespaceSupported(requeriesNamespaceUri);
    }
}
RunDestination.handlerTable = new MapCreator()
    .add('r', (data) => new NestedRunDestination(data))
    .add('rPr', (data) => new RunPropertiesDestination(data, data.subDocumentInfo.characterImporter.properties))
    .add('t', (data) => new TextDestination(data))
    .add('noBreakHyphen', (data) => {
    data.subDocumentInfo.characterImporter.insertText('-');
    return null;
})
    .add('instrText', (data) => new TextDestination(data))
    .add('cr', (data) => new CarriageReturnDestination(data))
    .add('br', (data) => new RunBreakDestination(data))
    .add('tab', (data) => new RunTabDestination(data))
    .add('pict', (data) => new InlinePictureDestination(data))
    .add('object', (data) => new InlineObjectDestination(data))
    .add('fldChar', (data) => new FieldCharDestination(data))
    .add('drawing', (data) => new DrawingDestination(data))
    .add('footnoteRef', (_data) => null)
    .add('endnoteRef', (_data) => null)
    .add('commentReference', (_data) => null)
    .add('spr', (data) => new SeparatorDestination(data))
    .add('customObject', (data) => new CustomRunDestination(data))
    .add('dataContainer', (data) => new DataContainerRunDestination(data))
    .add('sym', (data) => new SymbolDestination(data))
    .add('delText', (data) => new DeletedTextDestination(data))
    .add('permStart', (data) => new RangePermissionStartElementDestination(data))
    .add('permEnd', (data) => new RangePermissionEndElementDestination(data))
    .get();
export class NestedRunDestination extends RunDestination {
    constructor(data) {
        super(data);
    }
    resetProperties() {
    }
}
