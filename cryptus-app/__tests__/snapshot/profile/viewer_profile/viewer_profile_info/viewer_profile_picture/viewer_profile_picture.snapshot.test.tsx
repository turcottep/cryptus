// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import ViewerProfilePicture from "../../../../../../components/profile/viewer_profile/viewer_profile_infos/viewer_profile_picture/viewer_profile_picture";

it("ViewerProfilePicture renders correctly", () => {
  const tree = renderer.create(<ViewerProfilePicture />).toJSON();
  expect(tree).toMatchSnapshot();
});
