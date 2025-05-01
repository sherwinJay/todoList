import TodosByDate from '@/features/todos/todosByDate'
import { UpcomingPageTypes } from '@/types/types'
import moment from 'moment'
import { FC } from 'react'


const UpcomingByDatePage: FC<{ params: UpcomingPageTypes }> = async ({ params }) => {
  // const pathname = usePathname()
  const { date } = await params

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <TodosByDate date={date} />
      </div>
    </div >)
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}) {

  const { date } = await params
  const formattedDate = new Date(parseInt(date))

  return {
    title: `${moment(formattedDate).format("YYYY-MM-DD")} - Todolist`,
  };
}

export default UpcomingByDatePage