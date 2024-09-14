/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"; 
import { Doc, Id } from '../../convex/_generated/dataModel';
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useQuery } from "convex/react"; 

import { query } from "../../convex/_generated/server";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileTextIcon, GanttChart, ImageIcon, MoreVertical, Trash } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { getFiles } from '../../convex/file';

function FileCardActions({ file }: { file: Doc<"files"> }) {
    const deleteFile = useMutation(api.file.deleteFile);
    const { toast } = useToast();
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    return (
        <>
            <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your file
                            and remove it from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await deleteFile({ fileId: file._id });
                                toast({
                                    variant: "default",
                                    title: "File Deleted",
                                    description: "Your file has been removed from the system.",
                                });
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem
                        onClick={() => setIsConfirmOpen(true)}
                        className="flex gap-1 text-red-500 items-center"
                    >
                        <Trash className="w-4 h-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}

// Utility function to generate the file URL for downloading
function getFileUrl(fileId: string): string {
    return `${process.env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${fileId}`;
}



export function FileCard({ file }: { file: Doc<"files"> }) {

    // For icons 
    const typeIcons = {
        image: <ImageIcon />,
        pdf: <FileTextIcon />,
        csv: <GanttChart />
    } as Record<Doc<"files">["type"], React.ReactNode>;

    return (
        <Card>
            <CardHeader className="relative">
                <CardTitle className="flex gap-2 items-center">
                    <div className="flex justify-center">{typeIcons[file.type]}</div>
                    {file.name}
                </CardTitle>
                <div className="absolute top-2 right-2">
                    <FileCardActions file={file} />
                </div>
            </CardHeader>
            <CardContent className="h-[200px] flex justify-center items-center">
            {file.type === "image" && file.fileId && (
                    <Image 
                        alt={file.name}
                        width="200"
                        height="100"
                        src={getFileUrl(file.fileId)} // Use the generated URL for the image
                    />
                )}
                {file.type === "csv" && <GanttChart className="w-20 h-20"/>}
                {file.type === "pdf" && <FileTextIcon className="w-20 h-20"/>}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button onClick={() => {
                    // Open a new tab for the file location to download
                    window.open(getFileUrl(file.fileId), "_blank");
                }}>Download</Button>
            </CardFooter>
        </Card>
    );
}
