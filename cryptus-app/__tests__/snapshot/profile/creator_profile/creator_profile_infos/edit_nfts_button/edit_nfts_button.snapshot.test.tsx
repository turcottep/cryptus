// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import EditNFTsButton from "../../../../../../components/profile/creator_profile/creator_profile_infos/edit_nfts_button/edit_nfts_button";

it("EditNFTsButton renders correctly", () => {
  const tree = renderer.create(<EditNFTsButton username={"tester"} />).toJSON();
  expect(tree).toMatchSnapshot();
});
