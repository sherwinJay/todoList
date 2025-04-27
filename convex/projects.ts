import { v } from "convex/values"
import { action, mutation, query } from "./_generated/server"
import { getUserId } from "./auth"
import { api } from "./_generated/api"
import { Doc } from "./_generated/dataModel"

export const getProjects = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getUserId(ctx)

    if (userId) {
      const userProjects = await ctx.db
        .query("projects")
        .filter((project) => project.eq(project.field("userId"), userId))
        .collect()

      const systemProjects = await ctx.db
        .query("projects")
        .filter((q) => q.eq(q.field("type"), "system"))
        .collect()

      return [...systemProjects, ...userProjects]
    }
    return []
  },
})

export const getProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const userId = await getUserId(ctx)
    if (userId) {
      const projectData = await ctx.db
        .query("projects")
        // .filter((project) => project.eq(project.field("userId"), userId))
        .filter((project) => project.eq(project.field("_id"), projectId))
        .collect()

      return projectData?.[0] || null
    }

    return null
  },
})

export const createAProject = mutation({
  args: {
    name: v.string(),
  }, // argument || params
  handler: async (ctx, { name }) => {
    try {
      const userId = await getUserId(ctx)
      if (userId) {
        const newProject = await ctx.db.insert("projects", {
          userId,
          name,
          type: "user",
        })

        console.log("new proj:", newProject)

        return newProject
      }
      return null
    } catch (error) {
      console.log("Error occured during createAProject mutation", error)
      return null
    }
  },
})

export const deleteProject = mutation({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    // const userId = await handleUserId(ctx)
    const userId = await getUserId(ctx)
    if (userId) {
      const deleteProjectId = await ctx.db.delete(projectId)
      return deleteProjectId
    }
  },
})

export const deleleProjectAndItsTasks = action({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    try {
      const allTasks = await ctx.runQuery(api.todos.getTodosByProjectId, {
        projectId,
      })
      // const allSubTasks = await ctx.runQuery(api.subTodos.getSubTodosByProjectId, { projectId})

      await Promise.allSettled(
        allTasks.map(async (task: Doc<"todos">) =>
          ctx.runAction(api.todos.deleleTaskAndItsSubtasks, {
            taskId: task._id,
          })
        )
      )

      // const statuses = await promises

      await ctx.runMutation(api.projects.deleteProject, { projectId })
      // Promise.allSettled(promises).then(results => (
      //   results.map(async (task: Doc<"todos">) => (
      //     ctx.runMutation(api.todos.)
      //   ))
      // ))
    } catch (error) {
      console.log("Error occured during deleteProjectByTask mutation", error)
      return null
    }
  },
})

export const getProjectByProjectId = query({
  args: {
    projectId: v.id("projects"),
  },
  handler: async (ctx, { projectId }) => {
    const project = await ctx.db
      .query("projects")
      .filter((q) => q.eq(q.field("_id"), projectId))
      .collect()
    return project?.[0] || null
  },
})
