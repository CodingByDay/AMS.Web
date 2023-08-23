import { MapCreator } from '../../../../base-utils/map-creator';
import { ElementDestination } from '../destination';
import { ParagraphNumberingReferenceLevelDestination } from './paragraph-numbering-reference-level-destination';
import { ParagraphNumberingReferenceNumberingIdDestination } from './paragraph-numbering-reference-numbering-id-destination';
export class ParagraphNumberingReferenceDestination extends ElementDestination {
    constructor(data, paragraphPropertiesDestination) {
        super(data);
        this.paragraphPropertiesDestination = paragraphPropertiesDestination;
        this.paragraphPropertiesDestination.listLevelIndex = 0;
    }
    get listLevelIndex() { return this.paragraphPropertiesDestination.listLevelIndex; }
    set listLevelIndex(value) { this.paragraphPropertiesDestination.listLevelIndex = value; }
    get numberingId() { return this.paragraphPropertiesDestination.numberingId; }
    set numberingId(value) { this.paragraphPropertiesDestination.numberingId = value; }
    get elementHandlerTable() {
        return ParagraphNumberingReferenceDestination.handlerTable;
    }
    static getThis(data) {
        return data.destinationStack.getThis();
    }
}
ParagraphNumberingReferenceDestination.handlerTable = new MapCreator()
    .add('ilvl', (data) => new ParagraphNumberingReferenceLevelDestination(data, ParagraphNumberingReferenceDestination.getThis(data)))
    .add('numId', (data) => new ParagraphNumberingReferenceNumberingIdDestination(data, ParagraphNumberingReferenceDestination.getThis(data)))
    .get();
