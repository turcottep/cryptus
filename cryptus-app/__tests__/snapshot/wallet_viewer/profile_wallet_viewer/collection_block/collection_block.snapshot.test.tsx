import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../../lib/mocks";
import CollectionBlock from "../../../../../components/wallet_viewer/profile_wallet_viewer/collection_block/collection_block";

describe("<CollectionBlock />", () => {
  it("should go to collection_details", async () => {
    /* const handleLink = jest.fn();
        const { findByTestId } = render(<CollectionBlock {...nft_collection}/>); 
  
        const collection = await findByTestId("collection_block");

        fireEvent.click(collection);

        expect(handleLink).toBeCalledWith({ */
  });

  it("should render correctly", () => {
    const tree = renderer
      .create(<CollectionBlock nft={mock_collection} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
