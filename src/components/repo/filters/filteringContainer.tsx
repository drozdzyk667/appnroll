import React from "react"
import {
  Box,
  makeStyles,
  Theme,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core"
import { StatusProps } from "../../../helpers/Repos.constants"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "700px",
    padding: "10px",
    display: "flex",
    flexWrap: "wrap",
    marginRight: "auto",
    flexDirection: "row",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "400px",
    },
  },
  formControl: {
    minWidth: 300,
    marginTop: "15px",
    margin: theme.spacing(1),
    [theme.breakpoints.down("xs")]: {
      margin: 0,
    },
  },
  clear: {
    height: "50px",
    width: "120px",
    color: "white",
    display: "flex",
    marginTop: "5px",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#482bff",
    transition: "0.3s",
    "&:hover": {
      transform: "scale(0.9)",
    },
  },
}))

interface FilterProps {
  language: string
  filterValue: string
  handleClearFilters: () => void
  handlePickLanguage: (event: any) => void
  handleFilterByRepoName: (event: any) => void
}

const FilterContainer: React.FC<FilterProps & { repos: StatusProps[] }> = ({
  repos,
  language,
  filterValue,
  handlePickLanguage,
  handleClearFilters,
  handleFilterByRepoName,
}) => {
  const classes = useStyles()

  const noDuplicatedLanguages: string[] = repos
    .map((repo) => repo?.languages?.nodes[0]?.name)
    .reduce(
      (uniq: any[], item) => (uniq.includes(item) ? uniq : [...uniq, item]),
      []
    )

  return (
    <Box className={classes.root}>
      <TextField
        type="search"
        margin="normal"
        label="Search"
        variant="outlined"
        value={filterValue}
        onChange={handleFilterByRepoName}
        InputProps={{
          endAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="select">{"Select language"}</InputLabel>
        <Select
          native
          value={language}
          onChange={handlePickLanguage}
          label="Select language"
          inputProps={{
            id: "select",
          }}
        >
          <option aria-selected value="" />
          {noDuplicatedLanguages.map((item, index) => (
            <option key={index} aria-selected value={item}>
              {item}
            </option>
          ))}
        </Select>
      </FormControl>
      <Box className={classes.clear} onClick={handleClearFilters}>
        {"Clear filters"}
      </Box>
    </Box>
  )
}

export default FilterContainer
