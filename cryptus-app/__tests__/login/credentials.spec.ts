import { validateEmail } from "../../components/login";

describe("Verify Email", () => {
  test("it should be an email that has an @", () => {
    // Mocked Inputs
    const input = [
      { id: 1, username: "test", password: "test" },
      { id: 2, username: "test@test.com", password: "test" },
      { id: 3, username: "test", password: "testfail" },
    ];

    });
});    