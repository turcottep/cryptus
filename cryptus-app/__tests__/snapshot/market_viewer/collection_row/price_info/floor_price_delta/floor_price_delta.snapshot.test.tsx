import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import FloorPriceDelta from "../../../../../../components/market_viewer/collection_row/price_info/floor_price_delta/floor_price_delta";

describe("<FloorPriceDelta />", () => {
  it("should display properly", async () => {
    const test_price = 7.79;
    const test_delta = 0.01;
    const test_curr = "eth";

    const tree = renderer
      .create(
        <FloorPriceDelta
          price={test_price}
          delta={test_delta}
          currency={test_curr}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
