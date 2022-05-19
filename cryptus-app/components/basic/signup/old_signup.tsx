import React, { Component } from "react";
// import WalletSignUp from "./user_form/wallet_signup/wallet_signup";
// import FormNavBar from "./user_form/form_navbar";
// import CreateAccount from "./user_form/create_account";
// import AccountInformation from "./user_form/account_information";
// import PictureDescription from "./user_form/picture_description";
// import SucessScreen from "./user_form/sucess_screen";
// import router, { NextRouter, withRouter } from "next/router";
// import Loading from "../utils/loading";

// export type FormValuesProps = {
//   prevStep: Function;
//   nextStep: Function;
//   handleChange: Function;
//   changeState: Function;
//   values: MyState;
//   step: Number;
// };

// interface WithRouterProps {
//   router: NextRouter;
//   csrfToken;
// }

// interface MyComponentProps extends WithRouterProps { }

// type MyState = {
//   step: number;
//   name: string;
//   username: string;
//   email: string;
//   password: string;
//   confirmpassword: string;
//   description: string;
//   blockchain_wallet: string;
//   checkbox: string;
//   loading: boolean;
// };

// export class UserForm extends Component<MyComponentProps, MyState> {
//   constructor(props) {
//     super(props);
//     this.nextStep = this.nextStep.bind(this);
//     this.prevStep = this.prevStep.bind(this);
//     this.changeState = this.changeState.bind(this);
//     this.handleChange = this.handleChange.bind(this);
//     this.state = {
//       step: 1,
//       name: "",
//       username: "",
//       email: "",
//       password: "",
//       confirmpassword: "",
//       description: "",
//       blockchain_wallet: "",
//       checkbox: "off",
//       loading: false,
//     };
//   }
//   // Proceed to next step
//   nextStep = () => {
//     const { step } = this.state;
//     this.setState({
//       step: step + 1,
//     });
//   };

//   // Go back to prev step
//   prevStep = () => {
//     const { step } = this.state;
//     this.setState({
//       step: step - 1,
//     });
//   };

//   changeState(target_id: any, newValue: any) {
//     const newState = { [target_id]: newValue } as Pick<MyState, keyof MyState>;
//     this.setState(newState);
//   }

//   handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const newValue = e.target.value;
//     const target_id = e.target.id;
//     this.changeState(target_id, newValue);
//   };

//   render() {
//     var { step } = this.state;
//     const newProps = {
//       nextStep: this.nextStep,
//       prevStep: this.prevStep,
//       handleChange: this.handleChange,
//       changeState: this.changeState,
//       values: this.state,
//       step: this.state.step,
//     };
//     // const desiredStep = parseInt(this.props.router.query.step as string);
//     // if (desiredStep) {
//     //   newProps.step = desiredStep;
//     //   step = desiredStep;
//     //   // router.push("/signup");
//     // }
//     const body = () => {
//       switch (step) {
//         case 1:
//           return <CreateAccount {...newProps} />;
//         case 2:
//           return <WalletSignUp {...newProps} />;
//         case 3:
//           return <AccountInformation {...newProps} />;
//         case 4:
//           return <PictureDescription {...newProps} />;
//         case 5:
//           return <SucessScreen {...newProps} />;

//         default:
//           console.error("Error in UserForm, unknown state");
//       }
//     };

//     return (
//       <main>
//         {this.state.loading ? (
//           <div className="absolute h-full w-full text-center mx-auto my-auto z-10">
//             <Loading />
//           </div>
//         ) : null}
//         <div className="sm:max-w-lg mx-auto">
//           <FormNavBar {...newProps} />
//           <div className="">{body()}</div>
//         </div>
//       </main>
//     );
//   }
// }

// export default withRouter(UserForm);
