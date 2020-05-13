export const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Quicksand:wght@500&display=swap"

export enum LangColors {
  Kotlin = "#F18E33",
  HTML = "#e44b23",
  Swift = "#ffac45",
  CoffeeScript = "#244776",
  JavaScript = "#f1e05a",
  CSS = "#563d7c",
  Shell = "#89e051",
  Ruby = "#701516",
  MakeFile = "#ccf000",
  Dockerfile = "#000",
  default = "#ccf000",
}

export interface RepoProps {
  isPrivate: boolean
  nameWithOwner: string
  description: string
  assignableUsers: {
    totalCount: number
  }
  forkCount: number
  stargazers: {
    totalCount: number
  }
  languages?: {
    nodes: { name: keyof typeof LangColors }[]
  }
  name: string
  url: string
}

export interface StatusProps extends RepoProps {
  id: number
  isFav: boolean
}
