require('dotenv').config();

const fs = require('fs/promises');
const { chromium } = require('playwright');

// SendGrid init
const sendEmail = require('./email');

/**
 * Read the json file and load the companies.
 * @returns companyList List of objects that contains company names and url fields
 */
const loadUrls = async () => {
  try {
    const data = await fs.readFile('./config/company-urls.json');
    const companyList = JSON.parse(data);
    return companyList;
  } catch (error) {
    if (error) {
      console.log(error);
      process.exit(1);
    }
  }
};

/**
 * Setup playwright
 */
const setup = async () => {
  // launch browser
  const browser = await chromium.launch({ headless: false });

  // company urls
  const companies = await loadUrls();

  // visit urls
  for (let company of companies) {
    require('./extract-company-data')(browser, company);
  }

  // close browser
  // await browser.close();
};

(async () => {
  await setup();
  // sendEmail();
})();
