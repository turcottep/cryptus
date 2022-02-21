// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import ProfileMenuButton from "../../../../../../components/profile/creator_profile/creator_header/profile_menu_button/profile_menu_button";

it("ProfileMenuButton renders correctly", () => {
  const tree = renderer.create(<ProfileMenuButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
