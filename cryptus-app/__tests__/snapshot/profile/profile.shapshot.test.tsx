// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import { profile_props, nft_collection, nft } from "../../../lib/data_types";

import { mockNextUseRouter } from "../../../utils/test_util";
import Profile from "../../../components/profile/profile";
import { mock_collection } from "../../../lib/mocks";
// import Props from "./mock_profile";

describe("<Profile />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: { userId: "test" },
    asPath: ``,
  });

  it("Profile renders correctly", () => {
    const mock_props: profile_props = {
      user: {
        networth: 5,
        description: "Whatever",
        username: "Tester",
        address: "test_address",
      },
      collections: [mock_collection],
    };

    const tree = renderer.create(<Profile {...mock_props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
