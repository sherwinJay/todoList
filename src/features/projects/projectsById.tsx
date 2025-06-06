'use client'

import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Doc, Id } from '../../../convex/_generated/dataModel'
import { useAction, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { AddTaskWrapper, CustomDialog, CustomDropdown, Loader, Todos } from '@/components'
import TotalTodos from '../components/totalTodos'
import { toast } from 'sonner'
import Image from 'next/image'
import ProjectTitleForm from './projectTitleForm'

const ProjectsById = ({ }) => {
  const { projectId } = useParams<{ projectId: Id<'projects'> }>()
  const router = useRouter()
  const [showConfirmDelete, setShowConfirmDelete] = useState(false)
  const [showProjectTitleForm, setShowProjectTitleForm] = useState(false)
  // * queries
  const project = useQuery(api.projects.getProjectId, { projectId })
  const todosByProject = useQuery(api.todos.getTodosByProjectId, { projectId }) ?? []
  const totalTodosByProject = useQuery(api.todos.getTotalTodosByProjectId, { projectId })
  // * mutations
  const deleteProjectAndItsTasks = useAction(api.projects.deleleProjectAndItsTasks)

  if (project === undefined || todosByProject === undefined || totalTodosByProject === undefined) {
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

  return (
    <>
      <div className="flex items-center justify-between">
        {showProjectTitleForm ? (
          <ProjectTitleForm name={project!.name} hideModal={() => setShowProjectTitleForm(false)} projectId={project!._id} />
        ) : (
          <h1 className="text-lg font-semibold md:text-2xl">
            {project?.name}
          </h1>
        )}

        <div className='flex items-center'>
          <CustomDropdown
            title='Delete Project'
            handleConfirmDelete={() => handleConfirmDeleteProject(project!)}
            // disabled={totalTodosByProject === 0}
            showEdit={project?.type === 'user' ? true : false}
            showProjectForm={() => setShowProjectTitleForm(true)}
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
        <>
          <AddTaskWrapper />
          <div className='flex gap-3 items-center flex-col mt-20'>
            <Image
              src='../../assets/images/undraw_designer-life_6g9c.svg'
              alt="graphic designer girl working"
              width={250}
              height={250}
            />
            <div className='text-center flex flex-col items-center mt-4'>
              <h3 className='font-semibold text-md'>Start small (or dream big)...</h3>
              <p className='text-sm mt-2 w-[250px] leading-6'>
                Add your tasks to get started with your project.
              </p>
            </div>
          </div>
        </>
      )}

      {showConfirmDelete && (
        <CustomDialog
          title="Delete Project"
          taskName={project?.name}
          setShowConfirmDelete={() => setShowConfirmDelete(false)}
          handleDelete={() => handleDelete(projectId)}
        />
      )}
    </>
  )
}

export default ProjectsById