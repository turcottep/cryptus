import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ContextualUsername from "../../../components/basic/header/contextual_username/contextual_username";

describe("<ContextualUsername />", () => {
  it("should display properly", async () => {
    const testName = "Jest_Is_Jesting";

    const tree = renderer
      .create(<ContextualUsername name={testName} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
