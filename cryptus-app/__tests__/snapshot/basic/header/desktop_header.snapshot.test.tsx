import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SearchIcon from "../../../../components/basic/header/search_icon/search_icon";

describe("<DesktopHeader />", () => {
  it("should display properly", async () => {
    const mockProps = {
      isMobile: false,
      callback_close: null,
      users: [],
    };

    const tree = renderer.create(<SearchIcon {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
