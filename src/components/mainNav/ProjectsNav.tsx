"use client"

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '../ui/sidebar'
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible'
import { useParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Hash, Plus } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { useAddProjectStore } from '@/stores/projectFormDialogStore'
import { Id } from '../../../convex/_generated/dataModel'

const ProjectsNav = ({ }) => {

  const pathname = usePathname()
  const { projectId: paramsProjectId } = useParams<{ projectId: Id<'projects'> }>()
  // const toggleAddForm = useAddTaskStore(state => state.toggleAddForm)
  const projects = useQuery(api.projects.getProjects) ?? []
  // const [isShowProjectForm, setIsShowProjectForm] = useState<boolean>(false)
  const toggleProjectForm = useAddProjectStore(state => state.toggleAddProject)
  const { open, isMobile, toggleSidebar } = useSidebar()

  const handleProjectForm = () => {
    if (open && isMobile) {
      toggleProjectForm()
      toggleSidebar()
    } else {
      toggleProjectForm()
    }
  }

  // const hideModal = () => setIsShowProjectForm(false)

  return (
    <>
      <SidebarGroup>
        <SidebarMenu>
          <li className='flex items-center justify-between px-2 mb-2'>
            <Link
              href={"/dashboard/projects"}
              className={cn('font-bold', pathname === '/dashboard/projects' && "text-orange-400")}
              onClick={() => open && isMobile && toggleSidebar()}
            >
              My Projects
            </Link>
            <Plus onClick={handleProjectForm} className='w-5 h-5 cursor-pointer hover:bg-orange-400 rounded-full' />
          </li>
          {projects.map((project) => (
            <Collapsible
              key={project._id}
              asChild
              // defaultOpen={project.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={project.name}>

                    <Link
                      href={`/dashboard/projects/${project._id}`}
                      className={cn('flex gap-2 items-center', paramsProjectId === project._id && 'text-orange-400')}
                      onClick={() => open && isMobile && toggleSidebar()}
                    >
                      <Hash className='w-4 h-4' />
                      {project.name}
                    </Link>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
      {/* {isShowProjectForm && <ProjectForm hideModal={hideModal} />} */}
    </>
  )
}

export default ProjectsNav