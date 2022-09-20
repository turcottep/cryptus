import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SupportSetting from "../../../../components/basic/settings/support_setting/support_setting";

describe("<SupportSetting />", () => {
  it("should display properly", async () => {
    const mockProps = {
      open_support: null,
    };

    const tree = renderer.create(<SupportSetting {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
