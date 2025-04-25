import { Auth } from "convex/server"
import { Doc, Id } from "./_generated/dataModel"
import { ConvexError } from "convex/values"

type AuthType = {
  auth: Auth
  users: Id<"users">
  db: any
}

async function getViewerId(ctx: AuthType) {
  const userId = await ctx.auth.getUserIdentity() // !identity

  if (userId === null) {
    return null
  }

  return userId.subject as Id<"users">
}

export const handleUserId = async (ctx: AuthType) => {
  const viewerId = await getViewerId(ctx)

  if (viewerId !== null) {
    console.log("viewer2 id: ", viewerId)
    console.error("user is not authenticated")
  }

  return viewerId
}

export const getUserId = async (ctx: any) => {
  const identity = await ctx.auth.getUserIdentity()

  if (identity === null) {
    return null
  }

  const user = await ctx.db
    .query("users")
    .filter((q: any) => q.eq(q.field("email"), identity.email))
    .collect()

  if (user.length === 0) {
    throw new ConvexError("User not found")
  }

  return user[0]._id as Id<"users">
}
