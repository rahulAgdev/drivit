"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useOrganization,
  useSession,
  useUser,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.files.getFiles, orgId ? { orgId } : "skip");
  const createFile = useMutation(api.files.createFile);
  const session = useSession();
  return (
    <div className=" flex gap-5">
      {/* this button will call the create file, which will invoke the mutation in the files.ts in convex to then create a file in the backend.  */}
      <Button
        onClick={() => {
          if (!orgId) return;
          createFile({
            name: "Hello world",
            orgId
          });
        }}
      >
        Click me
      </Button>
      {/* now using a query, we can fetch this data, and then display it in the frontend */}
      {files?.map((file) => {
        return <div key={file._id}>{file.name}</div>;
      })}
    </div>
  );
}
