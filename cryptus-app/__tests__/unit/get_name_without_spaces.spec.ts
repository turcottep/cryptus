// Import a function from our library and test input, output behavior
//import fetch from "jest-fetch-mock";
import GetNameWithoutSpaces from "../../lib/get_name_without_spaces";

describe("GetNameWithoutSpaces", () => {
  test("should work", () => {
    // Mocked Inputs
    const input = "T  R I   S T A N 0  1 _   I     S  _ T E S T  I N   G    ?";
    const output = "TRISTAN01_IS_TESTING?";

    // Test
    expect(GetNameWithoutSpaces(input)).toEqual(output);
  });
});
