import { ICloneable } from '@devexpress/utils/lib/types';
import { SubDocument } from '../sub-document';
import { OneCharRun } from './run-base';
import { RunType } from './run-type';
export declare class SectionRun extends OneCharRun implements ICloneable<SectionRun> {
    getType(): RunType;
    isParagraphOrSectionRun(): boolean;
    clone(): SectionRun;
    cloneToNewSubDocument(subDocument: SubDocument): SectionRun;
}
export declare class ParagraphRun extends OneCharRun implements ICloneable<ParagraphRun> {
    getType(): RunType;
    isParagraphOrSectionRun(): boolean;
    clone(): ParagraphRun;
    cloneToNewSubDocument(subDocument: SubDocument): ParagraphRun;
}
export declare class FieldCodeStartRun extends OneCharRun implements ICloneable<FieldCodeStartRun> {
    getType(): RunType;
    clone(): FieldCodeStartRun;
    cloneToNewSubDocument(subDocument: SubDocument): FieldCodeStartRun;
}
export declare class FieldCodeEndRun extends OneCharRun implements ICloneable<FieldCodeEndRun> {
    getType(): RunType;
    clone(): FieldCodeEndRun;
    cloneToNewSubDocument(subDocument: SubDocument): FieldCodeEndRun;
}
export declare class FieldResultEndRun extends OneCharRun implements ICloneable<FieldResultEndRun> {
    getType(): RunType;
    clone(): FieldResultEndRun;
    cloneToNewSubDocument(subDocument: SubDocument): FieldResultEndRun;
}
export declare class LayoutDependentRun extends OneCharRun implements ICloneable<LayoutDependentRun> {
    getType(): RunType;
    clone(): LayoutDependentRun;
    cloneToNewSubDocument(subDocument: SubDocument): LayoutDependentRun;
}
export declare class FootNoteRun extends OneCharRun implements ICloneable<FootNoteRun> {
    getType(): RunType;
    clone(): FootNoteRun;
    cloneToNewSubDocument(subDocument: SubDocument): FootNoteRun;
}
export declare class EndNoteRun extends OneCharRun implements ICloneable<EndNoteRun> {
    getType(): RunType;
    clone(): EndNoteRun;
    cloneToNewSubDocument(subDocument: SubDocument): EndNoteRun;
}
export declare class NoteSeparatorRun extends OneCharRun implements ICloneable<NoteSeparatorRun> {
    getType(): RunType;
    clone(): NoteSeparatorRun;
    cloneToNewSubDocument(subDocument: SubDocument): NoteSeparatorRun;
}
export declare class NoteContinuationSeparatorRun extends OneCharRun implements ICloneable<NoteContinuationSeparatorRun> {
    getType(): RunType;
    clone(): NoteContinuationSeparatorRun;
    cloneToNewSubDocument(subDocument: SubDocument): NoteContinuationSeparatorRun;
}
//# sourceMappingURL=simple-runs.d.ts.map