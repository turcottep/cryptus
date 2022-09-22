// //react and css
import React, { useState, useEffect } from "react";
// import s from "./login.module.scss";

// //external exports
// import { signIn } from "next-auth/react";
// import router, { withRouter, NextRouter } from "next/router";

// //internal imports
// import FormNavBar from "../signup/user_form/form_navbar";
// import Loading from "../utils/loading";
// import {
//   Or,
//   LoginButton,
//   ForgotPasswordButton,
//   SignupButton,
//   MetamaskButton,
//   errors,
// } from "./login_components/login_components";
// import useInput from "../utils/use_input";
// import FindUserIdFromWalletAdress from "../../lib/findUserIdFromWalletAdress";
// import CreateAccountFromWalletAddress from "../../lib/createAccountFromWalletAddress";
// import FindUserFromUserId from "../../lib/findUserFromUserId";

// declare let window: any;

// type LoginProps = {
//   router: NextRouter;
//   csrfToken;
// };

// export default function Login1(props) {
//   const { router, csrfToken } = props;
//   const [loading, setLoading] = useState<Boolean>(false);

//   const {
//     value: username,
//     bind: bindUsername,
//     reset: resetUsername,
//   } = useInput({
//     id: "username",
//     type: "text",
//     initialValue: "",
//     placeholder: "Email or mobile number",
//   });
//   const {
//     value: password,
//     bind: bindPassword,
//     reset: resetPassword,
//   } = useInput({
//     id: "password",
//     type: "password",
//     initialValue: "",
//     placeholder: "Password",
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     setLoading(true);
//     signIn("credentials", {
//       redirect: true,
//       username: username,
//       password: password,
//       callbackUrl: `${window.location.origin}/` + username,
//     });
//     resetUsername();
//     resetPassword();
//   };

//   const handleError = () => {
//     const error =
//       typeof window !== "undefined" ? (router.query.error as string) : "";
//     const errorMessage = error && (errors[error] ?? errors.default);

//     return error ? errorMessage : null;
//   };

//   const connectMetamask = async () => {
//     router.push("login?");
//     // this.setState({ loading: true });
//     // if (!window.ethereum) {
//     //   console.log("please donwload MetaMask");
//     //   window.open("https://metamask.io/", "_blank").focus();
//     //   this.setState({ loading: false });
//     // } else {
//     try {
//       await window.ethereum.enable();
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       const wallet_address = accounts[0];

//       const userId = await FindUserIdFromWalletAdress(wallet_address, false);

//       if (!userId) {
//         //Create Account with this wallet address
//         const user = await CreateAccountFromWalletAddress(
//           wallet_address,
//           false
//         );
//         router.push("signup?step=3");
//       } else {
//         const user = await FindUserFromUserId(userId, false, false);
//         signIn("credentials", {
//           redirect: true,
//           address: wallet_address,
//           callbackUrl: `${window.location.origin}/` + user.username,
//         });
//       }
//     } catch (error) {
//       // console.error(error);
//       this.setState({ loading: false });
//       router.push("login?error=CancelMetamask");
//     }
//     // }
//   };
//   // connectMetamask();

//   return (
//     <div className="bg-instagram">
//       {loading ? (
//         <div className="absolute h-full w-full text-center mx-auto my-auto z-10">
//           <Loading />
//         </div>
//       ) : null}
//       <main className="sm:max-w-lg mx-auto">
//         {/* <div className="flex flex-col"> */}
//         {/* <MetamaskButton router={router} /> */}
//         <button
//           onClick={() => {
//             connectMetamask();
//           }}
//         >
//           click here
//         </button>

//         {/* {Or()}

//           <div className="flex flex-col mt-4">
//             <form id="form" className="form w-full" onSubmit={handleSubmit}>
//               <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
//               <div className="flex xl:text-xl flex-col mx-12">
//                 <Input
//                   {...bindUsername}
//                   error={handleError}
//                   outline={true}
//                   size="lg"
//                   color="brown"
//                   required
//                 />
//               </div>
//               <div className="flex xl:text-xl flex-col mx-12 mt-8">
//                 <Input
//                   {...bindPassword}
//                   error={handleError}
//                   outline={true}
//                   size="lg"
//                   color="brown"
//                   required
//                 />
//               </div>
//               <LoginButton>
//                 <input type="submit" />
//               </LoginButton>
//             </form>
//             <ForgotPasswordButton />
//             <Or />
//             <SignupButton />
//           </div>
//         </div> */}
//       </main>
//     </div>
//   );
// }
