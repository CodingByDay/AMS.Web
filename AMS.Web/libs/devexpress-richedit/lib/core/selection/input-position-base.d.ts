import { EqualFunc, ICloneable } from '@devexpress/utils/lib/types';
import { CharacterProperties, MaskedCharacterProperties } from '../model/character/character-properties';
import { CharacterStyle } from '../model/character/character-style';
import { ParagraphStyle } from '../model/paragraph/paragraph-style';
import { DocumentModel } from '../model/document-model';
import { MaskedParagraphProperties, ParagraphProperties } from '../model/paragraph/paragraph-properties';
import { RunBase } from '../model/runs/run-base';
import { MaskedCharacterPropertiesBundle, MaskedParagraphPropertiesBundle } from '../rich-utils/properties-bundle';
import { SelectionIntervalsInfo } from './selection-intervals-info';
interface IPropertyDescriptor<TProps, T> {
    setProp(props: TProps, newValue: T): any;
    getProp(props: TProps): T;
    defaultValue: T;
    binaryEquals: EqualFunc<T>;
}
export declare class InputPositionBase {
    protected get model(): DocumentModel;
    protected intervalsInfo: SelectionIntervalsInfo;
    protected sourceRun: RunBase;
    protected characterStyle: CharacterStyle;
    protected maskedCharacterProperties: MaskedCharacterProperties;
    protected paragraphStyle: ParagraphStyle;
    protected maskedParagraphProperties: MaskedParagraphProperties;
    protected mergedCharacterPropertiesRaw: CharacterProperties;
    protected mergedCharacterPropertiesFull: CharacterProperties;
    protected mergedParagraphPropertiesRaw: ParagraphProperties;
    protected mergedParagraphPropertiesFull: ParagraphProperties;
    resetParagraphMergedProperties(): void;
    get charPropsBundle(): MaskedCharacterPropertiesBundle;
    get parPropsBundle(): MaskedParagraphPropertiesBundle;
    setIntervals(intervalsInfo: SelectionIntervalsInfo): this;
    getCharacterStyle(): CharacterStyle;
    getParagraphStyle(): ParagraphStyle;
    setCharacterStyle(characterStyle: CharacterStyle): void;
    getMaskedCharacterProperties(): MaskedCharacterProperties;
    getMaskedParagraphProperties(): MaskedParagraphProperties;
    getMergedCharacterPropertiesRaw(): CharacterProperties;
    getMergedCharacterPropertiesFull(): CharacterProperties;
    getMergedParagraphPropertiesRaw(): ParagraphProperties;
    getMergedParagraphPropertiesFull(): ParagraphProperties;
    private setMergedCharacterAndParagraphPropertiesRaw;
    protected static mergePropertiesRaw<TProps, T>(sourceProps: TProps, otherProps: TProps, descriptors: IPropertyDescriptor<TProps, T>[]): void;
    protected static mergePropertiesFull<TProps extends ICloneable<TProps>, T>(sourceProps: TProps, descriptors: IPropertyDescriptor<TProps, T>[]): TProps;
    private getCharacterStyleInternal;
    private isHyperlinkField;
    private getCharacterStyleCollapsedIntervalInternal;
    private setSourceRun;
    protected resetReturnValues(): void;
    getAllCharacterProperties(): InputPositionCharacterProperties;
    applyAllCharacterProperties(props: InputPositionCharacterProperties, onlyOnInputPosition?: boolean): void;
    private applyAllCharacterPropertiesToSourceRun;
    getAllParagraphProperties(): InputPositionParagraphProperties;
    applyAllParagraphProperties(props: InputPositionParagraphProperties): void;
}
export declare class InputPositionCharacterProperties {
    maskedCharacterProperties: MaskedCharacterProperties;
    mergedCharacterPropertiesRaw: CharacterProperties;
    mergedCharacterPropertiesFull: CharacterProperties;
    constructor(maskedCharacterProperties: MaskedCharacterProperties, mergedCharacterPropertiesRaw: CharacterProperties, mergedCharacterPropertiesFull: CharacterProperties);
}
export declare class InputPositionParagraphProperties {
    maskedParagraphProperties: MaskedParagraphProperties;
    mergedParagraphPropertiesRaw: ParagraphProperties;
    mergedParagraphPropertiesFull: ParagraphProperties;
    constructor(maskedParagraphProperties: MaskedParagraphProperties, mergedParagraphPropertiesRaw: ParagraphProperties, mergedParagraphPropertiesFull: ParagraphProperties);
}
export {};
//# sourceMappingURL=input-position-base.d.ts.map