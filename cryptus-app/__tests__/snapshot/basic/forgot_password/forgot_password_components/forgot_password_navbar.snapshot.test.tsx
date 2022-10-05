import React from "react";
import renderer from "react-test-renderer";
import FormNavBar from "../../../../../components/basic/forgot_password/forgot_password_components/forgot_password_navbar";
import { getMockProps } from "../../../../../lib/mocks";

type state = {
  email: "";
  pinnumber: "";
  password: "";
  confirmpassword: "";
};

it("renders correctly", () => {
  const mockState: state = {
    email: "",
    pinnumber: "",
    password: "",
    confirmpassword: "",
  };

  React.useState = jest
    .fn()
    .mockReturnValueOnce([1, {}])
    .mockReturnValueOnce([mockState, {}]);
  const mockProps = getMockProps(1);

  const tree = renderer.create(<FormNavBar {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
