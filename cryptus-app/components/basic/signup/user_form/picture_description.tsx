import React, { Component } from "react";

// import FormHeader from "./form_header";
// import { FormValuesProps } from "../signup";
// import { signIn } from "next-auth/react";
// import Loading from "../../utils/loading";

// export default class PictureDescription extends Component<FormValuesProps> {
//   continue = (e) => {
//     const email = this.props.values.email;
//     const description = this.props.values.description;
//     try {
//       updateUser(email, description).then(() => {
//         this.props.changeState("loading", true);

//         signIn("credentials", {
//           redirect: true,
//           username: this.props.values.username,
//           password: this.props.values.password,
//           // callbackUrl: String(process.env.BASE_URL),
//           callbackUrl:
//             `${window.location.origin}/` + this.props.values.username,
//         });

//         // this.props.nextStep();
//       });
//     } catch (error) {
//       alert("Please accept the terms and conditions");
//     }

//     e.preventDefault();
//   };

//   back = (e) => {
//     e.preventDefault();
//     this.props.prevStep();
//   };

//   render() {
//     const { values, handleChange } = this.props;

//     return (
//       <div className="flex flex-col ">
//         <FormHeader title="Picture and Description" step={this.props.step} />

//         <form id="form" className="form w-full mt-16">
//           <div className="flex xl:text-xl flex-col items-center mx-12 ">
//             <div className="w-24 h-24 flex items-center justify-center bg-white rounded-full border-gray-300 border">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-6 w-6 text-gray-600 mx-auto my-auto"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//             </div>
//             <span className="pt-2 text-gray-600">Profile Picture</span>
//           </div>
//           <div className="flex xl:text-xl bg-white flex-col mx-12 mt-8">
//             <Textarea
//               type="text"
//               id="description"
//               onChange={this.props.handleChange}
//               placeholder="Description"
//               outline={true}
//               size="lg"
//               color="brown"
//               required
//             />
//           </div>

//           <div className="flex xl:text-xl flex-col mx-12 mt-8">
//             <button
//               onClick={this.continue}
//               className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2 mt-2"
//             >
//               Continue
//             </button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// }

// async function updateUser(email: string, description: string) {
//   const response = await fetch("api/leads/updateDescriptionAndProfilePic", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: email, description: description }),
//   });
// }
