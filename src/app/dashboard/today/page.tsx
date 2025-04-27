import TodayTodos from '@/features/todos/todayTodos'
import { Metadata } from 'next';


const TodayPage = ({ }) => {
  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Today</h1>
        </div>
        {/* <TodoList /> */}
        <TodayTodos />
      </div>
    </div>
  )
}

export const metadata: Metadata = {
  title: "Today – Todolist",
};


export default TodayPage