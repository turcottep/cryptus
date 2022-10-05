import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Card from "../../../../components/utils/card/card";

describe("<Card />", () => {
  it("should display properly", async () => {
    const mockProps = {
      isMobile: false,
      callback_close: null,
      children: null,
    };

    const tree = renderer.create(<Card {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
