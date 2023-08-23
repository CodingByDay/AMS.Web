import { DocumentModel } from '../document-model';
import { ModelCheckerResult } from './check-all';
import { DocumentFormat } from '../../document-format';
export declare class ModelComparer {
    readonly source: DocumentModel;
    readonly target: DocumentModel;
    readonly format: DocumentFormat | null;
    readonly results: ModelCheckerResult[];
    readonly pictureSizeAccuracy = 6;
    readonly nextRowMark: string;
    consoleErrorMessage: string;
    constructor(model: DocumentModel, target: DocumentModel, format?: DocumentFormat | null);
    compareAll(): boolean;
    private compare;
    private compareSubDocuments;
    private compareSection;
    private compareHeadersFooters;
    private compareHeaderFooter;
    private compareSubDocumentsCore;
    private compareRangePermissions;
    private countNotLoadedPicture;
    private runShouldBeLostOnExport;
    isASCII(code: number): boolean;
    private compareChunks;
    private compareRuns;
    private compareCharacterPropertiesBundle;
    private compareStyles;
    private compareInlinePictureRuns;
    private compareAnchoredPictureRuns;
    private compareAnchoredTextBoxRuns;
    private compareTextBoxProperties;
    private compareAnchorInfo;
    private compareTextBoxSize;
    private comparePictureSize;
    private compareSizeBasedOnScale;
    private compareSize;
    private compareCacheInfo;
    private compareShape;
    private compareNonVisualDrawingObjectInfo;
}
//# sourceMappingURL=comparer.d.ts.map