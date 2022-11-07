// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import CreatorHeader from "../../../../../components/profile/creator_profile/creator_header/creator_header";

it("CreatorHeader renders correctly", () => {
  const tree = renderer
    .create(<CreatorHeader open_settings={undefined} open_search={undefined} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
