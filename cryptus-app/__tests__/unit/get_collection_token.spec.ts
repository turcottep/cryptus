// Import a function from our library and test input, output behavior
import getCollectionTokenWithOpensea from "../../lib/get_collection_token";
import { apeholder_collections } from "../../lib/apeholderCollections";
import { GCT_fetch_response } from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("getCollectionTokenWithOpensea", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should ...", async () => {
    // Mocked Inputs
    const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
    const token = "3876";
    fetch.once(JSON.stringify(GCT_fetch_response));

    // Expected outputs
    const output = 9998;

    // Test
    expect(await getCollectionTokenWithOpensea(address, token)).toEqual(output);
  });
});
