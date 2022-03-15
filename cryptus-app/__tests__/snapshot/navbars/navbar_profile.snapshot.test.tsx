import React from "react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";

import NavbarProfile from "../../../components/navbars/navbar_profile/navbar_profile";

describe("<NavbarProfile />", () => {
  it("should display properly", async () => {
    const testName = "JestIsJesting";

    const tree = renderer.create(<NavbarProfile name={testName} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
