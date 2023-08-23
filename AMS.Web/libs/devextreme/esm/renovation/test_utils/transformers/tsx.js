/**
 * DevExtreme (esm/renovation/test_utils/transformers/tsx.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
var fs = require("fs");
var tsJest = require("ts-jest");
var getCacheKey = require("./get_cache_key");
var THIS_FILE = fs.readFileSync(__filename);
var jestTransformer = tsJest.createTransformer();
var addCreateElementImport = src => "import React from 'react'; ".concat(src);
module.exports = {
    process: (src, filename, config) => jestTransformer.process(filename.indexOf("__tests__") > -1 ? src : addCreateElementImport(src), filename, config),
    getCacheKey: (fileData, filePath, configStr) => getCacheKey(fileData, filePath, configStr, THIS_FILE)
};
