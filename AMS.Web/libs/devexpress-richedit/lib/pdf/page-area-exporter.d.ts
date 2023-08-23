import { LayoutPageArea } from '../core/layout/main-structures/layout-page-area';
import { IMeasurer } from '../core/measurer/measurer';
import { LayoutFontsCollectorCache } from '../core/model/fonts/grabber';
import { IPdfKitDocument } from './interfaces';
export declare class PdfLayoutPageAreaExporter {
    private readonly tableColumnInfoExporter;
    private readonly rowExporter;
    private doc;
    constructor(doc: IPdfKitDocument, textFontMapCache: LayoutFontsCollectorCache, measurer: IMeasurer);
    export(pageArea: LayoutPageArea, pageHeight: number, shouldApplyCliping: boolean): void;
    private exportColumn;
    private shouldExportRow;
    private exportParagraphFrames;
}
//# sourceMappingURL=page-area-exporter.d.ts.map