import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import SortButton from "../../../../components/market/sort_button/sort_button";
import { intervals } from "../../../../lib/data_types";

describe("<SortButton />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<SortButton callback={undefined} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
