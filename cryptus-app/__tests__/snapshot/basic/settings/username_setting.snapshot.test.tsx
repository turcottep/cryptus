import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import UsernameSetting from "../../../../components/basic/settings/username_setting/username_setting";

describe("<UsernameSetting />", () => {
  it("should display properly", async () => {
    const mockProps = {
      username: "TristanIsTesting",
    };

    const tree = renderer.create(<UsernameSetting {...mockProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
