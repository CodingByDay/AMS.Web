import { RichEditUnit } from '../base-utils/unit-converter';
import { LayoutPictureBox } from '../core/layout/main-structures/layout-boxes/layout-picture-box';
import { BorderLineStyle } from '../core/model/borders/enums';
import { CharacterProperties } from '../core/model/character/character-properties';
import { CharacterFormattingScript, UnderlineType } from '../core/model/character/enums';
import { ColorHelper } from '../core/model/color/color';
import { Field } from '../core/model/fields/field';
import { NumberingFormat } from '../core/model/numbering-lists/list-level-properties';
import { NumberingType } from '../core/model/numbering-lists/numbering-list';
import { ParagraphAlignment, ParagraphFirstLineIndent, ParagraphLineSpacingType } from '../core/model/paragraph/paragraph-properties';
import { RichUtils } from '../core/model/rich-utils';
import { RunType } from '../core/model/runs/run-type';
import { Table } from '../core/model/tables/main-structures/table';
import { TableCellPropertiesMergerShadingInfo, TableCellVerticalAlignmentMerger } from '../core/model/tables/properties-mergers/table-cell-properties-merger';
import { TablePropertiesMergerBorderHorizontal, TablePropertiesMergerBorderVertical, TablePropertiesMergerCellSpacing, TablePropertiesMergerIndent } from '../core/model/tables/properties-mergers/table-properties-merger';
import { ConditionalTableStyleFormatting, TableCellMergingState, TableCellVerticalAlignment } from '../core/model/tables/secondary-structures/table-base-structures';
import { TableWidthUnitType } from '../core/model/tables/secondary-structures/table-units';
import { HtmlConverter } from '../core/rich-utils/html-converter';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ColorUtils } from '@devexpress/utils/lib/utils/color';
import { EncodeUtils } from '@devexpress/utils/lib/utils/encode';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { StringUtils } from '@devexpress/utils/lib/utils/string';
export class HtmlBuilder {
    constructor() {
        this.childElements = [];
        this.callbacks = [];
    }
    _getHtmlString() {
        return this.childElements.map(x => {
            if (typeof x === 'string')
                return x;
            return x.outerHTML;
        }).join('');
    }
    isEmpty() {
        return this.callbacks.length === 0 && this.childElements.length === 0;
    }
    clear() {
        this._currentElement = null;
        this.callbacks = [];
        this.childElements = [];
        return this;
    }
    startChild(tagName, namespaceUri) {
        const element = (namespaceUri) ? document.createElementNS(namespaceUri, tagName) : document.createElement(tagName);
        if (this._currentElement)
            this._currentElement.appendChild(element);
        else {
            this.childElements.push(element);
        }
        this._currentElement = element;
        return this;
    }
    configure(config) {
        config(this._currentElement);
        return this;
    }
    addCallback(callback) {
        this.callbacks.push(callback);
    }
    assignFrom(builder) {
        if (!builder)
            return this;
        if (typeof builder === "string") {
            this.addElement(builder);
            return this;
        }
        builder.callbacks.forEach((callback) => {
            callback(this);
        });
        builder.childElements.forEach((el) => {
            this.addElement(el);
        });
        builder.clear();
        return this;
    }
    addElement(element) {
        if (!element)
            return this;
        if (!this._currentElement) {
            this.childElements.push(element);
            return this;
        }
        if (typeof element === 'string')
            this._currentElement.innerHTML += element;
        else if (this._currentElement)
            this._currentElement.appendChild(element);
        else
            this._currentElement = element;
        return this;
    }
    endChild(tagName) {
        let currentElement = this._currentElement;
        while (currentElement.tagName.toLowerCase() !== tagName.toLowerCase()) {
            currentElement = currentElement.parentElement;
        }
        this._currentElement = currentElement.parentElement;
        return this;
    }
}
export class HtmlExporter {
    constructor(control) {
        this.rangeCopy = null;
        this.control = control;
    }
    get colorProvider() { return this.control.modelManager.model.colorProvider; }
    getHtmlElementsByInterval(model, subDocument, interval, guidLabel) {
        if (interval.length === 0)
            return;
        const unitConverter = this.control.uiUnitConverter;
        const unitTypeToString = unitConverter.getUnits() == RichEditUnit.Centimeter ? "cm" : "in";
        const iterator = subDocument.getConstRunIterator(interval);
        let remainLength = interval.length;
        let currentPosition = interval.start;
        const renderer = this.control.viewManager.renderer;
        let resultBuilder = new HtmlBuilder();
        const paragraphsInInterval = subDocument.getParagraphsByInterval(interval);
        const paragraphs = [];
        for (let i = 0, paragraphInInterval; paragraphInInterval = paragraphsInInterval[i]; i++) {
            if (interval.containsWithIntervalEnd(paragraphInInterval.getEndPosition()))
                paragraphs.push(paragraphInInterval);
        }
        const listsInInterval = [];
        for (let i = 0, paragraph; paragraph = paragraphs[i]; i++) {
            if (paragraph.isInList()) {
                const paragraphNumberingListIndex = paragraph.getNumberingListIndex();
                const paragraphListLevelIndex = paragraph.getListLevelIndex();
                const paragraphStart = paragraph.startLogPosition.value;
                const paragraphEnd = paragraph.getEndPosition();
                let existingItem = null;
                for (let j = 0; j < listsInInterval.length; j++) {
                    if (listsInInterval[j].numberingListIndex == paragraphNumberingListIndex && listsInInterval[j].listLevelIndex == paragraphListLevelIndex)
                        existingItem = listsInInterval[j];
                }
                if (existingItem && (paragraphListLevelIndex == 0 || existingItem.end == paragraphStart
                    || listsInInterval[listsInInterval.length - 1].listLevelIndex > paragraphListLevelIndex)) {
                    existingItem.end = paragraphEnd;
                }
                else {
                    listsInInterval.push({
                        numberingListIndex: paragraphNumberingListIndex, listLevelIndex: paragraphListLevelIndex,
                        start: paragraphStart, end: paragraphEnd
                    });
                }
                let listLevelIndex = paragraphListLevelIndex;
                while (listLevelIndex > 0) {
                    let parentItem = null;
                    for (let j = 0; j < listsInInterval.length; j++) {
                        if (listsInInterval[j].listLevelIndex == listLevelIndex - 1)
                            parentItem = listsInInterval[j];
                    }
                    if (parentItem)
                        parentItem.end = paragraphEnd;
                    listLevelIndex--;
                }
            }
        }
        let isInsideFieldCode = false;
        let fieldDeep = 0;
        let isInsideHyperlink = false;
        let hyperlinkInfo = null;
        let hyperlinkInnerHtml = new HtmlBuilder();
        let hasFields = false;
        while (iterator.moveNext()) {
            const tableCell = Table.getTableCellByPosition(subDocument.tables, iterator.currentInterval().start);
            const isContinueMergingCell = tableCell && tableCell.verticalMerging === TableCellMergingState.Continue;
            let listToStartIndex = -1;
            const listsToEndIndices = [];
            if (!tableCell) {
                if (listsInInterval.length) {
                    const currentPosition = iterator.currentInterval().start;
                    for (let i = 0; i < listsInInterval.length; i++) {
                        if (listsInInterval[i].start == currentPosition)
                            listToStartIndex = i;
                        if (listsInInterval[i].end == iterator.currentInterval().end)
                            listsToEndIndices.push(i);
                    }
                    if (listToStartIndex < 0 && currentPosition == interval.start) {
                        const firstParagraph = subDocument.getParagraphByPosition(currentPosition);
                        if (firstParagraph.getNumberingListIndex() == listsInInterval[0].numberingListIndex)
                            listToStartIndex = 0;
                    }
                }
                if (listToStartIndex > -1) {
                    const numberingList = model.numberingLists[listsInInterval[listToStartIndex].numberingListIndex];
                    let listFormatType = "";
                    switch (numberingList.levels[listsInInterval[listToStartIndex].listLevelIndex].getListLevelProperties().format) {
                        case NumberingFormat.Bullet:
                            listFormatType = "disc";
                            break;
                        case NumberingFormat.Decimal:
                            listFormatType = "decimal";
                            break;
                        case NumberingFormat.LowerLetter:
                            listFormatType = "lower-alpha";
                            break;
                        case NumberingFormat.UpperLetter:
                            listFormatType = "upper-alpha";
                            break;
                        case NumberingFormat.LowerRoman:
                            listFormatType = "lower-roman";
                            break;
                        case NumberingFormat.UpperRoman:
                            listFormatType = "upper-roman";
                            break;
                        default:
                            break;
                    }
                    resultBuilder
                        .startChild(numberingList.getListType() != NumberingType.Bullet ? "ol" : "ul")
                        .configure((e) => e.style.cssText = "list-style-type:" + listFormatType);
                }
            }
            const run = iterator.currentRun;
            const isRunInEmptyParagraph = run.paragraph.length === 1;
            if (paragraphs.length && (run.getType() != RunType.ParagraphRun || isRunInEmptyParagraph)) {
                const paragraphToStartIndex = SearchUtils.normedInterpolationIndexOf(paragraphs, (p) => p.startLogPosition.value, currentPosition);
                if (paragraphToStartIndex > -1) {
                    const currentParagraph = paragraphs[paragraphToStartIndex];
                    paragraphs.splice(paragraphToStartIndex, 1);
                    if (tableCell) {
                        let parentRow = tableCell.parentRow;
                        let parentTable = parentRow.parentTable;
                        let paragraphStartPosition = currentParagraph.startLogPosition.value;
                        if (parentTable.getStartPosition() == paragraphStartPosition) {
                            if (parentTable.parentCell) {
                                let parentCell = parentTable.parentCell;
                                while (parentCell) {
                                    let currentParentRow = parentCell.parentRow;
                                    let currentParentTable = currentParentRow.parentTable;
                                    if (currentParentTable.getStartPosition() == paragraphStartPosition)
                                        resultBuilder
                                            .startChild('table')
                                            .configure((e) => e.style.cssText = this.getTableStyle(model, currentParentTable))
                                            .startChild('tbody');
                                    if (currentParentRow.getStartPosition() == paragraphStartPosition) {
                                        resultBuilder.startChild('tr');
                                        if (currentParentRow.gridBefore > 0)
                                            resultBuilder
                                                .startChild('td')
                                                .configure((el) => {
                                                el.style.cssText = "mso-cell-special:placeholder";
                                                el.setAttribute('colspan', currentParentRow.gridBefore.toString());
                                                el.innerHTML = "&nbsp;";
                                            })
                                                .endChild('td');
                                    }
                                    if (parentCell.startParagraphPosition.value == paragraphStartPosition) {
                                        resultBuilder
                                            .startChild('td')
                                            .configure((el) => {
                                            el.style.cssText = this.getCellStyle(model, parentCell);
                                            if (parentCell.columnSpan > 1) {
                                                el.setAttribute('colspan', parentCell.columnSpan.toString());
                                            }
                                        });
                                    }
                                    parentCell = currentParentTable.parentCell;
                                }
                            }
                            resultBuilder
                                .startChild('table')
                                .configure((el) => {
                                el.style.cssText = this.getTableStyle(model, parentTable);
                            })
                                .startChild('tbody');
                        }
                        if (parentRow.getStartPosition() == paragraphStartPosition) {
                            resultBuilder.startChild('tr');
                            if (parentRow.gridBefore > 0) {
                                resultBuilder
                                    .startChild('td')
                                    .configure((el) => {
                                    el.style.cssText = "mso-cell-special:placeholder";
                                    el.setAttribute('colspan', parentRow.gridBefore.toString());
                                    el.innerHTML = "&nbsp;";
                                })
                                    .endChild('td');
                            }
                        }
                        if (tableCell.startParagraphPosition.value == paragraphStartPosition && !isContinueMergingCell) {
                            let rowSpan = 1;
                            if (tableCell.verticalMerging === TableCellMergingState.Restart) {
                                let rowIndex = parentTable.rows.indexOf(parentRow);
                                let cellIndex = parentRow.cells.indexOf(tableCell);
                                for (let i = rowIndex + 1, row; row = parentTable.rows[i]; i++) {
                                    let nextRowCellIndex = cellIndex;
                                    if (row.cells.length != parentRow.cells.length) {
                                        let extraCellsCount = 0;
                                        let isNextRowLonger = row.cells.length > parentRow.cells.length;
                                        let shorterRow = isNextRowLonger ? parentRow : row;
                                        for (let j = 0; (j < cellIndex) && (j < shorterRow.cells.length); j++) {
                                            extraCellsCount += shorterRow.cells[j].columnSpan - 1;
                                            if (!isNextRowLonger)
                                                extraCellsCount -= parentRow.cells[j].columnSpan - 1;
                                        }
                                        nextRowCellIndex += (isNextRowLonger ? 1 : -1) * extraCellsCount;
                                    }
                                    let nextRowCell = row.cells[nextRowCellIndex];
                                    if (nextRowCell && nextRowCell.verticalMerging === TableCellMergingState.Continue)
                                        rowSpan++;
                                    else
                                        break;
                                }
                            }
                            resultBuilder
                                .startChild('td')
                                .configure((el) => {
                                el.style.cssText = this.getCellStyle(model, tableCell);
                                if (rowSpan > 1)
                                    el.setAttribute('rowspan', rowSpan.toString());
                                if (tableCell.columnSpan > 1)
                                    el.setAttribute('colspan', tableCell.columnSpan.toString());
                            });
                        }
                    }
                    if (!isContinueMergingCell) {
                        const maskedParagraphProperties = currentParagraph.getParagraphMergedProperties();
                        let paragraphStyle = "";
                        const firstLineIndentType = maskedParagraphProperties.firstLineIndentType;
                        if (firstLineIndentType != ParagraphFirstLineIndent.None) {
                            paragraphStyle += "text-indent: " + (firstLineIndentType == ParagraphFirstLineIndent.Hanging ? "-" : "") +
                                unitConverter.twipsToUI(maskedParagraphProperties.firstLineIndent) + unitTypeToString + ";";
                        }
                        if (maskedParagraphProperties.alignment !== undefined) {
                            paragraphStyle += "text-align: ";
                            switch (maskedParagraphProperties.alignment) {
                                case ParagraphAlignment.Left:
                                    paragraphStyle += "left;";
                                    break;
                                case ParagraphAlignment.Right:
                                    paragraphStyle += "right;";
                                    break;
                                case ParagraphAlignment.Justify:
                                case ParagraphAlignment.JustifyHigh:
                                case ParagraphAlignment.JustifyLow:
                                case ParagraphAlignment.JustifyMedium:
                                case ParagraphAlignment.Distribute:
                                case ParagraphAlignment.ThaiDistribute:
                                    paragraphStyle += "justify;";
                                    break;
                                case ParagraphAlignment.Center:
                                    paragraphStyle += "center;";
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (maskedParagraphProperties.lineSpacingType != ParagraphLineSpacingType.Single) {
                            const lineSpacingInUI = unitConverter.twipsToUI(maskedParagraphProperties.lineSpacing) + unitTypeToString + ";";
                            paragraphStyle += "line-height: ";
                            switch (maskedParagraphProperties.lineSpacingType) {
                                case ParagraphLineSpacingType.AtLeast:
                                    paragraphStyle += lineSpacingInUI;
                                    break;
                                case ParagraphLineSpacingType.Double:
                                    paragraphStyle += "2;";
                                    break;
                                case ParagraphLineSpacingType.Exactly:
                                    paragraphStyle += lineSpacingInUI + "mso-line-height-rule: exactly;";
                                    break;
                                case ParagraphLineSpacingType.Multiple:
                                    paragraphStyle += maskedParagraphProperties.lineSpacing + ";";
                                    break;
                                case ParagraphLineSpacingType.Sesquialteral:
                                    paragraphStyle += "1.5;";
                                    break;
                                default:
                                    break;
                            }
                        }
                        if (ColorUtils.getAlpha(maskedParagraphProperties.shadingInfo.getActualColor(this.colorProvider)) > 0)
                            paragraphStyle += "background: " + ColorHelper.getCssStringInternal(maskedParagraphProperties.shadingInfo.getActualColor(this.colorProvider)) + ";";
                        if (maskedParagraphProperties.leftIndent)
                            paragraphStyle += "margin-left: " + unitConverter.twipsToUI(maskedParagraphProperties.leftIndent) + unitTypeToString + ";";
                        if (maskedParagraphProperties.rightIndent)
                            paragraphStyle += "margin-right: " + unitConverter.twipsToUI(maskedParagraphProperties.rightIndent) + unitTypeToString + ";";
                        paragraphStyle += "margin-top: " + unitConverter.twipsToUI(maskedParagraphProperties.spacingBefore) + unitTypeToString + ";";
                        paragraphStyle += "margin-bottom: " + unitConverter.twipsToUI(maskedParagraphProperties.spacingAfter) + unitTypeToString + ";";
                        const topBorderStyle = this.getBorderCssString(maskedParagraphProperties.topBorder);
                        if (topBorderStyle)
                            paragraphStyle += "border-top:" + topBorderStyle + ";";
                        const leftBorderStyle = this.getBorderCssString(maskedParagraphProperties.leftBorder);
                        if (leftBorderStyle)
                            paragraphStyle += "border-left:" + leftBorderStyle + ";";
                        const bottomBorderStyle = this.getBorderCssString(maskedParagraphProperties.bottomBorder);
                        if (bottomBorderStyle)
                            paragraphStyle += "border-bottom:" + bottomBorderStyle + ";";
                        const rightBorderStyle = this.getBorderCssString(maskedParagraphProperties.rightBorder);
                        if (rightBorderStyle)
                            paragraphStyle += "border-right:" + rightBorderStyle + ";";
                        if (isRunInEmptyParagraph) {
                            const charProps = run.getCharacterMergedProperties();
                            paragraphStyle += HtmlConverter.getCssRules(charProps, charProps.textColor.toRgb(this.colorProvider), false, false, false)
                                .join(";");
                        }
                        if (currentParagraph.isInList() && !tableCell)
                            resultBuilder.startChild('li');
                        resultBuilder
                            .startChild('p')
                            .configure((e) => {
                            if (paragraphStyle) {
                                e.style.cssText = paragraphStyle;
                            }
                            if (isRunInEmptyParagraph) {
                                e.innerHTML = "&nbsp;";
                            }
                        });
                    }
                }
            }
            let html = new HtmlBuilder();
            let innerHtml = new HtmlBuilder();
            const length = Math.min(remainLength, iterator.currentInterval().length);
            switch (run.getType()) {
                case RunType.ParagraphRun:
                    if (!isContinueMergingCell) {
                        html.addCallback((builder) => builder.endChild('p'));
                        let paragraphEndPosition = run.paragraph.getEndPosition();
                        if (tableCell) {
                            let parentRow = tableCell.parentRow;
                            let parentTable = parentRow.parentTable;
                            if (tableCell.endParagrapPosition.value == paragraphEndPosition)
                                html.addCallback((builder) => builder.endChild('td'));
                            if (parentRow.getEndPosition() == paragraphEndPosition) {
                                if (parentRow.gridAfter > 0)
                                    html.addCallback((builder) => {
                                        builder
                                            .addElement('td')
                                            .configure((el) => {
                                            el.style.cssText = "mso-cell-special:placeholder";
                                            el.setAttribute('colspan', parentRow.gridAfter.toString());
                                            el.innerHTML = "&nbsp;";
                                        })
                                            .endChild('td');
                                    });
                                html.addCallback((builder) => {
                                    builder.endChild('tr');
                                });
                            }
                            if (parentTable.getEndPosition() == paragraphEndPosition)
                                html.addCallback((builder) => {
                                    builder
                                        .endChild('tbody')
                                        .endChild('table');
                                });
                        }
                    }
                    break;
                case RunType.InlinePictureRun:
                case RunType.AnchoredPictureRun: {
                    const picRun = run;
                    const charMergProps = run.getCharacterMergedProperties();
                    const pictureBox = new LayoutPictureBox(charMergProps, charMergProps.getLayoutColorInfo(this.colorProvider), picRun.cacheInfo, picRun.getActualSize().applyConverter(UnitConverter.twipsToPixels));
                    innerHtml
                        .clear()
                        .addElement(renderer.renderPicture(pictureBox));
                    break;
                }
                case RunType.InlineTextBoxRun:
                case RunType.AnchoredTextBoxRun: {
                    let textBoxRun = run;
                    let internalSubDocument = model.subDocuments[textBoxRun.subDocId];
                    innerHtml
                        .clear()
                        .startChild('table')
                        .configure((el) => {
                        el.setAttribute('border', '1');
                        el.style.cssText = 'border-width: 0px; border-collapse: collapse; border-spacing: 0px;';
                        el.setAttribute('id', guidLabel.replace("id=\"", "").replace("\"", ""));
                    })
                        .startChild('tbody')
                        .startChild('tr')
                        .startChild('td')
                        .configure((el) => {
                        el.style.cssText = this.getTextBoxStyleString(textBoxRun);
                    })
                        .assignFrom(this.getHtmlElementsByInterval(model, internalSubDocument, new FixedInterval(0, internalSubDocument.getDocumentEndPosition()), guidLabel))
                        .endChild('td')
                        .endChild('tr')
                        .endChild('tbody')
                        .endChild('table');
                    break;
                }
                case RunType.FieldCodeStartRun:
                    isInsideFieldCode = true;
                    const fieldIndex = Field.normedBinaryIndexOf(subDocument.fields, currentPosition + 1);
                    const field = subDocument.fields[fieldIndex];
                    if (field.isHyperlinkField()) {
                        hyperlinkInfo = field.getHyperlinkInfo();
                        isInsideHyperlink = true;
                    }
                    fieldDeep++;
                    break;
                case RunType.FieldCodeEndRun:
                    isInsideFieldCode = false;
                    break;
                case RunType.FieldResultEndRun:
                    fieldDeep--;
                    if (!fieldDeep)
                        isInsideHyperlink = false;
                    hasFields = true;
                    break;
                case RunType.LayoutDependentRun:
                    let currentField = subDocument.fields[Field.normedBinaryIndexOf(subDocument.fields, currentPosition)];
                    if (currentField) {
                        let codeText = StringUtils.trim(subDocument.getText(currentField.getCodeInterval()).split("\\")[0]).toUpperCase();
                        if (codeText == "NUMPAGES")
                            innerHtml
                                .clear()
                                .addElement(this.control.layout.lastMaxNumPages.toString());
                        else if (codeText == "PAGE")
                            innerHtml
                                .clear()
                                .addElement((this.control.selection.pageIndex + 1).toString());
                    }
                    break;
                default:
                    if (!isInsideFieldCode)
                        innerHtml = this.getHtmlText(subDocument.getText(new FixedInterval(currentPosition, length)));
                    break;
            }
            if (hyperlinkInfo && !isInsideHyperlink) {
                const url = hyperlinkInfo.uri + (hyperlinkInfo.anchor != "" ? "#" + hyperlinkInfo.anchor : "");
                const tooltip = hyperlinkInfo.tip;
                html
                    .clear()
                    .startChild('a')
                    .configure((el) => {
                    el.setAttribute('href', url);
                    el.setAttribute('title', tooltip);
                })
                    .assignFrom(hyperlinkInnerHtml)
                    .endChild('a');
                hyperlinkInfo = null;
                hyperlinkInnerHtml.clear();
            }
            if (html.isEmpty() && !innerHtml.isEmpty()) {
                const characterProperties = run.getCharacterMergedProperties();
                const boxStyle = "white-space:pre;" + HtmlConverter.getCssRules(characterProperties, characterProperties.textColor.toRgb(this.colorProvider), run.getType() == RunType.TextRun, false, false).
                    join(";");
                html
                    .startChild('span')
                    .configure((el) => {
                    el.style.cssText = boxStyle;
                })
                    .assignFrom(innerHtml)
                    .endChild('span');
                if (hyperlinkInfo) {
                    if (isInsideHyperlink) {
                        hyperlinkInnerHtml.assignFrom(html);
                        html.clear();
                    }
                }
                else {
                    if (characterProperties.fontUnderlineType != UnderlineType.None && !characterProperties.underlineWordsOnly) {
                        const underlineColor = characterProperties.underlineColor.toRgb(this.colorProvider);
                        const cssColorValue = (underlineColor != ColorHelper.AUTOMATIC_COLOR) ? ColorHelper.getCssStringInternal(underlineColor) : "initial";
                        const builder = new HtmlBuilder();
                        builder
                            .startChild('span')
                            .configure((el) => {
                            el.style.cssText = "text-decoration: underline; color: " + cssColorValue;
                        })
                            .assignFrom(html)
                            .endChild('span');
                        html = builder;
                    }
                    if (characterProperties.script !== CharacterFormattingScript.Normal) {
                        const builder = new HtmlBuilder();
                        builder
                            .startChild('span')
                            .configure((el) => {
                            el.style.cssText = "font-size: " + characterProperties.fontSize + "px;";
                        })
                            .assignFrom(html)
                            .endChild('span');
                        html = builder;
                    }
                    if (ColorUtils.getAlpha(CharacterProperties.getActualBackgroundColor(characterProperties, this.colorProvider)) > 0) {
                        const builder = new HtmlBuilder();
                        builder
                            .startChild('span')
                            .configure((el) => {
                            el.style.cssText = "background: " + ColorHelper.getCssStringInternal(CharacterProperties.getActualBackgroundColor(characterProperties, this.colorProvider));
                        })
                            .assignFrom(html)
                            .endChild('span');
                        html = builder;
                    }
                }
            }
            resultBuilder.assignFrom(html);
            if (listsToEndIndices.length) {
                for (let i = listsToEndIndices.length - 1; i >= 0; i--)
                    resultBuilder.endChild(model.numberingLists[listsInInterval[listsToEndIndices[i]].numberingListIndex].getListType() != NumberingType.Bullet ? "ol" : "ul");
            }
            currentPosition += length;
            remainLength -= length;
        }
        if (/^<td[^>]*>/gi.test(resultBuilder._getHtmlString())) {
            const builder = new HtmlBuilder();
            builder.startChild('tr');
            builder.assignFrom(resultBuilder);
            resultBuilder = builder;
        }
        if (/<\/td>$/gi.test(resultBuilder._getHtmlString()))
            resultBuilder.endChild("tr");
        if (/^<tr[^>]*>/gi.test(resultBuilder._getHtmlString())) {
            const builder = new HtmlBuilder();
            builder
                .startChild('table')
                .configure((el) => {
                el.style.cssText = this.getTableStyle(model, null);
            })
                .startChild('tbody')
                .assignFrom(resultBuilder);
            resultBuilder = builder;
        }
        if (/<\/tr>$/gi.test(resultBuilder._getHtmlString()))
            resultBuilder
                .endChild('tbody')
                .endChild('table');
        if (hasFields && resultBuilder.isEmpty())
            resultBuilder
                .startChild('span')
                .configure((el) => {
                el.classList.add('field-mark');
                el.innerHTML = "&nbsp;";
            })
                .endChild('span');
        return resultBuilder;
    }
    getHtmlText(text) {
        let result = new HtmlBuilder();
        for (let i = 0; i < text.length; i++) {
            const char = text.charAt(i);
            if (char == RichUtils.specialCharacters.PageBreak)
                result.addCallback((builder) => {
                    builder
                        .startChild('br')
                        .configure((el) => {
                        el.style.cssText = "page-break-before:always";
                    })
                        .endChild('br');
                });
            else if (char == RichUtils.specialCharacters.LineBreak)
                result.addCallback((builder) => {
                    builder
                        .startChild('br')
                        .endChild('br');
                });
            else {
                result.addCallback((builder) => {
                    builder.configure((el) => {
                        el.innerHTML += EncodeUtils.encodeHtml(text.substr(i));
                    });
                });
                break;
            }
        }
        return result;
    }
    getBorderCssString(borderInfo) {
        let borderStyle = "";
        if (borderInfo) {
            if (borderInfo.width)
                borderStyle += " " + UnitConverter.twipsToPixels(borderInfo.width) + "px";
            switch (borderInfo.style) {
                case BorderLineStyle.Dashed:
                    borderStyle += " dashed";
                    break;
                case BorderLineStyle.Dotted:
                    borderStyle += " dotted";
                    break;
                case BorderLineStyle.Double:
                    borderStyle += " double";
                    break;
                case BorderLineStyle.Inset:
                    borderStyle += " inset";
                    break;
                case BorderLineStyle.None:
                    borderStyle += " none";
                    break;
                case BorderLineStyle.Outset:
                    borderStyle += " outset";
                    break;
                case BorderLineStyle.Single:
                    borderStyle += " solid";
                default:
                    break;
            }
            const rgba = this.control.modelManager.model.colorProvider.getRgbaFromModelColor(borderInfo.color);
            if (ColorUtils.getAlpha(rgba) > 0)
                borderStyle += " " + ColorHelper.getCssStringInternal(rgba);
        }
        return borderStyle;
    }
    getTableWidthUnitCssString(width) {
        return width.type == TableWidthUnitType.FiftiethsOfPercent ? width.value / 50 + "%" : UnitConverter.twipsToPoints(width.value) + "pt";
    }
    getTableStyle(model, table) {
        let defaultTableProperties = model.defaultTableProperties;
        let tableProperties = table ? table.properties : defaultTableProperties;
        let style = table ? table.style : model.getDefaultTableStyle();
        let tableStyle = "";
        let tableIndent = new TablePropertiesMergerIndent().getProperty(tableProperties, style, ConditionalTableStyleFormatting.WholeTable, defaultTableProperties);
        if (tableIndent.value)
            tableStyle += "margin-left:" + this.getTableWidthUnitCssString(tableIndent) + ";";
        let cellSpacing = new TablePropertiesMergerCellSpacing().getProperty(tableProperties, style, ConditionalTableStyleFormatting.WholeTable, defaultTableProperties);
        tableStyle += (cellSpacing.value ? "border-spacing:" + this.getTableWidthUnitCssString(cellSpacing) : "border-collapse: collapse") + ";";
        return tableStyle;
    }
    getCellStyle(model, cell) {
        let cellProperties = cell.properties;
        let defaultTableProperties = model.defaultTableProperties;
        let defaultCellProperties = model.defaultTableCellProperties;
        let parentTable = cell.parentRow.parentTable;
        let tableStyle = parentTable.style;
        let tableHorizontalBorderStyle = this.getBorderCssString((new TablePropertiesMergerBorderHorizontal())
            .getProperty(parentTable.properties, tableStyle, ConditionalTableStyleFormatting.WholeTable, defaultTableProperties));
        let tableVerticalBorderStyle = this.getBorderCssString((new TablePropertiesMergerBorderVertical())
            .getProperty(parentTable.properties, tableStyle, ConditionalTableStyleFormatting.WholeTable, defaultTableProperties));
        let cellStyle = "";
        let topBorderStyle = this.getBorderCssString(cell.getActualTopCellBorder(defaultCellProperties)) || tableVerticalBorderStyle;
        if (topBorderStyle)
            cellStyle += "border-top:" + topBorderStyle + ";";
        let leftBorderStyle = this.getBorderCssString(cell.getActualLeftCellBorder(defaultCellProperties)) || tableHorizontalBorderStyle;
        if (leftBorderStyle)
            cellStyle += "border-left:" + leftBorderStyle + ";";
        let bottomBorderStyle = this.getBorderCssString(cell.getActualBottomCellBorder(defaultCellProperties)) || tableVerticalBorderStyle;
        if (bottomBorderStyle)
            cellStyle += "border-bottom:" + bottomBorderStyle + ";";
        let rightBorderStyle = this.getBorderCssString(cell.getActualRightCellBorder(defaultCellProperties)) || tableHorizontalBorderStyle;
        if (rightBorderStyle)
            cellStyle += "border-right:" + rightBorderStyle + ";";
        let marginLeft = cell.getActualLeftCellMargin(model);
        if (marginLeft.value)
            cellStyle += "padding-left:" + this.getTableWidthUnitCssString(marginLeft) + ";";
        let marginTop = cell.getActualTopCellMargin(model);
        if (marginTop.value)
            cellStyle += "padding-top:" + this.getTableWidthUnitCssString(marginTop) + ";";
        let marginRight = cell.getActualRightCellMargin(model);
        if (marginRight.value)
            cellStyle += "padding-right:" + this.getTableWidthUnitCssString(marginRight) + ";";
        let marginBottom = cell.getActualBottomCellMargin(model);
        if (marginBottom.value)
            cellStyle += "padding-bottom:" + this.getTableWidthUnitCssString(marginBottom) + ";";
        let verticalAlignment = new TableCellVerticalAlignmentMerger().getProperty(cellProperties, tableStyle, cell.conditionalFormatting, defaultCellProperties);
        switch (verticalAlignment) {
            case TableCellVerticalAlignment.Bottom:
                cellStyle += "vertical-align:bottom;";
                break;
            case TableCellVerticalAlignment.Center:
                cellStyle += "vertical-align:middle;";
                break;
            case TableCellVerticalAlignment.Top:
                cellStyle += "vertical-align:top;";
                break;
            default:
                break;
        }
        let cellBackground = new TableCellPropertiesMergerShadingInfo().getProperty(cellProperties, tableStyle, cell.conditionalFormatting, defaultCellProperties)
            .getActualColor(this.colorProvider);
        if (ColorUtils.getAlpha(cellBackground) > 0)
            cellStyle += "background: " + ColorHelper.getCssStringInternal(cellBackground) + ";";
        cellStyle += "width: " + UnitConverter.twipsToPixels(cell.preferredWidth.value) + "px;";
        return cellStyle;
    }
    getTextBoxStyleString(textBoxRun) {
        let contentMargins = textBoxRun.textBoxProperties.getContentMargins();
        let result = "padding-top:" + UnitConverter.twipsToPixels(contentMargins.top) + "px;";
        result += "padding-bottom:" + UnitConverter.twipsToPixels(contentMargins.bottom) + "px;";
        result += "padding-left:" + UnitConverter.twipsToPixels(contentMargins.left) + "px;";
        result += "padding-right:" + UnitConverter.twipsToPixels(contentMargins.right) + "px;";
        result += "border:" + UnitConverter.twipsToPixels(textBoxRun.shape.outlineWidth) + "px solid " + ColorHelper.getCssString(textBoxRun.shape.outlineColor, true) + ";";
        result += "background-color:" + ColorHelper.getCssString(textBoxRun.shape.fillColor, true) + ";";
        return result;
    }
}
