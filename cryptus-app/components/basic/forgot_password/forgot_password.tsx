import React, { useState, useEffect } from "react";
import Recovery from "./forgot_password_components/recovery";
import PINNumber from "./forgot_password_components/pin";
import NewPassword from "./forgot_password_components/new_password";
import ForgotPWNavBar from "./forgot_password_components/forgot_password_navbar";

export type ForgotPWValuesProps = {
  prevStep: Function;
  nextStep: Function;
  handleChange: Function;
  values: any;
  step: number;
};

type state = {
  email: "";
  pinnumber: "";
  password: "";
  confirmpassword: "";
};

export default function ForgotPassword() {
  const [step, setStep] = useState<number>(1);
  const [state, setState] = useState<state>({
    email: "",
    pinnumber: "",
    password: "",
    confirmpassword: "",
  });
  useEffect(() => {}, []);

  // Proceed to next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Go back to prev step
  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const target_id = e.target.id;
    setState({ ...state, [target_id]: newValue });
  };

  const newProps = {
    nextStep: nextStep,
    prevStep: prevStep,
    handleChange: handleChange,
    values: state,
    step: step,
  };

  const body = (step) => {
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
        <div>{body(step)}</div>
      </div>
    </main>
  );
}
