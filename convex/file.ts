
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConvexError, v } from "convex/values";
import {mutation, query, QueryCtx, MutationCtx} from "./_generated/server";
import { getUser } from "./users";


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