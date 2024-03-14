"use client";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";

export default function Home() {
  const files = useQuery(api.files.getFiles);
  const createFile = useMutation(api.files.createFile);
  const session = useSession();
  return (
    <div className=" flex gap-5">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
      </SignedOut>
      {/* this button will call the create file, which will invoke the mutation in the files.ts in convex to then create a file in the backend.  */}
      <Button onClick={()=>{createFile({
        name:"Hello world"
      })}}>Click me</Button>
      {/* now using a query, we can fetch this data, and then display it in the frontend */}
      {files?.map((file)=>{
        return <div key={file._id}>{file.name}</div>
      })}
    </div>
  );
}
