"use client";

import {
  Input,
  Button,
  Textarea,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import * as actions from "@/actions";
import { useActionState } from "react";
// import FormButton from "../common/form-button";

interface PostCreateFormProps {
  slug: string;
}

export default function PostCreateForm({ slug }: PostCreateFormProps) {
  const [formState, action, isPending] = useActionState(
    actions.createPost.bind(null, slug),
    {
      errors: {},
    }
  );
  return (
    <Popover placement="left">
      <PopoverTrigger>
        <Button color="primary">Create a Post</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-80">
            <h3 className="text-lg">Create a Post</h3>
            <Input
              name="title"
              label="Title"
              labelPlacement="outside"
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(", ")}
            />
            {/* <div className="bg-red-400">{formState.errors.name?.join(", ")}</div> */}
            <Textarea
              name="content"
              label="Content"
              labelPlacement="outside"
              placeholder="Content"
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(", ")}
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border border-red-400 rounded">
                {formState.errors._form?.join(", ")}
              </div>
            ) : null}
            <Button type="submit" isLoading={isPending}>
              Create Post
            </Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
}
