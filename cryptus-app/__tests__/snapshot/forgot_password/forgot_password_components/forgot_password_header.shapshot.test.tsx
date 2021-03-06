import React from "react";
import renderer from "react-test-renderer";
import ForgotPWHeader from "../../../../components/basic/forgot_password/forgot_password_components/forgot_password_header";

it("renders correctly", () => {
  const title = "A title";
  const step = 2;

  const tree = renderer
    .create(<ForgotPWHeader title={title} step={step} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
