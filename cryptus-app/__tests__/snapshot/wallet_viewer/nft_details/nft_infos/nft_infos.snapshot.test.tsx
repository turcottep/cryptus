import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_nft } from "../../../../../lib/mocks";
import NftInfo from "../../../../../components/wallet_viewer/nft_details/nft_infos/nft_info";

describe("<NftInfo />", () => {
  it("should display the correct NFT information", async () => {
    const tree = renderer
      .create(<NftInfo nft={mock_nft} listed_price={5} estimated_price={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
