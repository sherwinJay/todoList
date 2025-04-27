import ProjectsById from '@/features/projects/projectsById'
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { fetchQuery } from "convex/nextjs";

// type Props = {
//   params: Promise<{projectId: }>
// }

const ProjectsByIdPage = () => {

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <ProjectsById />
      </div>
    </div>
  )
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ projectId: Id<"projects"> }>;
}) {

  const { projectId } = await params

  const projects = await fetchQuery(api.projects.getProjectByProjectId, { projectId })

  return {
    title: `${projects?.name} - Todolist`,
  };
}

export default ProjectsByIdPage



