import React, { useState, useEffect } from "react";
import s from "./creator_profile_infos.module.scss";

import { signIn, useSession } from "next-auth/client";
import ViewerProfilePicture from "../../viewer_profile/viewer_profile_infos/viewer_profile_picture/viewer_profile_picture";
import { profile_props } from "../../../../lib/data_types";
import { TextField } from "@mui/material";
import EditCollections from "../../../wallet_viewer/show_collections/show_collections";

const errors = {
  UniqueUsername: "This username is already in use!",
  InvalidUsername: "Only lowercase alphanumeric characters are allowed",
  default: "Unable to sign in.",
};

declare let window: any;

export default function CreatorProfileInfos(props: {
  profile_props: profile_props;
  callback_filter: (new_filter: string[]) => void;
  initial_filter: string[];
}) {
  const { profile_props, callback_filter } = props;

  const [session, sessionLoading] = useSession();
  const [loading, setLoading] = useState(false);
  const [edit_profile, set_edit_profile] = useState(false);
  const [edit_collections, set_edit_collections] = useState(false);
  const [user_name, setUserName] = useState(profile_props.user.username);
  const [desc, setDesc] = useState(profile_props.user.description);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 4000);
    }
  }, [copied]);
  const account_link = "publicwallet.app/" + user_name;

  const CopiedMessage = () => {
    return (
      copied && (
        <div className={s.copied_message}>
          <div>Copied to clipboard!</div>
        </div>
      )
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log("target id", e.target.id);

    if (id.includes("username")) {
      console.log("changing username");
      setUserName(value);
    } else if (id.includes("description")) {
      setDesc(value);
    }
    console.log("user_name", user_name);
  };

  const update_profile = async () => {
    console.log("submit");

    const old_user_name = session.user.name;

    const new_user_name = user_name;
    const new_description = desc;
    setError("");
    console.log(
      "old_user_name",
      old_user_name,
      "new_user_name",
      new_user_name,
      "new_description",
      new_description
    );

    if (!new_user_name.match(/^[0-9a-z]+$/)) {
      console.log("invalid username");

      setError("InvalidUsername");
      return;
    }

    setLoading(true);

    const res = await updateUser(old_user_name, new_user_name, new_description);

    if (res.status == 202) {
      setError("UniqueUsername");
      setLoading(false);
      return;
    }

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
  };

  const handleErrorUsername = () => {
    const errorMessage = error && ((errors[error] ?? errors.default) as string);

    return error ? errorMessage : null;
  };

  return (
    <div className={s.container}>
      <div className={s.row}>
        <ViewerProfilePicture />
        {edit_profile ? (
          <div className={s.edits}>
            <div
              className={s.button}
              onClick={() => {
                set_edit_profile(false);
              }}
            >
              CANCEL
            </div>
            <div className={s.button} onClick={() => update_profile()}>
              Apply
            </div>
          </div>
        ) : (
          <div className={s.edits}>
            <div
              className={s.button}
              onClick={() => {
                set_edit_profile(true);
              }}
            >
              Edit Profile
            </div>
            <div
              className={s.button}
              onClick={() => {
                set_edit_collections(true);
              }}
            >
              Edit Nfts
            </div>
            <div>
              <div
                className={s.button}
                onClick={() => {
                  navigator.clipboard.writeText(account_link);
                  setCopied(true);
                }}
              >
                {copied ? account_link : "Copy My link"}
              </div>
              <CopiedMessage />
            </div>
          </div>
        )}
      </div>

      {edit_profile ? (
        <div className={s.editName}>
          <TextField
            type="username"
            id="standard-basic username"
            className={s.editName}
            onChange={handleChange}
            label="Username"
            defaultValue={user_name}
            error={!!handleErrorUsername()}
            size="small"
            variant="standard"
            required
          />
        </div>
      ) : (
        <div className={s.username}>{user_name}</div>
      )}
      {edit_profile ? (
        <div className={s.editDesc}>
          <TextField
            type="description"
            id="standard-basic description"
            className={s.editDesc}
            onChange={handleChange}
            label="Description"
            defaultValue={desc}
            size="medium"
            variant="standard"
            required
          />
        </div>
      ) : (
        <div className={s.description}>{desc}</div>
      )}
      {edit_collections && (
        <EditCollections
          collections={profile_props.collections}
          initial_filter={props.initial_filter}
          callback_close={() => {
            set_edit_collections(false);
          }}
          callback_update_filter={callback_filter}
        />
      )}
      <div>{`NETWORTH:${profile_props.user.networth}`}</div>
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
  console.log("response edit_profile", response);
  return response;
}
