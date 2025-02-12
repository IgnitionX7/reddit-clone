// src/components/SessionProvider.tsx
"use client"; // ✅ Ensure this is a Client Component

import { SessionProvider } from "next-auth/react";

export default function AuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
