import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SortButton from "../../../../components/market/sort_button/sort_button";

describe("<SortButton />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<SortButton sort={"a function"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
