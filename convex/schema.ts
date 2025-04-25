import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.string(),
    clerkId: v.string(),
    name: v.string(),
  }),
  //  tasks: defineTable({
  //   isCompleted: v.boolean(),
  //   text: v.string(),
  // }),
  todos: defineTable({
    userId: v.id("users"),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    taskName: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    priority: v.float64(),
    isCompleted: v.boolean(),
    embedding: v.optional(v.array(v.float64())),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
    filterFields: ["userId"],
  }),
  subtodos: defineTable({
    userId: v.id("users"),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    parentId: v.id("todos"),
    taskName: v.string(),
    description: v.optional(v.string()),
    dueDate: v.number(),
    priority: v.optional(v.float64()),
    isCompleted: v.boolean(),
    embedding: v.optional(v.array(v.float64())),
  }).vectorIndex("by_embedding", {
    vectorField: "embedding",
    dimensions: 1536,
    filterFields: ["userId"],
  }),
  labels: defineTable({
    userId: v.union(v.id("users"), v.null()),
    name: v.string(),
    type: v.union(v.literal("user"), v.literal("system")),
  }),
  projects: defineTable({
    userId: v.union(v.id("users"), v.null()),
    name: v.string(),
    type: v.union(v.literal("user"), v.literal("system")),
  }),
})
