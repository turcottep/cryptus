import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import NftHeader from "../../../../../components/profile/wallet_viewer/nft_details/nft_header/nft_header";

describe("<NftHeader />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<NftHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
