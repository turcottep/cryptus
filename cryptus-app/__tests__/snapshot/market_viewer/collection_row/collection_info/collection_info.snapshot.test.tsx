import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { collection } from "../../../../../components/market_viewer/market_viewer";
import CollectionInfo from "../../../../../components/market_viewer/collection_row/collection_info/collection_info";

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

describe("<CollectionInfo />", () => {
  it("should display properly", async () => {
    const test_collection = mock_collection;

    const tree = renderer
      .create(<CollectionInfo collection={test_collection} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
