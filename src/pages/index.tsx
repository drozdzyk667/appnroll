import React from "react"
import { graphql, Link } from "gatsby"
import { Button } from "@material-ui/core"
import Image, { FluidObject } from "gatsby-image"
import SEO from "../components/seo"
import Layout from "../components/layout"
import AppFunctionComponent from "../types/app-function-component.interface"
import styled, { ThemeProvider } from "styled-components"
import { StylesProvider } from "@material-ui/styles"

const theme = {
  colors: {
    primary: "#FFF",
  },
}

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

const WelcomeButton = styled(({ ...rest }) => (
  <Button classes={{ label: "label" }} {...rest} />
))`
  background: linear-gradient(30deg, #f33b8b 30%, #eb0740 70%, #9c0329 100%);
  width: 250px;
  height: 60px;
  color: white;
  margin: 5em;
  transition: 0.3s;
  &:hover {
    transform: scale(1.08);
    font-size: 18px;
  }
  .label {
    color: ${(props) => props.theme.colors.primary};
  }
`

interface Props {
  readonly data: {
    readonly placeholderImage: {
      readonly childImageSharp: {
        readonly fluid: FluidObject
      }
    }
  }
}

const IndexPage: AppFunctionComponent<Props> = ({
  data: {
    placeholderImage: {
      childImageSharp: { fluid },
    },
  },
}) => {
  return (
    <Layout>
      <SEO title="Home" />
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Content>
            <Image fluid={fluid} />
            <Link to="/repository" style={{ textDecoration: "none" }}>
              <WelcomeButton>{"Welcome"}</WelcomeButton>
            </Link>
          </Content>
        </ThemeProvider>
      </StylesProvider>
    </Layout>
  )
}

export default IndexPage

export const query = graphql`
  query {
    placeholderImage: file(relativePath: { eq: "appnroll.png" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
