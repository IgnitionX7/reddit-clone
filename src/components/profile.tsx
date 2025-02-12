"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <p>From Client Side</p>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      <p>From Client Side</p>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
