/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  OrganizationSwitcher,
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

// import { NavigationMenuDemo } from "./navbar";

// "use client"

import * as React from "react"
// import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { File, FileText, LogOut } from "lucide-react"
import { YourFilesButton } from "./user-name";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Intuitive File Upload",
    href: "",
    description:
      "Easily upload files from your local device using a simple drag-and-drop interface.",
  },
  {
    title: "Secure File Sharing",
    href: "",
    description:
      "Share files with team members by inviting them or generating shareable links. Robust access controls ensure only authorized users can view and download files.",
  },
  {
    title: "Role-Based Access",
    href: "",
    description:
      "Manage user permissions based on their roles within the organization. Administrators can have full control over files, while members may have limited access.",
  },
  {
    title: "Google Drive Integration",
    href: "",
    description: "Leverage Google Drive for secure and scalable file storage. Connect your Google account to seamlessly upload, download, and manage files directly from the platform.",
  },
  {
    title: "Responsive Design",
    href: "",
    description:
      "Access File Sync from any device, as it is designed to be responsive and adapt to different screen sizes.",
  },
  {
    title: "Privacy and Compliance",
    href: "",
    description:
      "Rest assured that your data is handled in accordance with strict privacy policies and industry regulations.",
  },
]

export function Header() {
  return (
    <>
    <SignedIn>
    <div className="relative z-10 border-b py-4 bg-gradient-to-r from-slate-100 to-slate-100">
        <div className="items-center mx-auto justify-between flex ml-5 mr-5">
          <Link href="/" className="flex gap-2 items-center text-xl text-black font-mono">
            <Image src="/shared-folder.png" width="25" height="25" alt="file drive logo" />
            File Sync
          </Link>

          <SignedIn>
            {/* <Button variant={"outline"}> */}
              {/* <Link href="/dashboard/files">Your Files</Link> */}
              <YourFilesButton/>
            {/* </Button>  */}
          </SignedIn>

          <div className="flex gap-2">
            <OrganizationSwitcher />
            <UserButton />
            {/* <SignedOut>
              <SignInButton>
                <Button className="bg-teal-900 text-white">Sign In</Button>
              </SignInButton>
            </SignedOut> */}
          </div>
        </div>
      </div>
    </SignedIn>


    <SignedOut>
    <div className="relative z-10 border-b py-4 bg-gray-50 flex items-center justify-center">
      <div className="items-center mx-auto justify-between flex ml-5 mr-5">
        {/* <NavigationMenuDemo/> */}
        <NavigationMenu >
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Files Sync</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href=""
                      >
                        <FileText className="h-6 w-6" />
                      
                        <div className="mb-2 mt-4 text-lg font-medium">
                          File Sync
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Now work on your files with your team mates.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Drive to manage your files.
                  </ListItem>
                  <ListItem href="/dashboard/files" title="Google Drives">
                    Upload directly to Google Drive.
                  </ListItem>
                  <ListItem href="/dashboard/files" title="Responsive">
                    Use on any Device
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Features</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem
                      key={component.title}
                      title={component.title}
                      href={component.href}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <SignInButton>
                  Sign In
                </SignInButton>   
                </NavigationMenuLink>
              
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        </div>
        </div>
        </SignedOut>
    </>
      );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"