import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import DarkThemeSetting from "../../../../components/basic/settings/dark_theme_setting/dark_theme_setting";

describe("<DarkThemeSetting />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<DarkThemeSetting />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
