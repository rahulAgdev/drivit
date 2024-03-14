import { ConvexError, v } from 'convex/values'
import {mutation, query} from './_generated/server'

// mutation is a function that will call the convex server and call in mutation functions, query functions, or actions ( 3rd party connections)
export const createFile = mutation({
    args: {
        name: v.string(),
        orgId: v.string()
    },
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError("You must be logged in to create data.")
        }
        // from the frontend we can pass and compute some info
        // assume that we are getting a name from a form, and it is of the form string 
        await ctx.db.insert('files', {
            name: args.name,
            orgId: args.orgId
            // ctx is context, now we can invoke this function from the frontend, and store or update files. 'files' here can be a table name.
        })
    }
})

export const getFiles = query({
    args: {
        orgId: v.string(),

    },
    async handler(ctx, args){
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            return [];
        }
        return ctx.db.query('files').withIndex('by_orgId', q=>q.eq('orgId', args.orgId)).collect();
    }
})