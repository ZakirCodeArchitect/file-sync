"use client";

import { Button } from "@/components/ui/button";
import { FileBrowser } from "../_components/file-browser";
import { SearchBar } from "../_components/search-bar";

export default function FilesPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h1 className="text-2xl font-bold">Your Files</h1>

      {/* Row containing SearchBar and Upload Button */}
      {/* <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4"> */}
        {/* Search Bar - takes full width except for button */}
        {/* <div className="w-full sm:flex-grow">
          <SearchBar query="" setQuery={() => {}} />
        </div> */}

        {/* Upload Button - aligned to the right */}
        {/* <div className="w-full sm:w-auto">
          <Button
            size="sm"  
            className="w-full sm:w-auto bg-teal-600"
          >
            Upload File
          </Button>
        </div> */}
      {/* </div> */}

      {/* File browser below everything */}
      <FileBrowser />
    </div>
  );
}
