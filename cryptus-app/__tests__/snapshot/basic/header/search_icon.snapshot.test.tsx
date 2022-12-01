import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import DesktopHeader from "../../../../components/basic/header/desktop_header/desktop_header";

describe("<DesktopHeader />", () => {
  it("should display properly", async () => {
    const mockProps = {
      tab: "market",
      toggle_search: null,
      toggle_settings: null,
    };

    const tree = renderer.create(<DesktopHeader {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
