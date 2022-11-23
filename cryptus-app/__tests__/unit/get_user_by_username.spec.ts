// Import a function from our library and test input, output behavior
import getUserByUsername from "../../lib/get_user_by_username";
import { apeholder_collections } from "../../lib/apeholderCollections";
import { GUBU_fetch_response } from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("getUserByUsername", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should ...", async () => {
    // Mocked Inputs
    fetch.once(JSON.stringify(GUBU_fetch_response));

    // Test
    expect(await getUserByUsername("apeholder")).toEqual(GUBU_fetch_response);
  });
});
