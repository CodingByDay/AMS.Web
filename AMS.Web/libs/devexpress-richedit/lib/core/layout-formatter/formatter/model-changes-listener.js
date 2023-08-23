import { IntervalAlgorithms } from '@devexpress/utils/lib/intervals/algorithms';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { ModelChangeType } from '../../model/changes/enums';
import { JSONCharacterFormattingProperty } from '../../model/json/enums/json-character-enums';
import { JSONAnchorInfoProperty, JSONInlineObjectProperty, JSONShapeProperty } from '../../model/json/enums/json-floating-enums';
import { JSONIOverrideListLevelProperty, JSONListLevelProperty } from '../../model/json/enums/json-list-enums';
import { JSONParagraphFormattingProperty } from '../../model/json/enums/json-paragraph-enums';
import { JSONSectionProperty } from '../../model/json/enums/json-section-enums';
import { JSONServerTableCellProperty } from '../../model/json/enums/table/json-table-cell-enums';
import { JSONEnumTableProperty } from '../../model/json/enums/table/json-table-enums';
import { JSONServerTableRowProperty } from '../../model/json/enums/table/json-table-row-enums';
import { RunType } from '../../model/runs/run-type';
import { HeaderFooterType } from '../../model/section/enums';
import { Log } from '../../rich-utils/debug/logger/base-logger/log';
import { LogObjToStr } from '../../rich-utils/debug/logger/base-logger/log-obj-to-str';
import { LogSource } from '../../rich-utils/debug/logger/base-logger/log-source';
export class ModelChangesListener {
    constructor(invalidator) {
        this.invalidator = invalidator;
    }
    modelChanged(change) {
        switch (change.type) {
            case ModelChangeType.PageColor: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.PageColor", `pageColor:${change.newColor}`);
                this.invalidator.onChangedAllLayout();
                break;
            }
            case ModelChangeType.DefaultTabWidth: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.DefaultTabWidth", `defaultTabWidth:${change.newDefaultTabWidth}`);
                this.invalidator.onChangedAllLayout();
                break;
            }
            case ModelChangeType.DifferentOddAndEvenPages: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.DifferentOddAndEvenPages", `newValue:${change.newValue}`);
                this.invalidator.onChangedAllLayout();
                break;
            }
            case ModelChangeType.HeaderFooterCreated: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.HeaderFooterCreated", () => `isHeader:${change.isHeader}, type:${HeaderFooterType[change.headerFooterType]}, subDocumentInfo:${LogObjToStr.headerFooterSubDocumentInfoBase(change.subDocumentInfo)}`);
                this.invalidator.onChangedAllLayout();
                break;
            }
            case ModelChangeType.HeaderFooterIndexChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.HeaderFooterIndexChanged", () => `sectionIndex:${change.sectionIndex}, isHeader:${change.isHeader}, type:${HeaderFooterType[change.headerFooterType]}, newIndex:${change.newIndex}`);
                this.invalidator.onHeaderFooterIndexChanged(change.sectionIndex, change.headerFooterType);
                break;
            }
            case ModelChangeType.SectionFormattingChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.SectionFormattingChanged", () => `property:${JSONSectionProperty[change.property]}, newState:${LogObjToStr.historyItemState(LogObjToStr.historyItemSectionStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onChangedSections(change.startSectionIndex, change.endSectionIndex);
                break;
            }
            case ModelChangeType.CreateStyleLink: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.CreateStyleLink", `paragraphStyleName:${change.paragraphStyleName}`);
                break;
            }
            case ModelChangeType.DeleteStyleLink: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.DeleteStyleLink", `paragraphStyleName:${change.paragraphStyleName}`);
                break;
            }
            case ModelChangeType.AbstractNumberingListAdded: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AbstractNumberingListAdded", `index:${change.index}`);
                break;
            }
            case ModelChangeType.AbstractNumberingListDeleted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AbstractNumberingListDeleted", `index:${change.index}`);
                break;
            }
            case ModelChangeType.NumberingListAdded: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.NumberingListAdded", `index:${change.index}`);
                break;
            }
            case ModelChangeType.NumberingListDeleted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.NumberingListDeleted", `index:${change.index}`);
                break;
            }
            case ModelChangeType.ListLevelPropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ListLevelPropertyChanged", `property:${JSONListLevelProperty[change.property]}, newState:${LogObjToStr.historyItemState(LogObjToStr.historyItemListLevelStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onListLevelChanged(change.newState);
                break;
            }
            case ModelChangeType.ListLevelParagraphPropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ListLevelParagraphPropertyChanged", () => `property:${JSONParagraphFormattingProperty[change.property]}, newState:${LogObjToStr.historyItemState(LogObjToStr.historyItemListLevelUseStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onListLevelChanged(change.newState);
                break;
            }
            case ModelChangeType.ListLevelCharacterPropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ListLevelCharacterPropertyChanged", () => `property:${JSONCharacterFormattingProperty[change.property]}, newState:${LogObjToStr.historyItemState(LogObjToStr.historyItemListLevelUseStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onListLevelChanged(change.newState);
                break;
            }
            case ModelChangeType.IOverrideListLevelChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.IOverrideListLevelChanged", () => `property:${JSONIOverrideListLevelProperty[change.property]}, newState:${LogObjToStr.historyItemState(LogObjToStr.historyItemListLevelStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onListLevelChanged(change.newState);
                break;
            }
            case ModelChangeType.BookmarkCreated: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.BookmarkCreated", () => `subDocumentId:${change.subDocumentId}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, FixedInterval.makeByConstInterval(change.bkmTempate.interval));
                break;
            }
            case ModelChangeType.BookmarkDeleted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.BookmarkDeleted", () => `subDocumentId:${change.subDocumentId}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, FixedInterval.makeByConstInterval(change.bkmTempate.interval));
                break;
            }
            case ModelChangeType.TabInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TabInserted", () => `subDocumentId:${change.subDocumentId}, newState:${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.newState.interval);
                break;
            }
            case ModelChangeType.TabDeleted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TabDeleted", () => `subDocumentId:${change.subDocumentId}, newState:${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.newState.interval);
                break;
            }
            case ModelChangeType.InlinePictureInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.InlinePictureInserted", () => `subDocumentId:${change.subDocumentId}, position:${change.position}, id:${change.picInfo.cacheInfo.currId}`);
                this.invalidator.onContentInserted(change.subDocumentId, change.position, 1, false);
                break;
            }
            case ModelChangeType.InlinePicturesUpdated: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.InlinePicturesUpdated", () => `subDocumentId:${change.subDocumentId}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.updatedImageInfo.position, 1));
                break;
            }
            case ModelChangeType.AnchoredPictureInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AnchoredPictureInserted", () => `subDocumentId:${change.subDocumentId}, position:${change.position}, id:${change.id}, scaleX:${change.size.scale.width}, scaleY:${change.size.scale.height}, anchorInfo:${change.anchorInfo}`);
                this.invalidator.onContentInserted(change.subDocumentId, change.position, 1, false);
                break;
            }
            case ModelChangeType.AnchoredPictureSizeChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AnchoredPictureSizeChanged", () => `subDocumentId:${change.subDocumentId}, position:${change.position}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.position, 1));
                break;
            }
            case ModelChangeType.InlineObjectRunPropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.InlineObjectRunPropertyChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONInlineObjectProperty[change.property]}, position:${change.position}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                const interval = change.newState.interval;
                this.invalidator.onIntervalChanged(change.subDocumentId, FixedInterval.fromPositions(Math.max(0, interval.start - 1), interval.end));
                break;
            }
            case ModelChangeType.HyperlinkInfoChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.HyperlinkInfoChanged", () => `subDocumentId:${change.subDocumentId}, fieldResultInterval:${LogObjToStr.fixedInterval(change.fieldResultInterval)}, newHyperlinkInfo:${LogObjToStr.hyperlinkInfo(change.newHyperlinkInfo)}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.fieldResultInterval);
                break;
            }
            case ModelChangeType.FieldsShowCodeChanged: {
                this.invalidator.onIntervalChanged(change.subDocumentId, change.fieldInterval);
                break;
            }
            case ModelChangeType.SimpleRunInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.SimpleRunInserted", () => `subDocumentId:${change.subDocumentId}, logPosition:${change.position}, length:${length} type:${RunType[change.runType]}`);
                this.invalidator.onContentInserted(change.subDocumentId, change.position, change.length, false);
                break;
            }
            case ModelChangeType.TextBufferChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.SimpleRunInserted", () => `subDocumentId:${change.subDocumentId}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.newState.interval);
                break;
            }
            case ModelChangeType.ParagraphInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TextBufferChanged", () => `subDocumentId:${change.subDocumentId}, position:${change.position}`);
                this.invalidator.onContentInserted(change.subDocumentId, change.position, 1, true);
                break;
            }
            case ModelChangeType.SectionInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.SectionInserted", () => `subDocumentId:${change.subDocumentId}, position:${change.position}`);
                this.invalidator.onChangedSections(change.sectionIndex, change.sectionIndex);
                break;
            }
            case ModelChangeType.AnchoredTextBoxInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AnchoredTextBoxInserted", () => `subDocumentId:${change.subDocumentId}, position:${change.position}, anchorInfo:${change.anchorInfo}`);
                this.invalidator.onContentInserted(change.subDocumentId, change.position, 1, false);
                break;
            }
            case ModelChangeType.AnchorObjectRemoved: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AnchorObjectRemoved", () => `subDocumentId:${change.subDocumentId}, position:${change.position}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.position, 1));
                break;
            }
            case ModelChangeType.IntervalRemoved: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.IntervalRemoved", () => `subDocumentId:${change.subDocumentId}, position:${change.interval.start}, length:${change.interval.length}`);
                this.invalidator.onContentInserted(change.subDocumentId, change.interval.start, -change.interval.length, false);
                break;
            }
            case ModelChangeType.ParagraphMerged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ParagraphMerged", () => `subDocumentId:${change.subDocumentId}, position:${change.position}, getPropertiesFromNext:${change.getPropertiesFromNext}`);
                this.invalidator.onContentInserted(change.subDocumentId, change.position, -1, true);
                break;
            }
            case ModelChangeType.SectionMerged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.SectionMerged", () => `sectionIndex:${change.sectionIndex}, getPropertiesFromNext:${change.getPropertiesFromNext}`);
                this.invalidator.onChangedSections(change.sectionIndex, change.sectionIndex);
                break;
            }
            case ModelChangeType.CharacterFormattingChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.CharacterFormattingChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONCharacterFormattingProperty[change.property]}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.newState.interval);
                break;
            }
            case ModelChangeType.CharacterPropertiesChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.CharacterPropertiesChanged", () => `subDocumentId:${change.subDocumentId}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.newState.interval);
                break;
            }
            case ModelChangeType.ParagraphFormattingChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ParagraphFormattingChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONParagraphFormattingProperty[change.property]}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                const interval = change.newState.interval;
                this.invalidator.onIntervalChanged(change.subDocumentId, FixedInterval.fromPositions(Math.max(0, interval.start - 1), interval.end));
                break;
            }
            case ModelChangeType.ParagraphPropertiesChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ParagraphPropertiesChanged", () => `subDocumentId:${change.subDocumentId}, paragraphIndex: ${change.paragraphIndex}}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.paragraphInterval);
                break;
            }
            case ModelChangeType.ParagraphAndCharacterMergedPropertiesReset: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ParagraphAndCharacterMergedPropertiesReset", () => `subDocumentId:${change.subDocumentId}, interval:${LogObjToStr.fixedInterval(change.interval)}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.interval);
                break;
            }
            case ModelChangeType.AnchoredTextBoxSizeChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AnchoredTextBoxSizeChanged", () => `subDocumentId:${change.subDocumentId}, position:${change.position}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.position, 1));
                break;
            }
            case ModelChangeType.AnchoredTextBoxPropertiesChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AnchoredTextBoxPropertiesChanged", () => `subDocumentId:${change.subDocumentId}, position:${change.position}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.position, 1));
                break;
            }
            case ModelChangeType.AnchorInfoPropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.AnchorInfoPropertyChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONAnchorInfoProperty[change.property]}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                if (change.property === JSONAnchorInfoProperty.ZOrder)
                    this.invalidator.onChangedAllLayout();
                else
                    this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.newState.interval.start, 1));
                break;
            }
            case ModelChangeType.ShapeChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ShapePropertyChanged", () => `subDocumentId:${change.subDocumentId}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.newState.interval.start, 1));
                break;
            }
            case ModelChangeType.ShapePropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ShapePropertyChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONShapeProperty[change.property]}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, new FixedInterval(change.newState.interval.start, 1));
                break;
            }
            case ModelChangeType.CharacterStyleApplied: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.CharacterStyleApplied", () => `subDocumentId:${change.subDocumentId}, newState:${LogObjToStr.historyItemIntervalState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.newState.interval);
                break;
            }
            case ModelChangeType.ParagraphStyleApplied: {
                Log.print(LogSource.LayoutFormatterNotifier, `modelChanged.ParagraphStyleApplied. subDocumentId:${change.subDocumentId}, newState:`, change.newState);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.newState.interval);
                break;
            }
            case ModelChangeType.TableStyleChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableStyleChanged", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}, newStyleName:${change.newStyle.styleName}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.ParagraphNumberingListChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.ParagraphNumberingListChanged", () => `subDocumentId:${change.subDocumentId}, newState:${LogObjToStr.historyItemIntervalState(LogObjToStr.historyItemIntervalStateObject, change.newState, "\t", "\n")()}, oldAbstractNumberingListIndex: ${change.oldAbstractNumberingListIndex}`);
                const intervals = [change.newState.interval];
                const intervalStart = change.newState.interval.start;
                const paragraphIndex = SearchUtils.normedInterpolationIndexOf(change.subDocument.paragraphs, p => p.startLogPosition.value, intervalStart);
                const newAbstractNumberingListIndex = change.subDocument.paragraphs[paragraphIndex].getAbstractNumberingListIndex();
                for (let i = paragraphIndex + 1, paragraph; paragraph = change.subDocument.paragraphs[i]; i++) {
                    const parAbstractNumberingListIndex = paragraph.getAbstractNumberingListIndex();
                    if (parAbstractNumberingListIndex === change.oldAbstractNumberingListIndex || parAbstractNumberingListIndex === newAbstractNumberingListIndex)
                        intervals.push(paragraph.interval);
                }
                const mergedIntervals = IntervalAlgorithms.getMergedIntervals(intervals, true);
                for (let interval of mergedIntervals)
                    this.invalidator.onIntervalChanged(change.subDocumentId, interval);
                break;
            }
            case ModelChangeType.TableCreated: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableCreated", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableRemoved: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableRemoved", () => `subDocumentId:${change.subDocumentId}, startPosition:${change.startPosition}, endPosition:${change.endPosition}, nestedLevel:${change.nestedLevel}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, FixedInterval.fromPositions(change.startPosition, change.endPosition));
                break;
            }
            case ModelChangeType.TableStartPositionShifted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableStartPositionShifted", () => `subDocumentId:${change.subDocumentId}, oldPosition:${change.oldPosition}, newPosition:${change.newPosition}, tableIndex:${change.table.index}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableCellPropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableCellPropertyChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONServerTableCellProperty[change.property]}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemTableCellStateObject, change.newState, "\t", "\n")()}`);
                for (let state of change.newState.objects)
                    this.invalidator.onIntervalChanged(change.subDocumentId, change.subDocument.tables[state.tableIndex].getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TablePropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TablePropertyChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONEnumTableProperty[change.property]}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemTableStateObject, change.newState, "\t", "\n")()}`);
                for (let state of change.newState.objects)
                    this.invalidator.onIntervalChanged(change.subDocumentId, change.subDocument.tables[state.tableIndex].getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableRowPropertyChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableRowPropertyChanged", () => `subDocumentId:${change.subDocumentId}, property:${JSONServerTableRowProperty[change.property]}, newState:\n${LogObjToStr.historyItemState(LogObjToStr.historyItemTableRowStateObject, change.newState, "\t", "\n")()}`);
                for (let state of change.newState.objects)
                    this.invalidator.onIntervalChanged(change.subDocumentId, change.subDocument.tables[state.tableIndex].getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableCellSplittedHorizontally: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableCellSplittedHorizontally", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}, rowIndex:${change.rowIndex}, cellIndex:${change.cellIndex}, rightDirection:${change.rightDirection}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableCellMergedHorizontally: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableCellMergedHorizontally", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}, rowIndex:${change.rowIndex}, cellIndex:${change.cellIndex}, rightDirection:${change.rightDirection}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableRowInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableRowInserted", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}, rowIndex:${change.rowIndex}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableRowRemoved: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableRowRemoved", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}, rowIndex:${change.rowIndex}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableCellRemoved: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableCellRemoved", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}, rowIndex:${change.rowIndex}, cellIndex:${change.cellIndex}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.TableCellInserted: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.TableCellInserted", () => `subDocumentId:${change.subDocumentId}, tableIndex:${change.table.index}, rowIndex:${change.rowIndex}, cellIndex:${change.cellIndex}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, change.table.getTopLevelParent().interval);
                break;
            }
            case ModelChangeType.DocumentProtectionChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.DocumentProtectionChanged", `enforceProtection:${change.documentProtectionProperties.enforceProtection}`);
                this.invalidator.onChangedAllLayout();
                break;
            }
            case ModelChangeType.RangePermissionsChanged: {
                Log.print(LogSource.LayoutFormatterNotifier, "modelChanged.RangePermissionsChanged", () => `subDocumentId:${change.subDocumentId},  interval:${LogObjToStr.fixedInterval(change.permission.interval)}, userName:${change.permission.userName}, group:${change.permission.group}`);
                this.invalidator.onIntervalChanged(change.subDocumentId, FixedInterval.makeByConstInterval(change.permission.interval));
                break;
            }
        }
    }
}
