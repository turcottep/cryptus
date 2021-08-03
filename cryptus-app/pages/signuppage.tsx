import Link from "next/link";
import React from "react";
import UserForm from "../components/UserForm/UserForm";

export default function signup(props) {
  return (
    <div className="bg-instagram">
      <main className="">
        <div className="w-full h-full">
          <UserForm />
        </div>
      </main>
    </div>
  );
}
