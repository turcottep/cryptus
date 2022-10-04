//react and css
import React, { useState, useEffect, useRef } from "react";
import s from "./search_bar.module.scss";
import classNames from "classnames";
import collections_dict from "../../../lib/collectionDictionary";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const searchBarRef = useRef();
  const [searchBarPosX, setSearchBarPosX] = useState();
  const [searchBarPosY, setSearchBarPosY] = useState();
  const [searchBarPosWidth, setSearchBarPosWitdh] = useState();
  const collections = Object.keys(collections_dict).map((key) => {
    return { name: key, value: collections_dict[key] };
  });
  // console.log(collections);
  // const data = [
  //   { name: "CryptoPunks " },
  //   { name: "Azuki " },
  //   { name: "Tasty Bones XYZ " },
  //   { name: "Bored Ape Yacht Club " },
  //   { name: "mfers " },
  //   { name: "Clone X- X Takashi Murakami " },
  //   { name: "NFT Worlds " },
  //   { name: "Karafuru " },
  //   { name: "Mutant Ape Yacht Club " },
  //   { name: "Edenhorde " },
  // ];

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
          placeholder="Enter a collection name"
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      {/* reduce */}
      {collections
        .filter((collection) => {
          if (query === "") {
            return null;
          } else if (
            collection.name.toLowerCase().includes(query.toLowerCase())
          ) {
            return collection;
          }
        })
        .map((collection, index) => {
          if (index < 5) {
            return (
              <div
                className={classNames(s.search_items)}
                key={collection.name}
                style={{
                  top: index * 55 + Number(searchBarPosY),
                  left: searchBarPosX,
                  width: searchBarPosWidth,
                }}
              >
                <img src={collection.value.logo} className={s.search_image} />
                <p>{collection.name}</p>
              </div>
            );
          }
        })}
    </div>
  );
}
