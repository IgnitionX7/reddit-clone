"use server";

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { db } from "@/db";
import paths from "@/paths";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-zA-Z0-9 ]+$/, { message: "Must not have symbols" }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  // await new Promise((resolve) => setTimeout(resolve, 2500));
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
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

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name, //This is because zod stores the form data in data property from safeParse
        description: result.data.description,
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
          _form: ["Something went wrong"],
        },
      };
    }
  }
  // TODO: revalidate the Home Page after creating a topic
  revalidatePath("/");
  redirect(paths.topicShowPath(topic.slug));
  // return { errors: {} };
  // const name = formData.get("name");
  // const description = formData.get("description");

  // console.log(name, description);
}
