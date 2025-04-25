'use client'

import { SignedIn, UserButton } from '@clerk/nextjs'
import { FC } from 'react'
import { UserProfile, SearchForm } from '@/components'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { SidebarTrigger } from '../ui/sidebar'
import { Button } from '../ui/button'
import { PlusIcon, Search, Slash } from 'lucide-react'
import { useAddTaskStore } from '@/stores/formDialogStore'
import { Input } from '../ui/input'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'
import { usePathname } from 'next/navigation'


const MainHeader = () => {
  // const toggleAddForm = useAddTaskStore(state => state.toggleAddForm)
  const pathname = usePathname()
  const breadCrumbsItems = pathname.split("/")

  // console.log(pathname)

  return (
    <>
      {/* <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4 justify-between">
          <div>
            <SidebarTrigger className="-ml-1" />

          </div>

          <UserProfile />
        </div>
      </header> */}
      <header className='flex justify-between items-center px-6 py-5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
        <div className='flex gap-3 items-center'>
          <SidebarTrigger className="-ml-1 sm:hidden" />
          {/* <div className='border-[1px] border-slate-500 rounded-full flex items-center pr-2'>
            <Input placeholder='search a task' className='border-0 focus-visible:ring-0 shadow-none' />
            <Search className='w-5 h-5' width="" color="#6a7282" />
          </div> */}
          {/* <Breadcrumb>
            <BreadcrumbList>
              {breadCrumbsItems.filter(item => item !== "").map((item, idx) => (
                <>
                  <BreadcrumbItem key={idx}>
                    <Slash />
                    <BreadcrumbLink href={`${pathname}`}>{item}</BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              ))}
            </BreadcrumbList>
          </Breadcrumb> */}
        </div>

        <div className='flex items-center gap-5'>
          {/* <div className='border-[1px] border-slate-500 rounded-full flex items-center pr-2'>
            <Input placeholder='search a task' className='border-0 focus-visible:ring-0 shadow-none' />
            <Search className='w-5 h-5' color="#6a7282" />
          </div> */}
          {/* <SearchForm /> */}
          {/* <button className='flex items-center gap-1.5' onClick={toggleAddForm}>
            <div className='bg-orange-400 p-[2px] rounded-full'>
              <PlusIcon className='w-[12px] h-[12px] md:w-[14px] md:h-[14px]' />
            </div>
            <span className='text-[12px] md:text-[14px]'>Add Task</span>
          </button> */}
          <UserProfile />
        </div>
      </header>
    </>

  )
}

export default MainHeader