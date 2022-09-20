import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import WalletManagerSetting from "../../../../components/basic/settings/wallet_manager_setting/wallet_manager_setting";

describe("<WalletManagerSetting />", () => {
  it("should display properly", async () => {
    const mockProps = {
      open_wallet_manager: null,
    };

    const tree = renderer
      .create(<WalletManagerSetting {...mockProps} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
