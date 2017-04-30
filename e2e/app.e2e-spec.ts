import { PorfolioSitePage } from './app.po';

describe('porfolio-site App', () => {
  let page: PorfolioSitePage;

  beforeEach(() => {
    page = new PorfolioSitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
