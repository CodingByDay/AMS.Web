import { __awaiter } from "tslib";
import { PaperKind, PaperSizeConverter } from '../../../../core/model/section/paper-kind';
import { Constants } from '@devexpress/utils/lib/constants';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { LeafElementDestination } from '../destination';
export class SectionPageSizeDestination extends LeafElementDestination {
    get secProps() {
        return this.data.sectionImporter.properties;
    }
    processElementOpen(reader) {
        return __awaiter(this, void 0, void 0, function* () {
            let value;
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'w', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.pageSize.width = value;
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'h', Constants.MIN_SAFE_INTEGER);
            if (value != Constants.MIN_SAFE_INTEGER)
                this.secProps.pageSize.height = value;
            value = this.data.readerHelper.getWpSTIntegerValue(reader, 'code', Constants.MIN_SAFE_INTEGER);
            const paperKind = value == Constants.MIN_SAFE_INTEGER ? PaperKind.Custom : value;
            this.secProps.landscape = (reader.getAttributeNS('orient', this.data.constants.wordProcessingNamespaceConst) == 'landscape');
            this.validatePaperKind(paperKind, this.secProps);
            return Promise.resolve();
        });
    }
    validatePaperKind(paperKind, secProps) {
        const paperKindSize = PaperSizeConverter.calculatePaperSize(paperKind);
        if (secProps.pageSize.width <= 0)
            secProps.pageSize.width = secProps.landscape ? paperKindSize.height : paperKindSize.width;
        if (secProps.pageSize.height <= 0)
            secProps.pageSize.height = secProps.landscape ? paperKindSize.width : paperKindSize.height;
        else {
            const size = secProps.landscape ? new Size(secProps.pageSize.height, secProps.pageSize.width) : secProps.pageSize.clone();
            paperKind = PaperSizeConverter.calculatePaperKind(size, PaperKind.Custom, 0, PaperKind.Letter);
            secProps.paperKind = paperKind;
        }
    }
}
