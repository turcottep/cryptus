import React from "react";
import renderer from "react-test-renderer";
import NewPassword from "../../../../../components/basic/forgot_password/forgot_password_components/new_password";
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
    .mockReturnValueOnce([3, {}])
    .mockReturnValueOnce([mockState, {}]);
  const mockProps = getMockProps(2);

  const tree = renderer.create(<NewPassword {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
