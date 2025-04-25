import { Doc, Id } from "./_generated/dataModel.d"
import { ConvexError, v } from "convex/values"
import { action, internalMutation, mutation, query } from "./_generated/server"
import { getUserId, handleUserId } from "./auth"
import moment from "moment"
import { api, internal } from "./_generated/api"
import { getEmbeddingsWithAI } from "./openai"

// * QUERIES

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("todos").collect()
  },
})

export const getCompletedTodos = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((user) => user.eq(user.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("isCompleted"), true))
        .collect()
    }

    return []
  },
})

export const getInCompletedTodos = query({
  args: {},
  handler: async (ctx) => {
    // const userId = await handleUserId(ctx)
    const userId = await getUserId(ctx)
    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((todo) => todo.eq(todo.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("isCompleted"), false))
        .collect()
    }
  },
})

export const getTotalInCompleteTodos = query({
  args: {},
  handler: async (ctx) => {
    // const userId = await handleUserId(ctx)
    const userId = await getUserId(ctx)
    const completedTodos = await ctx.db
      .query("todos")
      .filter((todo) => todo.eq(todo.field("userId"), userId))
      .filter((todo) => todo.eq(todo.field("isCompleted"), false))
      .collect()

    return completedTodos.length || 0
  },
})

export const getTotalCompletedTodos = query({
  args: {},
  handler: async (ctx) => {
    // const userId = await handleUserId(ctx)
    const userId = await getUserId(ctx)
    const completedTodos = await ctx.db
      .query("todos")
      .filter((todo) => todo.eq(todo.field("userId"), userId))
      .filter((todo) => todo.eq(todo.field("isCompleted"), true))
      .collect()

    return completedTodos.length || 0
  },
})

export const getTodayTodos = query({
  args: {},
  handler: async (ctx) => {
    // const userId = await handleUserId(ctx)
    const userId = await getUserId(ctx)
    const todayStart = moment().startOf("day")
    const todayEnd = moment().endOf("day")
    const today = new Date()

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((todo) => todo.eq(todo.field("userId"), userId))
        .filter((todo) => todo.gte(todo.field("dueDate"), todayStart.valueOf()))
        .filter((todo) => todo.lte(todo.field("dueDate"), today.valueOf()))
        .collect()
    }
  },
})

export const getOverdueTodos = query({
  args: {},
  handler: async (ctx) => {
    // const userId = await handleUserId(ctx)
    const userId = await getUserId(ctx)
    const todayStart = moment().startOf("day")
    const todayEnd = moment().endOf("day")
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((todo) => todo.eq(todo.field("userId"), userId))
        .filter((todo) => todo.lt(todo.field("dueDate"), today.getTime()))
        .filter((todo) => todo.eq(todo.field("isCompleted"), false))
        .collect()
    }
  },
})

export const getTodosByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await getUserId(ctx)

    if (userId) {
      return await ctx.db
        .query("todos")
        .filter((user) => user.eq(user.field("userId"), userId))
        .filter((todo) => todo.eq(todo.field("projectId"), projectId))
        .filter((todo) => todo.eq(todo.field("isCompleted"), false))
        .collect()
    }

    return []
  },
})

// * MUTATIONS

export const checkATodo = mutation({
  args: { taskId: v.id("todos") }, // argument || params
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: true })
    return newTaskId
  },
})

export const unCheckATodo = mutation({
  args: { taskId: v.id("todos") },
  handler: async (ctx, { taskId }) => {
    const newTaskId = await ctx.db.patch(taskId, { isCompleted: false })
    return newTaskId
  },
})

export const createATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    embedding: v.optional(v.array(v.float64())),
  }, // argument || params
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, embedding }
  ) => {
    try {
      const userId = await getUserId(ctx)
      if (userId) {
        const newTaskId = await ctx.db.insert("todos", {
          userId,
          taskName,
          description,
          priority,
          labelId,
          projectId,
          dueDate,
          isCompleted: false,
          embedding,
        })
        return newTaskId
      }
      return null
    } catch (error) {
      console.log("Error occured during createTodo mutation", error)
      return null
    }
  },
})

