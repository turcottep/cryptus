// Import a function from our library and test input, output behavior
import FindUserIdFromWalletAdress from "../../lib/findUserIdFromWalletAdress";
import fetch from "jest-fetch-mock";

describe("FindUserIdFromWalletAdress", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test("should work", async () => {
    // Mocked Inputs
    const address = "0x68c4d9e03d7d902053c428ca2d74b612db7f583a";

    const response = {
      id: "1780de4c-f0de-46c5-a700-bb6a6753e8f7",
      blockchain_id: "ETH",
      address: "0x68c4d9e03d7d902053c428ca2d74b612db7f583a",
      external_url:
        "https://api.opensea.io/api/v1/assets?owner=0x68c4d9e03d7d902053c428ca2d74b612db7f583a&order_direction=asc&offset=0&limit=50",
      userId: "0f64b3ce-91fb-4514-8bea-fdd6b3c88d82",
    };
    fetch.once(JSON.stringify(response));

    // Expected outputs
    const output = "0f64b3ce-91fb-4514-8bea-fdd6b3c88d82";

    // Test
    expect(await FindUserIdFromWalletAdress(address)).toEqual(output);
  });
});
