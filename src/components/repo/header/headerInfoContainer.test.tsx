import React from "react"
import { shallow } from "enzyme"
import HeaderInfo from "./headerInfoContainer"
import { HeaderMock } from "../../../testUtils/header"
import { Typography } from "@material-ui/core"

describe("HeaderInfo", () => {
  it("link onClick should open external page", () => {
    const component = shallow(<HeaderInfo organization={HeaderMock} />)
    expect(
      component
        .find({
          "data-testid": "website-url",
        })
        .simulate("click", true)
    )
  })
  it("should display company name", () => {
    const component = shallow(<HeaderInfo organization={HeaderMock} />)
    const name = component.find({
      "data-testid": "company-name",
    })
    expect(name.text()).toEqual("TEST_NAME repositories")
  })
  it("should display subtitle", () => {
    const component = shallow(<HeaderInfo organization={HeaderMock} />)
    const subtl = component.find(Typography)
    expect(subtl.at(1).text()).toEqual("We rock IT!")
  })
  it("should display location", () => {
    const component = shallow(<HeaderInfo organization={HeaderMock} />)
    const location = component.find(Typography)
    expect(location.at(2).text()).toEqual("Warsaw, PL")
  })
})
