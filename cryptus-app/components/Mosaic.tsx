import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

type MyProps = { assets };
type MyState = {};

export default class Mosaic extends React.Component<MyProps, MyState> {
  render() {
    return (
      <div id="header" className=" w-full h-full text-black bg-instagram">
        <div className="h-full grid grid-cols-3 gap-0.1">
          {this.props.assets.map((asset, index) => (
            <a key={`NFT${index + 1}`} id={`NFT${index + 1}`} className="">
              <Link href={`/lafleur/feed#NFT${index + 1}`}>
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
