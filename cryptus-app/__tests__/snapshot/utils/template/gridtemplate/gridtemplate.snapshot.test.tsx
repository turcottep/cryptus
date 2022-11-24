import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import GridTemplate from "../../../../../components/utils/template/gridetemplate/gridtemplate";

describe("<GridTemplate />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<GridTemplate />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
