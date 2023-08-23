import { Browser } from '@devexpress/utils/lib/browser';
import { BoundaryInterval } from '@devexpress/utils/lib/intervals/boundary';
import { FixedInterval } from '@devexpress/utils/lib/intervals/fixed';
export class CanvasScrollInfo {
    constructor(canvas, sizes, internalApi) {
        this.lastScrollTop = -1;
        this.lastScrollLeft = -1;
        this.startVisiblePageIndex = 0;
        this.endVisiblePageIndex = 0;
        this.internalApi = internalApi;
        this.init(canvas, sizes);
    }
    init(canvas, sizes) {
        this.canvas = canvas;
        this.sizes = sizes;
        this.renderPagesOffset = Browser.TouchUI ? CanvasScrollInfo.VISIBLE_PAGES_RANGE_TOUCH : CanvasScrollInfo.VISIBLE_PAGES_RANGE;
    }
    getStartRenderPageIndex() {
        return Math.max(0, this.startVisiblePageIndex - this.renderPagesOffset);
    }
    getEndRenderPageIndex() {
        return this.endVisiblePageIndex + this.renderPagesOffset;
    }
    renderPageIndexInterval() {
        return FixedInterval.fromPositions(this.getStartRenderPageIndex(), this.getEndRenderPageIndex() + 1);
    }
    updatePageIndexesInfo(pages) {
        if (!pages.length)
            return;
        const scrollTop = this.getScrollTop();
        this.lastScrollLeft = this.canvas.scrollLeft;
        if (this.startVisiblePageIndex >= 0 && scrollTop == this.lastScrollTop)
            return;
        this.startVisiblePageIndex = this.sizes.findPageIndexByOffsetY(pages, scrollTop);
        this.endVisiblePageIndex = this.sizes.findPageIndexByOffsetY(pages, scrollTop + this.getVisibleHeight());
        this.lastScrollTop = scrollTop;
    }
    getVisibleInterval() {
        const scrollTop = this.getScrollTop();
        const visibleHeight = this.getVisibleHeight();
        const visibleHeightInterval = new FixedInterval(scrollTop, visibleHeight);
        const fullRenderedHeight = visibleHeightInterval.length * CanvasScrollInfo.VISIBLE_AREA_HEIGHT_MULTIPLIER;
        return BoundaryInterval.makeByConstInterval(new FixedInterval(Math.max(0, visibleHeightInterval.center - Math.floor(fullRenderedHeight / 2)), fullRenderedHeight));
    }
    getScrollTop() {
        return this.canvas.scrollTop + (this.internalApi.getVerticalScrollOffset ? this.internalApi.getVerticalScrollOffset() : 0);
    }
    getVisibleHeight() {
        return this.internalApi.getVisibleAreaHeight ? this.internalApi.getVisibleAreaHeight() : this.sizes.getVisibleAreaHeight(false);
    }
}
CanvasScrollInfo.VISIBLE_PAGES_RANGE = 2;
CanvasScrollInfo.VISIBLE_PAGES_RANGE_TOUCH = 0;
CanvasScrollInfo.VISIBLE_AREA_HEIGHT_MULTIPLIER = 2;
