import FindUserIdFromWalletAdress from "../../lib/findUserIdFromWalletAdress"

describe("Verify Email", () => {
    test("it should be an email that has an @", () => {
      // Mocked Inputs
      const inputs = [
        {index:0, walletAdresse: "0x68c4d9e03d7d902053c428ca2d74b612db7f583a"},
        {index:1, walletAdresse: "0x68c4d9e03d7d902053c428ca2d74b612db7f5869"}
      ];
  
      // Expected outputs
      const outputs = [
        {index:0, userId: "0f64b3ce-91fb-4514-8bea-fdd6b3c88d82"},
        {index:1, userId: "0f64b3ce-91fb-4514-8bea-fdd6b3c88d82"}
      ];
  
      // Test 1 should pass the test, Test 2 should fail the test...
      expect(FindUserIdFromWalletAdress(inputs[0].walletAdresse)).toEqual(outputs[0].userId);
      expect(FindUserIdFromWalletAdress(inputs[1].walletAdresse)).toThrow("");
    });
  });