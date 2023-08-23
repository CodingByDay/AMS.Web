import { MapCreator } from '../../../../base-utils/map-creator';
import { ElementDestination } from '../destination';
import { DocumentSettingsCompatDestination } from './compat-settings-destination';
import { DocumentSettingsDefaultTabStopDestination } from './default-tab-stop-destination';
import { DocumentSettingsDifferentOddAndEvenPagesDestination } from './different-odd-and-even-pages-destination';
import { DocumentProtectionDestination } from './document-protection';
import { DocumentSettingsDocVarsDestination } from './document-variables-destination';
import { DocumentSettingsMirrorMarginsDestination } from './mirror-margins-destination';
export class DocumentSettingsDestination extends ElementDestination {
    get elementHandlerTable() {
        return DocumentSettingsDestination.handlerTable;
    }
}
DocumentSettingsDestination.handlerTable = new MapCreator()
    .add('defaultTabStop', (data) => new DocumentSettingsDefaultTabStopDestination(data))
    .add('evenAndOddHeaders', (data) => new DocumentSettingsDifferentOddAndEvenPagesDestination(data))
    .add('documentProtection', (data) => new DocumentProtectionDestination(data))
    .add('compat', (data) => new DocumentSettingsCompatDestination(data))
    .add('docVars', (data) => new DocumentSettingsDocVarsDestination(data))
    .add('mirrorMargins', (data) => new DocumentSettingsMirrorMarginsDestination(data))
    .get();
