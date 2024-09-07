/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConvexError, v } from "convex/values";
import { internalMutation, MutationCtx, QueryCtx } from './_generated/server';


export async function getUser(
    ctx: QueryCtx | MutationCtx,
    tokenIdentifier: string
) {

    const user = await ctx.db
        .query("users")
        .withIndex("by_tokenIdentifier", (q) =>
            q.eq("tokenIdentifier", tokenIdentifier)
    ).first()

    if(!user)
        {
            throw new ConvexError("User should have been defined");
        }


    return user;
}

export const createUser = internalMutation({
    args: { tokenIdentifier: v.string() },
    async handler(ctx, args){
        await ctx.db.insert("users", {
            tokenIdentifier: args.tokenIdentifier,
            orgsIds: [],
        });
    },
});


export const addOrgIdToUser = internalMutation({

    
    args: { tokenIdentifier: v.string(), orgId: v.string() },
    async handler(ctx, args){
        // Fetching user record from the Datbase
        const user  = await getUser(ctx, args.tokenIdentifier);

        // Patching the unique identifier of user with the Organization
        await ctx.db.patch(user._id, {
            orgsIds: [...user.orgsIds, args.orgId],
        });

    },
});