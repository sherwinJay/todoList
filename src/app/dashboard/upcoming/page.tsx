import UpcomingTodos from '@/features/todos/upcomingTodos'

const UpcomingPage = ({ }) => {
  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Upcoming</h1>
        </div>
        {/* <TodoList /> */}
        <UpcomingTodos />
      </div>
    </div>
  )
}

export default UpcomingPage