import { IncomingMessage } from "http";
import absoluteUrl from "next-absolute-url";

export default async function getUserByUsername(username, withWallets) {
  if (!username) {
    console.error("Username undefined");
    return null;
  }

  const BASE_URL = process.env.BASE_URL + "api/users/username";
  const res = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({ 
      username: username,
      withWallets: withWallets
     }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}
