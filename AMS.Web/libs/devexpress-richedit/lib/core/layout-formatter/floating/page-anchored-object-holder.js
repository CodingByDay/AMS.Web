import { NumberMapUtils } from '@devexpress/utils/lib/utils/map/number';
import { LayoutBoxType } from '../../layout/main-structures/layout-boxes/layout-box';
import { getLayoutAnchoredObjectBoxComparer } from '../../model/manipulators/floating-objects/comparers';
export class PageAnchoredObjectHolder {
    constructor() {
        this.objects = {};
    }
    getObjectByModelPosition(layout, position, belongsToSubDocId) {
        return NumberMapUtils.elementBy(this.objects, (obj, id) => layout.anchorObjectsPositionInfo.getPosition(id) == position && obj.belongsToSubDocId === belongsToSubDocId);
    }
    onColumnEnd(activeFormatter) {
        if (!activeFormatter.subDocument.isMain())
            return;
        const belongsToSubDocId = activeFormatter.subDocument.id;
        const layout = activeFormatter.rowFormatter.manager.layout;
        const position = activeFormatter.rowFormatter.getPosition();
        const keysToDelete = [];
        NumberMapUtils.forEach(this.objects, (obj, id) => {
            if (obj.getType() == LayoutBoxType.AnchorPicture && layout.anchorObjectsPositionInfo.getPosition(id) >= position &&
                obj.belongsToSubDocId === belongsToSubDocId) {
                keysToDelete.push(id);
                activeFormatter.layoutRowBoundsCalculator.removeAnchorObjectId(id);
            }
        });
        for (let id of keysToDelete)
            delete this.objects[id];
    }
    getObjectsForRenderer(anchorObjectsPositionInfo, objects = this.objects) {
        return NumberMapUtils.toList(objects).sort(getLayoutAnchoredObjectBoxComparer(anchorObjectsPositionInfo));
    }
    getObjById(id) {
        return this.objects[id];
    }
    getTextBoxByInternalSubDocId(id) {
        return NumberMapUtils.elementBy(this.objects, (obj) => obj.getType() == LayoutBoxType.AnchorTextBox &&
            obj.internalSubDocId == id);
    }
    isObjectExist(obj) {
        return !!this.objects[obj.objectId];
    }
    addObject(manager, obj) {
        var _a;
        this.objects[obj.objectId] = obj;
        const tableFormatter = (_a = manager.mainFormatter.tableFormatter) === null || _a === void 0 ? void 0 : _a.actualFormatter;
        if (tableFormatter)
            obj.parentCell = tableFormatter.tableInfo.currCellInfo.cell;
        manager.anchoredObjectsManager.anchorObjectHorizontalPositionCalculator.calculate(obj);
        manager.anchoredObjectsManager.anchorObjectVerticalPositionCalculator.calculate(obj);
        this.correctPositionDueToOtherBoxes(obj);
    }
    correctPositionDueToOtherBoxes(_obj) {
    }
    shallowCopy() {
        const obj = new PageAnchoredObjectHolder();
        obj.objects = NumberMapUtils.shallowCopy(this.objects);
        return obj;
    }
}
