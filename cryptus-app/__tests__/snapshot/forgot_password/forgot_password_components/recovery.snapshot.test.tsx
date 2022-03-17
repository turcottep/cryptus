import React from "react";
import renderer from "react-test-renderer";
import Recovery from "../../../../components/forgot_password/forgot_password_components/recovery";
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
    .mockReturnValueOnce([1, {}])
    .mockReturnValueOnce([mockState, {}]);
  const mockProps = getMockProps(1);

  const tree = renderer.create(<Recovery {...mockProps} />).toJSON();
  expect(tree).toMatchSnapshot();
});
