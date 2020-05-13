import React from "react"
import { Box, makeStyles, CircularProgress } from "@material-ui/core"
import { Helmet } from "react-helmet"
import HeaderInfo from "./header/headerInfoContainer"
import FilterContainer from "./filters/filteringContainer"
import { useWindowProperties } from "../../helpers/useWidth"
import usePagintion from "../../helpers/usePagination"
import PaginationContainer from "./pagination/paginationContainer"
import {
  useGithubOrganization,
  RepoProps,
} from "../../queries/hooks/useGithubOrganization"
import { FONT_LINK } from "../../helpers/Repos.constants"

const ReposGridContainer = React.lazy(() =>
  import("./reposGrid/reposGridContainer")
)

const useStyles = makeStyles({
  root: {
    width: "100%",
    display: "flex",
    maxWidth: "1100px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "'Quicksand', sans-serif",
  },
})

export interface StatusProps extends RepoProps {
  id: number
  isFav: boolean
}

const RepositoryContent: React.FC<{}> = () => {
  const classes = useStyles()
  const { width } = useWindowProperties()
  const { favRepos, organization } = useGithubOrganization()
  const storageFavRepos = JSON.parse(
    localStorage.getItem("favRepos") || JSON.stringify(favRepos)
  )
  const [repos, setRepos] = React.useState<StatusProps[]>(storageFavRepos)
  const [filterValue, setFilterValue] = React.useState<string>("")
  const [language, setLanguage] = React.useState<string>("")
  const [onPage, setOnPage] = React.useState<number>(6)

  const getFilteredRepos = () => {
    if (!filterValue && !language) {
      return repos
    }

    return repos.filter(
      (data) =>
        data.name.toLowerCase().match(filterValue.toLowerCase()) &&
        data.languages.nodes[0].name.match(language)
    )
  }

  const handleClearFilters = () => {
    setFilterValue("")
    setLanguage("")
  }

  const handlePickLanguage = (event: React.ChangeEvent<HTMLInputElement>) => {
    jump(null, 1)
    setLanguage(event.target.value)
  }

  const { currentData, jump, maxPage, currentPage } = usePagintion(
    getFilteredRepos(),
    onPage
  )

  const handleFilterByRepoName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    jump(null, 1)
    setFilterValue(event.target.value)
  }

  const handleToggleFavRepo = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    const { id } = event.currentTarget.dataset
    if (id) {
      setRepos(
        repos.map((repo) =>
          repo.id === parseInt(id, 10) ? { ...repo, isFav: !repo.isFav } : repo
        )
      )
    }
  }

  React.useEffect(() => {
    localStorage.setItem("favRepos", JSON.stringify(repos))
  }, [repos])

  React.useEffect(() => {
    if (width >= 1150) {
      setOnPage(6)
    } else if (width < 1150 && width > 850) {
      setOnPage(2)
    } else {
      setOnPage(1)
    }
  }, [width])

  const filterComponentData = {
    repos,
    language,
    filterValue,
    handlePickLanguage,
    handleClearFilters,
    handleFilterByRepoName,
  }

  const paginationData = {
    maxPage,
    jump,
    currentPage,
    dataLength: repos.length,
  }

  return (
    <>
      <Helmet>
        <link href={FONT_LINK} rel="stylesheet" />
      </Helmet>
      <Box className={classes.root}>
        <HeaderInfo organization={organization} />
        <FilterContainer {...filterComponentData} />
        <React.Suspense fallback={<CircularProgress />}>
          <ReposGridContainer
            handleToggleFavRepo={handleToggleFavRepo}
            currentData={currentData}
          />
        </React.Suspense>
        <PaginationContainer {...paginationData} />
      </Box>
    </>
  )
}

export default RepositoryContent
