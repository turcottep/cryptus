import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_nft } from "../../../../lib/mocks";
import { nft } from "../../../../lib/data_types";
import NftDetails from "../../../../components/wallet_viewer/nft_details/nft_details";

type nft_details_props = {
  nft: nft;
  rank_props: {
    position: number;
    total: number;
  };
};

describe("<NftDetails />", () => {
  it("should display the correct NFT information", async () => {
    const details: nft_details_props = {
      nft: mock_nft,
      rank_props: {
        position: 1234567,
        total: 2000000,
      },
    };
    const tree = renderer.create(<NftDetails {...details} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
