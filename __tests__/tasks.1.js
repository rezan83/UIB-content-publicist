const puppeteer = require("puppeteer");
const path = require("path");
const fs = require('fs');

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
  defaultViewport: null,
  devtools: false,
};
let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) {}
  done();
});
const HtmlContent = fs.readFileSync(__dirname + "/../index.html", "utf8").replace(/[\n  ]/g,'');
    console.log(HtmlContent)
    console.log(HtmlContent.includes('<!DOCTYPEhtml><htmllang="en">'))
describe("Content Publicist", () => {
  it("1.a An unordered list must be created with 6 list items, each containing an anchor tag that leads to one of the provided links", async () => {

    const a1 = await page.$('a[href="https://www.instagram.com/beyonce/?hl=en"]');
    const a2 = await page.$('a[href="https://twitter.com/beyonce?lang=en"]');
    const a3 = await page.$('a[href="https://www.facebook.com/beyonce/"]');
    const a4 = await page.$('a[href="https://www.youtube.com/channel/UCuHzBCaKmtaLcRAOoazhCPA"]');
    const a5 = await page.$('a[href="https://vimeo.com/beyonce"]');
    const a6 = await page.$('a[href="https://soundcloud.com/beyonce"]');
    
    expect(a1).toBeTruthy();
    expect(a2).toBeTruthy();
    expect(a3).toBeTruthy();
    expect(a4).toBeTruthy();
    expect(a5).toBeTruthy();
    expect(a6).toBeTruthy();
    
  });
  it("1.b Each link should open in a new tab", async () => {
    const aBlank = await page.$('a[target="_blank"]');
    expect(aBlank).toBeTruthy();
  });
  it("1.c Each anchor tag must be wrapped around the corresponding icon image", async () => {
    const img1 = await page.$('img[src="https://cdn1.iconfinder.com/data/icons/social-59/128/social_network_web_media_-53-64.png"]');
    const img2 = await page.$('img[src="https://cdn1.iconfinder.com/data/icons/social-59/128/social_network_web_media_-50-64.png"]');
    const img3 = await page.$('img[src="https://cdn1.iconfinder.com/data/icons/social-59/128/social_network_web_media_-52-64.png"]');
    const img4 = await page.$('img[src="https://cdn1.iconfinder.com/data/icons/social-59/128/social_network_web_media_-45-64.png"]');
    const img5 = await page.$('img[src="https://cdn1.iconfinder.com/data/icons/social-59/128/social_network_web_media_-43-64.png"]');
    const img6 = await page.$('img[src="https://cdn1.iconfinder.com/data/icons/social-59/128/social_network_web_media_-54-64.png"]');

    expect(img1).toBeTruthy();
    expect(img2).toBeTruthy();
    expect(img3).toBeTruthy();
    expect(img4).toBeTruthy();
    expect(img5).toBeTruthy();
    expect(img6).toBeTruthy();
  });
  it("2. A title attribute must be added to each img tag to achieve the requested hover effect", async () => {
    const imgTitle1 = await page.$('img[title="@beyonce"]');
    const imgTitle2 = await page.$('img[title="beyonce"]');
    const imgTitle3 = await page.$('img[title="Beyonce"]');
    expect(imgTitle1).toBeTruthy();
    expect(imgTitle2).toBeTruthy();
    expect(imgTitle3).toBeTruthy();
  });
});
