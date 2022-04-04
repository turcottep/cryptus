import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import CollectionMarketGraph from "../../../../../components/market_overview/market_collection/collection_market_graph/collection_market_graph";

describe("<CollectionMarketGraph />", () => {
  it("should display properly", async () => {
    const test_price = [
      46, 15, 100, 89, 83, 24, 91, 74, 94, 24, 23, 40, 4, 44, 49, 14, 38, 90,
      62, 4, 4, 19, 37, 30, 51, 6, 49, 72, 60, 97, 78, 45, 33, 8, 14, 86, 87,
      11, 98, 80, 80, 38, 10, 55, 23, 13, 74, 48, 29, 21,
    ];
    const test_volume = [
      71, 15, 6, 26, 9, 54, 4, 4, 24, 45, 16, 17, 54, 9, 23, 43, 2, 99, 26, 76,
      100, 47, 46, 36, 53, 29, 86, 46, 83, 88, 87, 15, 79, 59, 7, 12, 20, 79,
      53, 77, 77, 26, 89, 57, 47, 37, 87, 48, 26, 65,
    ];
    const test_address = "";
    const test_active = 0;
    /* React.useState = jest
      .fn()
      .mockReturnValueOnce([test_price, {}])
      .mockReturnValueOnce([test_volume, {}])
      .mockReturnValueOnce([test_active, {}]); */

    const tree = renderer
      .create(
        <CollectionMarketGraph
          data_price={test_price}
          data_volume={test_volume}
          interval={undefined}
          address={test_address}
          callback={undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
