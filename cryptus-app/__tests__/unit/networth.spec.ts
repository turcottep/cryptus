// Import a function from our library and test input, output behavior
import calculate_networth from "../../lib/networth";
import { apeholder_collections } from "../../lib/apeholderCollections";
import { apeholder_tfd } from "../../lib/unitTestData";
import fetch from "jest-fetch-mock";

describe("calculate_networth", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should ...", async () => {
    // Mocked Inputs
    fetch.once(JSON.stringify(apeholder_tfd));

    // Expected outputs
    const output = 1129.989;

    // Test
    expect(await calculate_networth(apeholder_collections)).toEqual(output);
  });
});
