import React from "react"
import { shallow, mount } from "enzyme"
import RepoSingle from "./repoSingle"
import { Typography } from "@material-ui/core"
import { ReposGridMock, Color } from "../../../testUtils/reposGrid"

describe("RepoSingle", () => {
  const clickFn = jest.fn()
  it("test repo name", () => {
    const component = shallow(
      <RepoSingle
        handleToggleFavRepo={clickFn}
        color={Color}
        repo={ReposGridMock}
      />
    )
    const name = component.find(Typography)
    expect(name.first().text()).toEqual("this_is_test_1")
  })
  it("test repo nameWithOwner", () => {
    const component = shallow(
      <RepoSingle
        handleToggleFavRepo={clickFn}
        color={Color}
        repo={ReposGridMock}
      />
    )
    const nameWithOwner = component.find({
      "data-testid": "nameWithOwner",
    })
    expect(nameWithOwner.text()).toEqual("Test/test_1")
  })
  it("test if repo isFav", () => {
    const component = mount(
      <RepoSingle
        handleToggleFavRepo={clickFn}
        color={Color}
        repo={ReposGridMock}
      />
    )
    expect(component.prop("repo").isFav).toEqual(true)
  })

  it("test if repo render props correctly", () => {
    const component = mount(
      <RepoSingle
        handleToggleFavRepo={clickFn}
        color={Color}
        repo={ReposGridMock}
      />
    )
    expect(component.prop("repo")).toEqual({
      id: 1,
      collaborators: { totalCount: 22 },
      isFav: true,
      isPrivate: false,
      description: "test_1",
      forkCount: 23,
      name: "this_is_test_1",
      nameWithOwner: "Test/test_1",
      stargazers: {
        totalCount: 22,
      },
      url: "http://test.test",
    })
  })
})
