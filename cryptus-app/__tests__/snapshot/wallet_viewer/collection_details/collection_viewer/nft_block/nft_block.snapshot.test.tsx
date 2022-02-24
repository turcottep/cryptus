import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_nft } from "../../../../../../lib/mocks";
import NftBlock from "../../../../../../components/wallet_viewer/collection_details/collection_viewer/nft_block/nft_block";

describe("<NftBlock />", () => {
  it("should display the correct collection information", async () => {
    const tree = renderer
      .create(<NftBlock name={mock_nft.name} nft={mock_nft.image_url} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
