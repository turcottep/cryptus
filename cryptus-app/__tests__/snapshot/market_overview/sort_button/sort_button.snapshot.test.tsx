import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SortButton from "../../../../components/market/sort_button/sort_button";

describe("<SortButton />", () => {
  it("should display properly", async () => {
    const tree = renderer
      .create(
        <SortButton
          newPropCollectionFavorite={undefined}
          setnewPropCollectionFavorite={undefined}
          newPropCollectionMarket={undefined}
          setnewPropCollectionMarket={undefined}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
