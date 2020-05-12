import { useStaticQuery, graphql } from "gatsby"
import { LangColors } from "../../helpers/Repos.constants"

export interface RepoProps {
  isPrivate: boolean
  languages: {
    nodes: { name: keyof typeof LangColors }[]
  }
  name: string
  url: string
}

interface Organization {
  organization: {
    name: string
    url: string
    description: string
    avatarUrl: string
    email: string
    location: string
    login: string
    websiteUrl: string
    repositories: {
      nodes: RepoProps[]
    }
  }
}

interface OrganizationQueryResponse {
  loading: boolean
  getGithubOrganization: Organization
}

export const useGithubOrganization = () => {
  const { getGithubOrganization } = useStaticQuery<OrganizationQueryResponse>(
    graphql`
      query {
        getGithubOrganization {
          organization(login: "Appnroll") {
            name
            url
            description
            avatarUrl
            email
            location
            login
            websiteUrl
            repositories(first: 100) {
              nodes {
                name
                url
                languages(first: 1) {
                  nodes {
                    name
                  }
                }
                isPrivate
              }
            }
          }
        }
      }
    `
  )

  return {
    favRepos: getGithubOrganization?.organization?.repositories?.nodes.map(
      (node, index) => ({ ...node, id: index + 1, isFav: false })
    ),
    organization: getGithubOrganization
      ? getGithubOrganization.organization
      : null,
  }
}
