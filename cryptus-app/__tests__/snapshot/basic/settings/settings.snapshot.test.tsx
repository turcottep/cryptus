import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Settings from "../../../../components/basic/settings/settings";

describe("<Settings />", () => {
  it("should display properly", async () => {
    const mockProps = {
      isMobile: false,
      callback_close: null,
      open_wallet_manager: null,
      open_support: null,
    };

    const tree = renderer.create(<Settings {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
