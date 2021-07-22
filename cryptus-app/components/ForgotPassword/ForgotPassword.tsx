import React, { Component } from "react";
import Recovery from "./Recovery";
import PINNumber from "./PINNumber";
import NewPassword from "./NewPassword";
import ForgotPWNavBar from "./ForgotPWNavbar";

export type ForgotPWValuesProps = {
  prevStep: Function;
  nextStep: Function;
  handleChange: Function;
  values: any;
  step: Number;
};

export class ForgotPassword extends Component {
  state = {
    step: 1,
    email: "",
    pinnumber: "",
    password: "",
    confirmpassword: "",
  };

  // Proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };

  // Go back to prev step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const target_id = e.target.id;
    this.setState({ [target_id]: newValue });
  };

  render() {
    const { step } = this.state;

    const newProps = {
      nextStep: this.nextStep,
      prevStep: this.prevStep,
      handleChange: this.handleChange,
      values: this.state,
      step: this.state.step,
    };

    const body = () => {
      switch (step) {
        case 1:
          return <Recovery {...newProps} />;
        case 2:
          return <PINNumber {...newProps} />;
        case 3:
          return <NewPassword {...newProps} />;

        default:
          console.error("Error in ForgotPassword, unknown state");
      }
    };

    return (
      <main>
        <div>
          <ForgotPWNavBar {...newProps} />
          <div className="">{body()}</div>
        </div>
      </main>
    );
  }
}

export default ForgotPassword;
