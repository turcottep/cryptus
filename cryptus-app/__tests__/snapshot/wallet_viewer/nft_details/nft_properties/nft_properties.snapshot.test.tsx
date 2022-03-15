import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_nft } from "../../../../../lib/mocks";
import NFTProperties from "../../../../../components/wallet_viewer/nft_details/nft_properties/nft_properties";

describe("<NFTProperties />", () => {
  it("should display properly", async () => {
    const testProperties = mock_nft.properties;
    const tree = renderer
      .create(<NFTProperties properties={testProperties} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
