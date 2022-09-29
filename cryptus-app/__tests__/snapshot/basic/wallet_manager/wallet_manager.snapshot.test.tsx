import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import WalletManager from "../../../../components/basic/wallet_manager/wallet_manager";

describe("<WalletManager />", () => {
  it("should display properly", async () => {
    const mockProps = {
      user: {
        wallets: ["wallet1", "wallet2"],
      },
      callback_close_wallet: null,
      isMobile: false,
    };

    const tree = renderer.create(<WalletManager {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
