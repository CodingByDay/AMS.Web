/**
 * DevExtreme (esm/viz/vector_map.utils/node-stream.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
function wrapBuffer(buffer) {
    return buffer
}

function ui8(stream, position) {
    return stream[position]
}

function ui16LE(stream, position) {
    return stream.readUInt16LE(position)
}

function ui32LE(stream, position) {
    return stream.readUInt32LE(position)
}

function ui32BE(stream, position) {
    return stream.readUInt32BE(position)
}

function f64LE(stream, position) {
    return stream.readDoubleLE(position)
}
var fs = require("fs");

function sendRequest(path, callback) {
    fs.readFile(path, callback)
}
