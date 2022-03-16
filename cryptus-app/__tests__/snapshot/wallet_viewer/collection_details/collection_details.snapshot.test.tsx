import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../lib/mocks";
import { mockNextUseRouter } from "../../../../utils/test_util";
import CollectionDetails from "../../../../components/wallet_viewer/collection_details/collection_details";

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
        <CollectionDetails collection={mockCollection} isMobile={isMobile} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
