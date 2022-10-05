import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import FloorPriceDelta from "../../../../../../../components/market/market_viewer/collection_row/price_info/floor_price_delta/floor_price_delta";

describe("<FloorPriceDelta />", () => {
  it("should display properly", async () => {
    const test_price = 7.79;
    const test_delta = 0.01;
    const test_curr = "eth";

    const tree = renderer
      .create(
        <FloorPriceDelta
          currency={test_curr}
          initial_price={0}
          current_price={0}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
