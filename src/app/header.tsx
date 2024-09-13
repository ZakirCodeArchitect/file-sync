import { Button } from "@/components/ui/button";
import { OrganizationSwitcher, SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from "@clerk/nextjs";

export function Header(){
    return (
        <div className="border-b py-4 bg-gray-50">
            <div className="items-center mx-auto justify-between flex px-4">
                <div>File Sync</div>

                <div className="flex gap-2">
                    <OrganizationSwitcher />
                    <UserButton/>

                    {/* Signing In  */}
                    {/* <SignedIn>
                        <SignOutButton>
                            <Button>
                                Sign Out
                            </Button>
                        </SignOutButton>
                    </SignedIn> */}

                    {/* Signing Out  */}
                    <SignedOut>
                        <SignInButton>
                            <Button>
                                Sign In
                            </Button>
                        </SignInButton>
                    </SignedOut>
                </div>
            </div>
        </div>
    )
}