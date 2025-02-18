import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { Divider } from "@heroui/react";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-xl m-2">Top Posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
      <div className="border shadow py-3 px-2">
        <TopicCreateForm />
        <Divider className="my-2" />
        <h3 className="text-lg">Topics</h3>
        <TopicList />
      </div>
    </div>
  );
}

// export default async function Home() {
// const session = await getServerSession(authOptions);
// return (
//   <div>
//     {session ? (
//       <div>
//         <p>Welcome, {JSON.stringify(session.user)}!</p>
//         <form action={actions.signOut}>
//           <Button type="submit">Sign Out</Button>
//         </form>
//       </div>
//     ) : (
//       <div>
//         <p>Please sign in</p>
//         <form action={actions.signIn}>
//           <Button type="submit">Sign In</Button>
//         </form>
//       </div>
//     )}
//     <Profile />
//   </div>
// );
// if (session) {
//   return (
//     <div>
//       <form action={actions.signOutAction}>
//         <Button type="submit">Sign Out</Button>
//       </form>
//     </div>
//   );
// }
// return (
//   <div>
//     <form action={actions.signInAction}>
//       <Button type="submit">Sign In</Button>
//     </form>
//   </div>
// );
// }

// import { useSession, signIn, signOut } from "next-auth/react";

// export default function Component() {
//   const { data: session } = useSession();
//   if (session) {
//     return (
//       <>
//         Signed in as {session.user.email} <br />
//         <button onClick={() => signOut()}>Sign out</button>
//       </>
//     );
//   }
//   return (
//     <>
//       Not signed in <br />
//       <button onClick={() => signIn()}>Sign in</button>
//     </>
//   );
// }
// ------------------
