import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ContextualXButtonButton from "../../../components/basic/header/contextual_x_button/contextual_x_button";

describe("<ContextualXButtonButton />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<ContextualXButtonButton />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
