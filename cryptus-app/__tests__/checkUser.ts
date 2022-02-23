// Import a function from our library and test input, output behavior
import fetch from "node-fetch";
import { createUser } from "../components/signup/user_form/create_account";
import { expect } from "@jest/globals";

describe("Verify User", () => {
  test("it should be an existing user", () => {
    // Can't seem to fetch here And also cannot fetch inside the function on the Jest test
    // Mocked Inputs
    const input = [
      { id: 1, email: "chevalde3@gmail.com", hashedPassword: "asdsadsadas" },
    ];

    // Expected outputs
    const output_true = true;
    const output_false = false;
    console.log(createUser(input[0].email, input[0].hashedPassword));
    // Test 1 should pass the test, Test 2 should fail the test...
    expect(createUser(input[0].email, input[0].hashedPassword));
  });
});
