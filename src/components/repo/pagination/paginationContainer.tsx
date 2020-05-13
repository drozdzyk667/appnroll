import React from "react"
import { Box, makeStyles, Theme } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination"

const useStyles = makeStyles((theme: Theme) => ({
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

interface PaginationProps {
  maxPage: number
  jump: (_event: unknown, page: number) => void
  currentPage: number
  dataLength: number
}

const PaginationContainer: React.FC<PaginationProps> = ({
  maxPage,
  jump,
  currentPage,
  dataLength,
}) => {
  const classes = useStyles()
  const NO_DATA = dataLength === 0
  const DEFAULT_PAGE = 1

  return (
    <Box className={classes.pagination}>
      <Pagination
        size="small"
        color="primary"
        count={maxPage}
        page={currentPage}
        defaultPage={DEFAULT_PAGE}
        onChange={jump}
        showFirstButton={!NO_DATA}
        showLastButton={!NO_DATA}
        hideNextButton={NO_DATA}
        hidePrevButton={NO_DATA}
      />
    </Box>
  )
}

export default PaginationContainer
