import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mockNextUseRouter } from "../../../../utils/test_util";
import { mock_nft } from "../../../../lib/mocks";
import { nft } from "../../../../lib/data_types";
import NftDetails from "../../../../components/profile/wallet_viewer/nft_details/nft_details";

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
    const isMyProfile = true;
    const randomUser = "randomUser";
    const randomUserImage = "./icons/icon-192x192.png";
    const tree = renderer
      .create(
        <NftDetails
          isMyProfile={isMyProfile}
          username={randomUser}
          callback_close={undefined}
          callback_profile_image_url={randomUserImage}
          profile_image_url={randomUserImage}
          {...details}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
