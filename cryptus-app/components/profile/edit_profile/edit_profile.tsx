import React, { useEffect, useState } from "react";
import Textarea from "@material-tailwind/react/Textarea";
import Input from "@material-tailwind/react/Input";

import { signIn, useSession } from "next-auth/client";
import Loading from "../../utils/loading";

import getUserByUsername from "../../../lib/getUserByUsername";
import router from "next/router";

const errors = {
  UniqueUsername: "This username is already in use!",
  InvalidUsername: "Only lowercase alphanumeric characters are allowed",
  default: "Unable to sign in.",
};

declare let window: any;

export default function PictureDescription() {
  const [session, sessionLoading] = useSession();
  const [loading, setLoading] = useState(false);
  const [user_name, setUserName] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const getOldData = async () => {
      if (sessionLoading) {
        console.log("woupsi");
        return;
      }
      const user_id = session?.user?.name;
      setUserName(user_id);
      console.log("user_id", user_id);

      try {
        const user = await getUserByUsername(user_id, false, false);
        console.log("user from frontend", user);
        setDescription(user.description);
      } catch (error) {
        console.log("error", error);
      }
    };
    console.log("useEffect");

    getOldData();
  }, [sessionLoading]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log("handleChange", id, value);
    if (id == "username") {
      setUserName(value);
    } else if (id == "description") {
      setDescription(value);
    }
  };

  const next_step = async () => {
    console.log("submit");

    const old_user_name = session.user.name;

    const new_user_name = user_name;
    const new_description = description;
    setError("");

    if (!new_user_name.match(/^[0-9a-z]+$/)) {
      setError("InvalidUsername");
    } else {
      setLoading(true);

      const res = await updateUser(
        old_user_name,
        new_user_name,
        new_description
      );

      if (res.status == 202) {
        setError("UniqueUsername");
        setLoading(false);
      } else {
        console.log("sending...");

        await window.ethereum.enable();
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const wallet_address = accounts[0];
        // props.changeState("loading", true);
        signIn("credentials", {
          redirect: true,
          address: wallet_address,
          callbackUrl: `${window.location.origin}/` + new_user_name,
        });
      }
    }
  };

  const handleErrorUsername = () => {
    // const error = String(error);
    const errorMessage = error && ((errors[error] ?? errors.default) as string);

    return error ? errorMessage : null;
  };

  return (
    <div className="flex flex-col ">
      {/* <FormHeader title="Picture and Description" step={props.step} /> */}
      {session ? (
        <div>Logged in as {session.user.name}</div>
      ) : (
        <div> Should not be here </div>
      )}
      {loading ? (
        <div className="absolute h-full w-full text-center mx-auto my-auto z-10">
          <Loading />
        </div>
      ) : null}
      <form id="form" className="form w-full mt-16">
        <div className="flex xl:text-xl bg-white flex-col mx-12 ">
          <Input
            type="username"
            id="username"
            onChange={handleChange}
            placeholder="Username"
            defaultValue={user_name}
            outline={true}
            size="lg"
            color="brown"
            error={handleErrorUsername()}
            required
          />
        </div>
        <div className="flex xl:text-xl bg-white flex-col mx-12 mt-8">
          <Textarea
            type="text"
            id="description"
            onChange={handleChange}
            placeholder="Description"
            defaultValue={description}
            outline={true}
            size="lg"
            color="brown"
            required
          />
        </div>

        <div className="flex xl:text-xl flex-col mx-12 mt-8">
          <button
            type="button"
            onClick={() => next_step()}
            className="text-xl text-center whitespace-nowrap bg-brown text-white font-bold rounded-lg w-full px-2 py-2 mt-2"
          >
            Apply
          </button>
        </div>
      </form>
    </div>
  );
}

async function updateUser(
  old_user_name: string,
  new_user_name: string,
  description: string
) {
  console.log("updateUser");

  const response = await fetch("api/users/updateUsernameDescription", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      old_user_name: old_user_name,
      new_user_name: new_user_name,
      description: description,
    }),
  });
  console.log("response", response);
  const data = await response.json();
  console.log("data", data);
  return response;
}
