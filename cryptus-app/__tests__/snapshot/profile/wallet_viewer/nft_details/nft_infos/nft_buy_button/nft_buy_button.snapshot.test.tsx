import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import NftBuyButton from "../../../../../../../components/profile/wallet_viewer/nft_details/nft_infos/nft_buy_button/nft_buy_button";

describe("<NftBuyButton />", () => {
  it("should display properly", async () => {
    const testPrice = 5;
    const testURL = "www.opensea.io/testNFT";

    const tree = renderer
      .create(<NftBuyButton price={testPrice} url={testURL} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
