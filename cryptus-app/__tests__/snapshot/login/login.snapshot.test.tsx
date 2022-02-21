// components/__tests__/button.snapshot.test.tsx
import router from "next/router";
import React from "react";
import renderer from "react-test-renderer";
import Login from "../../../components/login/login";

it("Login renders correctly", () => {
  const mock_props = {
    router: jest.fn(),
    csrfToken: "test"
  };

  const tree = renderer.create(<Login {...mock_props} />).toJSON();
  expect(tree).toMatchSnapshot();
});
