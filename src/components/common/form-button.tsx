// "use client";
// // There is no need for this component as i'm using useActionState to get the isPending directly

// import { Button } from "@heroui/react";
// import { useFormStatus } from "react-dom";

// interface FormButtonProps {
//   children: React.ReactNode;
// }
// export default function FormButton({ children }: FormButtonProps) {
//   const { pending } = useFormStatus();

//   return (
//     <Button type="submit" isLoading={pending}>
//       {children}
//     </Button>
//   );
// }
