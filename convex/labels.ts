import { v } from "convex/values"
import { query } from "./_generated/server"
import { getUserId } from "./auth"

export const getLabels = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx)

    if (userId) {
      const userLabels = await ctx.db
        .query("labels")
        .filter((label) => label.eq(label.field("userId"), userId))
        .collect()

      const systemLabels = await ctx.db
        .query("labels")
        .filter((q) => q.eq(q.field("type"), "system"))
        .collect()

      return [...systemLabels, ...userLabels]
    }
    return []
  },
})

export const getLabelId = query({
  args: {
    labelId: v.id("labels"),
  },
  handler: async (ctx, { labelId }) => {
    const userId = await getUserId(ctx)

    if (userId) {
      const labelData = await ctx.db
        .query("labels")
        // .filter((label) => label.eq(label.field("userId"), userId))
        .filter((label) => label.eq(label.field("_id"), labelId))
        .collect()

      return labelData?.[0] || null
    }

    return null
  },
})
