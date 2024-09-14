/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import React from "react";
import {  useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

import { UploadButton } from "./upload-button";
import { FileCard } from "./file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function Home() {

  const organization =  useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded)
  {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const files = useQuery(api.file.getFiles, orgId ? { orgId } :'skip');
  const isLoading = files === undefined;
  
  return (
      <main className="container mx-auto pt-12">

          {isLoading && (
            <div className="flex flex-col gap-7 w-full items-center mt-24">
              <Loader2 className="h-24 w-24 animate-spin text-gray-500"/>
              <div className="text-2xl">Loading Your Files...</div>
            </div>
          )}

          {!isLoading && files.length === 0 && (
                <div className="flex flex-col gap-7 w-full items-center mt-24">
                  <Image
                    alt="An image for the background"
                    width="400"
                    height="400"
                    src="/file.svg"
                  />
                  <div className="text-2xl">
                    You have no files, upload one now
                  </div>
                  <UploadButton/>
                </div>
          )}


          {/* Checking if files exist  */}
          {!isLoading && files.length > 0 && (
            <>
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Your Files</h1>
                  <UploadButton/>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {files?.map((file) => {
                  return <FileCard key={file._id} file={file} />;
                })}
              </div>
            </>
          )}

      </main>

  );
}
