// "use client";

// import { useActionState } from "react";
// import { useEffect, useRef, useState } from "react";
// import { Textarea, Button } from "@heroui/react";
// // import FormButton from "@/components/common/form-button";
// import * as actions from "@/actions";

// interface CommentCreateFormProps {
//   postId: string;
//   parentId?: string;
//   startOpen?: boolean;
// }

// export default function CommentCreateForm({
//   postId,
//   parentId,
//   startOpen,
// }: CommentCreateFormProps) {
//   const [open, setOpen] = useState(startOpen);
//   const ref = useRef<HTMLFormElement | null>(null);
//   const [formState, action, isPending] = useActionState(
//     actions.createComment.bind(null, { postId, parentId }),
//     { errors: {} }
//   );

//   useEffect(() => {
//     if (formState.success) {
//       ref.current?.reset();

//       if (!startOpen) {
//         setOpen(false);
//       }
//     }
//   }, [formState, startOpen]);

//   const form = (
//     <form action={action} ref={ref}>
//       <div className="space-y-2 px-1">
//         <Textarea
//           name="content"
//           label="Reply"
//           placeholder="Enter your comment"
//           isInvalid={!!formState.errors.content}
//           errorMessage={formState.errors.content?.join(", ")}
//         />

//         {formState.errors._form ? (
//           <div className="p-2 bg-red-200 border rounded border-red-400">
//             {formState.errors._form?.join(", ")}
//           </div>
//         ) : null}

//         <Button isLoading={isPending}>Create Comment</Button>
//       </div>
//     </form>
//   );

//   return (
//     <div>
//       <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
//         Reply
//       </Button>
//       {open && form}
//     </div>
//   );
// }
"use client";

import { Button, Textarea } from "@heroui/react";
import * as actions from "@/actions";
import { useActionState, useEffect, useRef, useState } from "react";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}
export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    {
      errors: {},
    }
  );
  console.log("from the comment component: ", postId);

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action}>
      <div className="space-y-2 px-1">
        <Textarea
          name="content"
          label="Reply"
          placeholder="Enter your comment"
          isInvalid={!!formState.errors.content}
          errorMessage={formState.errors.content?.join(", ")}
        />

        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}
        <Button type="submit" isLoading={isPending}>
          Create Comment
        </Button>
      </div>
    </form>
  );

  return (
    <div>
      <Button size="sm" variant="light" onPress={() => setOpen(!open)}>
        Reply
      </Button>
      {open && form}
    </div>
  );
}
