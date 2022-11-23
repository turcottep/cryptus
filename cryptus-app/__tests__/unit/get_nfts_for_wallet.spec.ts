// Import a function from our library and test input, output behavior
import get_nfts_for_wallet from "../../lib/get_nfts_for_wallet";
import { apeholder_collections } from "../../lib/apeholderCollections";
import {
  GNFTSFW_fetch_response1,
  GNFTSFW_fetch_response2,
  GNFTSFW_fetch_response3,
  GNFTSFW_output,
} from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("get_nfts_for_wallet", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should work", async () => {
    // Mocked Inputs
    fetch
      .once(JSON.stringify(GNFTSFW_fetch_response1))
      .once(JSON.stringify(GNFTSFW_fetch_response2))
      .once(JSON.stringify(GNFTSFW_fetch_response3));

    // Test
    expect(
      await get_nfts_for_wallet("0x68c4d9e03d7d902053c428ca2d74b612db7f583a")
    ).toEqual(GNFTSFW_output);
  });
});
