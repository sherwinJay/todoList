import { UserProfile } from '@/components'
import { SidebarTrigger } from '../ui/sidebar'


const MainHeader = () => {
  return (
    <>
      <header className='flex justify-between items-center px-6 py-5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
        <div className='flex gap-3 items-center'>
          <SidebarTrigger className="ml-1 sm:hidden" />
        </div>

        <div className='flex items-center gap-5'>
          <UserProfile />
        </div>
      </header>
    </>
  )
}

export default MainHeader