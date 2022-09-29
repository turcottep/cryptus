import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Support from "../../../../components/basic/support/support";

describe("<Support />", () => {
  it("should display properly", async () => {
    const mockProps = {
      callback_close_support: null,
      isMobile: false,
    };

    const tree = renderer.create(<Support {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
