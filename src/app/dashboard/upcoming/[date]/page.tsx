import TodosByDate from '@/features/todos/todosByDate'

type PageProps = Promise<{ date: string }>

const UpcomingByDatePage = async ({ params }: { params: PageProps }) => {
  // const pathname = usePathname()
  const { date } = await params

  return (
    <div className="px-4 relative">
      <div className="p-5 xl:px-20 bg-muted/50 aspect-video rounded-xl">
        <TodosByDate date={date} />
      </div>
    </div >)
}

export default UpcomingByDatePage