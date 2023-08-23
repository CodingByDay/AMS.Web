import { StringUtils } from '@devexpress/utils/lib/utils/string';
import { ValueInfo } from './value-info';
export class StringValueParser {
    static parse(inputString) {
        return StringUtils.isNullOrEmpty(inputString) ?
            ValueInfo.empty :
            StringValueParser.splitUnitFromValue(inputString);
    }
    static splitUnitFromValue(inputString) {
        let value = '';
        let unit = inputString;
        const pos = inputString.search(StringValueParser.regex);
        if (pos != -1) {
            value = inputString.substr(0, pos + 1);
            unit = inputString.substr(pos + 1);
        }
        else {
            value = inputString;
            unit = '';
        }
        const val = parseFloat(value);
        return isNaN(val) ?
            new ValueInfo(unit) :
            new ValueInfo(unit, val);
    }
}
StringValueParser.regex = /[123456789.](?!.*[123456789.])/;
