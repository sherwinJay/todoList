import TodosByDate from '@/features/todos/todosByDate'
import { FC } from 'react'

interface pageProps {
  params: { date: string }
}

const page: FC<pageProps> = ({ params }) => {
  // const pathname = usePathname()
  const { date } = params

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <TodosByDate date={date} />
      </div>
    </div >)
}

export default page