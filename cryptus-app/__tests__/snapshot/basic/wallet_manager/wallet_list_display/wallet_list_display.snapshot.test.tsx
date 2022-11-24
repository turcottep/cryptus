import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import WalletListDisplay from "../../../../../components/basic/wallet_manager/wallet_list_display/wallet_list_display";

describe("<WalletListDisplay />", () => {
  it("should display properly", async () => {
    const mockProps = {
      callback: null,
      currentAddress: "whateveranaddressissupposedtolooklike",
      addresses: ["address1", "address2"],
      added: true,
    };

    const tree = renderer.create(<WalletListDisplay {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
