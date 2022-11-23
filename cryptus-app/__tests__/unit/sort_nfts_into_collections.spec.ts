// Import a function from our library and test input, output behavior
import { apeholder_collections } from "../../lib/apeholderCollections";
import { SNFTSIC_input, SNFTSIC_output } from "../../lib/unitTestData";
import sortNftsIntoCollections from "../../lib/sort_nfts_into_collections";

describe("sortNftsIntoCollections", () => {
  test("should work", async () => {
    // Test
    expect(sortNftsIntoCollections(SNFTSIC_input)).toEqual(SNFTSIC_output);
  });
});
