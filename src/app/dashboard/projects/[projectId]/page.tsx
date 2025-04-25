
import { Doc, Id } from '../../../../../convex/_generated/dataModel'
import ProjectsById from '@/features/projects/projectsById'

interface pageProps {

}

const page = ({ params }: { params: { projectId: Id<'projects'> } }) => {

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <ProjectsById />
      </div>
    </div>
  )
}

export default page