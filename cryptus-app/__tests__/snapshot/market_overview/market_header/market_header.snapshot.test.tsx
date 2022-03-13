import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import MarketHeader from "../../../../components/market_overview/market_header/market_header";

describe("<MarketHeader />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<MarketHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
