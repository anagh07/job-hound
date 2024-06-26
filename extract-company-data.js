const UserAgent = require('user-agents');

const extractData = async (browser, company) => {
  // setup random agent
  const randomAgent = new UserAgent();

  const context = await browser.newContext({ userAgent: randomAgent.toString() });
  const page = await context.newPage();

  await page.goto(company.url, { timeout: 120_000 });
};

module.exports = extractData;
