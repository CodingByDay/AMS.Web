import { SubDocument } from '../model/sub-document';
import { SelectionIntervalsInfo } from './selection-intervals-info';
import { DocumentModel } from '../model/document-model';
export declare class SelectedSpecialRunInfo {
    private picturePosition;
    private textBoxPosition;
    private parentSubDocument;
    private isAnchoredObject;
    private textBoxInnerSubDocumentId;
    constructor();
    private get picturePos();
    private get textBoxPos();
    private noSpecRun;
    private setSpecRunInfo;
    init(intervalsInfo: SelectionIntervalsInfo, model: DocumentModel): void;
    getTextBoxInnerSubDocumentId(): number;
    get isSelectedAnchorObject(): boolean;
    getParentSubDocument(): SubDocument;
    getPosition(): number;
    getPicturePosition(): number;
    getTextBoxPosition(): number;
    isPictureSelected(): boolean;
    isTextBoxSelected(): boolean;
    isSelected(): boolean;
    clone(): SelectedSpecialRunInfo;
    private getActualTextBoxInnerSubDocumentId;
}
//# sourceMappingURL=selected-special-run-info.d.ts.map