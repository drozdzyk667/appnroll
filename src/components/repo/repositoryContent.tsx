import React from "react"
import { Box, makeStyles, Theme, CircularProgress } from "@material-ui/core"
import { Helmet } from "react-helmet"
import HeaderInfo from "./headerInfoContainer"
import FilterContainer from "./filteringContainer"
import { useWindowProperties } from "../../helpers/useWidth"
import usePagintion from "../../helpers/usePagination"
import Pagination from "@material-ui/lab/Pagination"
import {
  useGithubOrganization,
  RepoProps,
} from "../../queries/hooks/useGithubOrganization"
import { FONT_LINK } from "../../helpers/Repos.constants"

const ReposGridContainer = React.lazy(() => import("./reposGridContainer"))

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    maxWidth: "1100px",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    fontFamily: "'Quicksand', sans-serif",
  },
  pagination: {
    display: "flex",
    marginTop: "10px",
    marginRight: "20px",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      width: "400px",
      marginLeft: "50px",
    },
  },
}))

export interface StatusProps extends RepoProps {
  id: number
  isFav: boolean
}

const RepositoryContent: React.FC<{}> = () => {
  const classes = useStyles()
  const { width } = useWindowProperties()
  const { favRepos, organization } = useGithubOrganization()
  const [repos, setRepos] = React.useState<StatusProps[]>(favRepos)
  const [filterValue, setFilterValue] = React.useState<string>("")
  const [language, setLanguage] = React.useState<string>("")
  const [onPage, setOnPage] = React.useState<number>(6)
  const NO_DATA = repos.length === 0

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
    jump("", 1)
    setLanguage(event.target.value)
  }

  const { currentData, jump, maxPage, currentPage } = usePagintion(
    getFilteredRepos(),
    onPage
  )

  const handleFilterByRepoName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    jump("", 1)
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
        <Box className={classes.pagination}>
          <Pagination
            size="small"
            color="primary"
            count={maxPage}
            page={currentPage}
            defaultPage={1}
            onChange={jump}
            showFirstButton={!NO_DATA}
            showLastButton={!NO_DATA}
            hideNextButton={NO_DATA}
            hidePrevButton={NO_DATA}
          />
        </Box>
      </Box>
    </>
  )
}

export default RepositoryContent
