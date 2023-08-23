/**
* DevExpress Dashboard (_helpers.d.ts)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { DataFieldType, DateTimeGroupInterval, TextGroupInterval } from '../enums';
export declare function getDimensionExpression(dataMember: string, gateTimeGroupInterval: DateTimeGroupInterval, textGroupInterval: TextGroupInterval, fieldType: DataFieldType): string;
export declare function getSummaryExpression(dataMember: string, summaryType: string): string;
