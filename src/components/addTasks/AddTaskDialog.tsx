'use client'

import { FC, useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, InnerDialog, InnerDialogTrigger } from '../ui/dialog'
import { Doc } from '../../../convex/_generated/dataModel'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Calendar, ChevronDown, Flag, Hash, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { cn } from '@/lib/utils'
import { AddTaskWrapper, SubTodosList, CustomCheckbox } from "@/components"
// import { ScrollArea } from '../ui/scroll-area'
import TotalSubTodos from '../../features/components/TotalSubTodos'

type AddTaskDialogProps = {
  todosData: Doc<"todos">
  handleOnChange: () => void
}

type DetailsType = {
  labelName: string
  value: string
  icon: React.ReactNode
  id: number
}

const AddTaskDialog: FC<AddTaskDialogProps> = ({ todosData, handleOnChange }) => {

  const { taskName, description, projectId, labelId, priority, dueDate, _id, isCompleted } = todosData
  const getProjects = useQuery(api.projects.getProjectId, { projectId })
  const getLabels = useQuery(api.labels.getLabelId, { labelId })
  const [details, setDetails] = useState<DetailsType[]>([])
  const incompleteSubTodosByProject = useQuery(api.subTodos.inCompleteSubTodos) ?? []
  const completedSubTodosByProject = useQuery(api.subTodos.completedSubTodos) ?? []
  const [isShowCompletedSubTask, setIsShowCompletedSubTask] = useState(false)
  const completedSubTodosByTask = completedSubTodosByProject.filter(item => item.parentId === _id).length

  const subTodosIncompleteData = incompleteSubTodosByProject.filter(item => todosData._id === item.parentId)
  const subTodosCompletedData = completedSubTodosByProject.filter(item => todosData._id === item.parentId)

  const handleShowCommpletedSubTask = () => {
    setIsShowCompletedSubTask(prev => !prev)
  }

  useEffect(() => {
    const data = [
      {
        labelName: 'Projects',
        value: getProjects?.name || '',
        icon: <Hash className='w-3 h-3 text-[#f39c16]' />,
        id: 1,
      },
      {
        labelName: 'Label',
        value: getLabels?.name || '',
        icon: <Tag className='w-3 h-3 text-[#f39c16]' />,
        id: 2,
      },
      {
        labelName: 'Due Date',
        value: format(dueDate, 'MMM dd yyyy'),
        icon: <Calendar className='w-3 h-3 text-[#f39c16]' />,
        id: 3,
      },
      {
        labelName: 'Priority',
        value: `p${priority}`,
        icon: <Flag className='w-3 h-3' />,
        id: 4,
      },
    ] as DetailsType[]

    setDetails(data)
  }, [getLabels?.name, getProjects?.name, dueDate, priority])

  return (
    <DialogContent className="max-w-4xl! h-full lg:h-4/6 flex flex-col md:flex-row lg:justify-between overflow-y-auto md:overflow-y-auto">
      <DialogHeader className='w-full relative'>
        <div className='flex gap-2'>
          <CustomCheckbox
            priority={todosData.priority}
            isCompleted={todosData.isCompleted}
            handleOnChange={handleOnChange}
            styles='absolute top-[1px]'
          />
          <DialogTitle className={cn('pl-6', isCompleted && 'text-gray-400 line-through line')}>
            {taskName}
          </DialogTitle>
        </div>
        <DialogDescription
          className={cn('bullet_list_style pl-6', isCompleted && 'text-gray-400 line-through')}
          dangerouslySetInnerHTML={{ __html: description! }}
        />
        <div className='flex items-center gap-1 mt-12 border-b-2 border-gray-100 dark:border-gray-600 pb-2 flex-wrap justify-between lg:gap-0'>
          <div className='flex gap-1 items-center'>
            <ChevronDown className='w-5 h-5 text-primary' />
            <p className='font-bold flex text-sm text-black dark:text-white border-none mr-2'>Sub-tasks</p>
            <TotalSubTodos isDialog={true} id={_id} />
          </div>
          {/* <Button variant={'outline'} disabled>
            Suggest Missing Tasks (AI)
          </Button> */}

          <Button variant={'outline'} disabled={completedSubTodosByTask === 0} className='text-xs cursor-pointer px-3 h-9 rounded-lg' onClick={handleShowCommpletedSubTask}>
            {isShowCompletedSubTask ? 'Hide Completed' : 'Show Completed'}
          </Button>
        </div>
        <div className='pl-4 overflow-y-auto scrollbar'>
          <div className="w-full pr-4">
            <div className="">
              <InnerDialog>
                <InnerDialogTrigger asChild>
                  <SubTodosList
                    subTodosData={subTodosIncompleteData}
                  // handleCheck={checkSubTodoMutation}
                  />
                </InnerDialogTrigger>
              </InnerDialog>
            </div>
            <div className='py-4'>
              <AddTaskWrapper parentTask={todosData} />
            </div>

            {isShowCompletedSubTask && (
              <SubTodosList
                subTodosData={subTodosCompletedData}
              // handleCheck={unCheckSubTodoMutation}
              />
            )}
          </div>
        </div>
      </DialogHeader>

      <div className='flex flex-col px-5 gap-2 bg-slate-100 dark:bg-gray-800 lg:w-1/2'>
        {details.map(item => (
          <div key={item?.id} className="grid gap-2 py-3 border-slate-300 dark:border-gray-600 border-b-[1px] w-full">
            <Label className='font-bold text-sm'>{item?.labelName}</Label>
            <div className="flex items-center justify-start gap-1 pb-2">
              <p className={cn('text-gray-400',
                priority === 1 && 'text-red-500',
                priority === 2 && 'text-yellow-400',
                priority === 3 && 'text-blue-500',
              )}>
                {item?.icon}
              </p>
              <p className='capitalize text-sm'>{item?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  )
}

export default AddTaskDialog