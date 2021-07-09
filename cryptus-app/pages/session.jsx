import { useSession, signIn, signOut } from "next-auth/client";
export default function Home() {
  const [session] = useSession();
  return (
    <div>
      <main>
        <h1>This is the welcome page.</h1>
        <h2>You're currently {session ? "logged in." : "logged out."}</h2>
        {session ? (
          <button onClick={signOut}>Log out.</button>
        ) : (
          <button onClick={signIn}>Log in.</button>
        )}
      </main>
    </div>
  );
}
