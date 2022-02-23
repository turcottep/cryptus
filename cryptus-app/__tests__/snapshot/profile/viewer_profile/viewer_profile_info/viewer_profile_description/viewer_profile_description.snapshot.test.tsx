// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import ViewerProfileDescription from "../../../../../../components/profile/viewer_profile/viewer_profile_infos/viewer_profile_description/viewer_profile_description";

it("ViewerProfileDescription renders correctly", () => {
  const description: string = "Je vais a MTL pour chercher un bike";
  const tree = renderer
    .create(<ViewerProfileDescription description={description} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
