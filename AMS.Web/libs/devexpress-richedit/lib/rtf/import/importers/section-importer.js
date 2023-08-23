import { SectionRestorer } from '../../../core/formats/model-restorer/section-restorer';
import { Chunk } from '../../../core/model/chunk';
import { SubDocumentInfoType } from '../../../core/model/enums';
import { ParagraphPropertyDescriptor } from '../../../core/model/paragraph/paragraph-properties';
import { Section } from '../../../core/model/section/section';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { SectionPageFooterDestination } from '../destination/sub-document/section-page-footer-destination';
import { SectionPageHeaderDestination } from '../destination/sub-document/section-page-header-destination';
import { RtfSectionProperties } from '../model/section/rtf-section-properties';
import { RtfBaseImporter } from './importer-base';
export class RtfSectionImporter extends RtfBaseImporter {
    constructor(data) {
        super(data);
        this.defaultSectionProperties = new RtfSectionProperties();
    }
    get states() { return this.data.positionStates.last.sectionProperties; }
    get currentProperties() {
        if (!this.states.count)
            this.states.push(new RtfSectionProperties());
        return this.states.last;
    }
    insertSection() {
        const paragraphFormatting = this.data.importers.paragraph.paragraphFormatting;
        paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.lineSpacing, paragraphFormatting.calcLineSpacing());
        paragraphFormatting.coreProperties.setValue(ParagraphPropertyDescriptor.lineSpacingType, paragraphFormatting.calcLineSpacingType());
        const par = this.data.importers.paragraph.insertParagraph(true);
        this.data.importers.paragraph.applyParagraphFormatting(par, true);
        this.applySectionFormatting();
        const prevSect = ListUtils.last(this.documentModel.sections);
        this.setLastSectionLength(prevSect);
        const pos = this.documentModel.mainSubDocument.positionManager.registerPosition(prevSect.getEndPosition());
        this.documentModel.sections.push(new Section(this.documentModel, pos, 0, this.currentProperties.coreProperties));
    }
    setLastSectionLength(lastSec = ListUtils.last(this.documentModel.sections)) {
        lastSec.setLength(this.documentModel.mainSubDocument, this.data.importers.character.logPosition - lastSec.startLogPosition.value);
    }
    applySectionFormatting(skipNumbering = false) {
        const documentModel = this.data.documentModel;
        const sections = documentModel.sections;
        const section = ListUtils.last(sections);
        this.currentProperties.validatePaperKind();
        section.sectionProperties = this.currentProperties.coreProperties.clone();
        const paragraphFormatting = this.data.importers.paragraph.paragraphFormatting;
        const paragraph = this.data.importers.paragraph.paragraph;
        if (!skipNumbering && this.data.importers.paragraph.paragraphFormatting.numberingListIndex >= 0) {
            if (!paragraph.isInList())
                this.data.importers.numbering.addNumberingListToParagraph(paragraph, paragraphFormatting.paragraphListInfo);
        }
        const sectionFormatting = this.data.importers.section.currentProperties;
        if ((sections.length == 1 || sectionFormatting.restartPageNumbering) && !sectionFormatting.pageNumbering.continueNumbering) {
            section.sectionProperties.firstPageNumber = sectionFormatting.pageNumbering.firstPageNumber;
            section.sectionProperties.continueNumbering = false;
        }
        else {
            section.sectionProperties.firstPageNumber = -1;
            section.sectionProperties.continueNumbering = true;
        }
        section.sectionProperties.lineNumbering.copyFrom(sectionFormatting.lineNumbering);
    }
    insertHeaderFooter(isHeader, hfType) {
        const section = ListUtils.last(this.data.documentModel.sections);
        const subDocument = this.createSubDocument(isHeader ? SubDocumentInfoType.Header : SubDocumentInfoType.Footer, hfType);
        subDocument.chunks = [new Chunk(subDocument.positionManager.registerPosition(0), '', true)];
        this.data.destination = isHeader ?
            new SectionPageHeaderDestination(this.data, section, subDocument) :
            new SectionPageFooterDestination(this.data, section, subDocument);
    }
    createSubDocument(type, hfType) {
        const section = ListUtils.last(this.documentModel.sections);
        const createdSubDocument = this.documentModel.createSubDocument(type, -1, true);
        (type == SubDocumentInfoType.Header ?
            section.headers.setObjectIndex(hfType, this.documentModel.headers.push(createdSubDocument.info) - 1) :
            section.footers.setObjectIndex(hfType, this.documentModel.footers.push(createdSubDocument.info) - 1));
        return createdSubDocument;
    }
    pushState() {
        this.states.push(this.states.count ? this.currentProperties.clone() : new RtfSectionProperties());
    }
    popState() {
        if (this.states.count > 1)
            this.states.pop();
    }
    startImportSubDocument() {
        if (!this.subDocument.isMain())
            this.popState();
    }
    finalizeSubDocument() {
        if (this.subDocument.isMain())
            SectionRestorer.fixLastSection(this.data.documentModel);
    }
}
