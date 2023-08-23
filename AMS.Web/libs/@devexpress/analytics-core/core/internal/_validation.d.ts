﻿/**
* DevExpress Analytics (core\internal\_validation.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
export declare function validateName(nameCandidate: any): boolean;
export declare function replaceInvalidSymbols(text: string): string;
export declare var nameValidationRules: {
    type: string;
    validationCallback: (options: any) => boolean;
    readonly message: any;
}[];
