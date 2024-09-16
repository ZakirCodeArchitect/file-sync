"use client"

import { FileBrowser } from "../_components/file-browser";


export default function FavoritesPage() {
    return (
      <div className="p-4">

        <h1 className="text-2xl font-bold">Marked Files</h1>
        
        <FileBrowser favoritesOnly />
      </div>
    )
}