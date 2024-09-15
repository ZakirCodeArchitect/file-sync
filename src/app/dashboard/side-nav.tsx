/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import Link from "next/link"
import { Button } from "../../components/ui/button"
import { FileIcon, StarIcon } from "lucide-react"
import { usePathname } from "next/navigation"
import clsx from "clsx"

export function SideNav() {

  const pathname = usePathname()

    return (
        <div className="w-40 flex flex-col gap-4">
            <Link href="/dashboard/files">
              <Button variant={"link"} 
              className={clsx("flex gap-2", {
                "text-blue-900": pathname.includes("/dashboard/files"),
              })}
              >
                <FileIcon/> All files
              </Button>
            </Link>

            <Link href="/dashboard/favorites">
              <Button variant={"link"} 
              className={clsx("flex gap-2", {
                "text-blue-900": pathname.includes("/dashboard/favorites"),
              })}
              >
                <StarIcon/> Marked
              </Button>
            </Link>

          </div>
    )
}