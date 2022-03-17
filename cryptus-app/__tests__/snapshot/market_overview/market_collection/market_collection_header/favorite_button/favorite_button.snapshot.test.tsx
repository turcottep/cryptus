import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import FavoriteButton from "../../../../../../components/market_overview/market_collection/market_collection_header/favorite_button/favorite_button";

describe("<FavoriteButton />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<FavoriteButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
