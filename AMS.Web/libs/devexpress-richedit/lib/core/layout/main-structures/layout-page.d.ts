import { Flag } from '@devexpress/utils/lib/class/flag';
import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { PageAnchoredObjectHolder } from '../../layout-formatter/floating/page-anchored-object-holder';
import { RenderLevelCalculator } from '../../layout-formatter/floating/render-level-calculator';
import { DocumentModel, CompatibilityMode } from '../../model/document-model';
import { AnchorObjectsPositionInfo } from '../document-layout';
import { LayoutAnchoredObjectBox } from './layout-boxes/layout-anchored-object-box';
import { LayoutPageArea } from './layout-page-area';
import { TableAnchoredObjectsHolder } from '../../layout-formatter/table/utils/table-anchored-objects-holder';
export declare enum LayoutPageFlags {
    MustBeRendered = 1,
    ContentRendered = 2,
    NeedRenderContent = 4,
    NeedDeleteContent = 8,
    IsFirstPageOfSection = 16,
    IsIntervalsCorrect = 32,
    IsSelectionRendered = 64,
    IsSearchSelectionRendered = 128,
    IsMisspelledSelectionRendered = 256,
    IsRangePermissionsRendered = 512
}
export declare class LayoutOtherPageAreasInfo {
    headerPageArea: LayoutPageArea;
    footerPageArea: LayoutPageArea;
    textBoxesPageAreas: LayoutPageArea[];
    private documentModel;
    constructor(headerPageArea: LayoutPageArea, footerPageArea: LayoutPageArea, textBoxesPageAreas: LayoutPageArea[]);
    getDocumentModel(): DocumentModel;
}
export declare class LayoutPage extends Rectangle {
    isValid: boolean;
    mainSubDocumentPageAreas: LayoutPageArea[];
    otherPageAreas: Record<number, LayoutPageArea>;
    flags: Flag;
    index: number;
    layoutPageIndex: number;
    pageOrdinal: number;
    startPageSectionIndex: number;
    anchoredObjectHolder: PageAnchoredObjectHolder;
    tableAnchoredObjectsHolder: TableAnchoredObjectsHolder;
    renderLevelCalculator: RenderLevelCalculator;
    private contentIntervals;
    constructor();
    setRenderLevelCalculator(anchorObjectsPositionInfo: AnchorObjectsPositionInfo, compatibilityMode: CompatibilityMode): void;
    setAbsolutePosition(pos: number): void;
    startWithFloatingObject(ancPosInfo: AnchorObjectsPositionInfo): LayoutAnchoredObjectBox;
    getStartPositionConsideringAncObj(ancPosInfo: AnchorObjectsPositionInfo): number;
    invalidate(): void;
    getPosition(): number;
    deepCopy(): LayoutPage;
    markPageIntervalsAsIncorrect(): void;
    getLayoutOtherPageAreasInfo(): LayoutOtherPageAreasInfo;
    calculateContentIntervals(anchorObjectsPositionInfo: AnchorObjectsPositionInfo, isUseMoreHardAlgorithm: boolean): void;
    getContentIntervals(): FixedInterval[];
    static getFirstPageInGroup(pages: LayoutPage[], pageIndex: number): LayoutPage;
    static getLastValidPageInGroup(pages: LayoutPage[], pageIndex: number, validPageCount: number, checkValid: boolean, tryFindPage: boolean): LayoutPage;
    getEndPosition(): number;
    static getPrevPageLastPosition(pages: LayoutPage[], currPageIndex: number): number;
}
//# sourceMappingURL=layout-page.d.ts.map