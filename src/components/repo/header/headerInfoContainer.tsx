import React from "react"
import { Box, makeStyles, Typography, Link } from "@material-ui/core"
import RoomIcon from "@material-ui/icons/Room"
import LinkIcon from "@material-ui/icons/Link"

interface OrgProps {
  organization: {
    url: string
    name: string
    email: string
    login: string
    location: string
    avatarUrl: string
    websiteUrl: string
    description: string
    repositories: { [key: string]: string | any[] }
  } | null
}

const useStyles = makeStyles({
  root: {
    padding: "10px",
    marginRight: "auto",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imgContainer: {
    padding: "5px",
    borderRadius: "8px",
    marginRight: "30px",
    background: "#04032e",
  },
  typographyFont: {
    fontFamily: "'Quicksand', sans-serif",
  },
  header: {
    fontWeight: 600,
    color: "#263452",
  },
  subHeader: {
    color: "gray",
    margin: "5px 0 8px 0",
  },
  info: {
    color: "#32456e",
    fontSize: "14px",
  },
  linkIcon: {
    transform: "rotate(-45deg)",
  },
  locationContainer: {
    marginLeft: "-5px",
    marginRight: "20px",
  },
})

const HeaderInfo: React.FC<OrgProps> = ({ organization }) => {
  const classes = useStyles()
  const location = organization?.location
    .slice(0, organization?.location.indexOf(",") + 1)
    .concat(" PL")

  return (
    <>
      <Box className={`${classes.root} ${classes.container}`}>
        <Box className={classes.imgContainer}>
          <img src={organization?.avatarUrl} alt="avatar" width="100" />
        </Box>
        <Box>
          <Typography
            variant="h6"
            className={`${classes.typographyFont} ${classes.header}`}
          >{`${organization?.name} repositories`}</Typography>
          <Typography
            variant="subtitle2"
            className={`${classes.typographyFont} ${classes.subHeader}`}
          >
            {"We rock IT!"}
          </Typography>
          <Box className={classes.container}>
            <Box
              className={`${classes.container} ${classes.locationContainer}`}
            >
              <RoomIcon fontSize="small" />
              <Typography className={classes.info}>{location}</Typography>
            </Box>
            <Box className={classes.container}>
              <LinkIcon className={classes.linkIcon} fontSize="small" />
              <Link href={organization?.websiteUrl} target={"_blank"}>
                <Typography className={classes.info}>
                  {organization?.websiteUrl}
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default HeaderInfo
