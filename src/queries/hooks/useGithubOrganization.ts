import { useStaticQuery, graphql } from "gatsby"
import { LangColors } from "../../helpers/Repos.constants"

export interface RepoProps {
  isPrivate: boolean
  nameWithOwner: string
  description: string
  collaborators: {
    totalCount: number
  }
  forkCount: number
  stargazers: {
    totalCount: number
  }
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
                isPrivate
                name
                description
                url
                nameWithOwner
                collaborators {
                  totalCount
                }
                stargazers {
                  totalCount
                }
                forkCount
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

  const favRepos = getGithubOrganization?.organization?.repositories?.nodes.map(
    (node, index) => ({ ...node, id: index + 1, isFav: false })
  )

  return {
    favRepos,
    organization: getGithubOrganization
      ? getGithubOrganization.organization
      : null,
  }
}
