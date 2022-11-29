import UsernameSetting from "../components/basic/settings/username_setting/username_setting";
import findAllUsers from "../pages/api/users/findAllUsers";

export default async function add_collections_to_user(
  user_collections_addresses: string[],
  user_collections_slugs: string[],
  username
) {
  console.log("Adding Col");
  const res = await fetch("/api/users/addCollectionsAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      addresses: user_collections_addresses,
      username: username,
    }),
  });
  const user = await res.json();
  return user;
}
