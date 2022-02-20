// Import a function from our library and test input, output behavior
import { validateEmail } from "../components/landing_page/name_form";

describe("Verify Email", () => {
  test("it should be an email that has an @", () => {
    // Mocked Inputs
    const input = [
      { id: 1, email: "chevalde3@gmail.com" },
      { id: 2, email: "JeanLavoieWasHere@hotmeal" },
      { id: 3, email: "internet Troll" },
      { id: 4, email: "H3CK?%RM4N@&?%&/%.com" },
      { id: 5, email: "$$/%/$?%*&?(/?$?/%/$" },
      { id: 6, email: "@" },
      { id: 7, email: "$@g.ca" },
    ];

    // Expected outputs
    const output_true = true;
    const output_false = false;

    // Test 1 should pass the test, Test 2 should fail the test...
    expect(validateEmail(input[0].email)).toEqual(output_true);
    expect(validateEmail(input[1].email)).toEqual(output_false);
    expect(validateEmail(input[2].email)).toEqual(output_false);
    expect(validateEmail(input[3].email)).toEqual(output_false);
    expect(validateEmail(input[4].email)).toEqual(output_false);
    expect(validateEmail(input[5].email)).toEqual(output_false);
    // expect(validateEmail(input[6].email)).toEqual(output_false);
  });
});
