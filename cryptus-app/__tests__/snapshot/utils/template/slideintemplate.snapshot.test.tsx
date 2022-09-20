import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Home from "../../../../components/utils/template/slideintemplate";

describe("<Home />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<Home />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
