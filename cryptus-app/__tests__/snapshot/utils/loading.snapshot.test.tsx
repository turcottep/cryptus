import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Loading from "../../../components/utils/loading/loading";

describe("<Loading />", () => {
  it("should display properly", async () => {
    const tree = renderer.create(<Loading />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
