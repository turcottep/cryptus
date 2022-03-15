import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SearchBar from "../../../../components/market_overview/search_bar/search_bar";

describe("<SearchBar />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<SearchBar />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
