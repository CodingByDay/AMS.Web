import { DocumentLayout } from '../../core/layout/document-layout';
import { SubDocument } from '../../core/model/sub-document';
import { ScrollTopInfo } from '../canvas/canvas-manager';
import { CanvasSizeInfo } from '../canvas/canvas-size-info';
import { Selection } from '../selection/selection';
import { ICanvasState } from './canvas-states';
export declare type GetVertivalOffset = (sizes: CanvasSizeInfo) => number;
export declare enum RelativePosition {
    Top = 0,
    Bottom = 1,
    Inside = 2
}
export declare class ScrollState {
    byModelPosition(selection: Selection): IModelStateByModelPosition_ModelPosition;
    byModelPositionCore(subDocument: SubDocument, endOfLine: boolean, pageIndex: number): IModelStateByModelPosition_ModelPosition;
    get byScrollInfo(): ModelStateByPageInfo_SetPageInfo;
    get nothing(): ModelStateEmpty;
}
export interface IModelStateByModelPosition_ModelPosition {
    setModelPosition(modelPosition: number): IModelStateByModelPosition_RelativePosition;
    useCurrentPosition(selection: Selection): IModelStateByModelPosition_RelativePosition;
}
export interface IModelStateByModelPosition_RelativePosition {
    setRelativePosition(relativePosition: RelativePosition): IModelStateByModelPosition_VerticalOffset;
    useStdRelativePosition(): IModelStateByModelPosition_VerticalOffset;
}
export interface IModelStateByModelPosition_VerticalOffset {
    setVerticalOffset(callback: GetVertivalOffset): IModelState;
    useStdOffset(): IModelState;
}
export interface IModelState {
    getCanvasState(layout: DocumentLayout): ICanvasState;
}
export declare class ModelStateByModelPosition implements IModelStateByModelPosition_ModelPosition, IModelStateByModelPosition_VerticalOffset, IModelStateByModelPosition_RelativePosition, IModelState {
    protected modelPosition: number;
    protected getVerticalOffset: GetVertivalOffset;
    protected relativePosition: RelativePosition;
    private _subDocument;
    readonly endOfLine: boolean;
    readonly pageIndex: number;
    get subDocument(): any;
    constructor(subDocument: SubDocument, endOfLine: boolean, pageIndex: number);
    getModelPosition(): number;
    setModelPosition(modelPosition: number): IModelStateByModelPosition_RelativePosition;
    useCurrentPosition(selection: Selection): IModelStateByModelPosition_RelativePosition;
    setVerticalOffset(getVerticalOffset: GetVertivalOffset): IModelState;
    useStdOffset(): IModelState;
    setRelativePosition(relativePosition: RelativePosition): IModelStateByModelPosition_VerticalOffset;
    useStdRelativePosition(): IModelStateByModelPosition_VerticalOffset;
    getCanvasState(layout: DocumentLayout): ICanvasState;
}
export interface ModelStateByPageInfo_SetPageInfo {
    setPageInfo(scrollTopInfo: ScrollTopInfo): IModelState;
}
export declare class ModelStateByPageInfo implements ModelStateByPageInfo_SetPageInfo, IModelState {
    protected pageIndex: number;
    protected getVerticalOffset: GetVertivalOffset;
    protected relativePosition: RelativePosition;
    setPageInfo(scrollTopInfo: ScrollTopInfo): IModelState;
    getCanvasState(layout: DocumentLayout): ICanvasState;
}
export declare class ModelStateEmpty implements IModelState {
    getCanvasState(_layout: DocumentLayout): ICanvasState;
}
//# sourceMappingURL=model-states.d.ts.map