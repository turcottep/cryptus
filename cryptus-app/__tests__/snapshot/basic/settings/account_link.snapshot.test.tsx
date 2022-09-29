import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import AccountLink from "../../../../components/basic/settings/account_link/account_link";

describe("<AccountLink />", () => {
  it("should display properly", async () => {
    const mockProps = {
      username: "TristanIsTesting",
    };

    const tree = renderer.create(<AccountLink {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
