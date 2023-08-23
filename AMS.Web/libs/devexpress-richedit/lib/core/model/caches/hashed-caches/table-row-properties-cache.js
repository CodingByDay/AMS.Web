import { HashBasedCache } from '../hash-based-cache';
export class TableRowPropertiesCache extends HashBasedCache {
    copyFrom(obj) {
        super.copyFrom(obj);
    }
    clone() {
        const result = new TableRowPropertiesCache();
        result.copyFrom(this);
        return result;
    }
}
