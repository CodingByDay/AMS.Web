import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { Bookmark, ConstBookmark } from '../../../bookmarks';
import { Chunk } from '../../../chunk';
import { Field, HyperlinkInfo } from '../../../fields/field';
import { Paragraph } from '../../../paragraph/paragraph';
import { RangePermission } from '../../../range-permissions';
import { RunType } from '../../../runs/run-type';
import { EndNoteRun, FieldCodeEndRun, FieldCodeStartRun, FieldResultEndRun, FootNoteRun, LayoutDependentRun, NoteContinuationSeparatorRun, NoteSeparatorRun, ParagraphRun, SectionRun } from '../../../runs/simple-runs';
import { JSONFieldProperty } from '../../enums/json-field-enums';
import { JSONParagraphProperty } from '../../enums/json-paragraph-enums';
import { JSONRunBaseProperty } from '../../enums/json-run-enums';
import { JSONBookmarkProperty, JSONChunkProperty, JSONEnumLoadPieceTable, JSONRangePermissionProperty } from '../../enums/json-sub-document-enums';
import { JSONTabConverter } from '../json-tab-converter';
import { JSONTableImporter } from '../table/json-table-importer';
import { AnchoredPictureRunImporter, AnchoredTextBoxRunImporter, InlinePictureRunImporter, InlineTextBoxRunImporter, SimpleRunImporter, TextRunImporter } from './run-importers';
export class JSONSubDocumentImporter {
    static importSubDocument(subDocument, documentProtectionSettings, content, imageCorrespondence) {
        JSONTableImporter.importTables(subDocument, content[JSONEnumLoadPieceTable.Tables]);
        JSONSubDocumentImporter.importFields(subDocument, content[JSONEnumLoadPieceTable.Fields]);
        JSONSubDocumentImporter.importBookmarks(subDocument, content[JSONEnumLoadPieceTable.Bookmarks]);
        JSONSubDocumentImporter.importParagraphs(subDocument, content[JSONEnumLoadPieceTable.Paragraphs]);
        JSONSubDocumentImporter.importChunks(subDocument, content[JSONEnumLoadPieceTable.Chunks], imageCorrespondence);
        JSONSubDocumentImporter.importRangePermissions(subDocument, documentProtectionSettings, content[JSONEnumLoadPieceTable.RangePermissions]);
    }
    static importFields(subDocument, jsonFields) {
        if (!jsonFields)
            return;
        for (var fieldIndex = 0, jsonField; jsonField = jsonFields[fieldIndex]; fieldIndex++) {
            let hyperlinkInfo = undefined;
            const uri = jsonField[JSONFieldProperty.Uri];
            const anchor = jsonField[JSONFieldProperty.Anchor];
            if (uri !== undefined || anchor !== undefined)
                hyperlinkInfo = new HyperlinkInfo(uri, anchor, jsonField[JSONFieldProperty.Tip], !!jsonField[JSONFieldProperty.Visited]);
            subDocument.fields.push(new Field(subDocument.positionManager, fieldIndex, jsonField[JSONFieldProperty.StartPos], jsonField[JSONFieldProperty.SeparatorPos], jsonField[JSONFieldProperty.EndPos], false, hyperlinkInfo));
        }
        subDocument.fields.sort((a, b) => a.getCodeStartPosition() - b.getCodeStartPosition());
        for (var fieldIndex = 0, field; field = subDocument.fields[fieldIndex]; fieldIndex++) {
            field.index = fieldIndex;
            field.initParent(subDocument.fields);
        }
    }
    static importBookmarks(subDocument, content) {
        if (!content)
            return;
        ListUtils.forEach(content, (jsonBookmark) => {
            const start = parseInt(jsonBookmark[JSONBookmarkProperty.StartPos]);
            const len = parseInt(jsonBookmark[JSONBookmarkProperty.Length]);
            const name = jsonBookmark[JSONBookmarkProperty.Name];
            subDocument.bookmarks.push(new Bookmark(subDocument.positionManager, new FixedInterval(start, len), name));
        });
        subDocument.bookmarks = subDocument.bookmarks.sort(ConstBookmark.comparer);
    }
    static importRangePermissions(subDocument, documentProtectionSettings, content) {
        if (!content)
            return;
        subDocument.availableRangePermissions =
            ListUtils.reducedMap(content, (jsonRangePermissions) => {
                const start = parseInt(jsonRangePermissions[JSONRangePermissionProperty.Start]);
                const len = parseInt(jsonRangePermissions[JSONRangePermissionProperty.Length]) + 1;
                const rangePermission = new RangePermission(subDocument.positionManager, new FixedInterval(start, len), jsonRangePermissions[JSONRangePermissionProperty.UserName], jsonRangePermissions[JSONRangePermissionProperty.Group]);
                return rangePermission.isGranted(documentProtectionSettings) ? rangePermission : null;
            });
    }
    static importParagraphs(subDocument, jsonParagraphs) {
        if (!jsonParagraphs)
            return;
        const paragraphs = subDocument.paragraphs;
        const parStyles = subDocument.documentModel.paragraphStyles;
        const positionManager = subDocument.positionManager;
        for (let jsonParagraph of jsonParagraphs) {
            const paragraph = new Paragraph(subDocument, positionManager.registerPosition(jsonParagraph[JSONParagraphProperty.LogPosition]), jsonParagraph[JSONParagraphProperty.Length], parStyles[jsonParagraph[JSONParagraphProperty.ParagraphStyleIndex]], null, jsonParagraph[JSONParagraphProperty.MaskedParagraphPropertiesIndex]);
            paragraph.numberingListIndex = jsonParagraph[JSONParagraphProperty.ListIndex];
            paragraph.listLevelIndex = jsonParagraph[JSONParagraphProperty.ListLevelIndex];
            paragraph.tabs.setTabs(JSONTabConverter.convertFromJSONToTabProperties(jsonParagraph[JSONParagraphProperty.Tabs]));
            paragraphs.push(paragraph);
        }
    }
    static importChunks(subDocument, jsonChunks, imageCorrespondence) {
        if (!jsonChunks)
            return;
        const charStyles = subDocument.documentModel.characterStyles;
        const imageCache = subDocument.documentModel.cache.imageCache;
        const maskedCharacterPropertiesCache = subDocument.documentModel.cache.maskedCharacterPropertiesCache;
        NumberMapUtils.forEach(JSONSubDocumentImporter.runTypeToRunImporter, run => run.init(maskedCharacterPropertiesCache, charStyles, imageCache, imageCorrespondence));
        const chunks = subDocument.chunks;
        const paragraphs = subDocument.paragraphs;
        const firstChunkPosition = jsonChunks[0][JSONChunkProperty.StartPos];
        let currParagraphIndex = SearchUtils.normedInterpolationIndexOf(paragraphs, (p) => p.startLogPosition.value, firstChunkPosition);
        let currParagraph = paragraphs[currParagraphIndex];
        let currParagraphEndPos = currParagraph.getEndPosition();
        for (let jsonChunk of jsonChunks) {
            const currChunkPosition = jsonChunk[JSONChunkProperty.StartPos];
            const chunk = new Chunk(subDocument.positionManager.registerPosition(currChunkPosition), jsonChunk[JSONChunkProperty.TextBuffer], !!jsonChunk[JSONChunkProperty.IsLast]);
            chunks.push(chunk);
            for (let jsonRun of jsonChunk[JSONChunkProperty.Runs]) {
                const runOffset = jsonRun[JSONRunBaseProperty.Offset];
                if (currChunkPosition + runOffset >= currParagraphEndPos) {
                    currParagraph = paragraphs[++currParagraphIndex];
                    currParagraphEndPos = currParagraph.getEndPosition();
                }
                chunk.textRuns.push(JSONSubDocumentImporter.runTypeToRunImporter[jsonRun[JSONRunBaseProperty.Type]]
                    .getRun(currParagraph, runOffset, jsonRun));
            }
        }
    }
}
JSONSubDocumentImporter.runTypeToRunImporter = {
    [RunType.TextRun]: new TextRunImporter(),
    [RunType.ParagraphRun]: new SimpleRunImporter(ParagraphRun),
    [RunType.SectionRun]: new SimpleRunImporter(SectionRun),
    [RunType.FieldCodeStartRun]: new SimpleRunImporter(FieldCodeStartRun),
    [RunType.FieldCodeEndRun]: new SimpleRunImporter(FieldCodeEndRun),
    [RunType.FieldResultEndRun]: new SimpleRunImporter(FieldResultEndRun),
    [RunType.AnchoredPictureRun]: new AnchoredPictureRunImporter(),
    [RunType.AnchoredTextBoxRun]: new AnchoredTextBoxRunImporter(),
    [RunType.InlinePictureRun]: new InlinePictureRunImporter(),
    [RunType.InlineTextBoxRun]: new InlineTextBoxRunImporter(),
    [RunType.LayoutDependentRun]: new SimpleRunImporter(LayoutDependentRun),
    [RunType.FootNoteRun]: new SimpleRunImporter(FootNoteRun),
    [RunType.EndNoteRun]: new SimpleRunImporter(EndNoteRun),
    [RunType.NoteSeparatorRun]: new SimpleRunImporter(NoteSeparatorRun),
    [RunType.NoteContinuationSeparatorRun]: new SimpleRunImporter(NoteContinuationSeparatorRun),
};
