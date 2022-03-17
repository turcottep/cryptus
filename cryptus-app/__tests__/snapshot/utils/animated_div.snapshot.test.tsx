import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import AnimatedDiv from "../../../components/utils/animated_div";

describe("<AnimatedDiv />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<AnimatedDiv />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
