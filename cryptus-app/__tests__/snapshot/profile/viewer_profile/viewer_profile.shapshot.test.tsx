// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
// import ViewerProfile from "../../../../components/profile/viewer_profile/viewer_profile";
import { profile_props, nft_collection, nft } from "../../../../lib/data_types";

import { mockNextUseRouter } from "../../../../utils/test_util";
import { mock_collection } from "../../../../lib/mocks";

describe("<ViewerProfile />", () => {
  mockNextUseRouter({
    route: "",
    pathname: "",
    query: { userId: "test" },
    asPath: ``,
  });

  it("ViewerProfile renders correctly", () => {
    const mock_props: profile_props = {
      user: {
        networth: 5,
        description: "Whatever",
        username: "Tester",
        address: "test_address",
      },
      collections: [mock_collection],
    };

    /* const useRouter = jest.spyOn(require("next/router"), "useRouter");
    useRouter.mockImplementationOnce(() => ({
      query: { userId: "test" },
    })); */

    // const tree = renderer.create(<ViewerProfile {...mock_props} />).toJSON();
    // expect(tree).toMatchSnapshot();
  });
});
