import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import FloorPrice from "../../../../../../components/market_viewer/collection_row/price_info/floor_price/floor_price";

describe("<FloorPrice />", () => {
  it("should display properly", async () => {
    const test_price = 7.79;
    const test_curr = "eth";

    const tree = renderer
      .create(<FloorPrice price={test_price} currency={test_curr} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
