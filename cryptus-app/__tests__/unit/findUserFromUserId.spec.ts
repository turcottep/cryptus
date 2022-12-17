// Import a function from our library and test input, output behavior
import FindUserFromUserId from "../../lib/findUserFromUserId";
import { FUFUID_fetch_response } from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("FindUserFromUserId", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should work", async () => {
    // Mocked Inputs
    const userID = "0f64b3ce-91fb-4514-8bea-fdd6b3c88d82";
    fetch.once(JSON.stringify(FUFUID_fetch_response));

    // Test
    expect(await FindUserFromUserId(userID)).toEqual(FUFUID_fetch_response);
  });
});
