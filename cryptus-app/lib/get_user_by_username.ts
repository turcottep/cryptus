import { IncomingMessage } from "http";
import absoluteUrl from "next-absolute-url";

export default async function getUserByUsername(username, withWallets = false) {
  if (!username) {
    console.error("Username undefined");
    return null;
  }

  const res = await fetch("/api/users/username", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      withWallets: withWallets,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200 && res.status !== 201) {
    console.error("Error fetching user");
    return null;
  }
  return res.json();
}
