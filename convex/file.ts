/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConvexError, v } from "convex/values";
import {mutation, query} from "./_generated/server";

// Inserting Data into Database
export const createFile = mutation({
    args: {
        name: v.string(),
    }, 
    async handler(ctx, args){

        const identity = await ctx.auth.getUserIdentity();

        if(!identity)
        {
            throw new ConvexError("You must be logged in to upload a file");
        }

        await ctx.db.insert("files", {
            name: args.name,
        });
    },

});

// Fetching Data from Database

export const getFiles = query ({
    args: {},
    async handler(ctx,args ){

        // If there is not identity of the user means not yet logged in, can't view the files 
        const identity = await ctx.auth.getUserIdentity();

        if(!identity)
        {
            return [];
        }
        return ctx.db.query('files').collect();
    },
});