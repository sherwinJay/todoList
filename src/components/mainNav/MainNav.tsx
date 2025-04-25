"use client"

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { navItems } from '@/data/mainNavItems'
import { Collapsible, CollapsibleTrigger } from '../ui/collapsible'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { PlusIcon } from 'lucide-react'
import { useAddTaskStore } from '@/stores/formDialogStore'

const MainNav = ({ }) => {

  const pathname = usePathname()
  const toggleAddForm = useAddTaskStore(state => state.toggleAddForm)
  return (
    <SidebarGroup>
      <SidebarMenu>
        <SidebarMenuItem>
          <Collapsible>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip='Add task' className='flex items-center gap-1.5' onClick={toggleAddForm}>
                <div className='bg-orange-400 p-[2px] rounded-full'>
                  <PlusIcon className='w-[12px] h-[12px] md:w-[14px] md:h-[14px]' />
                </div>
                <span className='text-[12px] md:text-[14px]'>Add Task</span>
              </SidebarMenuButton>
            </CollapsibleTrigger>
          </Collapsible>
        </SidebarMenuItem>
        {navItems.map((navItem) => (
          <Collapsible
            key={navItem.id}
            asChild
            defaultOpen={navItem.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={navItem.name}>

                  <Link href={navItem.link} className={cn('flex gap-2 items-center', pathname === navItem.link && 'text-orange-400')}>
                    {navItem.icon}
                    {navItem.name}
                  </Link>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

export default MainNav