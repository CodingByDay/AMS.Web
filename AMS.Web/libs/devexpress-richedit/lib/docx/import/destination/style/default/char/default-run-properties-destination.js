import { __awaiter } from "tslib";
import { MapCreator } from '../../../../../../base-utils/map-creator';
import { FontInfoCache } from '../../../../../../core/model/caches/hashed-caches/font-info-cache';
import { CharacterPropertyDescriptor } from '../../../../../../core/model/character/character-property-descriptor';
import { ElementDestination } from '../../../destination';
import { InnerDefaultRunPropertiesDestination } from './inner-default-run-properties-destination';
export class DefaultRunPropertiesDestination extends ElementDestination {
    get elementHandlerTable() {
        return DefaultRunPropertiesDestination.handlerTable;
    }
    processElementOpen(reader) {
        const _super = Object.create(null, {
            processElementOpen: { get: () => super.processElementOpen }
        });
        return __awaiter(this, void 0, void 0, function* () {
            _super.processElementOpen.call(this, reader);
            const properties = this.data.documentModel.defaultCharacterProperties;
            properties.setValue(CharacterPropertyDescriptor.size, 10);
            properties.setValue(CharacterPropertyDescriptor.fontInfo, this.data.documentModel.cache.fontInfoCache.getItemByName(FontInfoCache.defaultFontName));
        });
    }
}
DefaultRunPropertiesDestination.handlerTable = new MapCreator()
    .add('rPr', (data) => new InnerDefaultRunPropertiesDestination(data, data.documentModel.defaultCharacterProperties))
    .get();
