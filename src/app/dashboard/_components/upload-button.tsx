/* eslint-disable @typescript-eslint/no-unused-vars */

"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import {  useOrganization, useUser } from "@clerk/nextjs";
import {Loader2} from 'lucide-react';
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { z } from "zod"
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Doc } from "../../../../convex/_generated/dataModel";
 
const formSchema = z.object({
  title: z.string().min(1).max(200),
  file: z
    .custom<FileList>((val) => val instanceof FileList, "Required")
    .refine((files) => files.length > 0, `Required`),
})

export  function UploadButton() {

  const { toast } = useToast();
  const organization =  useOrganization();
  const user = useUser();
  const generateUploadUrl = useMutation(api.file.generateUploadUrl);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      file: undefined,
    },
  })

  const fileRef = form.register("file");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    
    // console.log(values);
    // console.log(values.file);
    if(!orgId) return;

    // Get a short lived upload URL
    const postUrl = await generateUploadUrl();

    const fileType = values.file[0].type;
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": fileType },
      body: values.file[0],
    });

    // Storage ID
    const { storageId } = await result.json();

    const types = {
      'image/png': 'image',
      'application/pdf' : 'pdf',
      'text/csv' : 'csv',
    } as Record<string, Doc<"files">["type"]>;
    
    try{
      await createFile({
        name: values.title,
        fileId: storageId,
        orgId,
        type: types[fileType],
      });

      form.reset();
      setIsFileDialogOpen(false);

      toast({
        variant: "success",
        title: "File Uploaded",
        description: "Now everyone can view your file",
      });

    }catch(err) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Your File could not be uploaded, Try again later",
      })
    }
  }

  let orgId: string | undefined = undefined;
  if(organization.isLoaded && user.isLoaded)
  {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);

  const createFile = useMutation(api.file.createFile);
  
  return (
        
        <Dialog open={isFileDialogOpen} onOpenChange={(isOpen) => {
              setIsFileDialogOpen(isOpen),
              form.reset();
              }}>
              
              <DialogTrigger asChild>
              <Button 
                size="sm"
                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white"
              >
                  Upload File
                </Button>
              </DialogTrigger>


              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="mb-8">Upload your File here</DialogTitle>
                  <DialogDescription>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                      
                      {/* First Input For files title  */}
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Second input  */}
                      <FormField
                        control={form.control}
                        name="file"
                        render={() => (
                          <FormItem>
                            <FormLabel>File</FormLabel>
                            <FormControl>
                              <Input type="file" {...fileRef} />
                            </FormControl>
                            
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="flex gap-1">

                        {form.formState.isSubmitting && (
                          <Loader2 className="h-4 w-4 animate-spin"/>
                        )}
                        Submit</Button>
                    </form>
                  </Form>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

          

  );
}
