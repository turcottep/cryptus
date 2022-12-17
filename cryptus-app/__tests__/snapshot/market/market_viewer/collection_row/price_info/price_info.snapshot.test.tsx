import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import PriceInfo from "../../../../../../components/market/market_viewer/collection_row/price_info/price_info";
import { collection } from "../../../../../../lib/data_types";

const mock_collection: collection = {
  id: "1",
  name: "CryptoKitties",
  logo: "https://lh3.googleusercontent.com/j2tpXbSVHCzhtM2betJkxxlug7Y2i7yC9fyPPiJCTIBqxpU4VxsGk7Osw04lt8TetpSOp2uamKE_Ppy1fC_2cr8",
  ticker: "KITT",
  floor_price: 7.79,
  floor_price_delta: 0.01,
  address: "",
  data_price: [
    46, 15, 100, 89, 83, 24, 91, 74, 94, 24, 23, 40, 4, 44, 49, 14, 38, 90, 62,
    4, 4, 19, 37, 30, 51, 6, 49, 72, 60, 97, 78, 45, 33, 8, 14, 86, 87, 11, 98,
    80, 80, 38, 10, 55, 23, 13, 74, 48, 29, 21,
  ],
  data_volume: [
    71, 15, 6, 26, 9, 54, 4, 4, 24, 45, 16, 17, 54, 9, 23, 43, 2, 99, 26, 76,
    100, 47, 46, 36, 53, 29, 86, 46, 83, 88, 87, 15, 79, 59, 7, 12, 20, 79, 53,
    77, 77, 26, 89, 57, 47, 37, 87, 48, 26, 65,
  ],
  timestamp: "week",
  user_owned: false,
};

describe("<PriceInfo />", () => {
  it("should display properly", async () => {
    const test_collection = mock_collection;
    const test_curr = "eth";

    const tree = renderer
      .create(
        <PriceInfo
          collection={test_collection}
          currency={test_curr}
          prices={[0, 1]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
