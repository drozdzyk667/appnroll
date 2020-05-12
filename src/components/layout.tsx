import React, { ReactChild } from "react"
import styled, { ThemeProvider } from "styled-components"
import theme from "../theming/theme"

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`

const Layout = ({ children }: { children: ReactChild | ReactChild[] }) => {
  return (
    <ThemeProvider theme={theme}>
      <ContentWrapper>{children}</ContentWrapper>
    </ThemeProvider>
  )
}

export default Layout
