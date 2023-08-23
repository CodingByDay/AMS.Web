/**
* DevExtreme (core/set_template_engine.d.ts)
* Version: 23.1.4
* Build date: Fri Jul 14 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * Sets custom functions that compile and render templates.
 */
declare function setTemplateEngine(templateEngineOptions: { compile?: Function; render?: Function }): void;

export default setTemplateEngine;
