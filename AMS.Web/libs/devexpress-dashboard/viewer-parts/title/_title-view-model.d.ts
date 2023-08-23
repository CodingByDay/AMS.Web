/**
* DevExpress Dashboard (_title-view-model.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export interface TitleViewModel {
    Text: string;
    Visible: boolean;
    ShowParametersButton: boolean;
    IncludeMasterFilterValues: boolean;
    LayoutModel: {
        Alignment: string;
        ImageViewModel: ImageViewModel;
    };
}
export interface ImageViewModel {
    SourceBase64String: string;
    MimeType?: string;
    Url: string;
}
