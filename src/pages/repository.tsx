import React from "react"
import SEO from "../components/seo"
import Layout from "../components/layout"
import RepositoryContent from "../components/repo/repositoryContainer"

const RepositoryContainer = () => {
  return (
    <Layout>
      <SEO title="Repo" />
      <RepositoryContent />
    </Layout>
  )
}

export default RepositoryContainer
