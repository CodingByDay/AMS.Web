import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { NumberingList } from '../numbering-lists/numbering-list';
import { ParagraphPropertiesMerger } from '../properties-merger/paragraph-properties-merger';
import { StyleBase } from '../style-base';
export class ParagraphStyle extends StyleBase {
    constructor(styleName, localizedName, deleted, hidden, semihidden, isDefault, maskedCharacterProperties, maskedParagraphProperties, tabs, autoUpdate, numberingListIndex, listLevelIndex, base64EncodedImage, id) {
        super(styleName, localizedName, deleted, hidden, semihidden, isDefault, base64EncodedImage, id);
        this.linkedStyle = null;
        this.nextParagraphStyle = null;
        this.maskedCharacterProperties = maskedCharacterProperties;
        this.maskedParagraphProperties = maskedParagraphProperties;
        this.tabs = tabs;
        this.autoUpdate = autoUpdate;
        this.numberingListIndex = numberingListIndex;
        this.listLevelIndex = listLevelIndex;
    }
    getResultTabs() {
        var _a;
        const parentTabs = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.getResultTabs();
        const tabs = this.tabs.clone();
        tabs.merge(parentTabs);
        return tabs;
    }
    getMergedParagraphProperties() {
        const paragraphMerger = new ParagraphPropertiesMerger();
        paragraphMerger.mergeParagraphStyle(this);
        return paragraphMerger.getMergedProperties();
    }
    isInOwnList() {
        return this.numberingListIndex >= 0;
    }
    getListLevel(model) {
        return this.getNumberingList(model).levels[this.getListLevelIndex()];
    }
    getNumberingList(model) {
        return model.numberingLists[this.getNumberingListIndex()];
    }
    getNumberingListIndex() {
        if (this.numberingListIndex >= 0 || this.numberingListIndex === NumberingList.NoNumberingListIndex || !this.parent)
            return this.numberingListIndex;
        else
            return this.parent.getNumberingListIndex();
    }
    getListLevelIndex() {
        if (this.listLevelIndex >= 0 || this.listLevelIndex === NumberingList.NoNumberingListIndex || !this.parent)
            return this.listLevelIndex;
        else
            return this.parent.getListLevelIndex();
    }
    clone() {
        const style = new ParagraphStyle(this.styleName, this.localizedName, this.deleted, this.hidden, this.semihidden, this.isDefault, this.maskedCharacterProperties, this.maskedParagraphProperties, this.tabs.clone(), this.autoUpdate, this.numberingListIndex, this.listLevelIndex, this.base64EncodedImage, this.id);
        style.parent = this.parent;
        style.linkedStyle = this.linkedStyle;
        style.nextParagraphStyle = this.nextParagraphStyle;
        style.primary = this.primary;
        return style;
    }
}
ParagraphStyle.normalStyleName = "Normal";
ParagraphStyle.headingStyleName = "heading";
ParagraphStyle.tocStyleName = "toc";
export class TabProperties {
    constructor() {
        this.tabsInfo = [];
    }
    clone() {
        const tabProperties = new TabProperties();
        for (let tab of this.tabsInfo)
            tabProperties.tabsInfo.push(tab.clone());
        return tabProperties;
    }
    equals(obj) {
        for (var i = 0, tab; tab = this.tabsInfo[i]; i++)
            if (!tab.equals(obj.tabsInfo[i]))
                return false;
        return true;
    }
    sort() {
        this.tabsInfo.sort((a, b) => a.position - b.position);
    }
    indexOf(tabInfo) {
        return SearchUtils.binaryIndexOf(this.tabsInfo, (t) => t.position - tabInfo.position);
    }
    add(tabInfo) {
        this.tabsInfo.push(tabInfo);
        this.sort();
    }
    deleteByIndex(index) {
        this.tabsInfo.splice(index, 1);
    }
    setTabs(tabProp) {
        this.tabsInfo = tabProp.tabsInfo;
        this.tabsInfo.sort((a, b) => a.position - b.position);
    }
    merge(tabProperties) {
        if (!tabProperties)
            return;
        tabProperties.tabsInfo.filter(t => !t.deleted).forEach(t => {
            if (!this.tabsInfo.some(st => t.position === st.position))
                this.add(t.clone());
        });
        this.sort();
    }
}
export class TabInfo {
    constructor(position, alignment, leader, deleted, isDefault) {
        this.position = position;
        this.alignment = alignment;
        this.leader = leader;
        this.isDefault = isDefault;
        this.deleted = deleted;
    }
    clone() {
        return new TabInfo(this.position, this.alignment, this.leader, this.deleted, this.isDefault);
    }
    equals(obj) {
        if (!obj)
            return false;
        return this.alignment == obj.alignment &&
            this.leader == obj.leader &&
            this.position == obj.position &&
            this.deleted == obj.deleted &&
            this.isDefault == obj.isDefault;
    }
}
