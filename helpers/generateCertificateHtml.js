const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

async function generateCertificateFromHTML(userName, courseTitle, outputPath) {
  const templatePath = path.join(__dirname, "../templates/certificateTemplate.html");
  let html = fs.readFileSync(templatePath, "utf-8");

  html = html.replace("{{USER_NAME}}", userName);
  html = html.replace("{{COURSE_TITLE}}", courseTitle);
  html = html.replace("{{ISSUE_DATE}}", new Date().toLocaleDateString());

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  await page.pdf({
    path: outputPath,
    format: "A4",
    landscape: true,
    printBackground: true,
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  });


  await browser.close();
  return outputPath;
}

module.exports = generateCertificateFromHTML;
