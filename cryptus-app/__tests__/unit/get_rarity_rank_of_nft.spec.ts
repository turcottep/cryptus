// Import a function from our library and test input, output behavior
import main from "../../scripts/get_rarity_rank_of_nft";
import { apeholder_collections } from "../../lib/apeholderCollections";
import fetch from "jest-fetch-mock";
import GetNameWithoutSpaces from "../../lib/get_name_without_spaces";

import { bayc_collection_token } from "../../lib/unitTestData";
import { bayc_rarity } from "../../lib/unitTestData";
import { bayc_rarity_rank } from "../../lib/unitTestData";

describe("get_rarity_rank_of_nft", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should ...", async () => {
    // Mocked Inputs
    fetch
      .once(JSON.stringify(bayc_collection_token))
      .once(JSON.stringify(bayc_rarity));

    // Test
    expect(
      await main(
        apeholder_collections[
          apeholder_collections.length - 1
        ].address.toLowerCase(),
        GetNameWithoutSpaces(
          apeholder_collections[apeholder_collections.length - 1].name
        ),
        true
      )
    ).toEqual(bayc_rarity_rank);
  });
});
