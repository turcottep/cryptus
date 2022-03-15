import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import MarketCollectionInfos from "../../../../../components/market_overview/market_collection/market_collection_infos/market_collection_infos";

describe("<MarketCollectionInfos />", () => {
  it("should display properly", async () => {
    const test_logo =
      "https://lh3.googleusercontent.com/j2tpXbSVHCzhtM2betJkxxlug7Y2i7yC9fyPPiJCTIBqxpU4VxsGk7Osw04lt8TetpSOp2uamKE_Ppy1fC_2cr8";
    const test_ticker = "KITT";
    const test_name = "CryptoKitties";

    const tree = renderer
      .create(
        <MarketCollectionInfos
          collection_logo={test_logo}
          collection_ticker={test_ticker}
          collection_name={test_name}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
