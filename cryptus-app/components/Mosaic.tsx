import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import { each } from "jquery";

type MyProps = { assets };
type MyState = {};

export default class Mosaic extends React.Component<MyProps, MyState> {
  render() {
    const cleanNames = [];
    this.props.assets.forEach((asset) => {
      if (asset.name) {
        cleanNames.push(encodeURI(asset.name.replace(/\s+/g, "") + asset.id));
      } else {
        cleanNames.push(asset.id);
      }
    });
    return (
      <div id="header" className=" w-full h-full text-black bg-instagram">
        <div className="h-full grid grid-cols-3 gap-0.1">
          {this.props.assets.map((asset, index) => (
            <a key={cleanNames[index]} id={cleanNames[index]} className="">
              <Link href={`/lafleur/f#${cleanNames[index]}`}>
                <div className="flex flex-col justify-around w-full h-full overflow-hidden">
                  <img
                    className="my-auto wh-full min-w-0 min-h-0"
                    draggable="false"
                    src={asset.image_url}
                  />
                </div>
              </Link>
            </a>
          ))}
        </div>
      </div>
    );
  }
}
