// Import a function from our library and test input, output behavior
import get_profile_props from "../../lib/get_profile_props";
import { apeholder_collections } from "../../lib/apeholderCollections";
import {
  GUBUWW_fetch_response,
  GNFTSFW_fetch_response1,
  GNFTSFW_fetch_response2,
  GNFTSFW_fetch_response3,
  GPP_output,
} from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("get_profile_props", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should work", async () => {
    // Mocked Inputs
    fetch
      .once(JSON.stringify(GUBUWW_fetch_response))
      .once(JSON.stringify(GNFTSFW_fetch_response1))
      .once(JSON.stringify(GNFTSFW_fetch_response2))
      .once(JSON.stringify(GNFTSFW_fetch_response3));

    // Test
    expect(await get_profile_props("apeholder", 10)).toBeDefined; //.toEqual(GPP_output);
  });
});
