import { FC } from 'react'
import { Sidebar, SidebarContent, SidebarRail } from '../ui/sidebar'
import MainNav from '../mainNav/MainNav'
import { SquarePen } from 'lucide-react'
import ProjectsNav from '../mainNav/ProjectsNav'

const MainSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        {/* <NavMain items={data.navMain} /> */}
        <div className='my-5 flex items-center justify-center gap-1' >
          <SquarePen width={20} height={20} />
          <h1 className='text-2xl font-bold'>Todos</h1>
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