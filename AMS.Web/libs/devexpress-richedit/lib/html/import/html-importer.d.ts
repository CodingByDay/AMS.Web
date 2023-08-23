import { IMeasurer } from '../../core/measurer/measurer';
import { IModelManager } from '../../core/model-manager';
import { FontInfoCache } from '../../core/model/caches/hashed-caches/font-info-cache';
import { SubDocument, SubDocumentPosition } from '../../core/model/sub-document';
import { MaskedCharacterPropertiesBundle } from '../../core/rich-utils/properties-bundle';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { RunInfo, ImportedParagraphListInfo } from './containers/runs';
import { TableInfo } from './containers/tables';
import { HtmlTagImporterBase } from './importers/base';
import { LoadFontInfo } from './load-font-info';
import { HtmlImporterMaskedCharacterProperties } from './utils/character-properties-utils';
import { ParagraphListPropertiesUtils } from './utils/paragraph-list-properties-utils';
export declare type TypeOfTagImporterConstructor = new (importer: HtmlImporter) => HtmlTagImporterBase;
export declare class LevelInfo {
    element: HTMLElement;
    childElements: HTMLElement[];
    tagImporter: HtmlTagImporterBase;
    allowInsertRuns: boolean;
    constructor(element: HTMLElement, childElements: HTMLElement[], allowInsertRuns: boolean);
    initTagImporter(importer: HtmlImporter): this;
    static getElementTag(elem: HTMLElement): string;
}
export declare class HtmlImportData {
    runsInfo: RunInfo[];
    tablesInfo: TableInfo[];
    constructor(runsInfo: RunInfo[], tablesInfo: TableInfo[]);
}
export declare class HtmlImporter {
    currPosition: number;
    htmlImporterMaskedCharacterProperties: HtmlImporterMaskedCharacterProperties;
    paragraphListpropertiesUtils: ParagraphListPropertiesUtils;
    private importedRunsInfo;
    importedTablesInfo: TableInfo[];
    loadFontInfos: LoadFontInfo[];
    tempFontInfoCache: FontInfoCache;
    get currElement(): HTMLElement;
    get currElementChilds(): HTMLElement[];
    levelInfo: LevelInfo[];
    fieldsId: number;
    prevRunIsParagraph: boolean;
    importStarted: boolean;
    modelManager: IModelManager;
    private subDocPosition;
    get subDocument(): SubDocument;
    charPropsBundle: MaskedCharacterPropertiesBundle;
    measurer: IMeasurer;
    tagImporters: Record<string, TypeOfTagImporterConstructor>;
    private static importers;
    constructor(modelManager: IModelManager, measurer: IMeasurer, subDocPosition: SubDocumentPosition, initElements: HTMLElement[], charPropsBundle: MaskedCharacterPropertiesBundle);
    import(): FixedInterval;
    private convertChildElements;
    private getSortedTables;
    private convertElement;
    private putDownParentPropertiesToChild;
    private getStyles;
    addRun(run: RunInfo, forceAdd?: boolean): void;
    addParagraphRun(listInfo: ImportedParagraphListInfo, element: HTMLElement, isTableCellTag?: boolean): void;
    removeAllTrailingLineBreaks(): void;
    getLastImportedRun(): RunInfo;
    columnSize(): Size;
    static convertHtml(html: string): string;
    private static MapMissTablePropertiesByTagNames;
    private static MapShorthandProperty;
}
//# sourceMappingURL=html-importer.d.ts.map