//react and css
import React, { useState, useEffect, useRef } from "react";
import s from "./search_bar.module.scss";
import classNames from "classnames";

import { collection } from "../../../lib/data_types";

export default function SearchBar(props: {
  callback?;
  collections?: collection[];
}) {
  const [query, setQuery] = useState("");
  const searchBarRef = useRef();
  const [searchBarPosX, setSearchBarPosX] = useState();
  const [searchBarPosY, setSearchBarPosY] = useState();
  const [searchBarPosWidth, setSearchBarPosWitdh] = useState();

  const getPosition = (ref: any) => {
    setSearchBarPosX(ref.current?.offsetLeft);
    setSearchBarPosY(ref.current?.offsetTop + ref.current?.offsetHeight);
    setSearchBarPosWitdh(ref.current?.offsetWidth);
  };

  useEffect(() => {
    getPosition(searchBarRef);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", function () {
      getPosition(searchBarRef);
    });
  }, []);
  return (
    <div className={s.container}>
      <div className={s.search_box} ref={searchBarRef}>
        <img src="magnifier.svg" className={s.magnifier} />
        <input
          type="text"
          className={s.searchTerm}
          placeholder={
            props.collections ? "Enter a collection name" : "Coming soon..."
          }
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {/* Justin says use 'reduce' instead */}
      {props.callback
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
                    style={{
                      top: index * 55 + Number(searchBarPosY) + 2,
                      left: 24 + Number(searchBarPosX),
                      width: Number(searchBarPosWidth) - 26,
                    }}
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
    </div>
  );
}
