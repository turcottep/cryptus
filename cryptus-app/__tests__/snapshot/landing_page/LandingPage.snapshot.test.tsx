// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import LandingPage from "../../../components/basic/landing_page/landing_page";

it("renders correctly", () => {
  const tree = renderer.create(<LandingPage isMobile={false} />).toJSON();
  expect(tree).toMatchSnapshot();
});
