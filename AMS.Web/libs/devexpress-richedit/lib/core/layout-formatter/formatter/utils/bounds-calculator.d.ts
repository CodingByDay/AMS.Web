import { Rectangle } from '@devexpress/utils/lib/geometry/rectangle';
import { Section } from '../../../model/section/section';
export declare class BoundsCalculator {
    static MAX_HEADER_FOOTER_HEIGHT_COEFF: number;
    section: Section;
    pageIndex: number;
    private equalWidthColumns;
    private columnCount;
    private columnsInfo;
    private space;
    marginTop: number;
    marginRight: number;
    marginBottom: number;
    marginLeft: number;
    pageHeight: number;
    pageWidth: number;
    private headerOffset;
    private footerOffset;
    private mirrorMargins;
    avaliablePageHeight: number;
    availableHeaderFooterWidth: number;
    headerPageAreaBounds: Rectangle;
    footerPageAreaBounds: Rectangle;
    mainPageAreasBounds: Rectangle[];
    mainColumnsBounds: Rectangle[][];
    pageBounds: Rectangle;
    headerColumnBounds: Rectangle;
    footerColumnBounds: Rectangle;
    init(section: Section): void;
    initWhenPageStart(pageIndex: number): void;
    setHeaderBounds(currHeight: number): void;
    setFooterBounds(currHeight: number): void;
    calculateMainPageAreaBounds(previousMainPageAreaHeight: number): void;
    calculateColumnBounds(pageAreaBounds: Rectangle): void;
    calculatePageBounds(y: number): void;
}
//# sourceMappingURL=bounds-calculator.d.ts.map