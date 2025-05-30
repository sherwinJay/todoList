'use client'

import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import Link from 'next/link'
import { Folder, FolderCog } from 'lucide-react'
import { Label } from '../../components/ui/label'

const ProjectsLists = ({ }) => {
  const projects = useQuery(api.projects.getProjects) ?? []
  return (
    <div className='flex flex-col gap-1 py-4'>{
      projects.map(project => (
        <Link key={project._id} href={`/dashboard/projects/${project._id}`}>
          <div className='flex space-x-2 items-center border-gray-100 dark:border-gray-700 border-b-2 p-2'>
            {project.type === 'system' ? <FolderCog className='text-primary w-5 h-5' color='#f39c16' /> : <Folder className='text-primary w-5 h-5' color='#f39c16' />}
            <Label htmlFor='projects' className='text-base font-normal hover:cursor-pointer'>
              {project.name}
            </Label>
          </div>

        </Link>
      ))
    }</div>
  )
}

export default ProjectsLists