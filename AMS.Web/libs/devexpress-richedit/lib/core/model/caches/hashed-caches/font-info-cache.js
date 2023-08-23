import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { FontInfo } from '../../fonts/font-info';
import { FontMeasurer } from '../../fonts/measurer';
import { HashBasedCache } from '../hash-based-cache';
export class FontInfoCache extends HashBasedCache {
    constructor(fontMeasurer) {
        super();
        if (!fontMeasurer) {
            this.fontMeasurer = new FontMeasurer();
            ListUtils.forEach(FontInfoCache.defaultFonts, (defaultFont, index) => this.addItemForMerge(defaultFont.clone(), index));
        }
        else
            this.fontMeasurer = fontMeasurer;
    }
    static get defaultFontInfo() {
        if (!FontInfoCache._defaultFontInfo)
            FontInfoCache._defaultFontInfo = ListUtils.elementBy(FontInfoCache.defaultFonts, (f) => f.name == FontInfoCache.defaultFontName);
        return FontInfoCache._defaultFontInfo;
    }
    processNewItem(property) {
        property.measurer = this.fontMeasurer;
    }
    getItemByName(name) {
        const items = this.hashtable[FontInfo.calculateHashByName(name)];
        return items && items[0] ? items[0] : null;
    }
    getFontNames(sort = false) {
        const result = [];
        this.forEach((item) => result.push(item.name));
        if (sort)
            result.sort();
        return result;
    }
    getAllFonts() {
        const result = [];
        this.forEach((item) => result.push(item));
        return result;
    }
    addFont(name, cssString) {
        const newFontInfo = FontInfoCache.defaultFontInfo.clone();
        newFontInfo.name = name;
        if (cssString)
            newFontInfo.cssString = FontInfoCache.correctCssString(cssString);
        return this.addItemForMerge(newFontInfo, this.count);
    }
    static correctCssString(cssString) {
        if (cssString.indexOf(' ') != -1) {
            if (cssString[0] == "'" || cssString[0] == "\"")
                cssString = cssString.slice(1);
            const lastChar = cssString[cssString.length - 1];
            if (lastChar == "'" || lastChar == "\"")
                cssString = cssString.substr(0, cssString.length - 1);
            return `'${cssString}'`;
        }
        return cssString;
    }
    deleteFont(info) {
        const hash = FontInfo.calculateHashByName(info.name);
        const items = this.hashtable[hash];
        if (!items || !items[0])
            return;
        delete this.hashtable[hash];
    }
    static fillDefaultFonts(fontInfoCache) {
        if (FontInfoCache.defaultFonts.length == 0)
            FontInfoCache.defaultFonts = ListUtils.initByCallback(fontInfoCache.count, (ind) => fontInfoCache.getItemByJsonKey(ind));
    }
    copyFrom(obj) {
        super.copyFrom(obj);
        this.fontMeasurer = obj.fontMeasurer;
    }
    clone() {
        const result = new FontInfoCache(null);
        result.copyFrom(this);
        return result;
    }
}
FontInfoCache.defaultFonts = [];
FontInfoCache.defaultFontName = "Calibri";
