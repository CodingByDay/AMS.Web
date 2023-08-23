export var RunType;
(function (RunType) {
    RunType[RunType["Undefined"] = -1] = "Undefined";
    RunType[RunType["TextRun"] = 1] = "TextRun";
    RunType[RunType["ParagraphRun"] = 2] = "ParagraphRun";
    RunType[RunType["SectionRun"] = 3] = "SectionRun";
    RunType[RunType["FieldCodeStartRun"] = 4] = "FieldCodeStartRun";
    RunType[RunType["FieldCodeEndRun"] = 5] = "FieldCodeEndRun";
    RunType[RunType["FieldResultEndRun"] = 6] = "FieldResultEndRun";
    RunType[RunType["AnchoredPictureRun"] = 7] = "AnchoredPictureRun";
    RunType[RunType["AnchoredTextBoxRun"] = 8] = "AnchoredTextBoxRun";
    RunType[RunType["InlinePictureRun"] = 9] = "InlinePictureRun";
    RunType[RunType["InlineTextBoxRun"] = 10] = "InlineTextBoxRun";
    RunType[RunType["LayoutDependentRun"] = 11] = "LayoutDependentRun";
    RunType[RunType["FootNoteRun"] = 12] = "FootNoteRun";
    RunType[RunType["EndNoteRun"] = 13] = "EndNoteRun";
    RunType[RunType["NoteSeparatorRun"] = 14] = "NoteSeparatorRun";
    RunType[RunType["NoteContinuationSeparatorRun"] = 15] = "NoteContinuationSeparatorRun";
})(RunType || (RunType = {}));
