'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { useAction, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { AddTaskWrapper, CustomDialog, CustomDropdownDelete, Loader, Todos } from '@/components'
import TotalTodos from '../components/totalTodos'
import { toast } from 'sonner'

const ProjectsById = ({ }) => {
  const { projectId } = useParams<{ projectId: Id<'projects'> }>()
  const todosByProject = useQuery(api.todos.getTodosByProjectId, { projectId }) ?? []
  const project = useQuery(api.projects.getProjectId, { projectId })
  const totalTodosByProject = todosByProject.length
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const router = useRouter()
  const deleteProjectAndItsTasks = useAction(api.projects.deleleProjectAndItsTasks)

  if (todosByProject === undefined || project === undefined) {
    return <Loader />
  }

  const handleDelete = (projectId: Id<'projects'>) => {
    if (project?.type === 'system') {
      toast("❗ Reminder", {
        description: 'System projects are protected from deletion.'
      })
    } else {
      deleteProjectAndItsTasks({
        projectId
      })
      toast("❌ Project deleted", {
        description: 'You deleted a project.',
      })
      router.push('/dashboard/projects')
    }
  }

  const handleConfirmDeleteProject = (project: Doc<"projects">) => {
    if (project.type === 'system') {
      toast("🚨 Reminder", {
        description: 'System projects are protected from deletion.'
      })
    } else {
      setShowConfirmDelete(true)
    }
  }

  if (todosByProject === undefined || project === undefined) {
    return <Loader />
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl">{project?.name}</h1>
        <div className='flex items-center'>
          <CustomDropdownDelete
            title='Delete Project'
            handleConfirmDelete={() => handleConfirmDeleteProject(project!)}
            disabled={totalTodosByProject === 0}
          />
        </div>
      </div>

      <TotalTodos
        title='tasks'
        textColor='text-gray-400'
        iconColor='#99a1af'
        totalTodos={todosByProject.length}
      />

      <Todos items={todosByProject} />

      {totalTodosByProject === 0 && (
        <AddTaskWrapper />
      )}

      {showConfirmDelete && (
        <CustomDialog
          title="Delete Project"
          taskName={project!.name}
          setShowConfirmDelete={() => setShowConfirmDelete(false)}
          handleDelete={() => handleDelete(projectId)}
        />
      )}

    </>
  )
}

export default ProjectsById