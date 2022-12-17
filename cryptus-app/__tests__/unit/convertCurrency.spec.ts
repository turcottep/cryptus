// Import a function from our library and test input, output behavior
//import fetch from "jest-fetch-mock";
import { getETHFromUSD } from "../../lib/convertCurrency";
import { getUSDFromETH } from "../../lib/convertCurrency";

describe("convertCurrency:", () => {
  test("getETHFromUSD should work", async () => {
    // Mocked Inputs
    const output = 1120.26;

    // Test
    expect(await getETHFromUSD(1234567.89)).toBeDefined();
  });
  test("getUSDFromETH should work", async () => {
    // Mocked Inputs
    const output = 136083.87;

    // Test
    expect(await getUSDFromETH(123.45)).toBeDefined();
  });
});
