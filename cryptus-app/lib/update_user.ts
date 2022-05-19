export default async function updateUser(
  old_user_name: string,
  new_user_name: string,
  description: string
) {
  console.log("updateUser");

  const response = await fetch("api/users/updateUsernameDescription", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      old_user_name: old_user_name,
      new_user_name: new_user_name,
      description: description,
    }),
  });
  console.log("response edit_profile", response);
  return response;
}
