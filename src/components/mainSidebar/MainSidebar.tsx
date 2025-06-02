import { Sidebar, SidebarContent, SidebarMenuButton, SidebarRail } from '../ui/sidebar'
import MainNav from '../mainNav/MainNav'
import { SquarePen } from 'lucide-react'
import ProjectsNav from '../../features/projects/ProjectsNav'
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible'

const MainSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <div className='my-5 flex justify-center'>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Todolist'>
                <div className='flex items-center gap-1' >
                  <SquarePen width={20} height={20} />
                  <h1 className='text-2xl font-bold'>Todolist</h1>
                </div>
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </Collapsible>
        </div>
        <nav>
          <MainNav />
          <ProjectsNav />
        </nav>

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}

export default MainSidebar