import React from "react"
import { Box, makeStyles, Typography, Link } from "@material-ui/core"
import { StatusProps } from "../repositoryContainer"
import DoneIcon from "@material-ui/icons/Done"
import AddIcon from "@material-ui/icons/Add"
import StarRateIcon from "@material-ui/icons/StarRate"
import PersonIcon from "@material-ui/icons/Person"
import TransformIcon from "@material-ui/icons/Transform"
import OpenInNewIcon from "@material-ui/icons/OpenInNew"

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", height: "100%" },
  rowContainer: {
    display: "flex",
    padding: "0.5em",
    flexDirection: "row",
  },
  contentContainer: {
    marginTop: "10px",
    height: "160px",
  },
  infoContainer: {
    width: "85%",
  },
  favContainer: {
    width: "10%",
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
  statsContainer: {
    height: "45px",
    fontSize: "15px",
    backgroundColor: "#ebf9ff",
    borderBottomLeftRadius: "5px",
    padding: "0.8em 1em 0.5em 1em",
    borderBottomRightRadius: "5px",
  },
  dot: {
    width: "15px",
    height: "15px",
    marginRight: "5px",
    borderRadius: "50%",
  },
  dotContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
  },
  lang: {
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  small: {
    width: "80px",
  },
  desc: {
    color: "#a6a6a6",
  },
  right: {
    marginLeft: "auto",
  },
})

interface RepoSingle {
  color: string
  repo: StatusProps
  handleToggleFavRepo: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void
}

const RepoSingle: React.FC<RepoSingle> = ({
  repo,
  color,
  handleToggleFavRepo,
}) => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Box className={`${classes.contentContainer} ${classes.rowContainer}`}>
        <Box className={classes.infoContainer}>
          <Box mx={1}>
            <Typography variant="h5">{repo.name}</Typography>
          </Box>
          <Typography
            color="primary"
            variant="subtitle2"
            className={classes.rowContainer}
          >
            <OpenInNewIcon fontSize="small" />
            <Link href={repo?.url} target={"_blank"}>
              <Box mx={0.5}>{repo.nameWithOwner}</Box>
            </Link>
          </Typography>
          <Typography variant="subtitle1">
            <Box mx={1} className={classes.desc}>
              {`${repo.description?.slice(0, 50)}...`}
            </Box>
          </Typography>
        </Box>
        <Box className={classes.favContainer}>
          <Box
            data-id={repo.id}
            className={classes.fav}
            onClick={handleToggleFavRepo}
          >
            {repo.isFav ? <DoneIcon /> : <AddIcon />}
          </Box>
        </Box>
      </Box>
      <Box className={`${classes.statsContainer} ${classes.dotContainer}`}>
        <Box className={`${classes.dotContainer} ${classes.small}`}>
          <Box
            className={classes.dot}
            style={{ backgroundColor: `${color}` }}
          />
          <Typography className={classes.lang}>
            {repo?.languages?.nodes[0]?.name}
          </Typography>
        </Box>
        <Box className={`${classes.right} ${classes.dotContainer}`}>
          <Box className={classes.rowContainer}>
            <StarRateIcon fontSize="small" />
            {repo?.stargazers?.totalCount}
          </Box>
          <Box className={classes.rowContainer}>
            <PersonIcon fontSize="small" />
            {repo?.collaborators?.totalCount ?? 0}
          </Box>
          <Box className={classes.rowContainer}>
            <TransformIcon fontSize="small" />
            {repo?.forkCount}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default RepoSingle
