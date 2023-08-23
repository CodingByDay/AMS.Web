import { Size } from '@devexpress/utils/lib/geometry/size';
import { RtfImageInfo } from '../model/image/rtf-image-info';
import { RtfShapePropertiesInfo } from '../model/shape/shape-properties-info';
import { RtfImportData } from '../rtf-import-data';
import { RtfBaseImporter } from './importer-base';
export declare class RtfImageImporter extends RtfBaseImporter {
    imageId: number;
    scale: Size;
    desireSize: Size;
    constructor(data: RtfImportData);
    private isShapeFieldContent;
    private isInlineTextBox;
    insertImage(imageInfo: RtfImageInfo): void;
    insertImageShape(imageInfo: RtfImageInfo, shapeProperties: RtfShapePropertiesInfo, isInline?: boolean): void;
    pushState(): void;
    popState(): void;
    startImportSubDocument(): void;
    finalizeSubDocument(): void;
}
//# sourceMappingURL=image-importer.d.ts.map