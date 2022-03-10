// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import ViewerHeader from "../../../../../components/profile/viewer_profile/viewer_header/viewer_header";
import { mockNextUseRouter } from "../../../../../utils/test_util";

describe("<ViewerHeader />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: "",
    asPath: ``,
  });

  it("ViewerHeader renders correctly", () => {
    const tree = renderer.create(<ViewerHeader />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
