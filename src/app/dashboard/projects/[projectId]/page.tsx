
import { Id } from '../../../../../convex/_generated/dataModel'
import ProjectsById from '@/features/projects/projectsById'

const ProjectsByIdPage = () => {

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <ProjectsById />
      </div>
    </div>
  )
}

export default ProjectsByIdPage