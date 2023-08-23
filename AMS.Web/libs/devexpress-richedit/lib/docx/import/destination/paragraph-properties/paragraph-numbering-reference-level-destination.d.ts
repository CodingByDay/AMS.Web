import { XmlReader } from '../../../zip/xml-reader';
import { Data } from '../../data';
import { LeafElementDestination } from '../destination';
import { ParagraphNumberingReferenceDestination } from './paragraph-numbering-reference-destination';
export declare class ParagraphNumberingReferenceLevelDestination extends LeafElementDestination {
    parentDestination: ParagraphNumberingReferenceDestination;
    constructor(data: Data, parentDestination: ParagraphNumberingReferenceDestination);
    processElementOpen(reader: XmlReader): Promise<void>;
}
//# sourceMappingURL=paragraph-numbering-reference-level-destination.d.ts.map