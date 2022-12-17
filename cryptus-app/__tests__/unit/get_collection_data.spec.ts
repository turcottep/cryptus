// Import a function from our library and test input, output behavior
import getCollectionData from "../../lib/get_collection_data";
import { apeholder_collections } from "../../lib/apeholderCollections";
import { GCD_fetch_response } from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("getCollectionData", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should work", async () => {
    // Mocked Inputs
    fetch.once(JSON.stringify(GCD_fetch_response));

    // Expected outputs
    const output = [
      {
        BoredApeYachtClub: {
          id: "2",
          logo: "https://i.seadn.io/gae/Ju9CkWtV-1Okvf45wo8UctR-M9He2PjILP0oOvxE89AyiPPGtrR3gysu1Zgy0hjd2xKIgjJJtWIc0ybj4Vd7wv8t3pxDGHoJBzDB?w=500&auto=format",
          ticker: "BAYC",
          name: "Bored Ape Yacht Club",
          timestamp: "",
          address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
          floor_price: 0,
          floor_price_delta: 0,
          data_price: [],
          data_volume: [],
        },
      },
    ];
    // Test
    expect(
      await getCollectionData([
        apeholder_collections[apeholder_collections.length - 1].address,
      ])
    ).toEqual(output);
  });
});
