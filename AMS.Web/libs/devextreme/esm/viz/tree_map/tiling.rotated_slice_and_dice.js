/**
 * DevExtreme (esm/viz/tree_map/tiling.rotated_slice_and_dice.js)
 * Version: 23.1.4
 * Build date: Fri Jul 14 2023
 *
 * Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import {
    getAlgorithm,
    addAlgorithm
} from "./tiling";
var sliceAndDiceAlgorithm = getAlgorithm("sliceanddice");

function rotatedSliceAndDice(data) {
    data.isRotated = !data.isRotated;
    return sliceAndDiceAlgorithm.call(this, data)
}
addAlgorithm("rotatedsliceanddice", rotatedSliceAndDice);
