import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SortButton from "../../../../components/market_overview/sort_button/sort_button";

describe("<SortButton />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<SortButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
