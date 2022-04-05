import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import NFTRankInCollection from "../../../../../components/profile/wallet_viewer/nft_details/nft_rank_in_collection/nft_rank_in_collection";

describe("<NFTRankInCollection />", () => {
  it("should display properly", async () => {
    const testPosition = 1234;
    const testTotal = 10000;
    const tree = renderer
      .create(<NFTRankInCollection position={testPosition} total={testTotal} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
