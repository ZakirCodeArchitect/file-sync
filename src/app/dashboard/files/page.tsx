"use client";

import { FileBrowser } from "../_components/file-browser";


export default function FilesPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h1 className="text-2xl font-bold">Your Files</h1>

      {/* File browser below everything */}
      <FileBrowser />
    </div>
  );
}
