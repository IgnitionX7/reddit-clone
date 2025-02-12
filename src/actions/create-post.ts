"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  // await new Promise((resolve) => setTimeout(resolve, 2500));
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });
  if (!result.success) {
    // console.log(result.error.flatten().fieldErrors);
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }
  const topic = await db.topic.findFirst({
    where: { slug },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title, //This is because zod stores the form data in data property from safeParse
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Failed to create Post"],
        },
      };
    }
  }
  // TODO: revalidate the Home Page after creating a topic
  revalidatePath(paths.topicShowPath(slug));
  redirect(paths.postShowPath(slug, post.id));
  // return { errors: {} };
  // const name = formData.get("name");
  // const description = formData.get("description");

  // console.log(name, description);
}
