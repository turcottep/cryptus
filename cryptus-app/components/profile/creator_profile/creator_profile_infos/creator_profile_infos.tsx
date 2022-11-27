import React, { useState, useEffect } from "react";
import s from "./creator_profile_infos.module.scss";

import { signIn, useSession } from "next-auth/client";
import { profile_props } from "../../../../lib/data_types";
import { TextField } from "@mui/material";
import EditCollections from "../../wallet_viewer/show_collections/show_collections";
import get_reserved_usernames from "../../../../lib/reserved_usernames";
import updateUser from "../../../../lib/update_user";

export default function CreatorProfileInfos(props: {
  profile_props: profile_props;
  callback_filter: (new_filter: string[]) => void;
  initial_filter: string[];
  image_url: string;
  isMobile: boolean;
}) {
  const { profile_props, callback_filter } = props;

  const [session, sessionLoading] = useSession();
  const [loading, setLoading] = useState(false);
  const [edit_profile, set_edit_profile] = useState(false);
  const [edit_collections, set_edit_collections] = useState(false);
  const [old_user_name, setOldUserName] = useState(profile_props.user.username);
  const [old_desc, setOldDesc] = useState(profile_props.user.description);
  const [user_name, setUserName] = useState(profile_props.user.username);
  const [desc, setDesc] = useState(profile_props.user.description);
  const [error, setError] = useState("");

  const Cancelling = () => {
    setUserName(old_user_name);
    setDesc(old_desc);
    set_edit_profile(false);
  };

  const updateProfile = async (
    setError,
    setLoading,
    old_user_name,
    new_user_name,
    new_description
  ) => {
    console.log("submit");

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

    if (new_user_name.length >= 25) {
      console.log("username too long");
      setError("UsernameTooLong");
      return;
    }

    if (new_description.length >= 100) {
      console.log("description too long");
      setError("DescriptionTooLong");
      return;
    }

    if (get_reserved_usernames().includes(new_user_name)) {
      console.log("reserved username");
      setError("ReservedUsername");
      return;
    }

    setLoading(true);

    const res = await updateUser(old_user_name, new_user_name, new_description);

    if (res.status == 202) {
      setError("UniqueUsername");
      setLoading(false);
      return;
    }

    if (res.status == 203) {
      setError("ReservedUsername");
      setLoading(false);
      return;
    }

    if (res.status != 201) {
      setError("default");
      setLoading(false);
      return;
    }

    console.log("sending...");

    let wallet_address;

    if (old_user_name == new_user_name && old_user_name == "apeholder") {
      wallet_address =
        "0x68c4D9E03D7D902053C428Ca2D74b612Db7F583A".toLowerCase();
    } else {
      await window.ethereum.enable();
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      wallet_address = accounts[0];
    }

    setOldUserName(user_name);
    setOldDesc(desc);

    // props.changeState("loading", true);
    signIn("credentials", {
      redirect: true,
      address: wallet_address,
      callbackUrl: `${window.location.origin}/` + new_user_name,
    });
  };

  const account_link = "publicwallet.app/" + user_name;

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

  const handleErrorUsername = () => {
    const errorMessage = error && ((errors[error] ?? errors.default) as string);

    return error ? errorMessage : null;
  };

  const CopyLinkButton = () => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
      if (copied) {
        setTimeout(() => {
          setCopied(false);
        }, 4000);
      }
    }, [copied]);

    const text = copied ? "Copied!" : "Copy link";

    return (
      <div>
        <Button
          t={text}
          c={() => {
            navigator.clipboard.writeText(account_link);
            setCopied(true);
          }}
        />

        {copied && (
          <div className={s.copied_message}>{"Copied to clipboard!"}</div>
        )}
      </div>
    );
  };

  return edit_profile ? (
    <div className={s.container}>
      <div className={s.left} />
      <div className={s.center}>
        <div className={s.profilepicture_container}>
          <img className={s.profilePic} src={props.image_url} alt="Avatar" />
        </div>
        <div className={s.editName}>
          <TextField
            type="username"
            id="standard-basic username"
            className={s.editName}
            onChange={handleChange}
            label="Username"
            defaultValue={user_name}
            error={!!handleErrorUsername()}
            helperText={handleErrorUsername()}
            size="small"
            variant="standard"
            required
          />
        </div>
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
      </div>
      <div className={s.right}>
        <Button t="Cancel" c={Cancelling} />
        <Button
          t="Apply"
          c={() =>
            updateProfile(
              setError,
              setLoading,
              session.user.name,
              user_name,
              desc
            )
          }
        />
      </div>
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
    </div>
  ) : (
    <div className={s.container}>
      <div className={s.left}></div>
      <div className={s.center}>
        <div className={s.profilepicture_container}>
          <img className={s.profilePic} src={props.image_url} alt="Avatar" />
        </div>
        <div className={s.username}>{user_name.toUpperCase()}</div>
        <div className={s.description}>{desc}</div>
      </div>
      <div className={s.right}>
        <Button t="Edit Profile" c={() => set_edit_profile(true)} />
        <Button t="Edit Nfts" c={() => set_edit_collections(true)} />
        <CopyLinkButton />
      </div>

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
    </div>
  );
}

const Button = (props: { t: string; c: any }) => {
  return (
    <div className={s.button} onClick={props.c}>
      {props.t}
    </div>
  );
};

const errors = {
  UniqueUsername: "This username is already in use!",
  InvalidUsername: "Only lowercase alphanumeric characters are allowed",
  UsernameTooLong: "Username is too long",
  ReservedUsername: "This username is reserved",
  DescriptionTooLong: "Description is too long",
  default: "Unable to change username.",
};

declare let window: any;
