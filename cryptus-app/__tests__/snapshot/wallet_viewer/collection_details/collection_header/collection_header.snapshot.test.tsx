import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import CollectionHeader from "../../../../../components/wallet_viewer/collection_details/collection_header/collection_header";

describe("<CollectionHeader />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<CollectionHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
