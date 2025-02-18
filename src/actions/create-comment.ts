// // "use server";

// import { revalidatePath } from "next/cache";
// import { z } from "zod";
// import { getServerSession } from "next-auth";
// import { db } from "@/db";
// import paths from "@/paths";
// import { authOptions } from "@/lib/auth";

// const createCommentSchema = z.object({
//   content: z.string().min(3),
// });

// interface CreateCommentFormState {
//   errors: {
//     content?: string[];
//     _form?: string[];
//   };
//   success?: boolean;
// }

// export async function createComment(
//   { postId, parentId }: { postId: string; parentId?: string },
//   formState: CreateCommentFormState,
//   formData: FormData
// ): Promise<CreateCommentFormState> {
//   console.log("Raw content from formData:", formData.get("content"));

//   const result = createCommentSchema.safeParse({
//     content: formData.get("content"),
//   });

//   if (!result.success) {
//     return {
//       errors: result.error.flatten().fieldErrors,
//     };
//   }

//   const session = await getServerSession(authOptions);
//   if (!session || !session.user) {
//     return {
//       errors: {
//         _form: ["You must sign in to do this."],
//       },
//     };
//   }

//   try {
//     await db.comment.create({
//       data: {
//         content: result.data.content,
//         postId: postId,
//         parentId: parentId,
//         userId: session.user.id,
//       },
//     });
//   } catch (err) {
//     if (err instanceof Error) {
//       return {
//         errors: {
//           _form: [err.message],
//         },
//       };
//     } else {
//       return {
//         errors: {
//           _form: ["Something went wrong..."],
//         },
//       };
//     }
//   }

//   const topic = await db.topic.findFirst({
//     where: { posts: { some: { id: postId } } },
//   });

//   if (!topic) {
//     return {
//       errors: {
//         _form: ["Failed to revalidate topic"],
//       },
//     };
//   }

//   revalidatePath(paths.postShowPath(topic.slug, postId));
//   return {
//     errors: {},
//     success: true,
//   };
// }

//------------------------------------------------
"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";

import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createCommentSchema = z.object({
  content: z.string().min(3),
});

interface CreateCommentFormState {
  errors: {
    content?: string[];
    _form?: string[];
  };
  success?: boolean;
}

export async function createComment(
  { postId, parentId }: { postId: string; parentId?: string },
  formState: CreateCommentFormState,
  formData: FormData
): Promise<CreateCommentFormState> {
  const result = createCommentSchema.safeParse({
    content: formData.get("content"),
  });
  console.log("hello atleast this should appear from action function shan");
  if (!result.success) {
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
  console.log("from action function: ", postId);
  console.log("Form received:", formData.get("content"));
  console.log("Post ID:", postId, "Parent ID:", parentId);
  console.log("Session user ID:", session?.user?.id);
  const topic = await db.topic.findFirst({
    where: { posts: { some: { id: postId } } },
  });
  if (!topic) {
    return {
      errors: {
        _form: ["Cannot find topic"],
      },
    };
  }

  try {
    await db.comment.create({
      data: {
        content: result.data.content,
        postId: postId,
        parentId: parentId,
        userId: session.user.id,
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
  revalidatePath(paths.postShowPath(topic.slug, postId));

  return {
    errors: {},
    success: true,
  };
}
