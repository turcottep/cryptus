import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../../lib/mocks";
import { mockNextUseRouter } from "../../../../../utils/test_util";
import ProfileWalletViewer from "../../../../../components/profile/wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";

describe("<ProfileWalletViewer />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: { userId: "test" },
    asPath: ``,
  });

  it("should display properly", async () => {
    const mockCollections = [mock_collection];

    const tree = renderer
      .create(
        <ProfileWalletViewer
          collections={[]}
          open_collection={function (collection_name: string): void {
            throw new Error("Function not implemented.");
          }}
<<<<<<< HEAD
          open_nft={function (
            collection_name: string,
            nft_token_id: string
          ): void {
=======
          add_collections={function (): void {
            throw new Error("Function not implemented.");
          }}
          open_nft={function (): void {
>>>>>>> dev
            throw new Error("Function not implemented.");
          }}
          collections_filter={[]}
          wallets={[]}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
