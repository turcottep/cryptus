import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_nft } from "../../../../../../lib/mocks";
import PropertyBlock from "../../../../../../components/wallet_viewer/nft_details/nft_properties/property_block/property_block";

describe("<PropertyBlock />", () => {
  it("should display all the correct properties", async () => {
    const tree = renderer
      .create(
        <PropertyBlock
          name={mock_nft.name}
          value={mock_nft.last_sale_price.toString()}
          rarity={mock_nft.rarity_rank}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
