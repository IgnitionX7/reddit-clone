import Link from "next/link";
import PostShow from "@/components/posts/post-show";
import CommentList from "@/components/comments/comment-list";
// import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { Suspense } from "react";
import PostShowLoading from "@/components/posts/post-show-loading";
// import { fetchCommentsByPostId } from "@/db/queries/comments";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const paramsData = await params;
  // const { slug, postId } = await params;
  const slug = decodeURIComponent(paramsData.slug); // No need to await
  const postId = paramsData.postId;
  console.log("from the page: ", postId);
  return (
    <div className="space-y-3">
      <Link
        className="underline decoration-solid"
        href={paths.topicShowPath(slug)}
      >
        {"< "}Back to {slug}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />

      {/* <CommentList fetchData={() => fetchCommentsByPostId(postId)} /> */}
      {/* Making use of Request Memoization below */}
      <CommentList postId={postId} />
    </div>
  );
}
