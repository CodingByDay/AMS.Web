import { MapCreator } from '../../../../base-utils/map-creator';
import { ElementDestination } from '../destination';
import { ColumnsDestination } from './columns-destination';
import { FooterReferenceDestination, HeaderReferenceDestination } from './header-footer/header-footer-reference-destination-base';
import { SectionDifferentFirstPageDestination } from './section-different-first-page-destination';
import { SectionMarginsDestination } from './section-margins-destination';
import { SectionPageNumberingDestination } from './section-page-numbering-destination';
import { SectionPageSizeDestination } from './section-page-size-destination';
import { SectionStartTypeDestination } from './section-start-type-destination';
import { SectionLineNumberingDestination } from './section-line-numbering-destination';
export class SectionDestination extends ElementDestination {
    get elementHandlerTable() {
        return SectionDestination.handlerTable;
    }
}
SectionDestination.handlerTable = new MapCreator()
    .add('cols', (data) => new ColumnsDestination(data))
    .add('lnNumType', (data) => new SectionLineNumberingDestination(data))
    .add('pgNumType', (data) => new SectionPageNumberingDestination(data))
    .add('paperSrc', (_data) => null)
    .add('pgMar', (data) => new SectionMarginsDestination(data))
    .add('pgSz', (data) => new SectionPageSizeDestination(data))
    .add('textDirection', (_data) => null)
    .add('textFlow', (_data) => null)
    .add('vAlign', (_data) => null)
    .add('bidi', (_data) => null)
    .add('type', (data) => new SectionStartTypeDestination(data))
    .add('headerReference', (data) => new HeaderReferenceDestination(data))
    .add('footerReference', (data) => new FooterReferenceDestination(data))
    .add('titlePg', (data) => new SectionDifferentFirstPageDestination(data))
    .add('footnotePr', (_data) => null)
    .add('endnotePr', (_data) => null)
    .get();
