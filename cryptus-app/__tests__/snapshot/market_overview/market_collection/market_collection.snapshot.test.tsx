import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../lib/mocks";
import MarketCollection from "../../../../components/market/market_collection/market_collection";
import { intervals } from "../../../../lib/data_types";

describe("<MarketCollection />", () => {
  it("should display properly", async () => {
    const test_props = {
      market_collection_props: {
        collection_name: mock_collection.name,
        collection_logo: mock_collection.image_url,
        collection_ticker: "KITT",
        floor_price_live: 7.79,
        floor_price_delta: 0.01,
        floor_price_timestamp: "week",
        data_price: [0.01, 0.02, 0.03, 0.04, 0.05],
        interval: intervals.week,
        count: [],
        volume: [],
        address: "",
      },
      isMobile: true,
    };

    const tree = renderer
      .create(<MarketCollection callback_close={undefined} {...test_props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
