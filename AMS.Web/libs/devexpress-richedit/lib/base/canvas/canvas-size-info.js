import { RenderPageVertivalInfo } from '../../core/view-settings/views-settings';
import { Size } from '@devexpress/utils/lib/geometry/size';
import { SearchUtils } from '@devexpress/utils/lib/utils/search';
import { DomUtils } from '@devexpress/utils/lib/utils/dom';
export class CanvasSizeInfo {
    constructor() {
        this.topSpacing = -1;
        this.betweenPageSpacing = 1;
        this.visibleAreaSize = new Size(-1, -1);
        this.scrollWidth = -1;
        this.pageVerticalInfo = new RenderPageVertivalInfo();
        this.scrollWidth = DomUtils.getVerticalScrollBarWidth();
    }
    isInitialized() {
        return this.topSpacing >= 0;
    }
    initialize(page, canvas) {
        this.pageVerticalInfo.init(DomUtils.getCurrentStyle(page));
        this.topSpacing = this.pageVerticalInfo.topPageBorderWidth + this.pageVerticalInfo.topMargin;
        this.betweenPageSpacing = this.pageVerticalInfo.betweenPageSpacing;
        this.setVisibleAreaSize(canvas.offsetWidth, canvas.offsetHeight);
    }
    findPageIndexByOffsetY(pages, offsetY) {
        return Math.max(0, SearchUtils.normedInterpolationIndexOf(pages, (p) => this.getPageOffsetY(p), offsetY));
    }
    getPageOffsetY(layoutPage) {
        return layoutPage.y + (this.topSpacing + layoutPage.index * this.betweenPageSpacing);
    }
    setVisibleAreaSize(width, height) {
        this.visibleAreaSize.width = width;
        this.visibleAreaSize.height = height;
    }
    getVisibleAreaWidth(includeScrollBars) {
        if (includeScrollBars)
            return this.visibleAreaSize.width;
        return this.scrollYVisible ? this.visibleAreaSize.width - this.scrollWidth : this.visibleAreaSize.width;
    }
    getVisibleAreaHeight(includeScrollBars) {
        if (includeScrollBars)
            return this.visibleAreaSize.height;
        return this.scrollXVisible ? this.visibleAreaSize.height - this.scrollWidth : this.visibleAreaSize.height;
    }
    updateScrollVisibility(measurerWidth, measurerHeight) {
        this.scrollXVisible = measurerHeight < this.visibleAreaSize.height;
        this.scrollYVisible = measurerWidth < this.visibleAreaSize.width;
    }
}
