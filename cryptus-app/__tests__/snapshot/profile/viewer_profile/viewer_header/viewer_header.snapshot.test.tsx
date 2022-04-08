// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import ViewerHeader from "../../../../../components/profile/viewer_profile/viewer_header/viewer_header";
import { mockNextUseRouter } from "../../../../../utils/test_util";

describe("<ViewerHeader />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: { userId: "test" },
    asPath: ``,
  });

  it("ViewerHeader renders correctly", () => {
    const tree = renderer
      .create(<ViewerHeader userId="test" setLoading={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
