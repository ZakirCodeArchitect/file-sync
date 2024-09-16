/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { FileIcon, Home, StarIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export function SideNav() {

  const pathname = usePathname()

    return (
        <div className="w-full sm:w-40 flex lg:flex-col sm:flex gap-4">
            <Link href="/dashboard/files">
              <Button variant={"link"} 
              className={clsx("flex gap-2 justify-start", {
                "text-teal-800": pathname.includes("/dashboard/files"),
              })}>
                <FileIcon className="h-4 w-4 md:h-5 md:w-5" /> All files
              </Button>
            </Link>

            <Link href="/dashboard/favorites">
              <Button variant={"link"} 
              className={clsx("flex gap-2 justify-start", {
                "text-teal-800": pathname.includes("/dashboard/favorites"),
              })}>
                <StarIcon className="h-4 w-4 md:h-5 md:w-5" /> Marked
              </Button>
            </Link>

            <Link href="/">
              <Button variant={"link"} 
              className={clsx("flex gap-2 justify-start", {
                "text-teal-800": pathname.includes("/"),
              })}>
                <Home className="h-4 w-4 md:h-5 md:w-5" /> Home
              </Button>
            </Link>
        </div>
    )
}
