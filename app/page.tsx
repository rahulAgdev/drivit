"use client";
import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  const session = useSession();
  return (
    <div className=" flex gap-5">
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
      <Button>Button</Button>
    </div>
  );
}
