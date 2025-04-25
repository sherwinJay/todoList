import CompletedTodos from '@/features/todos/completedTodos'
import { FC } from 'react'

interface pageProps {

}

const CompletedPage: FC<pageProps> = ({ }) => {

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold md:text-2xl">Completed</h1>
        </div>
        {/* <TodoList /> */}
        <CompletedTodos />
      </div>
    </div>
  )
}

export default CompletedPage