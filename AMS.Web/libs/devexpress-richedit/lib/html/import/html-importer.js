import { MapCreator } from '../../base-utils/map-creator';
import { ColumnCalculator } from '../../core/layout-formatter/formatter/utils/columns-calculator';
import { FontInfoCache } from '../../core/model/caches/hashed-caches/font-info-cache';
import { RunType } from '../../core/model/runs/run-type';
import { Log } from '../../core/rich-utils/debug/logger/base-logger/log';
import { LogSource } from '../../core/rich-utils/debug/logger/base-logger/log-source';
import { UnitConverter } from '@devexpress/utils/lib/class/unit-converter';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
import { ListUtils } from '@devexpress/utils/lib/utils/list';
import { ImportedTextRunInfo, ImportedParagraphRunInfo } from './containers/runs';
import { HtmlModelInserter } from './html-model-inserter';
import { HtmlATagImporter } from './importers/a';
import { HtmlBTagImporter } from './importers/b';
import { HtmlBrTagImporter } from './importers/br';
import { HtmlCenterTagImporter } from './importers/center';
import { HtmlCiteTagImporter } from './importers/cite';
import { HtmlDivTagImporter } from './importers/div';
import { HtmlEmTagImporter } from './importers/em';
import { HtmlITagImporter } from './importers/i';
import { HtmlImgTagImporter } from './importers/img';
import { HtmlLiTagImporter } from './importers/li';
import { HtmlOlTagImporter } from './importers/ol';
import { HtmlH1TagImporter, HtmlH2TagImporter, HtmlH3TagImporter, HtmlH4TagImporter, HtmlH5TagImporter, HtmlH6TagImporter, HtmlPTagImporter } from './importers/p';
import { HtmlPreTagImporter } from './importers/pre';
import { HtmlSpanTagImporter } from './importers/span';
import { HtmlTableTagImporter } from './importers/table';
import { HtmlTbodyTagImporter } from './importers/tbody';
import { HtmlTdTagImporter, HtmlThTagImporter } from './importers/td';
import { HtmlTextNodeImporter } from './importers/text-node';
import { HtmlTrTagImporter } from './importers/tr';
import { HtmlTtTagImporter } from './importers/tt';
import { HtmlUlTagImporter } from './importers/ul';
import { HtmlUndefinedTagImporter } from './importers/undefined';
import { HtmlImporterMaskedCharacterProperties } from './utils/character-properties-utils';
import { ParagraphListPropertiesUtils } from './utils/paragraph-list-properties-utils';
import { RichUtils } from '../../core/model/rich-utils';
import { HtmlImporterMaskedParagraphProperties } from './utils/paragraph-properties-utils';
import { HtmlImporterTabStops } from './utils/tab-stops-utils';
export class LevelInfo {
    constructor(element, childElements, allowInsertRuns) {
        this.element = element;
        this.childElements = childElements;
        this.allowInsertRuns = allowInsertRuns;
    }
    initTagImporter(importer) {
        if (DomUtils.isTextNode(this.element))
            this.tagImporter = new HtmlTextNodeImporter(importer);
        else {
            const constr = importer.tagImporters[LevelInfo.getElementTag(this.element)];
            this.tagImporter = new (constr ? constr : HtmlUndefinedTagImporter)(importer);
        }
        return this;
    }
    static getElementTag(elem) {
        const tag = elem.tagName;
        return tag ? tag.toUpperCase() : "";
    }
}
export class HtmlImportData {
    constructor(runsInfo, tablesInfo) {
        this.runsInfo = runsInfo;
        this.tablesInfo = tablesInfo;
    }
}
export class HtmlImporter {
    constructor(modelManager, measurer, subDocPosition, initElements, charPropsBundle) {
        this.fieldsId = 0;
        if (!HtmlImporter.importers) {
            HtmlImporter.importers = [
                HtmlATagImporter,
                HtmlBTagImporter,
                HtmlBrTagImporter,
                HtmlCenterTagImporter,
                HtmlCiteTagImporter,
                HtmlDivTagImporter,
                HtmlEmTagImporter,
                HtmlITagImporter,
                HtmlImgTagImporter,
                HtmlLiTagImporter,
                HtmlOlTagImporter,
                HtmlPTagImporter,
                HtmlTableTagImporter,
                HtmlTbodyTagImporter,
                HtmlH1TagImporter,
                HtmlH2TagImporter,
                HtmlH3TagImporter,
                HtmlH4TagImporter,
                HtmlH5TagImporter,
                HtmlH6TagImporter,
                HtmlPreTagImporter,
                HtmlSpanTagImporter,
                HtmlTrTagImporter,
                HtmlTtTagImporter,
                HtmlTdTagImporter,
                HtmlThTagImporter,
                HtmlUlTagImporter,
            ];
        }
        this.charPropsBundle = charPropsBundle;
        this.subDocPosition = subDocPosition;
        this.modelManager = modelManager;
        this.measurer = measurer;
        this.currPosition = this.subDocPosition.position;
        this.levelInfo = [new LevelInfo(null, initElements, true)];
        this.loadFontInfos = [];
        this.tempFontInfoCache = new FontInfoCache(this.modelManager.model.cache.fontInfoCache.fontMeasurer);
        this.htmlImporterMaskedCharacterProperties =
            new HtmlImporterMaskedCharacterProperties(this, this.loadFontInfos, this.tempFontInfoCache, !modelManager.richOptions.fonts.limitedFonts);
        this.paragraphListpropertiesUtils = new ParagraphListPropertiesUtils(this, this.htmlImporterMaskedCharacterProperties);
        this.tagImporters = {};
        for (let importerConst of HtmlImporter.importers)
            this.tagImporters[new importerConst(this).elementTag()] = importerConst;
    }
    get currElement() { return ListUtils.last(this.levelInfo).element; }
    ;
    get currElementChilds() { return ListUtils.last(this.levelInfo).childElements; }
    ;
    get subDocument() { return this.subDocPosition.subDocument; }
    import() {
        this.importStarted = false;
        this.importedRunsInfo = [];
        this.importedTablesInfo = [];
        ListUtils.clear(this.loadFontInfos);
        this.tempFontInfoCache.clear();
        let insertedInterval;
        this.modelManager.history.addTransaction(() => {
            const pos = this.subDocPosition.position;
            this.prevRunIsParagraph = pos == 0 ||
                (this.subDocument.getRunByPosition(pos - 1).isParagraphOrSectionRun() &&
                    ListUtils.allOf(this.subDocument.tables, (tbl) => tbl.getEndPosition() != pos));
            this.convertChildElements();
            if (this.importedRunsInfo.length)
                insertedInterval = new HtmlModelInserter(this.modelManager, this.subDocPosition, new HtmlImportData(this.importedRunsInfo, this.getSortedTables()), this.charPropsBundle).insert();
            else
                insertedInterval = new FixedInterval(this.subDocPosition.position, 0);
            for (let info of this.loadFontInfos)
                this.modelManager.modelManipulator.font.loadFontInfo(info.fontInfo, info.subDocument, [info.applyNewFontOnIntervalsAfterLoad], this.measurer);
        });
        return insertedInterval;
    }
    convertChildElements() {
        for (let element of this.currElementChilds)
            this.convertElement(element);
    }
    getSortedTables() {
        return this.importedTablesInfo.sort((a, b) => {
            const aInt = a.interval;
            const bInt = b.interval;
            const posDiff = aInt.start - bInt.start;
            if (posDiff)
                return posDiff;
            return aInt.containsInterval(bInt) ? -1 : 1;
        });
    }
    convertElement(element) {
        const currLevelInfo = new LevelInfo(element, element.childNodes, ListUtils.last(this.levelInfo).allowInsertRuns)
            .initTagImporter(this);
        this.levelInfo.push(currLevelInfo);
        const importer = currLevelInfo.tagImporter;
        this.putDownParentPropertiesToChild();
        if (importer.isAllowed())
            importer.importBefore();
        if (importer.isImportChilds())
            this.convertChildElements();
        if (importer.isAllowed())
            importer.importAfter();
        this.levelInfo.pop();
    }
    putDownParentPropertiesToChild() {
        if (!this.currElementChilds)
            return;
        const element = this.currElement;
        const missTag = HtmlImporter.MapMissTablePropertiesByTagNames[ListUtils.last(this.levelInfo).tagImporter.elementTag()];
        ListUtils.forEach(this.currElementChilds, (childElement) => {
            const childElemStyle = this.getStyles(childElement);
            if (!childElemStyle)
                return;
            for (var prop in this.getStyles(element)) {
                if (missTag && /^(border|background|marginLeft)/gi.test(prop))
                    continue;
                if ((childElemStyle[prop] === "" || childElemStyle[prop] === undefined) && element.style[prop] !== "" && !(HtmlImporter.MapShorthandProperty[prop]))
                    childElemStyle[prop] = element.style[prop];
            }
            childElement.setAttribute('style', Object.keys(childElemStyle).map(k => `${k}:${childElemStyle[k]}`).join(';'));
        });
    }
    getStyles(element) {
        var _a, _b, _c;
        return (_c = (_b = (_a = element.getAttribute) === null || _a === void 0 ? void 0 : _a.call(element, 'style')) === null || _b === void 0 ? void 0 : _b.split(';')) === null || _c === void 0 ? void 0 : _c.reduce((a, c) => {
            if (c) {
                const par = c.trim().split(':');
                a[par[0].trim()] = par[1].trim();
            }
            return a;
        }, {});
    }
    addRun(run, forceAdd = false) {
        if (forceAdd || ListUtils.last(this.levelInfo).allowInsertRuns) {
            this.importedRunsInfo.push(run);
            this.currPosition += run.runLength;
            this.prevRunIsParagraph = run.runType == RunType.ParagraphRun || run.runType == RunType.SectionRun;
            this.importStarted = true;
        }
    }
    addParagraphRun(listInfo, element, isTableCellTag = false) {
        const htmlProperties = new HtmlImporterMaskedParagraphProperties();
        const properties = htmlProperties.import(this.modelManager.model.colorProvider, element, isTableCellTag);
        const tabs = HtmlImporterTabStops.import(element);
        this.removeAllTrailingLineBreaks();
        this.addRun(new ImportedParagraphRunInfo(listInfo, this.charPropsBundle, properties, tabs));
    }
    removeAllTrailingLineBreaks() {
        const last = this.importedRunsInfo.length - 1;
        for (let i = last; i >= last - 1; i--) {
            let runInfo = this.importedRunsInfo[i];
            if (!(runInfo instanceof ImportedTextRunInfo))
                return;
            if (runInfo.text !== RichUtils.specialCharacters.LineBreak)
                return;
            this.importedRunsInfo.pop();
            this.currPosition -= runInfo.runLength;
        }
    }
    getLastImportedRun() {
        return ListUtils.last(this.importedRunsInfo);
    }
    columnSize() {
        const section = this.modelManager.model.getSectionByPosition(this.subDocPosition.position);
        return ColumnCalculator.findMinimalColumnSize(section.sectionProperties)
            .applyConverter(UnitConverter.pixelsToTwips);
    }
    static convertHtml(html) {
        Log.print(LogSource.HtmlImporter, "convertHtml", () => html);
        html = html.replace(/<(\w[^>]*) lang=([^ |>]*)([^>]*)/gi, "<$1$3");
        html = html.replace(/\s*mso-bidi-font-family/gi, "font-family");
        html = html.replace(/\s*MARGIN: 0cm 0cm 0pt\s*;/gi, '');
        html = html.replace(/\s*MARGIN: 0cm 0cm 0pt\s*"/gi, "\"");
        html = html.replace(/\s*TEXT-INDENT: 0cm\s*;/gi, '');
        html = html.replace(/\s*TEXT-INDENT: 0cm\s*"/gi, "\"");
        html = html.replace(/\s*FONT-VARIANT: [^\s;]+;?"/gi, "\"");
        html = html.replace(/<\w+:imagedata/gi, '<img');
        html = html.replace(/<p([^>]*)><o:[pP][^>]*>\s*<\/o:[pP]><\/p>(?=\s*<\/td>)/gi, '<p$1>&nbsp;<\/p>');
        html = html.replace(/<\/?\w+:[^>]*>/gi, '');
        html = html.replace(/<STYLE[^>]*>[\s\S]*?<\/STYLE[^>]*>/gi, '');
        html = html.replace(/<(?:META|LINK)[^>]*>\s*/gi, '');
        html = html.replace(/<\\?\?xml[^>]*>/gi, '');
        html = html.replace(/<o:[pP][^>]*>\s*<\/o:[pP]>/gi, '');
        html = html.replace(/<o:[pP][^>]*>.*?<\/o:[pP]>/gi, '&nbsp;');
        html = html.replace(/<st1:.*?>/gi, '');
        html = html.replace(/<\!--[\s\S]*?-->/g, '');
        html = html.replace(/\s*style="\s*"/gi, '');
        html = html.replace(/style=""/ig, "");
        html = html.replace(/style=''/ig, "");
        var stRegExp = new RegExp('(?:style=\\")([^\\"]*)(?:\\")', 'gi');
        html = html.replace(stRegExp, (str) => {
            str = str.replace(/&quot;/gi, "'");
            str = str.replace(/&#xA;/gi, " ");
            return str;
        });
        html = html.replace(/^\s|\s$/gi, '');
        html = html.replace(/<font[^>]*>([^<>]+)<\/font>/gi, '$1');
        html = html.replace(/<span\s*><span\s*>([^<>]+)<\/span><\/span>/ig, '$1');
        html = html.replace(/<span>([^<>]+)<\/span>/gi, '$1');
        html = html.replace(/<li([^>]*)>([^<>]+)<\/li>/gi, '<li$1><p>$2</p></li>');
        html = html.replace(/<li([^>]*)>(([^<>]*)<(?!p)[\s\S]*?)<\/li>/gi, '<li$1><p>$2</p></li>');
        html = html.replace(/<caption([^>]*)>[\s\S]*?<\/caption>/gi, '');
        var array = html.match(/<[^>]*style\s*=\s*[^>]*>/gi);
        if (array && array.length > 0) {
            for (var i = 0, elementHtml; elementHtml = array[i]; i++) {
                var fontFamilyArray = elementHtml.match(/\s*font-family\s*:\s*(([^;]*)([\"';\s)](?!>))|([^;"']*))/gi);
                if (fontFamilyArray && fontFamilyArray.length > 1) {
                    var commonValue = fontFamilyArray[0].replace(/font-family\s*:\s*([^;]*)[\"'; ]/gi, "$1");
                    var resultElementHtml = elementHtml;
                    for (var j = 0, fontFamily; fontFamily = fontFamilyArray[j]; j++)
                        resultElementHtml = resultElementHtml.replace(fontFamily, "font-family: " + commonValue + ";");
                    html = html.replace(elementHtml, resultElementHtml);
                }
            }
        }
        html = html.replace(/^\n|\n$/gi, '');
        html = html.replace(/(\n+(<br>)|(<\/p>|<br>)\n+)/gi, '$2$3');
        var preTags = html.match(/<pre([\s\S]*)<\/pre>/g);
        if (preTags) {
            ListUtils.forEach(preTags, (val) => {
                html = html.replace(val, val.replace(/\n/gi, "<p/>"));
            });
        }
        html = html.replace(/(\n+\s+)|(\s+\n+)/gi, ' ');
        html = html.replace(/\n+/gi, ' ');
        html = html.replace(/\n/gi, RichUtils.specialCharacters.LineBreak);
        html = html.replace(/(<\/(?!(p)+)(\s*[^>]*)?>)<\/td>/gi, '$1<p>&nbsp;</p></td>');
        html = html.replace(/(<\/(?!(p)+)(\s*[^>]*)?>)<\/th>/gi, '$1<p>&nbsp;</p></th>');
        html = html.replace(/<script(\s[^>]*)?>[\s\S]*?<\/script>/gi, '');
        html = html.replace(/<u>([\s\S]*?)<\/u>/gi, '<span style="text-decoration: underline">$1</span>');
        html = html.replace(/<s>([\s\S]*?)<\/s>/gi, '<span style="text-decoration: line-through">$1</span>');
        html = html.replace(/<\/([^\s>]+)(\s[^>]*)?><br><\/([^\s>]+)(\s[^>]*)?>/gi, '');
        Log.print(LogSource.HtmlImporter, "convertHtml", () => html);
        return html;
    }
}
HtmlImporter.importers = null;
HtmlImporter.MapMissTablePropertiesByTagNames = new MapCreator()
    .add("TABLE", true)
    .add("TD", true)
    .add("TH", true)
    .get();
HtmlImporter.MapShorthandProperty = new MapCreator()
    .add("background", true)
    .add("border", true)
    .add("borderImage", true)
    .add("borderTop", true)
    .add("borderRight", true)
    .add("borderBottom", true)
    .add("borderLeft", true)
    .add("borderWidth", true)
    .add("borderColor", true)
    .add("borderStyle", true)
    .add("borderRadius", true)
    .add("font", true)
    .add("fontVariant", true)
    .add("listStyle", true)
    .add("margin", true)
    .add("padding", true)
    .add("transition", true)
    .add("transform", true)
    .add("listStyleType", true)
    .add("cssText", true)
    .get();
