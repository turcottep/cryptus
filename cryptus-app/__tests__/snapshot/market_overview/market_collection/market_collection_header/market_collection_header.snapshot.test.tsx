import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import MarketCollectionHeader from "../../../../../components/market/market_collection/market_collection_header/market_collection_header";

describe("<MarketCollectionHeader />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<MarketCollectionHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
