// Import a function from our library and test input, output behavior
import FindCollectionRarityData from "../../lib/findCollectionRarityData";
import { apeholder_collections } from "../../lib/apeholderCollections";
import fetch from "jest-fetch-mock";

describe("FindCollectionRarityData", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should ...", async () => {
    // Mocked Inputs
    const response = {
      id: "794cefd1-899a-44cb-8763-1763de443355",
      contract_address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      collection_name: "BoredApeYachtClub",
    };

    fetch.once(JSON.stringify(response));

    // Test
    expect(
      await FindCollectionRarityData(
        apeholder_collections[apeholder_collections.length - 1].address
      )
    ).toEqual(response);
  });
});
