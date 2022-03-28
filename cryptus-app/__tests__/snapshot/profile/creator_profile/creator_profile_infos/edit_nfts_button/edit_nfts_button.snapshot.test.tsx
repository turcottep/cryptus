// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import EditNFTsButton from "../../../../../../components/profile/creator_profile/creator_profile_infos/edit_nfts_button/edit_nfts_button";

it("EditNFTsButton renders correctly", () => {
  const test_username = "Tester";
  const tree = renderer
    .create(<EditNFTsButton username={test_username} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
