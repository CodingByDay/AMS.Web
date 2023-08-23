import { __awaiter } from "tslib";
import { Constants } from '@devexpress/utils/lib/constants';
import { LeafElementDestination } from '../destination';
export class SectionMarginsDestination extends LeafElementDestination {
    get secProps() {
        return this.data.sectionImporter.properties;
    }
    processElementOpen(reader) {
        return __awaiter(this, void 0, void 0, function* () {
            let value;
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'left', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.margins.left = Math.max(0, value);
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'right', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.margins.right = Math.max(0, value);
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'top', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.margins.top = Math.max(0, value);
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'bottom', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.margins.bottom = Math.max(0, value);
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'header', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.headerOffset = Math.max(0, value);
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'footer', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.footerOffset = Math.max(0, value);
        });
    }
}
