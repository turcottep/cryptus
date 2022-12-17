// Import a function from our library and test input, output behavior
import getNftsForUser from "../../lib/get_nfts_for_user";
import { apeholder_collections } from "../../lib/apeholderCollections";
import { GNFTSFU_fetch_response } from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("getNftsForUser", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should work", async () => {
    // Mocked Inputs
    fetch.once(JSON.stringify(GNFTSFU_fetch_response));

    // Expected outputs
    const output = GNFTSFU_fetch_response;

    // Test
    expect(await getNftsForUser("apeholder")).toEqual(output);
  });
});
