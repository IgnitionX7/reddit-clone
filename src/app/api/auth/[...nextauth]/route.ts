import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// // import Github from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/db";
// import GithubProvider from "next-auth/providers/github";

// const GITHUB_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_SECRET = process.env.GITHUB_CLIENT_SECRET;

// if (!GITHUB_ID || !GITHUB_SECRET) {
//   throw new Error("Missing github Oauth credentials");
// }

// export default NextAuth({
//   adapter: PrismaAdapter(db),
//   providers: [
//     // OAuth authentication providers...
//     GithubProvider({
//       clientId: GITHUB_ID,
//       clientSecret: GITHUB_SECRET,
//     }),
//   ],
//   callbacks: {
//     async session({ session, user }) {
//       if (session && user) {
//         session.user.id = user.id;
//         return session;
//       }
//     },
//   },
// });
// src/app/api/auth/[...nextauth]/route.ts
// import NextAuth from "next-auth";
// import GitHubProvider from "next-auth/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/db";

// export const authOptions = {
//   adapter: PrismaAdapter(db),
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_CLIENT_ID!,
//       clientSecret: process.env.GITHUB_CLIENT_SECRET!,
//     }),
//   ],
//   session: {
//     strategy: "jwt", // Or "database" if you want session storage
//   },
//   callbacks: {
//     async session({ session, user }) {
//       session.user.id = user.id;
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
// -------------------------------------------------------------------------
// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import { db } from "@/db";
// import { PrismaAdapter } from "@auth/prisma-adapter";

// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
//   throw new Error("Missing github Oauth credentials");
// }

// const handler = NextAuth({
//   // debug: true,
//   adapter: PrismaAdapter(db),
//   providers: [
//     GithubProvider({
//       clientId: GITHUB_CLIENT_ID,
//       clientSecret: GITHUB_CLIENT_SECRET,
//     }),
//   ],
// });

// export { handler as GET, handler as POST };
