export const HeaderMock = {
  name: "TEST_NAME",
  url: "http://test.test",
  description: "test is very nice",
  avatarUrl: "test_avatar",
  email: "test@test",
  location: "Warsaw, Poland",
  login: "test",
  websiteUrl: "http://test.test",
  repositories: {
    nodes: [
      {
        collaborators: null,
        isPrivate: false,
        description: "test_1",
        forkCount: 23,
        languages: {
          nodes: [{ name: "test-lang" }],
        },
        name: "this_is_test_1",
        nameWithOwner: "Test/test_1",
        stargazers: {
          totalCount: 22,
        },
        url: "http://test.test",
      },
      {
        collaborators: null,
        isPrivate: false,
        description: "test_2",
        forkCount: 2,
        languages: {
          nodes: [{ name: "test-lang" }],
        },
        name: "this_is_test_2",
        nameWithOwner: "Test/test_2",
        stargazers: {
          totalCount: 332,
        },
        url: "http://test.test",
      },
    ],
  },
}
