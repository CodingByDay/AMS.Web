﻿/**
* DevExpress Analytics (core\selection\_selectionHelpers.js)
* Version:  23.1.4
* Build date: Jul 18, 2023
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* License: https://www.devexpress.com/Support/EULAs/universal.xml
*/
import { UndoEngine } from '../../undo-engine/undoengine';
export function deleteSelection(selection, selectedObject) {
    var focused = selection.focused();
    if (!selectedObject) {
        selectedObject = focused.getControlModel();
        selection.selectedItems.forEach((item) => {
            var itemModel = item.getControlModel(), parent = itemModel.parentModel();
            if (!item.getControlModel().getMetaData().isDeleteDeny && parent && item !== focused) {
                parent.removeChild(itemModel);
            }
        });
    }
    var undo = UndoEngine.tryGetUndoEngine(selectedObject.parentModel());
    undo && undo.start();
    selectedObject.parentModel().removeChild(selectedObject);
    undo && undo.end();
    selection.focused(focused.findNextSelection());
}
