// Import a function from our library and test input, output behavior
import { validateEmail } from "../components/NameForm";

describe("Verify Email", () => {
  test("it should be an email that has an @", () => {
    // Mocked Inputs
    const input = [
      { id: 1, email: "chevalde3@gmail.com" },
      { id: 2, email: "JeanLavoieWasHere@hotmeal" },
    ];

    // Expected outputs
    const output_true = true;
    const output_false = false;

    // Test 1 should pass the test, Test 2 should fail the test
    expect(validateEmail(input[0].email)).toEqual(output_true);
    expect(validateEmail(input[1].email)).toEqual(output_false);
  });
});
