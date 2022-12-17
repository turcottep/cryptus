// Import a function from our library and test input, output behavior
//import fetch from "jest-fetch-mock";
import FindAllUsers from "../../lib/findAllUsers";

describe("FindAllUsers", () => {
  test("should work", async () => {
    // Mocked Inputs

    // Test
    expect(await FindAllUsers()).toEqual(null);
  });
});
