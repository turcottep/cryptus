import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ModifyFavoriteCollectionsButton from "../../../../../components/market_overview/market_header/modify_favorite_collections_button/modify_favorite_collections_button";

describe("<ModifyFavoriteCollectionsButton />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<ModifyFavoriteCollectionsButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
