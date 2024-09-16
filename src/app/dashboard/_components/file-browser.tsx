/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import { useState } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";

import { UploadButton } from "@/app/dashboard/_components/upload-button";
import { FileCard } from "@/app/dashboard/_components/file-card";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SearchBar } from "@/app/dashboard/_components/search-bar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Placeholder() {
  return (
    <div className="flex flex-col gap-7 w-full items-center mt-24 mr-5">
      <Image
        alt="An image for the background"
        width="400"
        height="400"
        src="/file.svg"
      />
      <div className="text-2xl">
        You have no files, upload one now
      </div>
      <UploadButton />
    </div>
  )
}

export function FileBrowser({ favoritesOnly }: { favoritesOnly?: boolean; }) {

  const organization = useOrganization();
  const user = useUser();
  const [query, setQuery] = useState("");

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const favorites = useQuery(
    api.file.getAllFavorites,
    orgId ? { orgId } : "skip",
  );

  const files = useQuery(
    api.file.getFiles,
    orgId ? { orgId, query, favorites: favoritesOnly } : 'skip'
  );
  const isLoading = files === undefined;

  return (
    <div>
      {isLoading && (
        <div className="flex flex-col gap-7 w-full items-center mt-24">
          <Loader2 className="h-24 w-24 animate-spin text-gray-500" />
          <div className="text-2xl">Loading Your Files...</div>
        </div>
      )}

      {!isLoading && (
        <>
          {/* Flex container for search and upload button */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between mb-8 gap-4">
            <div className="w-full sm:flex-grow">
              {/* Search Bar */}
              <SearchBar query={query} setQuery={setQuery} />
            </div>
            <div className="w-full sm:w-auto">
              {/* Upload Button */}
              {/* <Button 
                size="sm"
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white"
              >
                Upload File
              </Button> */}
              <UploadButton/>
            </div>
          </div>

          {files.length === 0 && (<Placeholder />)}

          {/* Files Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {files?.map((file) => {
              return <FileCard favorites={favorites ?? []} key={file._id} file={file} />;
            })}
          </div>
        </>
      )}
    </div>
  );
}
