import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import Login from "../../../../components/utils/metamask/metamaskdemo";

describe("<Login />", () => {
  it("should display properly", async () => {
    const mockProps = {
      onLoggedIn: null,
    };

    const tree = renderer.create(<Login {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
