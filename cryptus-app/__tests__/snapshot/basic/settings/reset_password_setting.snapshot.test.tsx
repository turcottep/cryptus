import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ResetPasswordSetting from "../../../../components/basic/settings/reset_password_setting/reset_password_setting";

describe("<ResetPasswordSetting />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<ResetPasswordSetting />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
