/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignOutButton, useSession } from "@clerk/nextjs";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { getFiles } from '../../convex/file';



export default function Home() {

  const files = useQuery(api.file.getFiles);
  const createFile = useMutation(api.file.createFile);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          
          {/* Signing In */}
          <SignedOut>
            <SignInButton>
              <Button>
                Get Started
              </Button>
            </SignInButton>
          </SignedOut>
          
          {/* Signing Out */}
          <SignedIn>
            <SignOutButton>
              <Button>
                Signout
              </Button>
            </SignOutButton>
          </SignedIn>

      {/* Getting files from ConvexDatabase  */}
      {files?.map((file) => {
        return <div key={file._id}>
          {file.name}
        </div>;
      })}

      <Button onClick={() => {
        createFile({
          name: "Hello World",
        })
      }}>
        Click me
      </Button>

      </main>

    </div>
  );
}
