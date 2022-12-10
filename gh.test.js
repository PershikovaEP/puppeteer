let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe("Github page tests", () => {
  beforeEach(async () => {
    await page.goto("https://github.com/team");
  });

  test("The h1 header content'", async () => {
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector("h1");
    const title2 = await page.title();
    expect(title2).toEqual("GitHub: Let’s build from here · GitHub");
  }, 15000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", (link) => link.getAttribute("href"));
    expect(actual).toEqual("#start-of-content");
  }, 15000);

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, (link) => link.textContent);
    expect(actual).toContain("Get started with Team");
  }, 15000);
});

describe("Checking github page titles", () => {
  test("The title on the signup", async () => {
    await page.goto(
      "https://github.com/signup?ref_cta=Sign+up&ref_loc=header+logged+out&ref_page=%2Fteam&source=header"
    );
    await page.waitForSelector("h1");
    const title1 = await page.title();
    expect(title1).toEqual("Join GitHub · GitHub");
  }, 15000);

  test("The title on the enterprise", async () => {
    await page.goto("https://github.com/enterprise");
    await page.waitForSelector("h1");
    const title3 = await page.title();
    expect(title3).toEqual(
      "Enterprise · A smarter way to work together · GitHub"
    );
  }, 15000);

  test("The title on the pricing", async () => {
    await page.goto("https://github.com/pricing");
    await page.waitForSelector("h1");
    const title4 = await page.title();
    expect(title4).toEqual("Pricing · Plans for every developer · GitHub");
  }, 15000);
});

test("The h1 header content on the pricing", async () => {
  await page.goto("https://github.com/pricing");
  await page.waitForSelector("h1");
  const actual = await page.$eval("h1", (link) => link.textContent);
  expect(actual).toContain("Get the complete developer");
}, 15000);
