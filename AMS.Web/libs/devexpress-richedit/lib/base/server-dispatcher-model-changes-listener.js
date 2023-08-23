import { ModelChangeType } from '../core/model/changes/enums';
import { ClientServerTextBufferChangedCommandRequest, EditCommandRequest, EditTextBufferCommandRequest, LoadCommandRequest, RequestParams } from '../core/model/json/command-request';
import { CommandType } from '../core/model/json/command-type';
import { JSONCharacterFormattingProperty, JSONFontInfoProperty, JSONInsertTextCommandProperty, JSONLoadFontInfoCommand } from '../core/model/json/enums/json-character-enums';
import { JSONModelPropertyProperty } from '../core/model/json/enums/json-document-enums';
import { JSONFieldProperty } from '../core/model/json/enums/json-field-enums';
import { JSONInlinePictureCommandsImageInfo, JSONInsertFloatingObjectCommandInfo } from '../core/model/json/enums/json-floating-enums';
import { JSONAddAbstractNumberingListCommandPropery, JSONDeleteAbstractNumberingListCommandProperty } from '../core/model/json/enums/json-list-enums';
import { JSONInsertParagraphCommandProperty, JSONMergeParagraphsCommandProperty, JSONParagraphFormattingProperty, JSONParagraphPropertiesChangedProperty } from '../core/model/json/enums/json-paragraph-enums';
import { JSONDeleteRunsCommandProperty } from '../core/model/json/enums/json-run-enums';
import { JSONInsertSectionCommandProperty, JSONMergeSectionsCommandProperty } from '../core/model/json/enums/json-section-enums';
import { JSONStyleLinkCommandBaseProperty } from '../core/model/json/enums/json-style-enums';
import { JSONChangeHeaderFooterIndexCommandBase, JSONCreateHeaderFooterCommandBaseProperty } from '../core/model/json/enums/json-sub-document-enums';
import { JSONPropertyStateBasedCommand } from '../core/model/json/enums/json-top-level-enums';
import { JSONEnumClientTableCellFormatting, JSONEnumClientTableCellInfo, JSONServerTableCellProperty } from '../core/model/json/enums/table/json-table-cell-enums';
import { JSONEnumClientTableFormatting, JSONEnumClientTableInfo, JSONEnumClientTablePosition, JSONEnumTableProperty } from '../core/model/json/enums/table/json-table-enums';
import { JSONEnumClientTableRowFormatting, JSONEnumClientTableRowInfo, JSONServerTableRowProperty } from '../core/model/json/enums/table/json-table-row-enums';
import { JSONCacheImageInfoConverter } from '../core/model/json/importers/image-cache-info-converter';
import { SizeExporter } from '../core/model/json/importers/json-importer';
import { JSONMaskedCharacterPropertiesConverter } from '../core/model/json/importers/json-masked-character-properties-converter';
import { JSONMaskedParagraphPropertiesConverter } from '../core/model/json/importers/json-masked-paragraph-properties-converter';
import { JSONTabConverter } from '../core/model/json/importers/json-tab-converter';
import { JSONListLevelPropertiesConverter } from '../core/model/json/importers/numbering-list/json-list-level-properties-converter';
import { JSONSectionPropertiesConverter } from '../core/model/json/importers/section/json-section-properties-converter';
import { JSONAnchorInfoConverter } from '../core/model/json/importers/sub-document/json-anchor-info-converter';
import { JSONNonVisualPropertiesConverter } from '../core/model/json/importers/sub-document/json-non-visual-properties';
import { JSONInlinePictureSizeConverterConverter } from '../core/model/json/importers/sub-document/sizes/json-inline-picture-size-converter';
import { JSONTableCellPropertiesConverter } from '../core/model/json/importers/table/json-table-cell-properties-converter';
import { JSONTablePropertiesConverter } from '../core/model/json/importers/table/json-table-properties-converter';
import { JSONTableRowPropertiesConverter } from '../core/model/json/importers/table/json-table-row-properties-converter';
import { JSONTableHeightUnitConverter, JSONTableWidthUnitConverter } from '../core/model/json/importers/table/json-table-unit-converter';
import { OverrideListLevel } from '../core/model/numbering-lists/list-level';
import { SubDocument } from '../core/model/sub-document';
import { boolToInt } from '@devexpress/utils/lib/utils/common';
export class ServerDispatcherModelChangesListener {
    constructor(dispatcher) {
        this.dispatcher = dispatcher;
    }
    modelChanged(change) {
        switch (change.type) {
            case ModelChangeType.PageColor: {
                const params = {
                    [JSONModelPropertyProperty.PageColor]: change.newColor
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.ChangePageColor, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.DefaultTabWidth: {
                const params = {
                    [JSONModelPropertyProperty.DefaultTabWidth]: change.newDefaultTabWidth
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.ChangeDefaultTabWidth, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.DifferentOddAndEvenPages: {
                const params = {
                    [JSONModelPropertyProperty.OddEvenPages]: boolToInt(change.newValue)
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.ChangeDifferentOddAndEvenPages, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.HeaderFooterCreated: {
                const params = {
                    [JSONCreateHeaderFooterCommandBaseProperty.Type]: change.headerFooterType
                };
                const command = change.isHeader ? CommandType.CreateHeader : CommandType.CreateFooter;
                this.dispatcher.pushRequest(new EditCommandRequest(command, change.subDocumentInfo.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.HeaderFooterIndexChanged: {
                const params = {
                    [JSONChangeHeaderFooterIndexCommandBase.SectionIndex]: change.sectionIndex,
                    [JSONChangeHeaderFooterIndexCommandBase.NewObjectIndex]: change.newIndex,
                    [JSONChangeHeaderFooterIndexCommandBase.Type]: change.headerFooterType,
                };
                const command = change.isHeader ? CommandType.ChangeHeaderIndex : CommandType.ChangeFooterIndex;
                this.dispatcher.pushRequest(new EditCommandRequest(command, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.LoadFontInfo: {
                const params = {
                    [JSONLoadFontInfoCommand.FontInfo]: {
                        [JSONFontInfoProperty.FontFamily]: change.fontInfo.getFontFamilies()[0]
                    }
                };
                this.dispatcher.pushRequest(new LoadCommandRequest(CommandType.LoadFontInfo, -1, params), new RequestParams(false, true, false));
                break;
            }
            case ModelChangeType.SectionFormattingChanged: {
                this.pushPropertyRequest(-1, change.property, change.newState, CommandType.ChangeSectionProperties);
                break;
            }
            case ModelChangeType.CreateStyleLink: {
                const params = {
                    [JSONStyleLinkCommandBaseProperty.StyleName]: change.paragraphStyleName
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.CreateStyleLink, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.DeleteStyleLink: {
                const params = {
                    [JSONStyleLinkCommandBaseProperty.StyleName]: change.paragraphStyleName
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.DeleteStyleLink, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.ListLevelPropertyChanged: {
                this.pushPropertyRequest(-1, change.property, change.newState, CommandType.ChangeListLevelProperties);
                break;
            }
            case ModelChangeType.ListLevelParagraphPropertyChanged: {
                this.pushPropertyRequest(-1, change.property, change.newState, CommandType.ChangeListLevelParagraphProperties);
                break;
            }
            case ModelChangeType.ListLevelCharacterPropertyChanged: {
                this.pushPropertyRequest(-1, change.property, change.newState, CommandType.ChangeListLevelCharacterProperties);
                break;
            }
            case ModelChangeType.IOverrideListLevelChanged: {
                this.pushPropertyRequest(-1, change.property, change.newState, CommandType.ChangeIOverrideListLevel);
                break;
            }
            case ModelChangeType.BookmarkCreated: {
                this.pushStateBasedRequestNew(change.subDocumentId, change, CommandType.CreateBookmark);
                break;
            }
            case ModelChangeType.BookmarkDeleted: {
                this.pushStateBasedRequestNew(change.subDocumentId, change, CommandType.DeleteBookmark);
                break;
            }
            case ModelChangeType.TabInserted: {
                this.pushStateBasedRequestNew(change.subDocumentId, change, CommandType.InsertTabToParagraph);
                break;
            }
            case ModelChangeType.TabDeleted: {
                this.pushStateBasedRequestNew(change.subDocumentId, change, CommandType.DeleteTabAtParagraph);
                break;
            }
            case ModelChangeType.LoadPicturesInfo: {
                const params = {
                    0: JSONCacheImageInfoConverter.convertToJSON(change.data, true)
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.LoadPicturesInfo, change.subDocumentId, params), new RequestParams(false, true, false));
                break;
            }
            case ModelChangeType.InlinePicturesUpdated: {
                const imageInfo = change.updatedImageInfo;
                const params = {
                    0: {
                        [JSONInlinePictureCommandsImageInfo.Position]: imageInfo.position,
                        [JSONInlinePictureCommandsImageInfo.CacheInfo]: JSONCacheImageInfoConverter.convertToJSON(imageInfo.info, false),
                        [JSONInlinePictureCommandsImageInfo.ScaleSize]: SizeExporter.convertToJSON(imageInfo.size.scale),
                    }
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.UpdateInlinePictures, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.InlinePictureInserted: {
                const params = {
                    [JSONInlinePictureCommandsImageInfo.Position]: change.position,
                    [JSONInlinePictureCommandsImageInfo.CacheInfo]: JSONCacheImageInfoConverter.convertToJSON(change.picInfo.cacheInfo, false),
                    [JSONInlinePictureCommandsImageInfo.ScaleSize]: SizeExporter.convertToJSON(change.picInfo.size.scale),
                    [JSONInlinePictureCommandsImageInfo.DrawingObjectProperties]: JSONNonVisualPropertiesConverter.convertToJSON(change.containerProperties),
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertInlinePicture, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.AnchoredPictureInserted: {
                const params = {
                    [JSONInsertFloatingObjectCommandInfo.Position]: change.position,
                    [JSONInsertFloatingObjectCommandInfo.Size]: JSONInlinePictureSizeConverterConverter.convertToJSON(change.size),
                    [JSONInsertFloatingObjectCommandInfo.ImageCacheId]: change.id,
                    [JSONInsertFloatingObjectCommandInfo.AnchorInfo]: JSONAnchorInfoConverter.convertToJSON(change.anchorInfo),
                    [JSONInsertFloatingObjectCommandInfo.DrawingObjectProperties]: JSONNonVisualPropertiesConverter.convertToJSON(change.containerProperties),
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertAnchoredPicture, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.AnchoredPictureSizeChanged: {
                this.pushStateBasedRequestNew(change.subDocumentId, change, CommandType.ChangeAnchoredPictureSize);
                break;
            }
            case ModelChangeType.InlineObjectRunPropertyChanged: {
                this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, CommandType.ChangeInlineObjectProperties);
                break;
            }
            case ModelChangeType.FieldInserted: {
                const params = {
                    [JSONFieldProperty.StartPos]: change.startPosition,
                    [JSONFieldProperty.SeparatorPos]: change.separatorPosition,
                    [JSONFieldProperty.EndPos]: change.endPosition,
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertField, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.FieldDeleted: {
                const params = {
                    [JSONFieldProperty.EndPos]: change.endPosition
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.DeleteField, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.HyperlinkInfoChanged: {
                const params = {
                    [JSONFieldProperty.StartPos]: change.fieldCodeInterval.start - 1,
                    [JSONFieldProperty.EndPos]: change.fieldResultInterval.end + 1,
                };
                if (change.newHyperlinkInfo) {
                    params[JSONFieldProperty.Uri] = change.newHyperlinkInfo.uri;
                    params[JSONFieldProperty.Anchor] = change.newHyperlinkInfo.anchor;
                    params[JSONFieldProperty.Tip] = change.newHyperlinkInfo.tip;
                    params[JSONFieldProperty.Visited] = boolToInt(change.newHyperlinkInfo.visited);
                }
                else
                    params[JSONFieldProperty.NoInfo] = 1;
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.HyperlinkInfoChanged, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.SimpleRunInserted: {
                const characterPropertiesJSON = JSONMaskedCharacterPropertiesConverter.convertToJSON(change.characterProperties);
                let lastRequestInQueue = this.dispatcher.lastRequestInQueue;
                if (lastRequestInQueue && lastRequestInQueue.extendTextRequest(change.subDocumentId, change.position, change.length, characterPropertiesJSON, change.characterStyle.styleName, change.runType, change.text))
                    return;
                const params = {
                    [JSONInsertTextCommandProperty.Position]: change.position,
                    [JSONInsertTextCommandProperty.Length]: change.length,
                    [JSONInsertTextCommandProperty.RunType]: change.runType,
                    [JSONInsertTextCommandProperty.CharacterProperties]: characterPropertiesJSON,
                    [JSONInsertTextCommandProperty.CharacterStyleName]: change.characterStyle.styleName,
                };
                this.dispatcher.pushRequest(new EditTextBufferCommandRequest(CommandType.InsertSimpleRun, change.subDocumentId, change.text, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TextBufferChanged: {
                this.dispatcher.pushRequest(new ClientServerTextBufferChangedCommandRequest(CommandType.ChangeTextBuffer, change.subDocumentId, change.newState, {}), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.ParagraphInserted: {
                const params = {
                    [JSONInsertParagraphCommandProperty.Position]: change.position,
                    [JSONInsertParagraphCommandProperty.ParagraphProperties]: JSONMaskedParagraphPropertiesConverter.convertToJSON(change.paragraph.maskedParagraphProperties),
                    [JSONInsertParagraphCommandProperty.StyleName]: change.paragraph.paragraphStyle.styleName,
                    [JSONInsertParagraphCommandProperty.NumberingListIndex]: change.paragraph.numberingListIndex,
                    [JSONInsertParagraphCommandProperty.ListLevelIndex]: change.paragraph.listLevelIndex,
                };
                var tabParams = [];
                for (let i = 0, tabInfo; tabInfo = change.paragraph.tabs.tabsInfo[i]; i++)
                    tabParams.push(JSONTabConverter.convertToJSON(tabInfo));
                params[JSONInsertParagraphCommandProperty.TabsProperties] = tabParams;
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertParagraph, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.SectionInserted: {
                const params = {
                    [JSONInsertSectionCommandProperty.Position]: change.position,
                    [JSONInsertSectionCommandProperty.SectionProperties]: JSONSectionPropertiesConverter.convertToJSON(change.section.sectionProperties),
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertSection, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.AnchoredTextBoxInserted: {
                const params = {
                    [JSONInsertFloatingObjectCommandInfo.Position]: change.position,
                    [JSONInsertFloatingObjectCommandInfo.SubDocId]: change.innerSubDocId,
                    [JSONInsertFloatingObjectCommandInfo.AnchorInfo]: JSONAnchorInfoConverter.convertToJSON(change.anchorInfo),
                    [JSONInsertFloatingObjectCommandInfo.DrawingObjectProperties]: JSONNonVisualPropertiesConverter.convertToJSON(change.containerProperties)
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertAnchoredTextBox, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.AnchorObjectRemoved: {
                break;
            }
            case ModelChangeType.IntervalRemoved: {
                const params = {
                    [JSONDeleteRunsCommandProperty.Position]: change.interval.start,
                    [JSONDeleteRunsCommandProperty.Length]: change.interval.length,
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.DeleteRuns, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.ParagraphMerged: {
                const params = {
                    [JSONMergeParagraphsCommandProperty.Position]: change.position,
                    [JSONMergeParagraphsCommandProperty.GetPropertiesFromNext]: boolToInt(change.getPropertiesFromNext),
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.MergeParagraphs, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.SectionMerged: {
                const params = {
                    [JSONMergeSectionsCommandProperty.SectionIndex]: change.sectionIndex,
                    [JSONMergeSectionsCommandProperty.GetPropertiesFromNext]: boolToInt(change.getPropertiesFromNext),
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.MergeSections, SubDocument.MAIN_SUBDOCUMENT_ID, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.CharacterFormattingChanged: {
                if (change.property === JSONCharacterFormattingProperty.UseValue)
                    this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ChangeCharacterPropertiesUseValue);
                else
                    this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, CommandType.ChangeCharacterProperty);
                break;
            }
            case ModelChangeType.CharacterPropertiesChanged: {
                this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ChangeCharacterProperties);
                break;
            }
            case ModelChangeType.ParagraphFormattingChanged: {
                if (change.property === JSONParagraphFormattingProperty.UseValue)
                    this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ChangeParagraphPropertiesUseValue);
                else
                    this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, CommandType.ChangeParagraphProperty);
                break;
            }
            case ModelChangeType.ParagraphPropertiesChanged: {
                const params = {
                    [JSONParagraphPropertiesChangedProperty.ParagraphIndex]: change.paragraphIndex,
                    [JSONParagraphPropertiesChangedProperty.ParagraphProperties]: JSONMaskedParagraphPropertiesConverter.convertToJSON(change.properties),
                    [JSONParagraphPropertiesChangedProperty.ListLevelIndex]: change.listInfo.listLevelIndex,
                    [JSONParagraphPropertiesChangedProperty.NumberingListIndex]: change.listInfo.numberingListIndex,
                    [JSONParagraphPropertiesChangedProperty.StyleName]: change.style.styleName,
                };
                var tabParams = [];
                for (let i = 0, tabInfo; tabInfo = change.tabs.tabsInfo[i]; i++)
                    tabParams.push(JSONTabConverter.convertToJSON(tabInfo));
                params[JSONParagraphPropertiesChangedProperty.TabsProperties] = tabParams;
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.ChangeParagraphProperties, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.AnchoredTextBoxSizeChanged: {
                this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ChangeAnchoredTextBoxSize);
                break;
            }
            case ModelChangeType.AnchoredTextBoxPropertiesChanged: {
                this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ChangeTextBoxProperties);
                break;
            }
            case ModelChangeType.AnchorInfoPropertyChanged: {
                this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, CommandType.ChangeAnchorInfoProperty);
                break;
            }
            case ModelChangeType.ShapePropertyChanged: {
                this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, CommandType.ChangeAnchoredObjectShapeProperty);
                break;
            }
            case ModelChangeType.CharacterStyleApplied: {
                this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ApplyCharacterStyle);
                break;
            }
            case ModelChangeType.ParagraphStyleApplied: {
                this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ApplyParagraphStyle);
                break;
            }
            case ModelChangeType.TableStyleChanged: {
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.TableInfo]: {
                        [JSONEnumClientTableFormatting.StyleName]: change.newStyle ? change.newStyle.styleName : null
                    }
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.ApplyTableStyle, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.ParagraphNumberingListChanged: {
                this.pushStateBasedRequest(change.subDocumentId, change.newState, CommandType.ApplyNumberingList);
                break;
            }
            case ModelChangeType.AbstractNumberingListAdded: {
                const numberingList = this.dispatcher.control.modelManager.model.abstractNumberingLists[change.index];
                const listLevelsInfo = [];
                for (let listLevel of numberingList.levels) {
                    const levelInfo = {};
                    levelInfo[JSONAddAbstractNumberingListCommandPropery.CharacterProperties] = JSONMaskedCharacterPropertiesConverter.convertToJSON(listLevel.getCharacterProperties());
                    levelInfo[JSONAddAbstractNumberingListCommandPropery.ParagraphProperties] = JSONMaskedParagraphPropertiesConverter.convertToJSON(listLevel.getParagraphProperties());
                    levelInfo[JSONAddAbstractNumberingListCommandPropery.ListLevelProperties] = JSONListLevelPropertiesConverter.convertToJSON(listLevel.getListLevelProperties());
                    listLevelsInfo.push(levelInfo);
                }
                const params = {
                    [JSONAddAbstractNumberingListCommandPropery.Deleted]: boolToInt(numberingList.deleted),
                    [JSONAddAbstractNumberingListCommandPropery.Levels]: listLevelsInfo,
                    [JSONAddAbstractNumberingListCommandPropery.InnerId]: numberingList.getId(),
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.AddAbstractNumberingList, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.AbstractNumberingListDeleted: {
                const params = {
                    [JSONDeleteAbstractNumberingListCommandProperty.Index]: change.index
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.DeleteAbstractNumberingList, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.NumberingListAdded: {
                const numberingList = this.dispatcher.control.modelManager.model.numberingLists[change.index];
                const listLevelsInfo = [];
                for (var listLevel, i = 0; listLevel = numberingList.levels[i]; i++) {
                    const levelInfo = {};
                    if (listLevel instanceof OverrideListLevel) {
                        levelInfo[JSONAddAbstractNumberingListCommandPropery.CharacterProperties] = JSONMaskedCharacterPropertiesConverter.convertToJSON(listLevel.getCharacterProperties());
                        levelInfo[JSONAddAbstractNumberingListCommandPropery.ParagraphProperties] = JSONMaskedParagraphPropertiesConverter.convertToJSON(listLevel.getParagraphProperties());
                        levelInfo[JSONAddAbstractNumberingListCommandPropery.ListLevelProperties] = JSONListLevelPropertiesConverter.convertToJSON(listLevel.getListLevelProperties());
                    }
                    else {
                        levelInfo[JSONAddAbstractNumberingListCommandPropery.NewStart] = listLevel.getNewStart();
                    }
                    levelInfo[JSONAddAbstractNumberingListCommandPropery.OverrideStart] = boolToInt(listLevel.overrideStart);
                    listLevelsInfo.push(levelInfo);
                }
                const params = {
                    [JSONAddAbstractNumberingListCommandPropery.AbstractNumberingListIndex]: numberingList.abstractNumberingListIndex,
                    [JSONAddAbstractNumberingListCommandPropery.Deleted]: numberingList.deleted,
                    [JSONAddAbstractNumberingListCommandPropery.InnerId]: numberingList.getId(),
                    [JSONAddAbstractNumberingListCommandPropery.Levels]: listLevelsInfo,
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.AddNumberingList, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.NumberingListDeleted: {
                const params = {
                    [JSONDeleteAbstractNumberingListCommandProperty.Index]: change.index
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.DeleteNumberingList, -1, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableCreated: {
                const params = {
                    [JSONEnumClientTableInfo.Position]: change.table.getStartPosition(),
                    [JSONEnumClientTableInfo.Rows]: JSONTableHelper.getJSONTableRows(change.table),
                    [JSONEnumClientTableInfo.TableInfo]: JSONTableHelper.getJSONTableInfo(change.table),
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.CreateTable, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableRemoved: {
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSONCore(change.startPosition, change.nestedLevel)
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.RemoveTable, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableStartPositionShifted: {
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.Position]: change.newPosition,
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.ShiftTableStartPosition, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableCellPropertyChanged: {
                let commandType;
                switch (change.property) {
                    case JSONServerTableCellProperty.ColumnSpan:
                    case JSONServerTableCellProperty.PreferredWidth:
                    case JSONServerTableCellProperty.VerticalMerging:
                        commandType = CommandType.ChangeTableCell;
                        break;
                    default:
                        commandType = CommandType.ChangeTableCellProperty;
                        break;
                }
                this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, commandType);
                break;
            }
            case ModelChangeType.TablePropertyChanged: {
                let commandType;
                switch (change.property) {
                    case JSONEnumTableProperty.PreferredWidth:
                    case JSONEnumTableProperty.TableLookTypes:
                        commandType = CommandType.ChangeTable;
                        break;
                    default:
                        commandType = CommandType.ChangeTableProperty;
                }
                this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, commandType);
                break;
            }
            case ModelChangeType.TableRowPropertyChanged: {
                let commandType;
                switch (change.property) {
                    case JSONServerTableRowProperty.GridAfter:
                    case JSONServerTableRowProperty.GridBefore:
                    case JSONServerTableRowProperty.Height:
                    case JSONServerTableRowProperty.WidthAfter:
                    case JSONServerTableRowProperty.WidthBefore:
                        commandType = CommandType.ChangeTableRow;
                        break;
                    default:
                        commandType = CommandType.ChangeTableRowProperty;
                        break;
                }
                this.pushPropertyRequest(change.subDocumentId, change.property, change.newState, commandType);
                break;
            }
            case ModelChangeType.TableCellSplittedHorizontally: {
                const newCell = change.table.rows[change.rowIndex].cells[change.rightDirection ? (change.cellIndex + 1) : (change.cellIndex - 1)];
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.Rows]: {
                        [JSONEnumClientTableRowInfo.RowIndex]: change.rowIndex,
                        [JSONEnumClientTableRowInfo.Cells]: {
                            [JSONEnumClientTableCellInfo.CellIndex]: change.rightDirection ? change.cellIndex : (change.cellIndex - 1),
                            [JSONEnumClientTableCellInfo.RightDirection]: boolToInt(change.rightDirection),
                            [JSONEnumClientTableCellInfo.CellInfo]: JSONTableHelper.getJSONTableCellInfo(newCell),
                        },
                    }
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.SplitTableCellHorizontally, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableCellMergedHorizontally: {
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.Rows]: {
                        [JSONEnumClientTableRowInfo.RowIndex]: change.rowIndex,
                        [JSONEnumClientTableRowInfo.Cells]: {
                            [JSONEnumClientTableCellInfo.CellIndex]: change.rightDirection ? change.cellIndex : (change.cellIndex + 1),
                            [JSONEnumClientTableCellInfo.RightDirection]: boolToInt(change.rightDirection),
                        },
                    },
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.MergeTableCellHorizontally, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableRowInserted: {
                const row = change.table.rows[change.rowIndex];
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.Rows]: {
                        [JSONEnumClientTableRowInfo.RowIndex]: change.rowIndex,
                        [JSONEnumClientTableRowInfo.Cells]: JSONTableHelper.getJSONTableRowCells(row),
                        [JSONEnumClientTableRowInfo.RowInfo]: JSONTableHelper.getJSONTableRowInfo(row),
                    },
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertTableRow, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableRowRemoved: {
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.Rows]: {
                        [JSONEnumClientTableRowInfo.RowIndex]: change.rowIndex
                    },
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.RemoveTableRow, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableCellRemoved: {
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.Rows]: {
                        [JSONEnumClientTableRowInfo.RowIndex]: change.rowIndex,
                        [JSONEnumClientTableRowInfo.Cells]: {
                            [JSONEnumClientTableCellInfo.CellIndex]: change.cellIndex
                        },
                    },
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.RemoveTableCell, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.TableCellInserted: {
                const params = {
                    [JSONEnumClientTableInfo.TablePosition]: JSONTableHelper.tablePositionToJSON(change.table),
                    [JSONEnumClientTableInfo.Rows]: {
                        [JSONEnumClientTableRowInfo.RowIndex]: change.rowIndex,
                        [JSONEnumClientTableRowInfo.Cells]: JSONTableHelper.getJSONTableCell(change.table.rows[change.rowIndex].cells[change.cellIndex], change.cellIndex),
                    },
                };
                this.dispatcher.pushRequest(new EditCommandRequest(CommandType.InsertTableCell, change.subDocumentId, params), new RequestParams(false, false, false));
                break;
            }
            case ModelChangeType.DocumentProtectionChanged: {
                break;
            }
            case ModelChangeType.RangePermissionsChanged: {
                break;
            }
            case ModelChangeType.RangePermissionsPropertiesChanged: {
                break;
            }
        }
    }
    pushPropertyRequest(subDocumentId, property, newState, commandType) {
        const params = {
            [JSONPropertyStateBasedCommand.Property]: property,
            [JSONPropertyStateBasedCommand.State]: newState.toJSON(),
        };
        this.dispatcher.pushRequest(new EditCommandRequest(commandType, subDocumentId, params), new RequestParams(false, false, false));
    }
    pushStateBasedRequestNew(subDocumentId, object, commandType) {
        const params = {
            [JSONPropertyStateBasedCommand.State]: object.toJSON()
        };
        this.dispatcher.pushRequest(new EditCommandRequest(commandType, subDocumentId, params), new RequestParams(false, false, false));
    }
    pushStateBasedRequest(subDocumentId, newState, commandType) {
        const params = {
            [JSONPropertyStateBasedCommand.State]: newState.toJSON()
        };
        this.dispatcher.pushRequest(new EditCommandRequest(commandType, subDocumentId, params), new RequestParams(false, false, false));
    }
}
class JSONTableHelper {
    static tablePositionToJSON(table) {
        return JSONTableHelper.tablePositionToJSONCore(table.getStartPosition(), table.nestedLevel);
    }
    static tablePositionToJSONCore(startPosition, nestedLevel) {
        const param = {};
        param[JSONEnumClientTablePosition.ParagraphStartPosition] = startPosition;
        param[JSONEnumClientTablePosition.NestedLevel] = nestedLevel;
        return param;
    }
    static getJSONTableInfo(table) {
        const jsonTable = {};
        jsonTable[JSONEnumClientTableFormatting.TableProperties] = JSONTablePropertiesConverter.convertToJSON(table.properties);
        jsonTable[JSONEnumClientTableFormatting.PreferredWidth] = JSONTableWidthUnitConverter.convertToJSON(table.preferredWidth);
        jsonTable[JSONEnumClientTableFormatting.LookTypes] = table.lookTypes;
        jsonTable[JSONEnumClientTableFormatting.StyleName] = table.style.styleName;
        return jsonTable;
    }
    static getJSONTableRows(table) {
        const jsonRows = [];
        for (let row of table.rows) {
            const jsonRow = {};
            jsonRow[JSONEnumClientTableRowInfo.Cells] = JSONTableHelper.getJSONTableRowCells(row);
            jsonRow[JSONEnumClientTableRowInfo.RowInfo] = JSONTableHelper.getJSONTableRowInfo(row);
            jsonRows.push(jsonRow);
        }
        return jsonRows;
    }
    static getJSONTableRowInfo(row) {
        const jsonRowInfo = {};
        jsonRowInfo[JSONEnumClientTableRowFormatting.GridAfter] = row.gridAfter;
        jsonRowInfo[JSONEnumClientTableRowFormatting.GridBefore] = row.gridBefore;
        jsonRowInfo[JSONEnumClientTableRowFormatting.Height] = JSONTableHeightUnitConverter.convertToJSON(row.height);
        jsonRowInfo[JSONEnumClientTableRowFormatting.TableRowProperties] = JSONTableRowPropertiesConverter.convertToJSON(row.properties);
        jsonRowInfo[JSONEnumClientTableRowFormatting.TablePropertiesException] = JSONTablePropertiesConverter.convertToJSON(row.tablePropertiesException);
        jsonRowInfo[JSONEnumClientTableRowFormatting.WidthBefore] = JSONTableWidthUnitConverter.convertToJSON(row.widthBefore);
        jsonRowInfo[JSONEnumClientTableRowFormatting.WidthAfter] = JSONTableWidthUnitConverter.convertToJSON(row.widthAfter);
        return jsonRowInfo;
    }
    static getJSONTableRowCells(row) {
        const jsonCells = [];
        for (let cell of row.cells)
            jsonCells.push(JSONTableHelper.getJSONTableCell(cell, -1));
        return jsonCells;
    }
    static getJSONTableCell(cell, cellIndex) {
        const jsonCell = {};
        if (cellIndex >= 0)
            jsonCell[JSONEnumClientTableCellInfo.CellIndex] = cellIndex;
        jsonCell[JSONEnumClientTableCellInfo.CellInfo] = JSONTableHelper.getJSONTableCellInfo(cell);
        jsonCell[JSONEnumClientTableCellInfo.StartCellPosition] = cell.startParagraphPosition.value;
        jsonCell[JSONEnumClientTableCellInfo.EndCellPosition] = cell.endParagrapPosition.value;
        return jsonCell;
    }
    static getJSONTableCellInfo(cell) {
        const jsonCellInfo = {};
        jsonCellInfo[JSONEnumClientTableCellFormatting.ColumnSpan] = cell.columnSpan;
        jsonCellInfo[JSONEnumClientTableCellFormatting.CellProperties] = JSONTableCellPropertiesConverter.convertToJSON(cell.properties);
        jsonCellInfo[JSONEnumClientTableCellFormatting.PreferredWidth] = JSONTableWidthUnitConverter.convertToJSON(cell.preferredWidth);
        jsonCellInfo[JSONEnumClientTableCellFormatting.VerticalMerging] = cell.verticalMerging;
        return jsonCellInfo;
    }
}
