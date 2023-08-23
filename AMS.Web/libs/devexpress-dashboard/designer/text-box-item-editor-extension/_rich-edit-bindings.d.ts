/**
* DevExpress Dashboard (_rich-edit-bindings.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface DocVariableInfo {
    id: string;
    displayName: string;
}
export interface RichEditorBindingOptions {
    initialDocument: string;
    onSaving: (document: string) => void;
    docVariables: DocVariableInfo[];
    dashboardItemWidth?: number;
    forceSave?: () => void;
    documentModified?: () => boolean;
}
