import { Point } from '@devexpress/utils/lib/geometry/point';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
export function rotatePoint(point, angle, center) {
    const x = center.x + (point.x - center.x) * Math.cos(angle) - (point.y - center.y) * Math.sin(angle);
    const y = center.y + (point.y - center.y) * Math.cos(angle) + (point.x - center.x) * Math.sin(angle);
    return new Point(x, y);
}
export class SearchTreeItemResult {
    constructor(parentList, itemIndex, item) {
        this.parentList = parentList;
        this.itemIndex = itemIndex;
        this.item = item;
    }
}
export function searchTreeItem(items, comparer) {
    return ListUtils.unsafeAnyOf(items, (item, index) => {
        if (comparer(item))
            return new SearchTreeItemResult(items, index, item);
        if (item.items) {
            const res = searchTreeItem(item.items, comparer);
            if (res)
                return res;
        }
        return null;
    });
}
export function convertToFunction(func) {
    const type = typeof (func);
    if (type == "function")
        return func;
    if (type == "string") {
        let funcName = func.trim();
        if (/^\b\w+?\b$/.test(funcName) && /^[^0-9]/.test(funcName)) {
            try {
                const handler = eval(funcName);
                if (typeof (handler) == "function")
                    return handler;
            }
            catch (e) { }
        }
        let text = funcName;
        if (text.indexOf("function") != 0)
            text = `function(s, e){${text}}`;
        let result = null;
        try {
            result = eval(`(${text})`);
        }
        catch (_e) {
            console.error(`Parse error: ${func}`);
            return null;
        }
        return result;
    }
    return null;
}
