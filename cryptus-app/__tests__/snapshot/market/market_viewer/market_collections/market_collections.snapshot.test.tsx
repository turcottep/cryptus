import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import MarketCollections from "../../../../../components/market/market_viewer/market_collections/market_collections";
import { collection } from "../../../../../lib/data_types";

const mock_collection: collection = {
  id: "1",
  name: "CryptoKitties",
  logo: "https://lh3.googleusercontent.com/j2tpXbSVHCzhtM2betJkxxlug7Y2i7yC9fyPPiJCTIBqxpU4VxsGk7Osw04lt8TetpSOp2uamKE_Ppy1fC_2cr8",
  ticker: "KITT",
  floor_price: 7.79,
  floor_price_delta: 0.01,
  address: "",
  data_price: [],
  data_volume: [],
  timestamp: "week",
};

describe("<MarketCollections />", () => {
  it("should display properly", async () => {
    const test_collections = [mock_collection];

    const tree = renderer
      .create(
        <MarketCollections
          name={"My Collections"}
          icon="icons/favorite_icon.png"
          collections={test_collections}
          callback={undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
