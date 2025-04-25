import { Id } from "./_generated/dataModel"
import { action, mutation, query } from "./_generated/server"
import { v } from "convex/values"
import { getUserId, handleUserId } from "./auth"
import { getEmbeddingsWithAI } from "./openai"
import { api } from "./_generated/api"

export const get = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx)

    if (userId) {
      if (userId) {
        return await ctx.db
          .query("subtodos")
          .filter((todo) => todo.eq(todo.field("userId"), userId))
          .collect()
      }

      return []
    }

    return []
  },
})

export const getSubTodoById = query({
  args: {
    subTodoId: v.id("subtodos"),
  },
  handler: async (ctx, { subTodoId }) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("subtodos")
        .filter((todo) => todo.eq(todo.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("_id"), subTodoId))
        .collect()
    }

    return []
  },
})

export const createASubTodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    parentId: v.id("todos"),
    embedding: v.optional(v.array(v.float64())),
  }, // argument || params
  handler: async (
    ctx,
    {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      parentId,
      embedding,
    }
  ) => {
    try {
      const userId = await getUserId(ctx)

      if (userId) {
        const newTaskId = await ctx.db.insert("subtodos", {
          // userId: "jn71argcsmcs6wbqt0x1jzfvqn6w8c3v" as Id<"users">,
          userId,
          taskName,
          description,
          priority,
          labelId,
          projectId,
          dueDate,
          isCompleted: false,
          parentId,
          embedding,
        })
        return newTaskId
      }
      return null
    } catch (error) {
      console.log("Error occured during createSubTodo mutation", error)
      return null
    }
  },
})

// export const createASubTodoAndEmbeddings = action({
//   args: {
//     taskName: v.string(),
//     description: v.optional(v.string()),
//     priority: v.number(),
//     dueDate: v.number(),
//     projectId: v.id("projects"),
//     labelId: v.id("labels"),
//     parentId: v.id("todos"),
//   }, // argument || params
//   handler: async (
//     ctx,
//     { taskName, description, priority, dueDate, projectId, labelId, parentId }
//   ) => {
//     try {
//       const userId = await getUserId(ctx)
//       if (userId) {
//         const embedding = await getEmbeddingsWithAI(taskName)
//         await ctx.runMutation(api.subTodos.createASubTodo, {
//           taskName,
//           description,
//           priority,
//           dueDate,
//           projectId,
//           labelId,
//           parentId,
//           embedding,
//         })
//       }
//       return null
//     } catch (error) {
//       console.log("Error occured during createTodo mutation", error)
//       return null
//     }
//   },
// })

export const createSubTodoAndEmbeddings = action({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    parentId: v.id("todos"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, parentId }
  ) => {
    const embedding = await getEmbeddingsWithAI(taskName)
    await ctx.runMutation(api.subTodos.createASubTodo, {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      parentId,
      embedding,
    })
  },
})

export const checkASubTodo = mutation({
  args: { taskId: v.id("subtodos") }, // argument || params
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true })
    return newTaskId
  },
})

export const unCheckASubTodo = mutation({
  args: { taskId: v.id("subtodos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false })
    return newTaskId
  },
})

export const completedSubTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("subtodos")
        .filter((user) => user.eq(user.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("isCompleted"), true))
        .collect()
    }

    return []
  },
})

export const getSubTodosByTask = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("subtodos")
        .filter((user) => user.eq(user.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("parentId"), parentId))
        // .filter((todo) => todo.eq(todo.field("isCompleted"), true))
        .collect()
    }

    return []
  },
})

export const completedSubTodosByTask = query({
  args: {
    parentId: v.id("todos"),
  },
  handler: async (ctx, { parentId }) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("subtodos")
        .filter((user) => user.eq(user.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("parentId"), parentId))
        .filter((todo) => todo.eq(todo.field("isCompleted"), true))
        .collect()
    }

    return []
  },
})

export const inCompleteSubTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("subtodos")
        .filter((user) => user.eq(user.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("isCompleted"), false))
        .collect()
    }

    return []
  },
})

export const getSubTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("subtodos")
        .filter((user) => user.eq(user.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("projectId"), projectId))
        // .filter((todo) => todo.eq(todo.field("isCompleted"), false))
        .collect()
    }

    return []
  },
})

// * MUTATIONS

export const deleteSubTask = mutation({
  args: {
    subTaskId: v.id("subtodos"),
  },
  handler: async (ctx, { subTaskId }) => {
    const deleteSubTaskId = await ctx.db.delete(subTaskId)
    return deleteSubTaskId
  },
})

export const updateASubTodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    subTaskId: v.id("subtodos"),
  }, // argument || params
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, subTaskId }
  ) => {
    try {
      const userId = await getUserId(ctx)
      if (userId) {
        const newTaskId = await ctx.db.patch(subTaskId, {
          userId,
          taskName,
          description,
          priority,
          labelId,
          projectId,
          dueDate,
          isCompleted: false,
        })
        return newTaskId
      }
      return null
    } catch (error) {
      console.log("Error occured during updateSubTodo mutation", error)
      return null
    }
  },
})
