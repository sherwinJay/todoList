import { ProjectsLists } from '@/components'

const ProjectsPage = ({ }) => {

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Projects</h1>
        </div>
        <ProjectsLists />

        {/* <TodoList /> */}
        {/* <TotalTodos
        title='tasks'
        textColor='text-gray-400'
        iconColor='#99a1af'
        totalTodos={inCompleteTodos.length}
      />
      {
        // **incomplete todos
      }
      <div className="flex flex-col gap-1">
        <Todos
          items={inCompleteTodos}
        />
      </div> */}
        {
          // **complete todos
        }
        {/* <AddTaskWrapper /> */}

        {/* <div className="flex flex-col gap-1">
        <Todos
          items={completedTodos}
        />
      </div>

      <div className='flex items-center gap-1 border-b-1 py-4 border-gray-200 dark:border-foreground/10 text-sm text-card-foreground/80'>
        <CircleCheckBig color="#f39c16" />
        <span>+{totalCompletedTodos}</span>
        <span className='capitalize'>completed tasks</span>
      </div> */}

      </div>
    </div>
  )
}

export default ProjectsPage