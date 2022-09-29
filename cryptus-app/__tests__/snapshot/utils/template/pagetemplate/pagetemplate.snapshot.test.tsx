import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import PageTemplate from "../../../../../components/utils/template/pagetemplate/pagetemplate";

describe("<PageTemplate />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<PageTemplate />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
