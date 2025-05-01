import { ProjectsLists } from '@/components'
import { Metadata } from 'next';

const ProjectsPage = ({ }) => {

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
        </div>
        <ProjectsLists />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Projects – Todolist",
};


export default ProjectsPage