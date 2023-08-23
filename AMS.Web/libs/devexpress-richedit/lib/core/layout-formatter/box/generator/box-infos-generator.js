import { CharacterPropertiesMask } from '../../../model/character/enums';
import { CharacterPropertiesMerger } from '../../../model/properties-merger/character-properties-merger';
import { CharacterStyle } from '../../../model/character/character-style';
import { Flag } from '@devexpress/utils/lib/class/flag';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { Errors } from '@devexpress/utils/lib/errors';
import { Point } from '@devexpress/utils/lib/geometry/point';
import { EnumUtils } from '@devexpress/utils/lib/utils/enum';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { LayoutAnchoredPictureBox } from '../../../layout/main-structures/layout-boxes/layout-anchored-picture-box';
import { LayoutAnchoredTextBox } from '../../../layout/main-structures/layout-boxes/layout-anchored-text-box';
import { LayoutBox, LayoutBoxType } from '../../../layout/main-structures/layout-boxes/layout-box';
import { LayoutColumnBreakBox } from '../../../layout/main-structures/layout-boxes/layout-column-break-box';
import { LayoutDashBox } from '../../../layout/main-structures/layout-boxes/layout-dash-box';
import { LayoutDependentBoxType, LayoutDependentTextBox } from '../../../layout/main-structures/layout-boxes/layout-dependent-text-box';
import { LayoutFieldCodeEndBox } from '../../../layout/main-structures/layout-boxes/layout-field-code-end-box';
import { LayoutFieldCodeStartBox } from '../../../layout/main-structures/layout-boxes/layout-field-code-start-box';
import { LayoutFieldResultEndBox } from '../../../layout/main-structures/layout-boxes/layout-field-result-end-box';
import { LayoutLineBreakBox } from '../../../layout/main-structures/layout-boxes/layout-line-break-box';
import { LayoutNonBreakingSpaceBox } from '../../../layout/main-structures/layout-boxes/layout-non-breaking-space-box';
import { LayoutPageBreakBox } from '../../../layout/main-structures/layout-boxes/layout-page-break-box';
import { LayoutParagraphMarkBox } from '../../../layout/main-structures/layout-boxes/layout-paragraph-mark-box';
import { LayoutPictureBox } from '../../../layout/main-structures/layout-boxes/layout-picture-box';
import { LayoutSectionMarkBox } from '../../../layout/main-structures/layout-boxes/layout-section-mark-box';
import { LayoutSpaceBox } from '../../../layout/main-structures/layout-boxes/layout-space-box';
import { LayoutTabSpaceBoxJustForBoxIterator } from '../../../layout/main-structures/layout-boxes/layout-tab-space-box';
import { LayoutTextBox } from '../../../layout/main-structures/layout-boxes/layout-text-box';
import { ModelIterator } from '../../../model/model-iterator';
import { BookmarksVisibility } from '../../../model/options/bookmarks';
import { RichUtils } from '../../../model/rich-utils';
import { RunType } from '../../../model/runs/run-type';
import { TableCellMergingState } from '../../../model/tables/secondary-structures/table-base-structures';
import { AnchoredTextBoxContextSizeCalculator } from '../../floating/anchored-objects-manager';
import { BoxBracketsType } from '../../row/result';
import { BracketInfo } from '../box-iterator';
import { BoxWrap, BoxWrapInfo } from '../box-wrap';
import { BoxWrapsHolder, IteratorFlags } from '../box-wraps-holder';
import { ParagraphIterator, SectionIterator } from './one-dimension-itertors';
import { FieldIterator, TableIterator } from './recursive-objects-iterators';
import { ColorModelInfo } from '../../../model/color/color-model-info';
import { ColorUtils } from '@devexpress/utils/lib/utils/color';
export class BoxGenerator {
    constructor(manager, boxesHolder) {
        this.positionFromStartGenerate = -1;
        this.waitForMoreChunks = false;
        if (!BoxGenerator.modelCharToLayoutBoxConverter) {
            BoxGenerator.modelCharToLayoutBoxConverter = {
                [RichUtils.specialCharacters.LineBreak]: function (charProp, colorProvider) { return new LayoutLineBreakBox(charProp, charProp.getLayoutColorInfo(colorProvider)); },
                [RichUtils.specialCharacters.Space]: function (charProp, colorProvider) { return new LayoutSpaceBox(charProp, charProp.getLayoutColorInfo(colorProvider)); },
                [RichUtils.specialCharacters.TabMark]: function (charProp, colorProvider) { return new LayoutTabSpaceBoxJustForBoxIterator(charProp, charProp.getLayoutColorInfo(colorProvider)); },
                [RichUtils.specialCharacters.PageBreak]: function (charProp, colorProvider) { return new LayoutPageBreakBox(charProp, charProp.getLayoutColorInfo(colorProvider)); },
                [RichUtils.specialCharacters.ColumnBreak]: function (charProp, colorProvider) { return new LayoutColumnBreakBox(charProp, charProp.getLayoutColorInfo(colorProvider)); },
                [RichUtils.specialCharacters.NonBreakingSpace]: function (charProp, colorProvider) { return new LayoutNonBreakingSpaceBox(charProp, charProp.getLayoutColorInfo(colorProvider)); },
            };
            BoxGenerator.MapFieldCodeToLayoutDependentBoxType = {
                "PAGE": LayoutDependentBoxType.Page,
                "NUMPAGES": LayoutDependentBoxType.Numpages,
            };
        }
        this.manager = manager;
        this.boxWrapsHolder = boxesHolder;
    }
    static get MAX_NUM_NEW_BOXES() { return BoxWrapsHolder.AVERAGE_BOXES_ON_PAGE; }
    ;
    get colorProvider() { return this.manager.model.colorProvider; }
    isNotEmptyParagraphOrSectionRunBeforeTable(box) {
        const hasNewWrappers = this.newWrappers && this.newWrappers.length;
        const lastWrapperNotInsideTable = hasNewWrappers && !ListUtils.last(this.newWrappers).info.tablePosition;
        return hasNewWrappers && lastWrapperNotInsideTable && (box.getType() == LayoutBoxType.ParagraphMark || box.getType() != LayoutBoxType.SectionMark) &&
            this.modelIterator.getAbsolutePosition() == this.tableIterator.getNextObjectPosition();
    }
    addNewBoxInfo(box, offsetCharAtStartRun = this.modelIterator.charOffset) {
        box.rowOffset = this.getAbsolutePosition(offsetCharAtStartRun) - box.getLength();
        const boxMustBeHidden = box.characterProperties.hidden && !this.manager.innerClientProperties.showHiddenSymbols &&
            this.isLastParagraphBoxInSubDocumentVisible(box) && this.isTableCellConsiderAtLeastOneBox(this.currWrapInfo, box) &&
            !this.isNotEmptyParagraphOrSectionRunBeforeTable(box);
        if (boxMustBeHidden ||
            BoxGenerator.isFieldHideElement(this.currWrapInfo, box) ||
            this.currWrapInfo.tablePosition && (ListUtils.unsafeAnyOf(this.currWrapInfo.tablePosition, (tblPos) => tblPos.cell.verticalMerging == TableCellMergingState.Continue) ||
                EnumUtils.isAnyOf(box.getType(), LayoutBoxType.SectionMark, LayoutBoxType.PageBreak, LayoutBoxType.ColumnBreak))) {
            return null;
        }
        const newWrap = new BoxWrap(box, this.currWrapInfo);
        this.addToBoxFieldInfo(newWrap);
        this.newWrappers.push(newWrap);
        return newWrap;
    }
    generate() {
        if (!this.init())
            return false;
        const generateFrom = this.modelIterator.getAbsolutePosition();
        this.updateBracketsInfo();
        if (this.waitForMoreChunks) {
            if (ListUtils.last(this.chunks).getEndPosition() > generateFrom)
                this.updatePosSecondaryIterators(generateFrom);
        }
        else
            this.newWrappers = [];
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
        this.currBoxInfoType = LayoutBoxType.Text;
        this.waitForMoreChunks = false;
        this.createNewBoxes();
        if (this.waitForMoreChunks)
            return false;
        LayoutBox.initializeWithMeasurer(this.newWrappers, this.manager.measurer, this.manager.innerClientProperties.showHiddenSymbols);
        this.boxWrapsHolder.setNewWrappers(this.newWrappers, generateFrom);
        return this.newWrappers.length > 0;
    }
    updateBracketsInfo() {
        this.boxWrapsHolder.bracketsInfo = [];
        const bkmSettings = this.boxWrapsHolder.manager.bookmarksSettings;
        const docProtSettings = this.boxWrapsHolder.manager.documentProtectionSettings;
        if (bkmSettings.visibility == BookmarksVisibility.Visible)
            this.collectObjectBrackets(this.subDocument.bookmarks, bkmSettings.color, (bookmark) => !bookmark.isHidden());
        if (this.boxWrapsHolder.manager.documentProtectionSettings.showBrackets)
            this.collectObjectBrackets(this.subDocument.availableRangePermissions, docProtSettings.rangeHighlightBracketsColor, () => true);
        const cmp = (a, b) => {
            const diff = a.absPos - b.absPos;
            return diff ? diff : (a.color == b.color ? 0 : -1);
        };
        this.boxWrapsHolder.bracketsInfo = ListUtils.merge(this.boxWrapsHolder.bracketsInfo, cmp, (a, b) => cmp(a, b) == 0, (to, from) => to.flags.set(from.flags.getValue(), true));
    }
    collectObjectBrackets(objects, color, shouldDrawn) {
        const brInfo = this.boxWrapsHolder.bracketsInfo;
        ListUtils.forEach(objects, (obj) => {
            if (shouldDrawn(obj)) {
                brInfo.push(new BracketInfo(obj.start, new Flag(BoxBracketsType.Open), color, obj.interval.length));
                brInfo.push(new BracketInfo(obj.end, new Flag(BoxBracketsType.Close), color, obj.interval.length));
            }
        });
    }
    get subDocument() {
        return this.boxWrapsHolder.subDocument;
    }
    get chunks() {
        return this.subDocument.chunks;
    }
    updatePosSecondaryIterators(pos) {
        this.paragraphIterator.init(pos);
        this.sectionIterator.init(pos);
        this.tableIterator.init(pos);
        this.fieldIterator.init(pos);
    }
    init() {
        const pos = this.positionFromStartGenerate;
        if (this.subDocument.isMain() && ListUtils.last(this.chunks).getEndPosition() == pos)
            return false;
        if (pos == -1)
            return true;
        this.modelIterator = new ModelIterator(this.subDocument, false);
        this.modelIterator.setPosition(pos);
        if (pos >= this.modelIterator.chunk.getEndPosition())
            return false;
        this.paragraphIterator = new ParagraphIterator(this.subDocument.paragraphs);
        this.sectionIterator = new SectionIterator(this.manager.model.sections);
        this.tableIterator = new TableIterator(this.subDocument.tables);
        this.fieldIterator = new FieldIterator(this.subDocument.fields);
        this.updatePosSecondaryIterators(pos);
        this.currWrapInfo = new BoxWrapInfo(this.paragraphIterator.index, this.sectionIterator.index, this.tableIterator.generateInfo(pos), this.fieldIterator.generateInfo(pos));
        this.positionFromStartGenerate = -1;
        const lastChunk = ListUtils.last(this.chunks);
        this.lastModelPosition = ListUtils.last(this.chunks).isLast || !this.subDocument.isMain() ?
            lastChunk.getEndPosition() - 1 : Number.MAX_VALUE;
        return true;
    }
    isLastParagraphBoxInSubDocumentVisible(box) {
        if (box.rowOffset != this.lastModelPosition)
            return true;
        const lastWrap = ListUtils.last(this.newWrappers);
        return lastWrap && lastWrap.box.getType() == LayoutBoxType.ParagraphMark;
    }
    isTableCellConsiderAtLeastOneBox(info, box) {
        if (!info.tablePosition || box.getType() != LayoutBoxType.ParagraphMark ||
            ListUtils.last(info.tablePosition).cell.endParagrapPosition.value - 1 != box.rowOffset)
            return true;
        for (let wrapIndex = this.newWrappers.length - 1, wrap; wrap = this.newWrappers[wrapIndex]; wrapIndex--) {
            if (!wrap || !wrap.info.tablePosition || wrap.info.tablePosition.length < info.tablePosition.length)
                break;
            if (wrap.info.tablePosition.length == info.tablePosition.length)
                return wrap.box.getType() == LayoutBoxType.ParagraphMark &&
                    ListUtils.allOf2(info.tablePosition, wrap.info.tablePosition, (tInfoA, tInfoB) => tInfoA.equals(tInfoB));
        }
        return false;
    }
    static isFieldHideElement(info, box) {
        const fieldsInfo = info.fieldsInfo;
        return fieldsInfo &&
            (ListUtils.unsafeAnyOf(fieldsInfo, (info) => !info.field.showCode && info.isInCodePart ||
                info.field.showCode && !info.isInCodePart) || box.getType() == LayoutBoxType.FieldResultEnd);
    }
    addToBoxFieldInfo(wrap) {
        const fieldsInfo = wrap.info.fieldsInfo;
        if (!fieldsInfo)
            return;
        for (let ind = fieldsInfo.length - 1, fieldInfo; fieldInfo = fieldsInfo[ind]; ind--) {
            if (fieldInfo.field.isHyperlinkField() && !fieldInfo.isInCodePart &&
                this.boxWrapsHolder.manager.activeSubDocument === this.subDocument) {
                const hyperlinkInfo = fieldInfo.field.getHyperlinkInfo();
                if (hyperlinkInfo.tip != "")
                    wrap.box.hyperlinkTip = hyperlinkInfo.tip;
                else if (hyperlinkInfo.uri != "")
                    wrap.box.hyperlinkTip = hyperlinkInfo.uri + (hyperlinkInfo.anchor == "" ? "" : "#" + hyperlinkInfo.anchor);
                else if (hyperlinkInfo.anchor != "")
                    wrap.box.hyperlinkTip = hyperlinkInfo.anchor[0] == "_" ?
                        this.manager.stringResources.commonLabels.currentDocumentHyperlinkTooltip : "#" + hyperlinkInfo.anchor;
                else
                    wrap.box.hyperlinkTip = "";
                break;
            }
        }
        if (ListUtils.unsafeAnyOf(fieldsInfo, (info) => info.isInCodePart))
            wrap.box.fieldLevel = fieldsInfo.length;
        if (wrap.box.getType() == LayoutBoxType.LayoutDependent)
            wrap.box.setType(BoxGenerator.MapFieldCodeToLayoutDependentBoxType[this.getFieldType(ListUtils.last(fieldsInfo))]);
    }
    getFieldType(fieldInfo) {
        if (!fieldInfo.fieldType)
            fieldInfo.fieldType = StringUtils.trim(this.subDocument.getText(fieldInfo.field.getCodeInterval()).split("\\")[0]).toUpperCase();
        return fieldInfo.fieldType;
    }
    getAbsolutePosition(offsetCharAtStartRun) {
        return this.chunk.startLogPosition.value + this.run.startOffset + offsetCharAtStartRun;
    }
    get run() {
        return this.modelIterator.run;
    }
    get chunk() {
        return this.modelIterator.chunk;
    }
    createNewBoxes() {
        while (this.newWrappers.length < BoxGenerator.MAX_NUM_NEW_BOXES || this.currWrapInfo.tablePosition ||
            this.offsetStartWordAtStartRun != this.modelIterator.charOffset) {
            if (this.modelIterator.charOffset >= this.run.getLength())
                if (!this.getNextRun()) {
                    if (this.chunk.isLast)
                        this.boxWrapsHolder.flags.set(IteratorFlags.DocumentEnd, true);
                    else {
                        this.waitForMoreChunks = !!this.currWrapInfo.tablePosition;
                    }
                    return;
                }
            this.parseByChar();
        }
    }
    parseByChar() {
        const currChar = this.modelIterator.getCurrentChar();
        switch (currChar) {
            case RichUtils.specialCharacters.Space:
            case RichUtils.specialCharacters.NonBreakingSpace:
            case RichUtils.specialCharacters.TabMark:
            case RichUtils.specialCharacters.LineBreak:
            case RichUtils.specialCharacters.PageBreak:
            case RichUtils.specialCharacters.ColumnBreak:
                this.makeBreakBox(currChar);
                break;
            case RichUtils.specialCharacters.Dash:
            case RichUtils.specialCharacters.EmDash:
            case RichUtils.specialCharacters.EnDash:
                this.makeDashBox();
                break;
            default: this.parseByRunType();
        }
    }
    parseByRunType() {
        switch (this.run.getType()) {
            case RunType.ParagraphRun:
            case RunType.SectionRun:
                this.makeParagraphAndSectionBox();
                break;
            case RunType.InlinePictureRun:
                this.makeInlinePictureBox();
                break;
            case RunType.InlineTextBoxRun: throw new Error(Errors.NotImplemented);
            case RunType.AnchoredPictureRun:
                this.makeAnchoredPictureRun();
                break;
            case RunType.AnchoredTextBoxRun:
                this.makeAnchoredTextBoxRun();
                break;
            case RunType.FieldCodeStartRun:
                this.makeFieldCodeStartRun();
                break;
            case RunType.FieldCodeEndRun:
                this.makeFieldCodeEndRun();
                break;
            case RunType.FieldResultEndRun:
                this.makeFieldResultEndRun();
                break;
            case RunType.LayoutDependentRun:
                this.makeLayoutDependentRun();
                break;
            default: this.makeDefault();
        }
    }
    makeBreakBox(currChar) {
        this.currWordToBox();
        this.modelIterator.charOffset++;
        this.addNewBoxInfo(BoxGenerator.modelCharToLayoutBoxConverter[currChar](this.getActualCharacterProperties(), this.colorProvider));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    makeDashBox() {
        if (this.currBoxInfoType != LayoutBoxType.Dash) {
            this.currWordToBox();
            this.currBoxInfoType = LayoutBoxType.Dash;
            this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
        }
        this.modelIterator.charOffset++;
    }
    makeParagraphAndSectionBox() {
        this.modelIterator.charOffset++;
        const charProps = this.run.getCharacterMergedProperties();
        this.addNewBoxInfo(this.run.getType() == RunType.ParagraphRun ?
            new LayoutParagraphMarkBox(charProps, charProps.getLayoutColorInfo(this.colorProvider), this.isLastParagraphInCell()) :
            new LayoutSectionMarkBox(charProps, charProps.getLayoutColorInfo(this.colorProvider)));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    isLastParagraphInCell() {
        const paragraph = this.run.paragraph;
        const tableCell = paragraph.getTableCell();
        if (!tableCell)
            return false;
        return paragraph.getEndPosition() == tableCell.interval.end;
    }
    makeInlinePictureBox() {
        const inlinePictureRun = this.run;
        this.modelIterator.charOffset++;
        const charProps = inlinePictureRun.getCharacterMergedProperties();
        this.addNewBoxInfo(new LayoutPictureBox(charProps, charProps.getLayoutColorInfo(this.colorProvider), inlinePictureRun.cacheInfo, inlinePictureRun.getActualSize().applyConverter(UnitConverter.twipsToPixelsF)));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    makeAnchoredPictureRun() {
        const anchorPictureRun = this.run;
        this.modelIterator.charOffset++;
        if (anchorPictureRun.anchorInfo.hidden)
            return;
        const charProps = anchorPictureRun.getCharacterMergedProperties();
        this.addNewBoxInfo(new LayoutAnchoredPictureBox(charProps, charProps.getLayoutColorInfo(this.colorProvider), this.subDocument.id, anchorPictureRun.anchorInfo.clone(), anchorPictureRun.shape.clone().applyConverter(UnitConverter.twipsToPixelsF), anchorPictureRun.anchoredObjectID, UnitConverter.twipsToRadians(anchorPictureRun.size.rotation), anchorPictureRun.cacheInfo)
            .setPosition(new Point(0, 0))
            .setSize(anchorPictureRun.getActualSize().applyConverter(UnitConverter.twipsToPixelsF)));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    static createLayoutAnchoredTextBoxFromRun(anchorTextBox, subDocumentId, colorProvider) {
        return new LayoutAnchoredTextBox(anchorTextBox.getCharacterMergedProperties(), anchorTextBox.getCharacterMergedProperties().getLayoutColorInfo(colorProvider), subDocumentId, anchorTextBox.anchorInfo.clone(), anchorTextBox.shape.clone().applyConverter(UnitConverter.twipsToPixelsF), anchorTextBox.anchoredObjectID, UnitConverter.twipsToRadians(anchorTextBox.size.rotation), anchorTextBox.subDocId, anchorTextBox.textBoxProperties.clone().setMarginsToAnotherMeasuringSystem(UnitConverter.twipsToPixelsF));
    }
    makeAnchoredTextBoxRun() {
        const anchorTextBox = this.run;
        this.modelIterator.charOffset++;
        if (!anchorTextBox.anchorInfo.hidden) {
            const textBoxWrap = this.addNewBoxInfo(BoxGenerator.createLayoutAnchoredTextBoxFromRun(anchorTextBox, this.subDocument.id, this.colorProvider));
            if (textBoxWrap)
                this.manager.anchoredObjectsManager.textBoxContextSizeCalculators[anchorTextBox.anchoredObjectID] =
                    new AnchoredTextBoxContextSizeCalculator(textBoxWrap, anchorTextBox.size, this.subDocument.documentModel.compatibilitySettings.getActualLayoutInTableCell(anchorTextBox.anchorInfo));
        }
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    makeFieldCodeStartRun() {
        this.modelIterator.charOffset++;
        const charProps = this.run.getCharacterMergedProperties();
        this.addNewBoxInfo(new LayoutFieldCodeStartBox(charProps, charProps.getLayoutColorInfo(this.colorProvider)));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    makeFieldCodeEndRun() {
        this.modelIterator.charOffset++;
        const charProps = this.run.getCharacterMergedProperties();
        this.addNewBoxInfo(new LayoutFieldCodeEndBox(charProps, charProps.getLayoutColorInfo(this.colorProvider)));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    makeFieldResultEndRun() {
        this.modelIterator.charOffset++;
        const charProps = this.run.getCharacterMergedProperties();
        this.addNewBoxInfo(new LayoutFieldResultEndBox(charProps, charProps.getLayoutColorInfo(this.colorProvider)));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    makeLayoutDependentRun() {
        this.modelIterator.charOffset++;
        const charProps = this.run.getCharacterMergedProperties();
        this.addNewBoxInfo(new LayoutDependentTextBox(this.run.getCharacterMergedProperties(), charProps.getLayoutColorInfo(this.colorProvider), this.modelIterator.getRunText()));
        this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
    }
    makeDefault() {
        if (this.currBoxInfoType == LayoutBoxType.Dash) {
            this.currWordToBox();
            this.offsetStartWordAtStartRun = this.modelIterator.charOffset;
        }
        this.modelIterator.charOffset++;
    }
    currWordToBox() {
        const maxBoxLength = this.currBoxInfoType == LayoutBoxType.Text ? BoxGenerator.MAX_BOX_LENGTH : 1;
        if (this.modelIterator.charOffset > this.offsetStartWordAtStartRun) {
            let currRunTextStart = this.offsetStartWordAtStartRun;
            do {
                const currBoxLength = Math.min(maxBoxLength, this.modelIterator.charOffset - currRunTextStart);
                const word = this.modelIterator.getRunText(currRunTextStart, currBoxLength);
                currRunTextStart += currBoxLength;
                const charProps = this.getActualCharacterProperties();
                if (this.currBoxInfoType == LayoutBoxType.Text)
                    this.addNewBoxInfo(new LayoutTextBox(charProps, charProps.getLayoutColorInfo(this.colorProvider), word), currRunTextStart);
                else
                    this.addNewBoxInfo(new LayoutDashBox(charProps, charProps.getLayoutColorInfo(this.colorProvider), word), currRunTextStart);
            } while (currRunTextStart < this.modelIterator.charOffset);
        }
        this.currBoxInfoType = LayoutBoxType.Text;
    }
    getActualCharacterProperties() {
        const fieldsInfo = this.currWrapInfo.fieldsInfo;
        if (fieldsInfo) {
            let isParentFieldTOC = false;
            for (let i = 0, fieldInfo; fieldInfo = fieldsInfo[i]; i++) {
                if (!isParentFieldTOC) {
                    if (fieldInfo.field.isHyperlinkField()) {
                        if (fieldInfo.field.getHyperlinkInfo().visited) {
                            const result = this.run.getCharacterMergedProperties().clone();
                            result.textColor = ColorModelInfo.makeByColor(ColorUtils.fromHashString("#483D8B"));
                            return result;
                        }
                        else
                            break;
                    }
                    isParentFieldTOC = this.getFieldType(fieldInfo) == 'TOC';
                }
                else if (fieldInfo.field.isHyperlinkField() && this.run.characterStyle.styleName == CharacterStyle.hyperlinkStyleName) {
                    const merger = new CharacterPropertiesMerger();
                    merger.mergeMergedCharacterProperties(this.run.mergeCharacterProperties({ excludeCharacterStyle: true }));
                    const characterStyle = this.run.characterStyle;
                    const characterStyleProperties = characterStyle.maskedCharacterProperties.clone();
                    characterStyleProperties.setUseValue(CharacterPropertiesMask.UseUnderlineColorIndex, false);
                    characterStyleProperties.setUseValue(CharacterPropertiesMask.UseForeColorIndex, false);
                    merger.mergeCharacterProperties(characterStyleProperties);
                    merger.mergeCharacterStyle(characterStyle.parent);
                    return merger.getMergedProperties();
                }
            }
        }
        return this.run.getCharacterMergedProperties();
    }
    getNextRun() {
        this.currWordToBox();
        const prevRun = this.modelIterator.run;
        if (!this.modelIterator.moveToNextRun())
            return false;
        const newPos = this.modelIterator.getAbsolutePosition();
        let isNeedUpdateWrapInfo = false;
        if (this.paragraphIterator.update(newPos)) {
            if (this.subDocument.isMain())
                this.sectionIterator.update(newPos);
            this.tableIterator.update(newPos);
            isNeedUpdateWrapInfo = true;
        }
        if (this.fieldIterator.update(newPos) || prevRun.getType() == RunType.FieldCodeEndRun)
            isNeedUpdateWrapInfo = true;
        if (isNeedUpdateWrapInfo) {
            this.currWrapInfo = new BoxWrapInfo(this.paragraphIterator.index, this.sectionIterator.index, this.tableIterator.generateInfo(newPos), this.fieldIterator.generateInfo(newPos));
        }
        this.offsetStartWordAtStartRun = 0;
        return true;
    }
}
BoxGenerator.MAX_BOX_LENGTH = 50;
