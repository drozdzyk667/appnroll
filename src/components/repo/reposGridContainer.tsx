import React from "react"
import { Box, makeStyles, Typography, Theme } from "@material-ui/core"
import { StatusProps } from "./repositoryContent"
import { LangColors } from "../../helpers/Repos.constants"
import DoneIcon from "@material-ui/icons/Done"
import AddIcon from "@material-ui/icons/Add"

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    minHeight: "600px",
    flexDirection: "row",
    justifyContent: "start",
    [theme.breakpoints.down("xs")]: {
      minHeight: "350px",
      marginLeft: "5em",
    },
  },
  singleContainer: {
    width: "320px",
    height: "240px",
    padding: "10px",
    margin: "0.5em",
    borderRadius: "6px",
    border: "1px solid lightgray",
  },
  fav: {
    width: "30px",
    height: "30px",
    color: "white",
    display: "flex",
    cursor: "pointer",
    transition: "0.3s",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#482bff",
    "&:hover": {
      transform: "scale(0.9)",
    },
  },
}))

interface ReposGrid {
  currentData: () => StatusProps[]
  handleToggleFavRepo: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void
}

const ReposGridContainer: React.FC<ReposGrid> = ({
  currentData,
  handleToggleFavRepo,
}) => {
  const classes = useStyles()
  const NO_DATA = currentData().length !== 0

  return (
    <Box>
      <Box className={classes.root}>
        {NO_DATA ? (
          currentData().map((repo) => (
            <Box
              key={repo.id}
              className={classes.singleContainer}
              style={{
                borderTop: `6px solid ${
                  LangColors[repo.languages.nodes[0].name]
                }`,
              }}
            >
              <Box>
                <Typography>{repo.name}</Typography>
                <Box
                  data-id={repo.id}
                  className={classes.fav}
                  onClick={handleToggleFavRepo}
                >
                  {repo.isFav ? <DoneIcon /> : <AddIcon />}
                </Box>
              </Box>
            </Box>
          ))
        ) : (
          <Typography>
            {"Sorry, there is no data for this particular search."}
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default ReposGridContainer
