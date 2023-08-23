import { MapCreator } from '../../../../base-utils/map-creator';
import { CrossExistingIterator } from '../../../../core/formats/utils/cross-existing-iterator';
import { Field } from '../../../../core/model/fields/field';
import { ModelIterator } from '../../../../core/model/model-iterator';
import { RunType } from '../../../../core/model/runs/run-type';
import { Stack } from '@devexpress/utils/lib/class/stack';
import { BoundaryInterval } from '@devexpress/utils/lib/intervals/boundary';
import { Comparers } from '@devexpress/utils/lib/utils/comparers';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { DocxNsType } from '../../../utils/constants';
import { AnchoredDrawingPictureObject, AnchoredDrawingTextObject, InlineDrawingObject } from '../../utils/inline-drawing-object';
import { ExporterBaseWithRootElement } from '../base';
import { DrawingExporter } from '../base/drawing';
import { TableExporter } from '../base/table/table';
export class BaseSubDocumentExporter extends ExporterBaseWithRootElement {
    constructor(data, subDocument, filePath) {
        super(data);
        this.fieldCodeDepth = 0;
        this.paragraph = null;
        this.firstIteration = true;
        this.predefinedGroupNames = new MapCreator()
            .add("Everyone", "everyone")
            .add("Current User", "current")
            .add("Editors", "editors")
            .add("Owners", "owners")
            .add("Contributors", "contributors")
            .add("Administrators", "administrators")
            .get();
        this.subDocument = subDocument;
        this._filePath = filePath;
        this.hyperlinkRelationsTable = {};
        this.fieldsStack = new Stack();
        this.runHandlerMap = {
            [RunType.TextRun]: this.textRunHandler,
            [RunType.ParagraphRun]: this.paragraphRunHandler,
            [RunType.SectionRun]: this.sectionRunHandler,
            [RunType.FieldCodeStartRun]: this.fieldCodeStartRunHandler,
            [RunType.FieldCodeEndRun]: this.fieldCodeEndRunHandler,
            [RunType.FieldResultEndRun]: this.fieldResultEndRunHandler,
            [RunType.AnchoredPictureRun]: this.anchoredPictureRunHandler,
            [RunType.AnchoredTextBoxRun]: this.anchoredTextRunHandler,
            [RunType.InlinePictureRun]: this.inlinePictureRunHandler,
            [RunType.InlineTextBoxRun]: null,
            [RunType.LayoutDependentRun]: this.layoutDependentRunHandler,
        };
        this.tableExporter = new TableExporter(this.data);
    }
    get filePath() { return this._filePath; }
    get rootNSPrefix() { return this.data.constants.namespaces[DocxNsType.WordProcessing].prefix; }
    get rootNSValue() { return this.data.constants.namespaces[DocxNsType.WordProcessing].namespace; }
    fillWriter() {
        this.data.subDocumentExporterStack.push(this);
        this.registerNamespaces();
        this.data.pushRelationExporter(this.createRelationExporter());
        this.fillWriterCore();
        if (!this.subDocument.isMain())
            this.data.popRelationExporter();
        this.data.subDocumentExporterStack.pop();
    }
    init() {
        this.modelIterator = new ModelIterator(this.subDocument, false);
        this.modelIterator.setPosition(0);
        this.tableExporter.init();
        this.bookmarksIterator = new CrossExistingIterator(this.subDocument.bookmarks);
        this.bookmarksIterator.init();
        this.rangePermisiionsIterator = new CrossExistingIterator(this.subDocument.rangePermissions);
        this.rangePermisiionsIterator.init();
    }
    endParagraph(pos, section, allowInitNextParagraph) {
        if (this.paragraph)
            this.writer.endElement();
        this.tableExporter.checkTable(pos, allowInitNextParagraph);
        if (allowInitNextParagraph) {
            this.paragraph = this.modelIterator.run.paragraph;
            this.writer.writeWpStartElement('p');
            this.data.parPropsExporter.exportParagraphProperties(this.subDocument, section, this.paragraph, this.getCurrentParagraphRun());
        }
    }
    getCurrentParagraphRun() {
        if (!this.modelIterator.run)
            return null;
        if (this.modelIterator.run.isParagraphOrSectionRun())
            return this.run;
        return this.subDocument.getRunByPosition(this.run.paragraph.interval.end - 1);
    }
    exportSection(section, sectionInterval) {
        const thingEndPos = sectionInterval.end;
        for (; this.firstIteration || this.modelIterator.moveToNextChar(); this.firstIteration = false) {
            if (this.run != this.modelIterator.run) {
                this.run = this.modelIterator.run;
                this.runText = this.modelIterator.getRunText();
                this.runStartCharOffset = 0;
            }
            const pos = this.modelIterator.getAbsolutePosition();
            if (!this.paragraph || pos >= this.paragraph.getEndPosition()) {
                if (pos == thingEndPos)
                    break;
                this.endParagraph(pos, section, true);
            }
            if (this.bookmarksIterator.update(pos)) {
                this.exportRun(new BoundaryInterval(this.runStartCharOffset, this.modelIterator.charOffset));
                this.exportBookmark(this.bookmarksIterator);
            }
            if (this.rangePermisiionsIterator.update(pos)) {
                this.exportRun(new BoundaryInterval(this.runStartCharOffset, this.modelIterator.charOffset));
                this.exportRangePermission(this.rangePermisiionsIterator);
            }
            if (this.modelIterator.charOffset + 1 == this.run.getLength())
                this.exportRun(new BoundaryInterval(this.runStartCharOffset, this.run.getLength()));
        }
        if (this.bookmarksIterator.update(thingEndPos))
            this.exportBookmark(this.bookmarksIterator);
        if (this.rangePermisiionsIterator.update(thingEndPos))
            this.exportRangePermission(this.rangePermisiionsIterator);
        this.endParagraph(thingEndPos, section, false);
        this.paragraph = null;
        this.firstIteration = true;
    }
    registerNamespaces() {
        this.ignorableNamespaces = [];
        this.registerDefaultNamespaces();
        this.registerIgnorableNamespaces();
    }
    registerDefaultNamespaces() {
        this.registerNamespace(DocxNsType.WordProcessing, false);
        this.registerNamespace(DocxNsType.Wps, false);
        this.registerNamespace(DocxNsType.MC, false);
        this.registerNamespace(DocxNsType.W10ML, false);
        this.registerNamespace(DocxNsType.VML, false);
        this.registerNamespace(DocxNsType.Wpg, false);
        this.registerNamespace(DocxNsType.Wpc, false);
        this.registerNamespace(DocxNsType.Rels, false);
        this.registerNamespace(DocxNsType.DrawingML, false);
        this.registerNamespace(DocxNsType.DrawingMLPicture, false);
        this.registerNamespace(DocxNsType.WordProcessingDrawing, false);
        this.registerNamespace(DocxNsType.WordProcessingDrawing14, true);
    }
    registerNamespace(type, ignorable) {
        this.writer.addNamespaceToRootElement(type);
        if (ignorable)
            this.ignorableNamespaces.push(this.data.constants.namespaces[type].prefix);
    }
    registerIgnorableNamespaces() {
        if (this.ignorableNamespaces.length) {
            this.writer.attrNS(DocxNsType.MC, 'Ignorable', ListUtils.unique(this.ignorableNamespaces, Comparers.string, (a, b) => a == b ? 0 : 1).join(' '));
        }
        this.ignorableNamespaces = [];
    }
    exportRun(charInterval) {
        if (charInterval.length) {
            const handler = this.runHandlerMap[this.run.getType()];
            if (handler) {
                this.absRunStartPosition = this.modelIterator.getAbsoluteRunPosition();
                handler.call(this, this.runText.substring(charInterval.start, charInterval.end));
            }
        }
        this.runStartCharOffset = charInterval.end;
    }
    textRunHandler(runText) {
        this.writer.writeWpStartElement('r');
        this.data.charPropsExporter.exportRunProperties(this.run);
        this.data.textExporter.exportTextRunCore(runText);
        this.writer.endElement();
    }
    paragraphRunHandler() {
    }
    sectionRunHandler() {
    }
    fieldCodeStartRunHandler() {
        this.fieldsStack.push(this.subDocument.fields[Field.binaryIndexOf(this.subDocument.fields, this.absRunStartPosition + 1)]);
        this.exportFieldChar('begin', true);
        this.fieldCodeDepth++;
    }
    fieldCodeEndRunHandler() {
        this.exportFieldChar('separate', false);
        this.fieldCodeDepth--;
    }
    fieldResultEndRunHandler() {
        this.exportFieldChar('end', false);
        this.fieldsStack.pop();
    }
    shouldExportPicture(cacheInfo) {
        return cacheInfo.isLoaded || cacheInfo.imageUrl;
    }
    anchoredPictureRunHandler() {
        this.writer.writeWpStartElement('r');
        this.data.charPropsExporter.exportRunProperties(this.run);
        const picRun = this.run;
        if (this.shouldExportPicture(picRun.cacheInfo))
            new DrawingExporter(this.data).writeFloatingObjectDrawing(new AnchoredDrawingPictureObject(picRun), picRun.cacheInfo.currId);
        this.writer.endElement();
    }
    anchoredTextRunHandler() {
        this.writer.writeWpStartElement('r');
        this.data.charPropsExporter.exportRunProperties(this.run);
        const textBoxRun = this.run;
        new DrawingExporter(this.data).writeFloatingObjectTextBoxContent2010(new AnchoredDrawingTextObject(textBoxRun), this.data.model.subDocuments[textBoxRun.subDocId]);
        this.writer.endElement();
    }
    inlinePictureRunHandler() {
        this.writer.writeWpStartElement('r');
        this.data.charPropsExporter.exportRunProperties(this.run);
        const picRun = this.run;
        if (this.shouldExportPicture(picRun.cacheInfo))
            new DrawingExporter(this.data).writeFloatingObjectDrawing(new InlineDrawingObject(picRun), picRun.cacheInfo.currId);
        this.writer.endElement();
    }
    layoutDependentRunHandler() {
    }
    exportBookmark(bookmarksIterator) {
        for (const state of bookmarksIterator.addedObjects) {
            this.writer.writeWpStartElement('bookmarkStart');
            this.writer.writeWpIntAttr('id', state.index);
            this.writer.writeWpStringAttr('name', state.object.name);
            this.writer.endElement();
        }
        for (const state of bookmarksIterator.deletedObjects) {
            this.writer.writeWpStartElement('bookmarkEnd');
            this.writer.writeWpIntAttr('id', state.index);
            this.writer.endElement();
        }
    }
    exportRangePermission(permissionsIterator) {
        for (const state of permissionsIterator.addedObjects) {
            this.writer.writeWpStartElement('permStart');
            this.writer.writeWpIntAttr('id', state.index);
            if (!StringUtils.isNullOrEmpty(state.object.userName))
                this.writer.writeWpStringAttr('ed', state.object.userName);
            if (!StringUtils.isNullOrEmpty(state.object.group))
                this.writer.writeWpStringAttr('edGrp', this.getGroupName(state.object.group));
            this.writer.endElement();
        }
        for (const state of permissionsIterator.deletedObjects) {
            this.writer.writeWpStartElement('permEnd');
            this.writer.writeWpIntAttr('id', state.index);
            this.writer.endElement();
        }
    }
    getGroupName(groupName) {
        const result = this.predefinedGroupNames[groupName];
        return result ? result : groupName;
    }
    exportFieldChar(fieldCharType, fieldStart) {
        this.writer.writeWpStartElement('r');
        this.data.charPropsExporter.exportRunProperties(this.run);
        this.writer.writeWpStartElement('fldChar');
        this.writer.writeWpStringAttr('fldCharType', fieldCharType);
        const field = this.fieldsStack.last;
        if (fieldStart && field.disableUpdate)
            this.writer.writeWpBoolAttr('disableUpdate', true);
        if (fieldStart && field.locked)
            this.writer.writeWpBoolAttr('fldLock', true);
        if (fieldStart && field.hideByParent)
            this.writeHideByParent();
        this.writer.endElement();
        this.writer.endElement();
    }
    writeHideByParent() {
    }
}
