// Import a function from our library and test input, output behavior
import getNFTListedPrice from "../../lib/get_nft_listed_price";
import { apeholder_collections } from "../../lib/apeholderCollections";
import { GNFTLP_fetch_response } from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("getNFTListedPrice", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should work", async () => {
    // Mocked Inputs
    const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
    const token = "3876";
    fetch.once(JSON.stringify(GNFTLP_fetch_response));

    // Expected outputs
    const output = null;

    // Test
    expect(await getNFTListedPrice(address, token)).toEqual(output);
  });
});
