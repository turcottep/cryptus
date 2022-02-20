// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import ViewerProfileName from "../../../../../../components/profile/viewer_profile/viewer_profile_infos/viewer_profile_name/viewer_profile_name";

it("ViewerProfileName renders correctly", () => {
  const name: string = "Username123456";
  const tree = renderer
    .create(<ViewerProfileName displayName={name} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
