'use client'

import { FC, useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog'
import { Doc } from '../../../convex/_generated/dataModel'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Button } from '../ui/button'
import { Calendar, ChevronDown, Flag, Hash, Tag } from 'lucide-react'
import { format } from 'date-fns'
import { useMutation, useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { checkASubTodo } from '../../../convex/subTodos'
import AddTaskWrapper from './AddTaskWrapper'
import TodoItem from '../todos/TodoItem'
import { cn } from '@/lib/utils'
import SubTodosList from '../todos/SubTodosList'

interface AddTaskDialogProps {
  todosData: Doc<"todos">
}

type DetailsType = {
  labelName: string
  value: string
  icon: React.ReactNode
  id: number
}

const AddTaskDialog: FC<AddTaskDialogProps> = ({ todosData }) => {

  const { taskName, description, projectId, labelId, priority, dueDate, _id } = todosData
  const getProjects = useQuery(api.projects.getProjectId, { projectId })
  const getLabels = useQuery(api.labels.getLabelId, { labelId })
  const incompleteSubTodosByProject = useQuery(api.subTodos.inCompleteSubTodos) ?? []
  const completedSubTodosByProject = useQuery(api.subTodos.completedSubTodos) ?? []
  const checkSubTodoMutation = useMutation(api.subTodos.checkASubTodo)
  const unCheckSubTodoMutation = useMutation(api.subTodos.unCheckASubTodo)

  const [details, setDetails] = useState<DetailsType[]>([])

  useEffect(() => {
    const data = [
      {
        labelName: 'Projects',
        value: getProjects?.name,
        icon: <Hash className='w-4 h-4 text-primary' />,
        id: 1,
      },
      {
        labelName: 'Label',
        value: getLabels?.name,
        icon: <Tag className='w-4 h-4 text-primary' />,
        id: 2,
      },
      {
        labelName: 'Due Date',
        value: format(dueDate, 'MMM dd yyyy'),
        icon: <Calendar className='w-4 h-4 text-primary' />,
        id: 3,
      },
      {
        labelName: 'Priority',
        value: priority,
        icon: <Flag className='w-4 h-4 text-primary' />,
        id: 4,
      },
    ] as DetailsType[]

    setDetails(data)
  }, [getLabels?.name, getProjects?.name])

  return (
    <DialogContent className="max-w-4xl! lg:h-4/6 flex flex-col md:flex-row lg:justify-between">
      <DialogHeader className='w-full'>
        <DialogTitle>{taskName}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <div className='flex items-center gap-1 mt-12 border-b-2 border-gray-100 dark:border-gray-600 pb-2 flex-wrap sm:justify-between lg:gap-0'>
          <div className='flex gap-1'>
            <ChevronDown className='w-5 h-5 text-primary' />
            <p className='font-bold flex text-sm text-white border-none'>Sub-tasks</p>
          </div>

          <Button variant={'outline'}>
            Suggest Missing Tasks (AI)
          </Button>
        </div>
        <div className='pl-4'>
          <div className={cn(incompleteSubTodosByProject.length > 0 ? 'py-4' : '')}>
            <SubTodosList
              subTodosData={incompleteSubTodosByProject}
              parentId={todosData._id}
              handleCheck={checkSubTodoMutation}
            />
          </div>

          <AddTaskWrapper parentTask={todosData} />

          <div className='py-4'>
            <SubTodosList
              subTodosData={completedSubTodosByProject}
              parentId={todosData._id}
              handleCheck={unCheckSubTodoMutation}
            />
          </div>

        </div>
      </DialogHeader>

      <div className='flex flex-col gap-2 bg-gray-800 lg:w-1/2'>
        {details.map(item => (
          <div key={item?.id} className="grid gap-2 p-4 border-gray-500 border-b-[1px] w-full">
            <Label className=''>{item?.labelName}</Label>
            <div className="flex items-center justify-start gap-2 pb-2">
              {item?.icon}
              <p className='capitalize text-sm'>{item?.value}</p>
            </div>
          </div>
        ))}
      </div>
    </DialogContent>
  )
}

export default AddTaskDialog