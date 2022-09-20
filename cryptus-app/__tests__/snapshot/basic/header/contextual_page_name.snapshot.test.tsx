import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import ContextualPageName from "../../../../components/basic/header/contextual_page_name/contextual_page_name";

describe("<ContextualPageName />", () => {
  it("should display properly", async () => {
    const testName = "Market Overview";

    const tree = renderer
      .create(<ContextualPageName name={testName} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
