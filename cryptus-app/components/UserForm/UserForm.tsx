import React, { Component } from "react";
import WalletSignUp from "./WalletSignUp";
import FormHeader from "./FormHeader";
import FormNavBar from "./FormNavbar";
import CreateAccount from "./CreateAccount";
import AccountInformation from "./AccountInformation";
import PictureDescription from "./PictureDescription";
import SucessScreen from "./SucessScreen";

export type FormValuesProps = {
  prevStep: Function;
  nextStep: Function;
  handleChange: Function;
  values: any;
  step: Number;
};

export class UserForm extends Component {
  state = {
    step: 1,
    name: "",
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    description: "",
    checkbox: false
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
          return <WalletSignUp {...newProps} />;
        case 2:
          return <CreateAccount {...newProps} />;
        case 3:
          return <AccountInformation {...newProps} />;
        case 4:
          return <PictureDescription {...newProps} />;
        case 5:
          return <SucessScreen {...newProps} />;

        default:
          console.error("Error in UserForm, unknown state");
      }
    };

    return (
      <main>
        <div>
          <FormNavBar {...newProps} />
          <div className="">{body()}</div>
        </div>
      </main>
    );
  }
}

export default UserForm;
