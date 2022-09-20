import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import CollectionFloorPrice from "../../../../../components/market/market_collection/collection_floor_price/collection_floor_price";

describe("<CollectionFloorPrice />", () => {
  it("should display properly", async () => {
    const test_fp = 7.79;
    const test_delta = 0.01;
    const test_timestamp = "week";

    const tree = renderer
      .create(
        <CollectionFloorPrice
          floor_price_timestamp={test_timestamp}
          initial_price={0}
          current_price={0}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
