export default async function getUserByUsername(username) {
  if (!username){
    console.error("Username undefined")
    return null
  }  
  const res = await fetch(
    "http://localhost:3000/api/users/username",
    {
      method: "POST",
      body: JSON.stringify({username:username}),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return res.json();
}
