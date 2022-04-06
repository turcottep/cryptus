// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import ViewerProfilePicture from "../../../../../../components/profile/viewer_profile/viewer_profile_infos/viewer_profile_picture/viewer_profile_picture";

it("ViewerProfilePicture renders correctly", () => {
  const image_url = "./icons/icon-192x192.png";
  const tree = renderer
    .create(<ViewerProfilePicture image_url={image_url} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
