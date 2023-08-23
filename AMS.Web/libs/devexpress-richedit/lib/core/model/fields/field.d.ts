import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { ICloneable, ISupportCopyFrom } from '@devexpress/utils/lib/types';
import { ModelManipulator } from '../manipulators/model-manipulator';
import { Position } from '../position/position';
import { PositionManager } from '../position/position-manager';
import { SubDocument } from '../sub-document';
export declare enum FieldNameType {
    None = 0,
    CreateDate = 1,
    Date = 2,
    DocVariable = 3,
    Hyperlink = 4,
    If = 5,
    IncludePicture = 6,
    MergeField = 7,
    NumPages = 8,
    Page = 9,
    Seq = 10,
    Symbol = 11,
    TC = 12,
    TOC = 13,
    Formula = 14,
    FillIn = 15
}
export declare class HyperlinkInfo implements ICloneable<HyperlinkInfo> {
    uri: string;
    tip: string;
    anchor: string;
    visited: boolean;
    constructor(uri: string, anchor: string, tip: string, visited: boolean);
    clone(): HyperlinkInfo;
    getUriPlusAnchor(): string;
    static getNewCodeText(hyperlinkInfo: HyperlinkInfo): string;
}
export declare class SequenceInfo {
    identifier: string;
    repeats: boolean;
    hidesResult: boolean;
    resets: boolean;
    resetsWith: number;
    constructor(identifier: string, repeats: boolean, hidesResult: boolean, resets: boolean, resetsWith: number);
    clone(): SequenceInfo;
}
export declare class TcInfo {
    identifier: string;
    text: string;
    level: number;
    constructor(identifier: string, text: string, level: number);
    clone(): TcInfo;
}
export declare class Field {
    private codeStartPosition;
    private resultStartPosition;
    private fieldEndPosition;
    private hyperlinkInfo;
    private sequenceInfo;
    private tcInfo;
    disableUpdate: boolean;
    hideByParent: boolean;
    locked: boolean;
    parent: Field;
    showCode: boolean;
    index: number;
    constructor(positionManager: PositionManager, index: number, startFieldPosition: number, separatorPosition: number, endFieldPosition: number, showCode: boolean, hyperlinkInfo: HyperlinkInfo);
    destructor(positionManager: PositionManager): void;
    static addField(fields: Field[], newField: Field): void;
    static deleteFieldByIndex(subDocument: SubDocument, delFieldIndex: number, modelManipulator: ModelManipulator): void;
    isHyperlinkField(): boolean;
    setNewHyperlinkInfo(hyperlinkInfo: HyperlinkInfo): void;
    getHyperlinkInfo(): HyperlinkInfo;
    getSequenceInfo(): SequenceInfo;
    setNewSequenceInfo(info: SequenceInfo): void;
    isSequenceField(): boolean;
    getTcInfo(): TcInfo;
    setNewTcInfo(info: TcInfo): void;
    isTcField(): boolean;
    getFieldStartPosition(): number;
    getCodeStartPosition(): number;
    getSeparatorPosition(): number;
    getResultStartPosition(): number;
    getResultEndPosition(): number;
    getFieldEndPosition(): number;
    setParent(parent: Field): void;
    initParent(fieldList: Field[]): void;
    static normedBinaryIndexOf(fields: Field[], position: number): number;
    static binaryIndexOf(fields: Field[], position: number): number;
    getAbsolutelyTopLevelField(): Field;
    getCodeInterval(): FixedInterval;
    getCodeIntervalWithBorders(): FixedInterval;
    getResultInterval(): FixedInterval;
    getResultIntervalWithBorders(): FixedInterval;
    getAllFieldInterval(): FixedInterval;
    getAllFieldIntervalWithoutBorders(): FixedInterval;
    isPlacedInCodeAreaTopLevelField(topLevelField: Field): boolean;
    getPositions(poss: Position[]): void;
    static correctIntervalDueToFieldsWithoutUiChecks(subDocument: SubDocument, newInterval: FixedInterval): FixedInterval;
    private static correctIntervalDueToFieldsCaseSelectionCollapsed;
    static correctIntervalDueToFields(subDocument: SubDocument, newInterval: FixedInterval): number;
    private static isFloatingObjectSelected;
    static correctWhenPositionInStartCode(fields: Field[], position: number): number;
    clone(subDocument: SubDocument): Field;
}
export declare class FieldVisabilityInfo implements ICloneable<FieldVisabilityInfo>, ISupportCopyFrom<FieldVisabilityInfo> {
    showCode: boolean;
    showResult: boolean;
    field: Field;
    constructor(showCode: boolean, showResult: boolean, field: Field);
    static getRelativeVisabilityInfo(position: number, fields: Field[]): FieldVisabilityInfo[];
    static applyTopLevelFieldInfoVisabilityToThisFieldInfo(topLevelFieldInfo: FieldVisabilityInfo, lowLevelFieldInfo: FieldVisabilityInfo): void;
    clone(): FieldVisabilityInfo;
    copyFrom(obj: FieldVisabilityInfo): void;
}
//# sourceMappingURL=field.d.ts.map