import {Locator, Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '[class^=widget__]:has(> [class^=openWidget__])',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = 'header h5',
    BUTTON_OPEN = '[data-test=openWidget]',
    BUTTON_WRITE_TO_US = '[data-test=button_feedback_form]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,
    SEARCH_INPUT = 'header input',
    SEARCH_RESULTS_TITLE = '[class^=found__] > [class^=title__]',
    SEARCH_RESULTS_ITEM = '[class^=found__] [data-testid=article-list-item]',
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    async getPopularArticles() {
        const items = this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM);
        await items.first().waitFor();
        return items.all()
    }

    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    getTitle(): Locator {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT);
    }

    async search(text: string) {
        return this.wrapper().locator(WidgetPage.selector.SEARCH_INPUT).fill(text);
    }

    getSearchResultsTitle() {
        return this.wrapper().locator(WidgetPage.selector.SEARCH_RESULTS_TITLE);
    }

    getSearchResults() {
        return this.wrapper().locator(WidgetPage.selector.SEARCH_RESULTS_ITEM);
    }

    getWidgetBody() {
        return this.wrapper().locator(WidgetPage.selector.WIDGET_BODY);
    }
}
