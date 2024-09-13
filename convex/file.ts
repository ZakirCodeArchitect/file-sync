
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConvexError, v } from "convex/values";
import {mutation, query, QueryCtx, MutationCtx} from "./_generated/server";
import { getUser } from './users';

export const generateUploadUrl = mutation(async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    if(!identity)
    {
        throw new ConvexError("You must be logged in to upload a file");
    }

    return await ctx.storage.generateUploadUrl();
});

async function hasAccessToOrgs(
    ctx: QueryCtx | MutationCtx ,
    tokenIdentifier: string, 
    orgId: string)
    {
    const user = await getUser(ctx, tokenIdentifier);

        const hasAccess =
            user.orgsIds.includes(orgId) || user.tokenIdentifier.includes(orgId);

        if(!hasAccess)
        {
            throw new ConvexError("You do not have access to this Organization");
        }

        return hasAccess;
}



// Inserting Data into Database
export const createFile = mutation({
    args: {
        name: v.string(),
        fileId: v.id("_storage"),
        orgId: v.string()
    },
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity();

        if(!identity)
        {
            throw new ConvexError("You must be logged in to upload a file");
        }

        const hasAccess = await  hasAccessToOrgs(
            ctx,
            identity.tokenIdentifier,
            args.orgId
        );

        if(!hasAccess)
        {
            throw new ConvexError("You do not have access to this Organization");
        }

        await ctx.db.insert("files", {
            name: args.name,
            orgId: args.orgId,
            fileId: args.fileId,
        });
    },

});

// Fetching Data from Database

export const getFiles = query ({
    args: {
        // fetching data only related to the organization 
        orgId: v.string()   
    },
    async handler(ctx,args ){

        // If there is not identity of the user means not yet logged in, can't view the files 
        const identity = await ctx.auth.getUserIdentity();

        if(!identity)
        {
            return [];
        }

        const hasAccess = await  hasAccessToOrgs(
            ctx,
            identity.tokenIdentifier,
            args.orgId
        );
        
        if(!hasAccess)
        {
            throw new ConvexError("You do not have access to this organization");
        }

        return ctx.db
        .query('files')
        .withIndex("by_orgId", (q) => q.eq("orgId", args.orgId))
        .collect();
    },
});


export const deleteFile = mutation({
    args: {fileId: v.id("files")},
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity();

        if(!identity)
        {
            throw new ConvexError("You do not have the access to this organisation");
        }

        const file = await ctx.db.get(args.fileId);

        if(!file)
        {
            throw new ConvexError("This file doesnot Exist");
        }

        const hasAccess = await  hasAccessToOrgs(
            ctx,
            identity.tokenIdentifier,
            file.orgId
        );

        if(!hasAccess)
        {
            throw new ConvexError("You do not have the access to delete this file");
        }

        await ctx.db.delete(args.fileId);
    },

});