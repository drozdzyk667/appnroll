import React from "react"
import { Box, makeStyles, Typography, Theme } from "@material-ui/core"
import { StatusProps } from "../repositoryContainer"
import { LangColors } from "../../../helpers/Repos.constants"
import RepoSingle from "./repoSingle"

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
    margin: "0.5em",
    borderRadius: "6px",
    border: "1px solid lightgray",
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
                  LangColors[repo?.languages?.nodes[0]?.name] ??
                  LangColors.default
                }`,
              }}
            >
              <RepoSingle
                color={
                  LangColors[repo?.languages?.nodes[0]?.name] ??
                  LangColors.default
                }
                repo={repo}
                handleToggleFavRepo={handleToggleFavRepo}
              />
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
