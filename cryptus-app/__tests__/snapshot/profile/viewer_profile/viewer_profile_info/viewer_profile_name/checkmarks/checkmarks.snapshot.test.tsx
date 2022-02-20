// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import Checkmarks from "../../../../../../../components/profile/viewer_profile/viewer_profile_infos/viewer_profile_name/checkmarks/checkmarks";

it("Checkmarks renders correctly", () => {
  const tree = renderer.create(<Checkmarks />).toJSON();
  expect(tree).toMatchSnapshot();
});
