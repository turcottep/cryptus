import React, { useState, useEffect } from "react";
import s from "./edit_profile.module.scss";
import { Button, TextField } from "@mui/material";

import { signIn, useSession } from "next-auth/client";
import CreatorHeader from "../creator_profile/creator_header/creator_header";
import { nft_collection, profile_props } from "../../../lib/data_types";
import ViewerProfilePicture from "../viewer_profile/viewer_profile_infos/viewer_profile_picture/viewer_profile_picture";
import Loading from "../../utils/loading/loading";
import getUserByUsername from "../../../lib/get_user_by_username";

const errors = {
  UniqueUsername: "This username is already in use!",
  InvalidUsername: "Only lowercase alphanumeric characters are allowed",
  default: "Unable to sign in.",
};

declare let window: any;

export default function EditProfile(props: {
  collections: nft_collection[];
  user: any;
}) {
  return (
    <div className={s.container}>
      <CreatorHeader />
      <EditProfileInfos {...props} />
    </div>
  );
}

const EditProfileInfos = (props: profile_props) => {
  const { description, username, networth } = props.user;
  const [session, sessionLoading] = useSession();
  const [loading, setLoading] = useState(false);
  const [user_name, setUserName] = useState(username);
  const [desc, setDesc] = useState(description);

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
        setDesc(user.description);
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
      setDesc(value);
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
    <div className={s.smallerContainer}>
      {loading ? (
        <div className="absolute h-full w-full text-center mx-auto my-auto z-10">
          <Loading />
        </div>
      ) : null}
      <div className={s.row}>
        <ViewerProfilePicture />
        <div className={s.edits}>
          <Button
            className={s.button}
            disableElevation
            variant="contained"
            size="small"
            onClick={() => next_step()}
          >
            Apply
          </Button>
        </div>
      </div>
      <div className={s.editName}>
        <TextField
          type="username"
          id="outlined-basic"
          onChange={handleChange}
          label="Username"
          defaultValue={user_name}
          error={!!handleErrorUsername()}
          size="small"
          required
        />
      </div>
      <div className={s.editDesc}>
        <TextField
          type="textarea"
          id="outlined-basic"
          onChange={handleChange}
          label="Description"
          defaultValue={desc}
          size="small"
          required
        />
      </div>
    </div>
  );
};

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
  console.log("response edit_profile", response);
  return response;
}
