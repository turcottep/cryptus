import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import LogoutSetting from "../../../../components/basic/settings/logout_setting/logout_setting";

describe("<LogoutSetting />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<LogoutSetting />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
