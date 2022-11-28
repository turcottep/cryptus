//react and css
import React, { useState, useEffect, useRef } from "react";
import s from "./search_bar.module.scss";
import classNames from "classnames";
import { useRouter } from "next/router";

import { collection, dbUsers } from "../../../lib/data_types";
import username from "../../../pages/api/users/username";

export default function SearchBar(props: {
  callback?;
  collections?: collection[];
  users?: dbUsers[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const searchBarRef = useRef();
  const [searchBarPosX, setSearchBarPosX] = useState();
  const [searchBarPosY, setSearchBarPosY] = useState();
  const [searchBarPosWidth, setSearchBarPosWitdh] = useState();

  const default_selected_users = [
    "logz",
    "apeholder",
    "justinbiebernfts",
    "snoopdogg",
    "mcuban",
    "lafleur1",
  ];

  const check_for_default_suggested_users = (name: string) => {
    for (let i = 0; i < default_selected_users.length; i++) {
      if (default_selected_users[i] === name) {
        return true;
      }
    }
    return false;
  };

  const getPosition = (ref: any) => {
    setSearchBarPosX(ref.current?.offsetLeft);
    setSearchBarPosY(ref.current?.offsetTop + ref.current?.offsetHeight);
    setSearchBarPosWitdh(ref.current?.offsetWidth);
  };

  useEffect(() => {
    getPosition(searchBarRef);
  });

  useEffect(() => {
    window.addEventListener("resize", function () {
      getPosition(searchBarRef);
    });
  }, []);

  return (
    <div className={s.collections_lafleur}>
      {/* <div className={s.search_box} ref={searchBarRef}>
        <img src="magnifier.svg" className={s.magnifier} />
        <input
          autoFocus
          type="text"
          className={s.searchTerm}
          placeholder={
            props.collections
              ? "Enter a collection name"
              : props.users
              ? "Enter a username"
              : "Coming soon..."
          }
          onChange={(event) => setQuery(event.target.value)}
        />
      </div> */}

      {/* Justin says use 'reduce' instead */}
      {props.callback && props.collections
        ? props.collections
            .filter((collection) => {
              if (query === "") {
                return null;
              } else if (
                collection.name.toLowerCase().includes(query.toLowerCase()) ||
                collection.ticker.toLowerCase().includes(query.toLowerCase())
              ) {
                return collection;
              }
            })
            .map((collection, index) => {
              if (index < 8) {
                return (
                  <div
                    className={classNames(s.search_items)}
                    key={collection.name}
                    // style={{
                    //   top: index * 55 + Number(searchBarPosY) + 2,
                    //   left: 24 + Number(searchBarPosX),
                    //   width: Number(searchBarPosWidth) - 26,
                    // }}
                    onClick={() => {
                      props.callback(collection.name);
                    }}
                  >
                    <img src={collection.logo} className={s.search_image} />
                    {collection.name.length > 25 ? (
                      <p>{collection.name.substring(0, 25) + "..."}</p>
                    ) : (
                      <p>{collection.name}</p>
                    )}
                  </div>
                );
              }
            })
        : null}

      {props.users
        ? props.users
            .filter((user) => {
              if (
                query === "" &&
                check_for_default_suggested_users(user.username)
              ) {
                return user;
              } else if (
                query != "" &&
                user.username.toLowerCase().includes(query.toLowerCase())
              ) {
                return user;
              }
              return null;
            })
            .map((user, index) => {
              console.log("user", user);
              if (index < 8) {
                return (
                  <div
                    className={classNames(s.search_items)}
                    key={user.username}
                    style={{
                      top: index * 55 + Number(searchBarPosY) + 2,
                      left: 24 + Number(searchBarPosX),
                      width: Number(searchBarPosWidth) - 26,
                    }}
                    onClick={() => {
                      router.push("/" + user.username);
                    }}
                  >
                    <img
                      src={user.profile_image_url}
                      className={s.search_image}
                    />
                    <p>{user.username}</p>
                  </div>
                );
              }
            })
        : null}
    </div>
  );
}
