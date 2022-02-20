import Login1 from "../../components/login/login";

describe("Credentials", () => {
  test("login", () => {
    // Mocked Inputs
    const mocked_props = {}
    const input = [
      { id: 1, username: "test", password: "test" },
      { id: 2, username: "test@test.com", password: "test" },
      { id: 3, username: "test", password: "testfail" },
    ];

    Login1(mocked_props)

    });
});    