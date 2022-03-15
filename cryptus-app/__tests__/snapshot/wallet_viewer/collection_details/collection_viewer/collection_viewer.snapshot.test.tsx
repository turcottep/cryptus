import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import { mock_collection } from "../../../../../lib/mocks";
import { mockNextUseRouter } from "../../../../../utils/test_util";
import CollectionViewer from "../../../../../components/wallet_viewer/collection_details/collection_viewer/collection_viewer";

describe("<CollectionViewer />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: { userId: "test" },
    asPath: ``,
  });

  it("should display properly", async () => {
    const mockCollection = mock_collection;
    const tree = renderer
      .create(<CollectionViewer collection={mockCollection} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
