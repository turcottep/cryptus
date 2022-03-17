import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mockNextUseRouter } from "../../../../utils/test_util";
import { mock_nft } from "../../../../lib/mocks";
import { nft } from "../../../../lib/data_types";
import NftDetails from "../../../../components/wallet_viewer/nft_details/nft_details";

type nft_details_props = {
  nft: nft;
  rank: {
    position: number;
    total: number;
  };
  listed_price: number;
  isMobile: boolean;
};

describe("<NftDetails />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: "",
    asPath: ``,
  });

  it("should display the correct NFT information", async () => {
    const details: nft_details_props = {
      nft: mock_nft,
      rank: {
        position: 1234567,
        total: 2000000,
      },
      listed_price: 5,
      isMobile: true,
    };
    const tree = renderer.create(<NftDetails {...details} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
