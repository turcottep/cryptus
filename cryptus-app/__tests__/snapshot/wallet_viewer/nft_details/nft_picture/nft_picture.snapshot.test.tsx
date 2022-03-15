import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import NftPicture from "../../../../../components/wallet_viewer/nft_details/nft_picture/nft_picture";

describe("<NftPicture />", () => {
  it("should display properly", async () => {
    const testURL = "/images/cryptopunk.png";
    const testDescription = "CryptoPunk #IFORGOR";

    const tree = renderer
      .create(<NftPicture image_url={testURL} description={testDescription} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
