import React from "react";
import renderer from "react-test-renderer";
import PINNumber from "../../../../components/forgot_password/forgot_password_components/pin";
import { getMockProps } from "../../../../lib/mocks";

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
    .mockReturnValueOnce([2, {}])
    .mockReturnValueOnce([mockState, {}]);
  const mockProps = getMockProps(2);

  const tree = renderer.create(<PINNumber {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
