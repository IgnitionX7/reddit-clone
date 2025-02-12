import PostCreateForm from "@/components/posts/post-create-form";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const slug = decodeURIComponent(params.slug); // No need to await
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      <div className="col-span-3">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
      </div>
      <div className="border shadow py-3 px-2">
        <PostCreateForm slug={slug} />
      </div>
    </div>
  );
}