export const createTodoAndEmbeddings = action({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
  },
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId }
  ) => {
    const embedding = await getEmbeddingsWithAI(taskName)
    await ctx.runMutation(api.todos.createATodo, {
      taskName,
      description,
      priority,
      dueDate,
      projectId,
      labelId,
      embedding,
    })
  },
})

export const updateATodo = mutation({
  args: {
    taskName: v.string(),
    description: v.optional(v.string()),
    priority: v.number(),
    dueDate: v.number(),
    projectId: v.id("projects"),
    labelId: v.id("labels"),
    taskId: v.id("todos"),
  }, // argument || params
  handler: async (
    ctx,
    { taskName, description, priority, dueDate, projectId, labelId, taskId }
  ) => {
    try {
      const userId = await getUserId(ctx)
      if (userId) {
        const newTaskId = await ctx.db.patch(taskId, {
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
      console.log("Error occured during updateTodo mutation", error)
      return null
    }
  },
})

export const deleteTodo = mutation({
  args: {
    taskId: v.id("todos"),
  },
  handler: async (ctx, { taskId }) => {
    // const userId = await handleUserId(ctx)
    const userId = await getUserId(ctx)
    if (userId) {
      const deleteTaskId = await ctx.db.delete(taskId)
      return deleteTaskId
    }
  },
})

export const deleleTaskAndItsSubtasks = action({
  args: {
    taskId: v.id("todos"),
  },
  handler: async (ctx, { taskId }) => {
    try {
      const allSubTasks = await ctx.runQuery(api.subTodos.getSubTodosByTask, {
        parentId: taskId,
      })

      const promises = Promise.allSettled(
        allSubTasks.map(async (subTask: Doc<"subtodos">) =>
          ctx.runMutation(api.subTodos.deleteSubTask, {
            subTaskId: subTask._id,
          })
        )
      )

      const statuses = await promises

      await ctx.runMutation(api.todos.deleteTodo, { taskId })
    } catch (error) {
      console.log(
        "Error occured during deleteTaskAndItsSubtasks mutation",
        error
      )
      return null
    }
  },
})

export const deleteAllCompletedTodos = mutation({
  args: {
    // taskId: v.id("todos"),
  },
  handler: async (ctx) => {
    // const userId = await handleUserId(ctx)
    try {
      const userId = await getUserId(ctx)
      if (userId) {
        const allCompletedTasks = await ctx.db
          .query("todos")
          .filter((user) => user.eq(user.field("userId"), userId))
          .filter((todo) => todo.eq(todo.field("isCompleted"), true))
          .collect()
        // const deleteAllTask = await ctx.db.delete()

        const promises = await Promise.allSettled(
          allCompletedTasks.map(async (task: Doc<"todos">) =>
            ctx.db.delete(task._id)
          )
        )

        return promises
      }
    } catch (error) {
      console.log(
        "Error occured during deleteAllTasksCompleted mutation",
        error
      )
      return null
    }
  },
})

export const deleteAllCompletedTodoAndItsSubtasks = action({
  args: {
    // taskId: v.id("todos"),
  },
  handler: async (ctx) => {
    try {
      const allTasks = await ctx.runQuery(api.todos.getCompletedTodos)

      const allSubTasks2 = allTasks.map(
        async (task: Doc<"todos">) =>
          await ctx.runQuery(api.subTodos.getSubTodosByTask, {
            parentId: task._id,
          })
      )

      const promises = Promise.allSettled(
        allSubTasks2.map(async (result) =>
          (await result).map(async (subTask: Doc<"subtodos">) =>
            ctx.runMutation(api.subTodos.deleteSubTask, {
              subTaskId: subTask._id,
            })
          )
        )
      )

      const statuses = await promises

      // console.log("status: ", statuses)

      await ctx.runMutation(api.todos.deleteAllCompletedTodos)
    } catch (error) {
      console.log(
        "Error occured during deleteAllTasksCompletedAndItsSubtasks mutation",
        error
      )
      return null
    }
  },
})
