// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import EditProfileButton from "../../../../../../components/profile/creator_profile/creator_profile_infos/edit_profile_button/edit_profile_button";

it("EditProfileButton renders correctly", () => {
  const tree = renderer.create(<EditProfileButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
