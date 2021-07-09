export default async function findWalletByUsername(username) {
  const response = await fetch('/api/users/' + username);
  const data = await response.json();
  return data
}
