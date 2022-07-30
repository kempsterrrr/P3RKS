/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || `https://p3rks.xyz`,
  exclude: ["/perks", "/perks/*"],
  generateRobotsTxt: true,
};
