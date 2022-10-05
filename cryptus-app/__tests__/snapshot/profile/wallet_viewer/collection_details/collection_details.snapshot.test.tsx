import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../../lib/mocks";
import { mockNextUseRouter } from "../../../../../utils/test_util";
import CollectionDetails from "../../../../../components/profile/wallet_viewer/collection_details/collection_details";

describe("<CollectionDetails />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: { userId: "test" },
    asPath: ``,
  });

  it("should display properly", async () => {
    const mockCollection = mock_collection;
    const isMobile = true;

    const tree = renderer
      .create(
        <CollectionDetails
          collection={mockCollection}
          isMobile={isMobile}
          callback_close={undefined}
          open_nft={undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
