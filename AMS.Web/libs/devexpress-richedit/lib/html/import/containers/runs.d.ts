import { IMeasurer } from '../../../core/measurer/measurer';
import { MaskedCharacterProperties } from '../../../core/model/character/character-properties';
import { DocumentModel } from '../../../core/model/document-model';
import { HyperlinkInfo } from '../../../core/model/fields/field';
import { InlinePictureInfo } from '../../../core/model/manipulators/picture-manipulator/insert-picture-manipulator-params';
import { NumberingFormat } from '../../../core/model/numbering-lists/list-level-properties';
import { NumberingType } from '../../../core/model/numbering-lists/numbering-list';
import { MaskedParagraphProperties } from '../../../core/model/paragraph/paragraph-properties';
import { RunType } from '../../../core/model/runs/run-type';
import { MaskedCharacterPropertiesBundle } from '../../../core/rich-utils/properties-bundle';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { TabProperties } from '../../../core/model/paragraph/paragraph-style';
export declare class RunInfo {
    runType: RunType;
    runLength: number;
    charPropsBundle: MaskedCharacterPropertiesBundle;
    constructor(runType: RunType, runLength: number, charPropsBundle: MaskedCharacterPropertiesBundle);
}
export declare class ImportedTextRunInfo extends RunInfo {
    private static tabRegex;
    text: string;
    constructor(model: DocumentModel, measurer: IMeasurer, text: string, charPropsBundle: MaskedCharacterPropertiesBundle);
    private replaceTabs;
    private mergeCharProps;
    private numTabs;
}
export declare class ImportedParagraphListInfo {
    listIndex: number;
    listLevel: number;
    listFormat: NumberingFormat;
    listType: NumberingType;
    displayFormatString: string;
    maskedCharacterProperties: MaskedCharacterProperties;
    constructor(listIndex: number, listLevel: number, listFormat: NumberingFormat, listType: NumberingType, displayFormatString: string, maskedCharacterProperties: MaskedCharacterProperties);
}
export declare class ImportedParagraphRunInfo extends RunInfo {
    listInfo: ImportedParagraphListInfo;
    maskedParagraphProperties: MaskedParagraphProperties;
    tabs: TabProperties;
    constructor(listInfo: ImportedParagraphListInfo, charPropsBundle: MaskedCharacterPropertiesBundle, maskedParagraphProperties: MaskedParagraphProperties, tabs: TabProperties);
}
export declare class ImportedInlinePictureRunInfo extends RunInfo {
    picInfo: InlinePictureInfo;
    actualSize: Size;
    constructor(charPropsBundle: MaskedCharacterPropertiesBundle, picInfo: InlinePictureInfo, actualSize: Size);
}
export declare class ImportedFieldCodeStartRunInfo extends RunInfo {
    id: number;
    hyperlinkInfo: HyperlinkInfo;
    constructor(charPropsBundle: MaskedCharacterPropertiesBundle, hyperlinkInfo: HyperlinkInfo, id: number);
}
export declare class ImportedFieldCodeEndRunInfo extends RunInfo {
    id: number;
    constructor(charPropsBundle: MaskedCharacterPropertiesBundle, id: number);
}
export declare class ImportedFieldResultEndRunInfo extends RunInfo {
    id: number;
    constructor(charPropsBundle: MaskedCharacterPropertiesBundle, id: number);
}
//# sourceMappingURL=runs.d.ts.map