import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../lib/mocks";
import { mockNextUseRouter } from "../../../../utils/test_util";
import ProfileWalletViewer from "../../../../components/wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";

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
          collections={mockCollections}
          open_collection={function (index: number): void {
            throw new Error("Function not implemented.");
          }}
          open_nft={function (index: number): void {
            throw new Error("Function not implemented.");
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
