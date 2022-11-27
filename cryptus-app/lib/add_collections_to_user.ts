import UsernameSetting from "../components/basic/settings/username_setting/username_setting";
import findAllUsers from "../pages/api/users/findAllUsers";

export default async function add_collections_to_user(
  user_collections_address,
  username
) {
  const res = await fetch("/api/users/addCollectionsAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: user_collections_address,
      username: username,
    }),
  });
  const collections_address = await res.json();
  return collections_address;
}
