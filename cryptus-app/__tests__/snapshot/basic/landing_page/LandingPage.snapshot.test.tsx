// components/__tests__/button.snapshot.test.tsx
import React from "react";
import renderer from "react-test-renderer";
import LandingPage from "../../../../components/basic/landing_page/landing_page";

it("renders correctly", () => {
  const mockProps = {
    isMobile: false,
  };
  const tree = renderer.create(<LandingPage {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
