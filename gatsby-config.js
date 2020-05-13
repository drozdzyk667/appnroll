require("dotenv").config({
  path: `.env`,
})

const {
  NODE_ENV,
  SITE_URL,
  GITHUB_TOKEN,
  GITHUB_API_URI,
  URL: NETLIFY_SITE_URL = SITE_URL,
  DEPLOY_PRIME_URL: NETLIFY_DEPLOY_URL = NETLIFY_SITE_URL,
  CONTEXT: NETLIFY_ENV = NODE_ENV,
} = process.env
const netlifyProduction = NETLIFY_ENV === "production"
const siteUrl = netlifyProduction
  ? SITE_URL || NETLIFY_SITE_URL
  : NETLIFY_DEPLOY_URL

module.exports = {
  siteMetadata: {
    title: `App'n'roll Repository`,
    description: `App'n'roll repository app`,
    author: `xxx`,
    siteUrl,
  },

  plugins: [
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `gitHub`,
        fieldName: `getGithubOrganization`,
        url: GITHUB_API_URI,
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: "src/images/appnroll.png",
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /images/,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-typescript`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
