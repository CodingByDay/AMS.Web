/**
* DevExpress Analytics (core\utils\_troubleshootingHelpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
/// <reference types="jquery" />
/// <reference types="jqueryui" />
export declare const showTroubleshootingMessage: () => void;
export declare const assignTroubleshootingPage: (element: Element | JQuery) => void;
export declare const troubleshootingPageWrapper: (target: () => any, showErrorPage: boolean, element: Element | JQuery) => any;
export declare const getTroubleshootingPage: () => string;
